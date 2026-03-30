/* eslint-disable no-undef */
import { boundary } from "@shopify/shopify-app-react-router/server";
import { useEffect, useMemo, useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { DATA_PRODUCTS, productUrl } from "../../lib/catalog";
import { authenticate } from "../../shopify.server";
import ProductMediaGallery from "../../components/ui/productMediaGallery";
import { DatabaseCarousel } from "../../components/DatabaseCarousel";

const THIRTYMSME_HANDLE = DATA_PRODUCTS.find((p) => p.id === "msme-30k")?.handle ?? "30-000-msme-database";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  const storefrontBase = process.env.PUBLIC_SHOPIFY_CART_BASE_URL || "https://datastation.myshopify.com";
  return {
    shopifyCartBaseUrl: storefrontBase,
    /** Required for best checkout UX. Example: PUBLIC_SHOPIFY_THIRTYMSME_VARIANT_ID=1234567890 */
    shopifyThirtyMSMEVariantId: process.env.PUBLIC_SHOPIFY_THIRTYMSME_VARIANT_ID || "",
    /** ISO 3166-1 alpha-2, e.g. IN — prefills country to reduce checkout fields */
    checkoutDefaultCountry: process.env.PUBLIC_CHECKOUT_DEFAULT_COUNTRY || "IN",
    /** Fallback if variant id is missing — product page + prefill (extra steps) */
    shopifyProductFallbackUrl:
      process.env.PUBLIC_SHOPIFY_THIRTYMSME_PRODUCT_URL ||
      productUrl(storefrontBase, THIRTYMSME_HANDLE),
  };
};

const OTP_EXPIRY_MS = 10 * 60 * 1000;
const otpStore = new Map();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function encodeCartLineProperties(props) {
  const json = JSON.stringify(props);
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  const b64 = btoa(bin);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function generateOtp() {
  return `${Math.floor(100000 + Math.random() * 900000)}`;
}

async function sendOtpEmail({ recipient, otp }) {
  const nodemailerModule = await import("nodemailer");
  // Server-only: use process.env (same pattern as shopify.server.js). Do not use VITE_* for
  // SMTP secrets — those are exposed to the browser bundle.
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM in your environment (e.g. project .env for shopify app dev).",
    );
  }

  // "Greeting never received" usually means wrong host/port/TLS combo, firewall blocking SMTP,
  // or the server is too slow to answer — tune with env vars below.
  const secure =
    process.env.SMTP_SECURE === "true"
      ? true
      : process.env.SMTP_SECURE === "false"
        ? false
        : smtpPort === 465;
  const requireTLS =
    process.env.SMTP_REQUIRE_TLS === "false"
      ? false
      : !secure && smtpPort === 587;

  const familyEnv = process.env.SMTP_FAMILY;
  const family =
    familyEnv === "4" || familyEnv === "6" ? Number(familyEnv) : undefined;

  const transporter = nodemailerModule.default.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure,
    requireTLS,
    ...(family !== undefined ? { family } : {}),
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    connectionTimeout: 60_000,
    greetingTimeout: 60_000,
    socketTimeout: 60_000,
    tls: {
      minVersion: "TLSv1.2",
    },
  });

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: recipient,
      subject: "Your OTP for purchase",
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
      html: `<p>Your OTP is <b>${otp}</b>.</p><p>This OTP expires in 10 minutes.</p>`,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (/greeting never received/i.test(msg)) {
      throw new Error(
        `${msg} — Check SMTP_HOST/SMTP_PORT: use 465 with SMTP_SECURE=true (implicit TLS), or 587 with STARTTLS. ` +
          `If it still fails, your network may block outbound SMTP; try another network or a provider HTTP API (e.g. SendGrid). ` +
          `Optional: set SMTP_REQUIRE_TLS=false for unusual servers.`,
      );
    }
    if (/timeout|ETIMEDOUT|ECONNRESET/i.test(msg)) {
      throw new Error(
        `${msg} — For GoDaddy email use outgoing host smtpout.secureserver.net (not smtp.secureserver.net). ` +
          `Try SMTP_FAMILY=4, or port 587 with SMTP_SECURE=false. Asia accounts may need smtpout.asia.secureserver.net.`,
      );
    }
    throw err;
  }
}

export const action = async ({ request }) => {
  await authenticate.admin(request);
  const formData = await request.formData();
  const intent = `${formData.get("intent") || ""}`;
  const email = `${formData.get("email") || ""}`.trim().toLowerCase();

  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, step: "email", error: "Please enter a valid email address." };
  }

  if (intent === "send-otp") {
    const otp = generateOtp();
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + OTP_EXPIRY_MS,
    });

    try {
      await sendOtpEmail({ recipient: email, otp });
      return { ok: true, step: "otp_sent", email };
    } catch (error) {
      otpStore.delete(email);
      return {
        ok: false,
        step: "email",
        error: error instanceof Error ? error.message : "Unable to send OTP right now.",
      };
    }
  }

  if (intent === "verify-otp") {
    const otp = `${formData.get("otp") || ""}`.trim();
    const entry = otpStore.get(email);

    if (!entry) {
      return { ok: false, step: "otp", error: "OTP not found. Please request a new OTP." };
    }

    if (Date.now() > entry.expiresAt) {
      otpStore.delete(email);
      return { ok: false, step: "otp", error: "OTP expired. Please request a new OTP." };
    }

    if (otp !== entry.otp) {
      return { ok: false, step: "otp", error: "Incorrect OTP. Please try again." };
    }

    otpStore.delete(email);
    return { ok: true, step: "verified", email };
  }

  return { ok: false, step: "email", error: "Invalid request." };
};


export default function ThirtyKMsmePage() {
  const {
    shopifyCartBaseUrl,
    shopifyThirtymsmeVariantId,
    checkoutDefaultCountry,
    shopifyProductFallbackUrl,
  } = useLoaderData();
  const fetcher = useFetcher();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    if (fetcher.data?.ok && fetcher.data?.step === "otp_sent") {
      setIsOtpSent(true);
      setIsEmailVerified(false);
    }
    if (fetcher.data?.ok && fetcher.data?.step === "verified") {
      setIsEmailVerified(true);
    }
  }, [fetcher.data]);
    
  const errorMessage = fetcher.data?.ok === false ? fetcher.data.error : "";
    
  const canSendOtp = useMemo(() => EMAIL_REGEX.test(email.trim()), [email]);

  const canVerifyOtp = otp.trim().length === 6;
  const handleCheckoutRedirect = () => {
    const trimmedEmail = email.trim();
    const base = shopifyCartBaseUrl.replace(/\/$/, "");

    if (shopifyThirtymsmeVariantId) {
      // https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks
      const cartUrl = new URL(`${base}/products/${shopifyThirtymsmeVariantId}:1`);
      cartUrl.searchParams.set("checkout[email]", trimmedEmail);
      // Shows on the order (Notes / attributes) so support can see which inbox was OTP-verified.
      cartUrl.searchParams.set("attributes[otp_verified_email]", trimmedEmail);
      // Line item property (visible on order line) — delivery still uses customer email on the order.
      cartUrl.searchParams.set(
        "properties",
        encodeCartLineProperties({ "OTP verified email": trimmedEmail }),
      );
      if (checkoutDefaultCountry) {
        cartUrl.searchParams.set("checkout[shipping_address][country]", checkoutDefaultCountry);
      }
      window.open(cartUrl.toString(), "_blank", "noopener,noreferrer");
      return;
    }

    const checkoutUrl = new URL(shopifyProductFallbackUrl);
    checkoutUrl.searchParams.set("checkout[email]", trimmedEmail);
    window.open(checkoutUrl.toString(), "_blank", "noopener,noreferrer");
  };

  const mediaData = [
    { type: "image", src: "/30k.webp" },
    { type: "image", src: "/all_product.webp" },
    { type: "video", src: "/data_video.mp4" },
  ];
  return (
    <div className="max-w-full overflow-x-hidden pt-30 pb-20 px-4 sm:px-6 lg:px-8 min-[1100px]:px-13 bg-white">
      <div className="mb-8 space-y-4 text-sm leading-relaxed">
        <span className="text-xs font-bold text-[#5c5c5c] sm:text-sm">Overview</span>
        <svg viewBox="0 0 1000 30" preserveAspectRatio="none" className="w-full " xmlns="http://www.w3.org/2000/svg" style={{height:"30px"}}><path d="M1 20 L520 20 L540 8 L1000 8" fill="none" stroke="#ed501f" strokeWidth="1"></path></svg>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="min-w-0">
            <ProductMediaGallery media={mediaData}/>
          </div>
          <div className="min-w-0">
            <h1 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-[#ed501f] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">30,000 MSME Database</h1>
            <p className="mt-4 text-base leading-relaxed text-[#5c5c5c] sm:mt-5 sm:text-lg">
              The 30,000 MSME Database provides access to a structured dataset of MSME companies across India.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#5c5c5c] sm:mt-5 sm:text-lg">
              This dataset is designed for professionals who want to connect with businesses for sales, partnerships, research, or outreach campaigns.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#5c5c5c] sm:mt-5 sm:text-lg">
              The data is organized and delivered in Excel format so it can be easily filtered, sorted, and used.
            </p>
            <div className="mt-6 max-w-lg rounded-2xl border border-[#ed501f]/30 bg-[#fff8f5] p-5 transition-all duration-300">

              {/* EMAIL INPUT */}
              <label htmlFor="Email" className="mb-2 block text-sm font-semibold text-[#5c5c5c]">Verify your email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailVerified(false);
                  setIsOtpSent(false);
                  setOtp("");
                }}
                placeholder="you@example.com"
                disabled={isOtpSent}
                className={`w-full rounded-xl border px-4 py-3 transition 
                  ${isOtpSent ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                  border-[#ed501f]/30 focus:border-[#ed501f]`}
              />

              {/* SEND OTP */}
              {!isOtpSent && (
                <button
                  onClick={() =>
                    fetcher.submit(
                      { intent: "send-otp", email: email.trim() },
                      { method: "post" }
                    )
                  }
                  disabled={!canSendOtp || fetcher.state === "submitting"}
                  className="mt-4 w-full rounded-xl border border-[#ed501f] py-3 font-semibold text-[#ed501f] hover:bg-[#fff1eb]"
                >
                  {fetcher.state === "submitting" ? "Sending OTP..." : "Send OTP"}
                </button>
              )}

              {/* OTP SECTION */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOtpSent ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <label htmlFor="enter otp" className="mb-2 block text-sm font-semibold text-[#5c5c5c]">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  maxLength={6}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="w-full rounded-xl border border-[#ed501f]/30 px-4 py-3"
                  placeholder="6-digit OTP"
                />

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() =>
                      fetcher.submit(
                        { intent: "verify-otp", email: email.trim(), otp: otp.trim() },
                        { method: "post" }
                      )
                    }
                    disabled={!canVerifyOtp || fetcher.state === "submitting"}
                    className="flex-1 rounded-xl bg-[#ed501f] text-white py-3 font-semibold"
                  >
                    {fetcher.state === "submitting" ? "Verifying..." : "Verify OTP"}
                  </button>

                  <button
                    onClick={() =>
                      fetcher.submit(
                        { intent: "send-otp", email: email.trim() },
                        { method: "post" }
                      )
                    }
                    className="flex-1 rounded-xl border border-[#ed501f] py-3 text-[#ed501f]"
                  >
                    Resend
                  </button>
                </div>
              </div>

              {/* ERROR */}
              {errorMessage && (
                <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
              )}

              {/* SUCCESS */}
              {isEmailVerified && (
                <div className="mt-4">
                  <p className="text-green-600 font-semibold">
                    ✅ Email verified successfully
                  </p>

                  <button
                    onClick={handleCheckoutRedirect}
                    className="mt-3 w-full rounded-xl bg-gradient-to-r from-[#ed501f] to-[#cf3101] text-white py-3 font-semibold"
                  >
                    Continue to Buy
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <DatabaseCarousel excludeProductId="msme-30k" />
    </div>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);