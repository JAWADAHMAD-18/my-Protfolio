"use client";

import * as React from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = React.useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter a valid email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", company: "" });
        setErrors({});
      } else {
        setStatus("error");
        setServerError(
          data.error || "Something went wrong. Please try again or email me directly."
        );
      }
    } catch {
      setStatus("error");
      setServerError("Something went wrong. Please try again or email me directly.");
    }
  };

  return (
    <div className="rounded-[20px] border border-border bg-surface p-6 sm:p-8 md:p-10 shadow-xs">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-text mb-2">
        Send a message
      </h2>
      <p className="text-sm text-muted mb-8 leading-relaxed">
        Fill out this form and I&apos;ll get back to you with honest next steps.
      </p>

      {/* Accessible Status Announcement */}
      <div aria-live="polite" className="mb-6">
        {status === "success" && (
          <div className="p-4 rounded-[12px] bg-accent/10 border border-accent/30 text-accent-text dark:text-accent flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">
              Thanks, your message is on its way. I&apos;ll get back to you soon.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="p-4 rounded-[12px] bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">
              {serverError || "Something went wrong. Please try again or email me directly."}
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot field (hidden from view and screen readers) */}
        <div aria-hidden="true" className="sr-only">
          <label htmlFor="company-field">Do not fill this field</label>
          <input
            id="company-field"
            type="text"
            name="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name Field */}
        <div>
          <label
            htmlFor="contact-name"
            className="block font-mono text-xs uppercase tracking-wider text-muted mb-2 font-medium"
          >
            Your Name <span className="text-accent-text dark:text-accent">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            placeholder="Jane Doe"
            disabled={status === "sending"}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full px-4 py-3 rounded-[12px] border bg-surface text-text text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              errors.name ? "border-red-500" : "border-border hover:border-border/80"
            }`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-500 font-mono">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="contact-email"
            className="block font-mono text-xs uppercase tracking-wider text-muted mb-2 font-medium"
          >
            Email Address <span className="text-accent-text dark:text-accent">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            placeholder="jane@example.com"
            disabled={status === "sending"}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full px-4 py-3 rounded-[12px] border bg-surface text-text text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              errors.email ? "border-red-500" : "border-border hover:border-border/80"
            }`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-500 font-mono">
              {errors.email}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-mono text-xs uppercase tracking-wider text-muted mb-2 font-medium"
          >
            Message <span className="text-accent-text dark:text-accent">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) setErrors({ ...errors, message: undefined });
            }}
            placeholder="Tell me about your project, idea, or questions..."
            disabled={status === "sending"}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full px-4 py-3 rounded-[12px] border bg-surface text-text text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-y ${
              errors.message ? "border-red-500" : "border-border hover:border-border/80"
            }`}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-red-500 font-mono">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-accent text-on-accent hover:bg-accent-2 font-medium text-sm transition-colors shadow-xs disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === "sending" ? (
            <span>Sending message...</span>
          ) : (
            <>
              <span>Send message</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
