"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "./form-section";
import { SuccessState } from "./success-state";
import { Field } from "./field";
import {
  inputClass,
  toggleClass,
  DAYS,
  FREQUENCIES,
  initialForm,
  type JoinFormData,
  joinSchema,
} from "@/lib/join";
import api from "@/app/api/axios";
import { SpotsFull } from "./spots-full";
import { AccountFields } from "./account-fields";

type AccountError = Partial<
  Record<keyof JoinFormData["accounts"][number], string>
>;

type JoinFormErrors = Partial<
  Omit<Record<keyof JoinFormData, string>, "accounts">
> & {
  accounts?: AccountError[];
};

export function JoinForm() {
  const [form, setForm] = useState<JoinFormData>(initialForm);
  const [errors, setErrors] = useState<JoinFormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate" | "full"
  >("idle");

  useEffect(() => {
    async function checkSpots() {
      try {
        const res = await api.get("/spots");
        if (res.data.full) setStatus("full");
      } catch {
        // ignore
      }
    }
    checkSpots();
  }, []);

  function update(field: keyof JoinFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Clear top-level errors when field changes
    if (field !== "accounts") {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  function updateAccount(
    index: number,
    updated: JoinFormData["accounts"][number],
  ) {
    setForm((prev) => {
      const accounts = [...prev.accounts];
      accounts[index] = updated;
      return { ...prev, accounts };
    });

    // Clear nested account errors when account changes
    setErrors((prev) => {
      if (!prev.accounts?.[index]) return prev;
      const nextAccounts = [...(prev.accounts ?? [])];
      nextAccounts[index] = {};
      return { ...prev, accounts: nextAccounts };
    });
  }

  function addAccount() {
    if (form.accounts.length >= 3) return;
    setForm((prev) => ({
      ...prev,
      accounts: [
        ...prev.accounts,
        { handle: "", platforms: [], pillar1: "", pillar2: "", pillar3: "" },
      ],
    }));
  }

  function removeAccount(index: number) {
    setForm((prev) => ({
      ...prev,
      accounts: prev.accounts.filter((_, i) => i !== index),
    }));

    // Keep errors aligned with accounts indices
    setErrors((prev) => {
      if (!prev.accounts) return prev;
      return {
        ...prev,
        accounts: prev.accounts.filter((_, i) => i !== index),
      };
    });
  }

  function toggleDay(day: string) {
    setForm((prev) => ({
      ...prev,
      postingDays: prev.postingDays.includes(day)
        ? prev.postingDays.filter((d) => d !== day)
        : [...prev.postingDays, day],
    }));

    setErrors((prev) => ({ ...prev, postingDays: "" }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = joinSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: JoinFormErrors = {};

      result.error.issues.forEach((issue) => {
        const [root, index, nested] = issue.path;

        // Nested: accounts[0].handle / accounts[0].platforms
        if (
          root === "accounts" &&
          typeof index === "number" &&
          typeof nested === "string"
        ) {
          fieldErrors.accounts ??= [];
          fieldErrors.accounts[index] ??= {};

          const key = nested as keyof JoinFormData["accounts"][number];
          fieldErrors.accounts[index][key] ??= issue.message;
          return;
        }

        // Top-level fields
        const field = root as Exclude<keyof JoinFormData, "accounts">;
        fieldErrors[field] ??= issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    try {
      await api.post("/join", result.data);
      setStatus("success");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setStatus("duplicate");
      } else if (axios.isAxiosError(err) && err.response?.status === 410) {
        setStatus("full");
      } else {
        setStatus("error");
      }
    }
  }

  if (status === "success") return <SuccessState form={form} />;
  if (status === "full") return <SpotsFull />;

  return (
    <div className="max-w-2xl mx-auto px-6 pt-36 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">
          Week 0 — Planning
        </p>
        <h1 className="text-7xl leading-none text-foreground mb-4">
          LOCK IN YOUR <br />
          <span className="text-accent">COMMITMENT.</span>
        </h1>
        <p className="text-muted-foreground font-light leading-relaxed">
          Complete this before posting begins. This is your plan for the next 30
          days. Be specific — vague goals produce vague results.
        </p>
      </motion.div>

      <form className="space-y-10" onSubmit={handleSubmit}>
        {/* Section 1: Identity */}
        <FormSection number="01" title="Who Are You" delay={0.2}>
          <Field label="Full Name" error={errors.fullName} required>
            <Input
              placeholder="Your name"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className={inputClass(!!errors.fullName)}
            />
          </Field>

          <Field label="Email Address" error={errors.email} required>
            <Input
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass(!!errors.email)}
            />
          </Field>

          <div className="space-y-3">
            {form.accounts.map((account, i) => (
              <AccountFields
                key={i}
                index={i}
                account={account}
                error={errors.accounts?.[i]}
                onChange={updateAccount}
                onRemove={form.accounts.length > 1 ? removeAccount : undefined}
              />
            ))}

            {form.accounts.length < 3 && (
              <button
                type="button"
                onClick={addAccount}
                className="w-full border border-dashed border-border py-3 text-xs tracking-widest uppercase text-muted-foreground hover:border-accent hover:text-accent transition-colors"
              >
                + Add another account
              </button>
            )}
          </div>
        </FormSection>

        {/* Section 2: Content Pillars */}

        {/* Section 3: Schedule */}
        <FormSection number="02" title="Your Schedule" delay={0.3}>
          <Field label="Posts per week" error={errors.frequency} required>
            <div className="grid grid-cols-4 gap-2">
              {FREQUENCIES.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => update("frequency", f)}
                  className={toggleClass(form.frequency === f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Posting days" error={errors.postingDays} required>
            <div className="grid grid-cols-4 gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={toggleClass(form.postingDays.includes(day))}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </Field>
        </FormSection>

        {/* Section 4: Goal */}
        <FormSection number="03" title="Your 30-Day Goal" delay={0.4}>
          <Field
            label="What do you want to achieve?"
            error={errors.goal}
            required
          >
            <Textarea
              placeholder="Be specific. e.g. Reach 500 followers, post 15 Reels, grow engagement by 20%"
              value={form.goal}
              onChange={(e) => update("goal", e.target.value)}
              rows={4}
              className={`${inputClass(!!errors.goal)} resize-none`}
            />
          </Field>
        </FormSection>

        {/* Submit */}
        {status === "error" && (
          <p className="text-red-500 text-sm text-center">
            Something went wrong. Please try again.
          </p>
        )}

        {status === "duplicate" && (
          <p className="text-yellow-500 text-sm text-center">
            You&apos;ve already signed up! Check your inbox for the confirmation
            email.
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            disabled={status === "loading"}
            className="w-full bg-accent text-white hover:bg-accent/90 rounded-none py-6 text-sm tracking-widest uppercase font-medium"
          >
            {status === "loading"
              ? "Locking you in..."
              : "I'm Committed — Submit"}
          </Button>
        </motion.div>
      </form>
    </div>
  );
}
