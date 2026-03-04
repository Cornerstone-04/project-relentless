import type { PillarInfoProps } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export function PillarInfo({
  showPillarInfo,
  setShowPillarInfo,
}: PillarInfoProps) {
  return (
    <div className="border border-border">
      <motion.button
        type="button"
        onClick={() => setShowPillarInfo((prev) => !prev)}
        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        className="w-full flex items-center justify-between px-4 py-3 text-xs tracking-widest uppercase text-accent transition-colors"
      >
        <span>What&apos;s a content pillar?</span>
        <motion.span
          animate={{ rotate: showPillarInfo ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-lg leading-none"
        >
          +
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {showPillarInfo && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-5 pt-1 space-y-4 border-t border-border">
              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                A content pillar is a main topic you consistently create content
                around. Think of it as a bucket — every post you make must fit
                into one of your buckets. This keeps your page focused and
                easier to grow.
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
                ].map((example, i) => (
                  <motion.div
                    key={example.role}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
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
                  </motion.div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground/60 font-light leading-relaxed border-l-2 border-accent/40 pl-3">
                {`If your pillar sounds like "Lifestyle" or "Everything creative" — it's too broad. If it sounds clear and specific, you're on the right track.`}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
