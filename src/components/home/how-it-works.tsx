import { FadeIn } from "../animations";

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

export const HowItWorks = () => {
  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">
            The Structure
          </p>
          <h2 className="text-7xl text-foreground mb-16">HOW IT WORKS</h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-0 border border-border">
          {pillars.map((pillar, i) => (
            <FadeIn key={pillar.number} delay={i * 0.15}>
              <div
                className={`p-8 h-full ${i < pillars.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : ""}`}
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
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
