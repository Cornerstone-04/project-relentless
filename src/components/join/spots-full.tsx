import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SpotsFull() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg text-center"
      >
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-6">
          Applications Closed
        </p>
        <h1 className="text-8xl text-foreground leading-none mb-6">
          WE&apos;RE <span className="text-accent">FULL.</span>
        </h1>
        <p className="text-muted-foreground font-light leading-relaxed mb-10">
          All 10 spots for this sprint are taken. Stay tuned for the next round.
        </p>
        <Link href="/">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              className="rounded-none tracking-widest uppercase text-xs border-border"
            >
              Back to Home
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </main>
  );
}
