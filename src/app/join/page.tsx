"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { JoinFormData } from "@/types";
import api from "../api/axios";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const FREQUENCIES = ["3 times", "4 times", "5 times", "6–7 times"];
const PLATFORMS = [
  "Instagram",
  "TikTok",
  "YouTube",
  "X (Twitter)",
  "LinkedIn",
  "Other",
];

const initialForm: JoinFormData = {
  fullName: "",
  email: "",
  handle: "",
  platforms: [],
  pillar1: "",
  pillar2: "",
  pillar3: "",
  frequency: "",
  postingDays: [],
  goal: "",
};

export default function JoinPage() {
  const [form, setForm] = useState<JoinFormData>(initialForm);
  const [showPillarInfo, setShowPillarInfo] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof JoinFormData, string>>
  >({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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

  function validate(): boolean {
    const newErrors: Partial<Record<keyof JoinFormData, string>> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.handle.trim()) newErrors.handle = "Handle is required";
    if (form.platforms.length === 0)
      newErrors.platforms = "Select at least one platform";
    if (!form.pillar1.trim())
      newErrors.pillar1 = "At least one pillar is required";
    if (!form.frequency) newErrors.frequency = "Select your posting frequency";
    if (form.postingDays.length === 0)
      newErrors.postingDays = "Select at least one day";
    if (!form.goal.trim()) newErrors.goal = "Share your 30-day goal";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setStatus("loading");
    try {
      await api.post("/join", form);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  // ---- SUCCESS STATE ----
  if (status === "success") {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-6">
            You&apos;re locked in
          </p>
          <h1 className="font-['Bebas_Neue'] text-8xl text-foreground leading-none mb-6">
            NOW <span className="text-accent">EXECUTE.</span>
          </h1>
          <p className="text-muted-foreground font-light leading-relaxed mb-10">
            Check your inbox — the Project Relentless guide and your 30-day
            tracker are on their way. Week 0 starts now. Plan before you post.
          </p>
          <div className="border border-border p-6 text-left mb-10">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Your commitment
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="text-foreground">{form.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Handle</span>
                <span className="text-foreground">
                  @{form.handle} · {form.platforms.join(", ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pillars</span>
                <span className="text-foreground text-right">
                  {[form.pillar1, form.pillar2, form.pillar3]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frequency</span>
                <span className="text-foreground">
                  {form.frequency} per week
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Posting days</span>
                <span className="text-foreground text-right">
                  {form.postingDays.join(", ")}
                </span>
              </div>
            </div>
          </div>
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-none tracking-widest uppercase text-xs border-border"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  // ---- FORM ----
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-border/40 backdrop-blur-sm bg-background/80">
        <Link href="/" className="font-['Bebas_Neue'] text-xl tracking-widest">
          PROJECT<span className="text-accent">.</span>RELENTLESS
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-36 pb-24">
        {/* Header */}
        <div className="mb-14">
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
        </div>

        <div className="space-y-10">
          {/* Section 1: Identity */}
          <section className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="font-['Bebas_Neue'] text-3xl text-accent/40">
                01
              </span>
              <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide">
                Who Are You
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>

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
              <Field
                label="Platform(s)"
                error={errors.platforms as string}
                required
              >
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
          </section>

          {/* Section 2: Content Pillars */}
          <section className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="font-['Bebas_Neue'] text-3xl text-accent/40">
                02
              </span>
              <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide">
                Your Content Pillars
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>

            <p className="text-muted-foreground text-sm font-light -mt-2">
              Max 3. Every post must fit into one of these buckets. Keep them
              specific.
            </p>

            {/* Expandable hint */}
            <div className="border border-border">
              <button
                type="button"
                onClick={() => setShowPillarInfo((prev) => !prev)}
                className="w-full flex items-center justify-between px-4 py-3 text-xs tracking-widest uppercase text-accent hover:bg-white/5 transition-colors"
              >
                <span>What&apos;s a content pillar?</span>
                <span className="text-lg leading-none">
                  {showPillarInfo ? "−" : "+"}
                </span>
              </button>

              {showPillarInfo && (
                <div className="px-4 pb-5 pt-1 space-y-4 border-t border-border">
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    A content pillar is a main topic you consistently create
                    content around. Think of it as a bucket — every post you
                    make must fit into one of your buckets. This keeps your page
                    focused and easier to grow.
                  </p>

                  <div className="space-y-3">
                    {[
                      {
                        role: "Video Editor",
                        pillars: [
                          "Editing Tutorials",
                          "Client Projects / Before & After",
                          "Content Strategy Tips",
                        ],
                      },
                      {
                        role: "Fitness Creator",
                        pillars: [
                          "Home Workouts",
                          "Easy Meal Ideas",
                          "Discipline & Motivation",
                        ],
                      },
                      {
                        role: "Small Business Owner",
                        pillars: [
                          "Business Tips",
                          "Behind the Scenes",
                          "Client Results",
                        ],
                      },
                    ].map((example) => (
                      <div
                        key={example.role}
                        className="border border-border/50 p-3"
                      >
                        <p className="text-xs tracking-widest uppercase text-accent/70 mb-2">
                          {example.role}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {example.pillars.map((p) => (
                            <span
                              key={p}
                              className="text-xs text-muted-foreground border border-border px-2 py-1"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground/60 font-light leading-relaxed border-l-2 border-accent/40 pl-3">
                    {`If your pillar sounds like "Lifestyle" or "Everything
                    creative" — it's too broad. If it sounds clear and specific,
                    you're on the right track.`}
                  </p>
                </div>
              )}
            </div>

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
          </section>

          {/* Section 3: Schedule */}
          <section className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="font-['Bebas_Neue'] text-3xl text-accent/40">
                03
              </span>
              <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide">
                Your Schedule
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>

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

            <Field
              label="Posting days"
              error={errors.postingDays as string}
              required
            >
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
          </section>

          {/* Section 4: Goal */}
          <section className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="font-['Bebas_Neue'] text-3xl text-accent/40">
                04
              </span>
              <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide">
                Your 30-Day Goal
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>

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
          </section>

          {/* Submit */}
          {status === "error" && (
            <p className="text-red-500 text-sm text-center">
              Something went wrong. Please try again.
            </p>
          )}

          <Button
            onClick={handleSubmit}
            disabled={status === "loading"}
            className="w-full bg-accent text-black hover:bg-accent/90 rounded-none py-6 text-sm tracking-widest uppercase font-medium"
          >
            {status === "loading"
              ? "Locking you in..."
              : "I'm Committed — Submit"}
          </Button>
        </div>
      </div>
    </main>
  );
}

// ---- HELPER COMPONENTS ----
function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs tracking-widest uppercase text-muted-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </Label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `bg-card border-border rounded-none focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/50 ${
    hasError ? "border-red-500" : ""
  }`;
}

function toggleClass(active: boolean) {
  return `px-3 py-2 text-xs tracking-widest uppercase border transition-colors ${
    active
      ? "bg-accent text-white border-accent font-medium"
      : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
  }`;
}
