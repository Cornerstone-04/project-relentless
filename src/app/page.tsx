import Link from "next/link";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    number: "01",
    title: "Plan First",
    description:
      "Before a single post goes live, you define your niche, your pillars, and your goal. Clarity before action.",
  },
  {
    number: "02",
    title: "Show Up Weekly",
    description:
      "Minimum 3 posts per week. 12 posts in 30 days. Your schedule, your pace — but the floor doesn't move.",
  },
  {
    number: "03",
    title: "Stay Accountable",
    description:
      "Every post gets dropped in the group. Every week gets reviewed. No ghosts, no excuses.",
  },
];

const stats = [
  { value: "30", label: "Days" },
  { value: "12", label: "Minimum Posts" },
  { value: "3", label: "Content Pillars" },
  { value: "10", label: "Creators" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-border/40 backdrop-blur-sm bg-background/80">
        <span className="font-['Bebas_Neue'] text-xl tracking-widest text-foreground">
          PROJECT<span className="text-accent">.</span>RELENTLESS
        </span>
        <Link href="/join">
          <Button
            size="sm"
            className="bg-accent text-white hover:bg-accent/90 font-medium rounded-none text-xs tracking-widest uppercase"
          >
            Join Now
          </Button>
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full opacity-10 blur-[120px] bg-accent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-6 font-medium">
            30 Days · 10 Creators · No Excuses
          </p>

          <h1 className="text-[clamp(5rem,15vw,13rem)] leading-none text-foreground mb-6">
            PROJECT
            <br />
            <span className="text-accent">RELENTLESS</span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed">
            A focused room for creators who are done making excuses. Plan your
            content. Show up consistently. Execute for 30 days straight.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join">
              <Button className="bg-accent text-white hover:bg-accent/90 rounded-none px-10 py-6 text-sm tracking-widest uppercase font-medium w-full sm:w-auto">
                I&apos;m Ready — Join Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-linear-to-b from-muted-foreground to-transparent" />
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-['Bebas_Neue'] text-6xl text-accent">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-xs tracking-widest uppercase mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">
            The Structure
          </p>
          <h2 className="text-7xl text-foreground mb-16">HOW IT WORKS</h2>

          <div className="grid md:grid-cols-3 gap-0 border border-border">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.number}
                className={`p-8 ${i < pillars.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : ""}`}
              >
                <p className="font-['Bebas_Neue'] text-5xl text-accent/30 mb-4">
                  {pillar.number}
                </p>
                <h3 className="text-2xl text-foreground mb-3">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 border-t border-border relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-8xl text-foreground mb-6">
            ARE YOU <span className="text-accent">IN?</span>
          </h2>
          <p className="text-muted-foreground mb-10 font-light leading-relaxed">
            Spots are limited to 10 creators. Fill out the Week 0 planning form
            to lock in your place and get the full project guide sent to your
            inbox.
          </p>
          <Link href="/join">
            <Button className="bg-accent text-white hover:bg-accent/90 rounded-none px-12 py-6 text-sm tracking-widest uppercase font-medium">
              Claim Your Spot
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-6 text-center">
        <p className="text-muted-foreground text-xs tracking-widest uppercase">
          Project Relentless · Consistency builds momentum. Momentum builds
          growth.
        </p>
      </footer>
    </main>
  );
}
