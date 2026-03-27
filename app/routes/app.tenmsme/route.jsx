import { boundary } from "@shopify/shopify-app-react-router/server";
import { useEffect, useMemo, useState } from "react";
import { useFetcher } from "react-router";
import { authenticate } from "../../shopify.server";
import ProductMediaGallery from "../../components/ui/productMediaGallery";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

const OTP_EXPIRY_MS = 10 * 60 * 1000;
const otpStore = new Map();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateOtp() {
  return `${Math.floor(100000 + Math.random() * 900000)}`;
}

async function sendOtpEmail({ recipient, otp }) {
  const nodemailerModule = await import("nodemailer");
  const smtpHost = import.meta.env.SMTP_HOST;
  const smtpPort = Number(import.meta.env.SMTP_PORT || 587);
  const smtpUser = import.meta.env.SMTP_USER;
  const smtpPass = import.meta.env.SMTP_PASS;
  const smtpFrom = import.meta.env.SMTP_FROM || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM.",
    );
  }

  const transporter = nodemailerModule.default.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: smtpFrom,
    to: recipient,
    subject: "Your OTP for purchase",
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    html: `<p>Your OTP is <b>${otp}</b>.</p><p>This OTP expires in 10 minutes.</p>`,
  });
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
  const checkoutBaseUrl = "https://datastation-store-new.myshopify.com/products/10130566086963";
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
    const checkoutUrl = new URL(checkoutBaseUrl);
    checkoutUrl.searchParams.set("checkout[email]", email.trim());
    window.open(checkoutUrl.toString(), "_blank", "noopener,noreferrer");
  };

  const mediaData = [
    { type: "image", src: "/10k.webp" },
    { type: "image", src: "/all_product.png" },
    { type: "video", src: "/data_video.mp4" },
  ];


  return (
    <div className="pt-30 pb-20 min-[1100px]:px-13 bg-white">
      <div className="mb-8 space-y-4 text-sm leading-relaxed">
        <span className="text-[#5c5c5c] font-bold">Overview</span>
        <svg viewBox="0 0 1000 30" preserveAspectRatio="none" className="w-full " xmlns="http://www.w3.org/2000/svg" style={{height:"30px"}}><path d="M1 20 L520 20 L540 8 L1000 8" fill="none" stroke="#5c5c5c" strokeWidth="1"></path></svg>
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
                  {fetcher.state === "submitting" ? "Sending OTP..." : "Verify email"}
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
