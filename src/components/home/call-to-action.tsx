import Link from "next/link";
import { FadeIn } from "../animations";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export const CallToAction = () => {
  return (
    <section className="py-28 px-6 border-t border-border relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
      <FadeIn className="max-w-2xl mx-auto text-center">
        <h2 className="text-8xl text-foreground mb-6">
          ARE YOU <span className="text-accent">IN?</span>
        </h2>
        <p className="text-muted-foreground mb-10 font-light leading-relaxed">
          Spots are limited to 10 creators. Fill out the Week 0 planning form to
          lock in your place and get the full project guide sent to your inbox.
        </p>
        <Link href="/join">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button className="bg-accent text-white hover:bg-accent/90 rounded-none px-12 py-6 text-sm tracking-widest uppercase font-medium">
              Claim Your Spot
            </Button>
          </motion.div>
        </Link>
      </FadeIn>
    </section>
  );
};
