import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";

export const HomeNav = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-border/40 backdrop-blur-sm bg-background/80"
    >
      <span className="font-['Bebas_Neue'] text-xl tracking-widest text-foreground">
        PROJECT<span className="text-accent">.</span>RELENTLESS
      </span>
      <Link href="/join">
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Button
            size="sm"
            className="bg-accent text-white hover:bg-accent/90 font-medium rounded-none text-xs tracking-widest uppercase"
          >
            Join Now
          </Button>
        </motion.div>
      </Link>
    </motion.nav>
  );
};
