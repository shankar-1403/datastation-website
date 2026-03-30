/* eslint-disable no-undef */
import { useFetcher } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../../shopify.server";
import { IconMail, IconSend, IconMessageCircle } from "@tabler/icons-react";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }) => {
  await authenticate.admin(request);

  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!email || !message) {
    return { ok: false, error: "Email and message are required." };
  }

  try {
    const nodemailer = (await import("nodemailer")).default;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO || process.env.SMTP_USER, // 👈 where you receive messages
      subject: "New Contact Form Submission",
      html: `
        <h3>New Message Received</h3>
        <p><b>Name:</b> ${name || "N/A"}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    return { ok: true, name, email };

  } catch (error) {
    return {
      ok: false,
      error: "Failed to send message. Try again later.",
    };
  }
};

export default function ContactPage() {
  const fetcher = useFetcher();
  const ok = fetcher.data?.ok === true;

  return (
    <div className="px-4 pb-20 pt-30 sm:px-6 lg:px-8 min-[1100px]:px-13">
      <section className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-[#fff7f4] via-white to-[#fff3ec] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:p-9">
        <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-ds-orange/10 blur-2xl" />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-ds-orange/25 bg-ds-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ds-orange">
            <IconMessageCircle size={14} stroke={2} aria-hidden />
            Contact & Support
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-[#5c5c5c] sm:text-3xl md:text-4xl">
            Let&apos;s Talk About Your Data Needs
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ds-grey-accent md:text-base">Reach out for dataset questions, licensing support, or custom data requirements.</p>
        </div>
      </section>

      <div className="mx-auto max-w-xl rounded-2xl border border-zinc-200 bg-linear-to-b from-white to-zinc-50 p-6 shadow-[0_10px_28px_rgba(0,0,0,0.05)] md:p-8">
        <p className="text-sm text-ds-grey-accent">
          For dataset questions, licensing, or support, email{" "}
          <a
            href="mailto:support@datastation.in"
            className="inline-flex items-center gap-1 font-semibold text-ds-orange hover:underline"
          >
            <IconMail size={14} stroke={2} aria-hidden />
            support@datastation.in
          </a>
          . You can also send a message below (stored in-session only unless
          you connect an email API).
        </p>

        {ok ? (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-700">
            Thanks — we&apos;ll follow up at {fetcher.data.email}.
          </div>
        ) : (
          <fetcher.Form method="post" className="mt-6 space-y-4">
            {fetcher.data?.error && (
              <p className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-sm text-red-600">
                {fetcher.data.error}
              </p>
            )}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-ds-grey-accent">Name</label>
              <input name="name" type="text" className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-ds-orange/60 focus:ring-2 focus:ring-ds-orange/20"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-ds-grey-accent">Email *</label>
              <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-ds-orange/60 focus:ring-2 focus:ring-ds-orange/20"/>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wide text-ds-grey-accent">Message *</label>
              <textarea name="message" required rows={5} className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-ds-orange/60 focus:ring-2 focus:ring-ds-orange/20"/>
            </div>
            <button
              type="submit"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg bg-ds-orange px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(240,74,29,0.28)] transition hover:bg-[#5c5c5c] disabled:opacity-50 sm:text-base"
              disabled={fetcher.state === "submitting"}
            >
              <IconSend size={14} stroke={2} aria-hidden />
              {fetcher.state === "submitting" ? "Sending…" : "Send Message"}
            </button>
          </fetcher.Form>
        )}
      </div>
    </div>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);
