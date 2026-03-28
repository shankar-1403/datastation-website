import { boundary } from "@shopify/shopify-app-react-router/server";
import { useEffect, useMemo, useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { authenticate } from "../../shopify.server";
import ProductMediaGallery from "../../components/ui/productMediaGallery";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  // Cart permalink opens checkout with the line item (skips product + cart). Set variant ID from
  // Admin → Product → variant row (or JSON in product URL). Not the same as product ID.
  return {
    shopifyCartBaseUrl:
      process.env.PUBLIC_SHOPIFY_CART_BASE_URL ||
      "https://datastation.myshopify.com",
    /** Required for best checkout UX. Example: PUBLIC_SHOPIFY_TENMSME_VARIANT_ID=1234567890 */
    shopifyTenmsmeVariantId: process.env.PUBLIC_SHOPIFY_TENMSME_VARIANT_ID || "",
    /** ISO 3166-1 alpha-2, e.g. IN — prefills country to reduce checkout fields */
    checkoutDefaultCountry: process.env.PUBLIC_CHECKOUT_DEFAULT_COUNTRY || "IN",
    /** Fallback if variant id is missing — product page + prefill (extra steps) */
    shopifyProductFallbackUrl:
      process.env.PUBLIC_SHOPIFY_TENMSME_PRODUCT_URL ||
      "https://datastation.myshopify.com/products/9225317056727",
  };
};

const OTP_EXPIRY_MS = 10 * 60 * 1000;
const otpStore = new Map();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Cart permalink line item properties: Base64 URL-encoded JSON (see Shopify “Create cart permalinks”). */
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

export default function TenKMsmePage() {
  const {
    shopifyCartBaseUrl,
    shopifyTenmsmeVariantId,
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

    if (shopifyTenmsmeVariantId) {
      // https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks
      const cartUrl = new URL(`${base}/cart/${shopifyTenmsmeVariantId}:1`);
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
    { type: "image", src: "/10k.webp" },
    { type: "image", src: "/all_product.webp" },
    { type: "video", src: "/data_video.mp4" },
  ];


  return (
    <div className="pt-30 pb-20 min-[1100px]:px-13 bg-white">
      <div className="mb-8 space-y-4 text-sm leading-relaxed">
        <span className="text-[#5c5c5c] font-bold">Overview</span>
        <svg viewBox="0 0 1000 30" preserveAspectRatio="none" className="w-full " xmlns="http://www.w3.org/2000/svg" style={{height:"30px"}}><path d="M1 20 L520 20 L540 8 L1000 8" fill="none" stroke="#ed501f" strokeWidth="1"></path></svg>
        <div className="flex gap-10">
          <div className="w-[50%]">
            <ProductMediaGallery media={mediaData}/>
          </div>
          <div className="w-[50%]">
            <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl text-[#ed501f]">10,000 MSME Database</h1>
            <p className="mt-6 text-lg leading-relaxed text-[#5c5c5c]">
              The 10,000 MSME Database provides access to a structured dataset of MSME companies across India.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[#5c5c5c]">
              This dataset is designed for professionals who want to connect with businesses for sales, partnerships, research, or outreach campaigns.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[#5c5c5c]">
              The data is organized and delivered in Excel format so it can be easily filtered, sorted, and used.
            </p>
            <div className="mt-8 max-w-lg rounded-2xl border border-[#ed501f]/30 bg-[#fff8f5] p-5">
              <label htmlFor="buyer-email" className="mb-2 block text-sm font-semibold text-[#5c5c5c]">Verify your email with OTP</label>
              <input
                id="buyer-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setIsEmailVerified(false);
                }}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#ed501f]/30 bg-white px-4 py-3 text-sm text-[#5c5c5c] outline-none transition focus:border-[#ed501f]"
                disabled={isEmailVerified}
              />
              {!isEmailVerified ? (
                <button
                  type="button"
                  onClick={() =>
                    fetcher.submit(
                      { intent: "send-otp", email: email.trim() },
                      { method: "post" },
                    )
                  }
                  disabled={!canSendOtp || fetcher.state === "submitting"}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#ed501f] bg-white px-5 py-2.5 text-sm font-semibold text-[#ed501f] transition hover:bg-[#fff1eb] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {fetcher.state === "submitting" ? "Sending OTP..." : "Buy Now"}
                </button>
              ) : null}

              {isOtpSent && !isEmailVerified ? (
                <div className="mt-4">
                  <label htmlFor="otp-input" className="mb-2 block text-sm font-semibold text-[#5c5c5c]">
                    Step 2: Enter OTP
                  </label>
                  <input
                    id="otp-input"
                    type="text"
                    value={otp}
                    maxLength={6}
                    onChange={(event) =>
                      setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="Enter 6-digit OTP"
                    className="w-full rounded-xl border border-[#ed501f]/30 bg-white px-4 py-3 text-sm text-[#5c5c5c] outline-none transition focus:border-[#ed501f]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      fetcher.submit(
                        { intent: "verify-otp", email: email.trim(), otp: otp.trim() },
                        { method: "post" },
                      )
                    }
                    disabled={!canVerifyOtp || fetcher.state === "submitting"}
                    className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#ed501f] bg-white px-5 py-2.5 text-sm font-semibold text-[#ed501f] transition hover:bg-[#fff1eb] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {fetcher.state === "submitting" ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              ) : null}

              {errorMessage ? <p className="mt-2 text-sm text-red-600">{errorMessage}</p> : null}
              {isEmailVerified ? (
                <>
                  <p className="mt-2 text-sm font-semibold text-green-700">
                    Email verified successfully. You can continue to checkout.
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#5c5c5c]">
                    Next, Shopify&apos;s checkout may still ask for billing or tax details — that
                    step cannot be skipped by link alone. If you see &quot;can&apos;t accept
                    payments,&quot; turn on a payment method in Shopify Admin → Settings →
                    Payments.
                  </p>
                  <button
                    type="button"
                    onClick={handleCheckoutRedirect}
                    disabled={!isEmailVerified}
                    className="mt-4 group inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-[#ed501f] to-[#cf3101] px-7 py-3.5 font-heading text-sm font-semibold text-white shadow-lg shadow-[#ed501f]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#ed501f]/40"
                  >
                    Continue to Buy
                  </button>
                </>
              ) : null}

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);
