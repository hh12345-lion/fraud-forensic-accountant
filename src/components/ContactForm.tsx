"use client";

import { SITE_EMAIL } from "@/lib/site";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const inputClass =
  "w-full min-h-[44px] rounded-sm border border-border px-3 py-2 text-body focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20";

/**
 * Webhook + Sheets via /api/submit-lead (primary).
 * Optional /api/contact is soft-awaited (404 on live Netlify historically).
 */
export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      fullName: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: "",
      message: String(data.get("message") ?? "").trim(),
      formType: "contact" as const,
    };

    try {
      const leadRes = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const leadResult = (await leadRes.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        writtenToSheet?: boolean;
      };

      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, skipSheet: true }),
          keepalive: true,
        });
      } catch {
        /* submit-lead already handled webhook + Sheets */
      }

      if (!leadRes.ok || !leadResult.success) {
        setStatus("error");
        setErrorMessage(leadResult.error ?? "Submission failed");
        return;
      }

      router.push("/thank-you");
    } catch {
      setStatus("error");
      setErrorMessage(null);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-heading">
          Name *
        </label>
        <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-heading">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-heading">
          How can we help? *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Brief case type, timeline, or question"
          className={`${inputClass} min-h-[100px] resize-y`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-signal" role="alert">
          {errorMessage ?? "Unable to submit."} Please email{" "}
          <a href={`mailto:${SITE_EMAIL}`} className="underline">
            {SITE_EMAIL}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="min-h-[44px] w-full rounded-sm bg-copper px-6 py-3 font-semibold text-white hover:bg-copper-light disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Send Inquiry"}
      </button>

      <p className="text-sm text-muted">
        Or email{" "}
        <a href={`mailto:${SITE_EMAIL}`} className="font-medium text-copper hover:underline">
          {SITE_EMAIL}
        </a>
        . Response within one business day.
      </p>
    </form>
  );
}
