"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "./form-section";
import { PillarInfo } from "./pillar-info";
import { SuccessState } from "./success-state";
import { Field } from "./field";
import { validate, inputClass, toggleClass, DAYS, FREQUENCIES, PLATFORMS, initialForm } from "@/lib/join";
import type { JoinFormData } from "@/types";
import api from "@/app/api/axios";


export function JoinForm() {
  const [form, setForm] = useState<JoinFormData>(initialForm);
  const [showPillarInfo, setShowPillarInfo] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof JoinFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update(field: keyof JoinFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function toggleDay(day: string) {
    setForm((prev) => ({
      ...prev,
      postingDays: prev.postingDays.includes(day)
        ? prev.postingDays.filter((d) => d !== day)
        : [...prev.postingDays, day],
    }));
  }

  function togglePlatform(platform: string) {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus("loading");
    try {
      await api.post("/join", form);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") return <SuccessState form={form} />;

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
        <h1 className="font-['Bebas_Neue'] text-7xl leading-none text-foreground mb-4">
          LOCK IN YOUR <br />
          <span className="text-accent">COMMITMENT.</span>
        </h1>
        <p className="text-muted-foreground font-light leading-relaxed">
          Complete this before posting begins. This is your plan for the next
          30 days. Be specific — vague goals produce vague results.
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
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Social Handle" error={errors.handle} required>
              <Input
                placeholder="@yourhandle"
                value={form.handle}
                onChange={(e) => update("handle", e.target.value)}
                className={inputClass(!!errors.handle)}
              />
            </Field>
            <Field label="Platform(s)" error={errors.platforms as string} required>
              <div className="grid grid-cols-3 gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    className={toggleClass(form.platforms.includes(p))}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        </FormSection>

        {/* Section 2: Content Pillars */}
        <FormSection number="02" title="Your Content Pillars" delay={0.3}>
          <p className="text-muted-foreground text-sm font-light -mt-2">
            Max 3. Every post must fit into one of these buckets. Keep them specific.
          </p>
          <PillarInfo
            showPillarInfo={showPillarInfo}
            setShowPillarInfo={setShowPillarInfo}
          />
          <Field label="Pillar 1" error={errors.pillar1} required>
            <Input
              placeholder="e.g. Editing Tutorials"
              value={form.pillar1}
              onChange={(e) => update("pillar1", e.target.value)}
              className={inputClass(!!errors.pillar1)}
            />
          </Field>
          <Field label="Pillar 2 (optional)">
            <Input
              placeholder="e.g. Client Projects"
              value={form.pillar2}
              onChange={(e) => update("pillar2", e.target.value)}
              className={inputClass(false)}
            />
          </Field>
          <Field label="Pillar 3 (optional)">
            <Input
              placeholder="e.g. Content Strategy Tips"
              value={form.pillar3}
              onChange={(e) => update("pillar3", e.target.value)}
              className={inputClass(false)}
            />
          </Field>
        </FormSection>

        {/* Section 3: Schedule */}
        <FormSection number="03" title="Your Schedule" delay={0.4}>
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
          <Field label="Posting days" error={errors.postingDays as string} required>
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
        <FormSection number="04" title="Your 30-Day Goal" delay={0.5}>
          <Field label="What do you want to achieve?" error={errors.goal} required>
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
            {status === "loading" ? "Locking you in..." : "I'm Committed — Submit"}
          </Button>
        </motion.div>

      </form>
    </div>
  );
}