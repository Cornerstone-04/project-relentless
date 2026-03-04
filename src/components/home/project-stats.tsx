import { Counter, FadeIn } from "../animations";

const stats = [
  { value: 30, label: "Days" },
  { value: 12, label: "Minimum Posts" },
  { value: 3, label: "Content Pillars" },
  { value: 10, label: "Creators" },
];
export const Stats = () => {
  return (
    <section className="border-y border-border py-12 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
            <p className="font-bebas text-6xl text-accent">
              <Counter target={stat.value} />
            </p>
            <p className="text-muted-foreground text-xs tracking-widest uppercase mt-1">
              {stat.label}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
