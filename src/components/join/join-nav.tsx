import { motion } from "framer-motion";
import Link from "next/link";

export const JoinNav = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-border/40 backdrop-blur-sm bg-background/80"
    >
      <Link href="/" className="font-bebas text-xl tracking-widest">
        PROJECT<span className="text-accent">.</span>RELENTLESS
      </Link>
    </motion.nav>
  );
};
