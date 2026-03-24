import { useFetcher } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { DsFooter } from "../components/DsFooter.jsx";
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
  // Hook email provider here if needed; for now acknowledge only.
  return { ok: true, name, email };
};

export default function ContactPage() {
  const fetcher = useFetcher();
  const ok = fetcher.data?.ok === true;

  return (
    <s-page heading="Contact">
      <div className="font-sans text-ds-grey-dark antialiased">
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-[#fff7f4] via-white to-[#fff3ec] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:p-9">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-ds-orange/10 blur-2xl" />
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-ds-orange/25 bg-ds-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ds-orange">
              <IconMessageCircle size={14} stroke={2} aria-hidden />
              Contact & Support
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ds-grey-dark md:text-4xl">
              Let&apos;s Talk About Your Data Needs
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ds-grey-accent md:text-base">
              Reach out for dataset questions, licensing support, or custom data requirements.
            </p>
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
                <label className="block text-xs font-semibold uppercase tracking-wide text-ds-grey-accent">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-ds-orange/60 focus:ring-2 focus:ring-ds-orange/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-ds-grey-accent">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-ds-orange/60 focus:ring-2 focus:ring-ds-orange/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-ds-grey-accent">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-ds-orange/60 focus:ring-2 focus:ring-ds-orange/20"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-ds-orange py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(240,74,29,0.28)] transition hover:bg-ds-grey-dark disabled:opacity-50"
                disabled={fetcher.state === "submitting"}
              >
                <IconSend size={14} stroke={2} aria-hidden />
                {fetcher.state === "submitting" ? "Sending…" : "Send Message"}
              </button>
            </fetcher.Form>
          )}
        </div>
        <DsFooter />
      </div>
    </s-page>
  );
}

export const headers = (headersArgs) => boundary.headers(headersArgs);
