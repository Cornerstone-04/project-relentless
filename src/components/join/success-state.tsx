import type { JoinFormData } from "@/lib/join";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";

type SuccessStateProps = {
  form: JoinFormData;
};

export function SuccessState({ form }: SuccessStateProps) {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-accent text-xs tracking-[0.4em] uppercase mb-6"
        >
          You&apos;re locked in
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-8xl text-foreground leading-none mb-6"
        >
          NOW <span className="text-accent">EXECUTE.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-muted-foreground font-light leading-relaxed mb-10"
        >
          Check your inbox — the Project Relentless guide and your 30-day
          tracker are on their way. Week 0 starts now. Plan before you post.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="border border-border p-6 text-left mb-10"
        >
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
            Your commitment
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="text-foreground">{form.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {form.accounts.length > 1 ? "Accounts" : "Account"}
              </span>
              <span className="text-foreground text-right space-y-1">
                {form.accounts.map((a, i) => (
                  <span key={i} className="block">
                    @{a.handle} · {a.platforms.join(", ")}
                  </span>
                ))}
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
              <span className="text-foreground">{form.frequency} per week</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Posting days</span>
              <span className="text-foreground text-right">
                {form.postingDays.join(", ")}
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-none tracking-widest uppercase text-xs border-border hover:text-white"
            >
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
