import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function AnimatedNumber({ value }: { value: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let f = 0; const target = value; const id = setInterval(()=>{ f += Math.ceil(target/30); if (f>=target){ f=target; clearInterval(id);} setN(f); }, 30);
    return ()=> clearInterval(id);
  }, [value]);
  return <span>{n}</span>;
}

export default function Profile() {
  useEffect(() => { document.title = "Finquest — Profile"; }, []);

  const badges = useMemo(() => ["Streak Starter", "Lesson Master", "Chart Tactician", "Risk Ranger", "Saver Sage"], []);

  return (
    <div className="space-y-8">
      <section className="glass p-6 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full glow-ring" style={{ background: "var(--gradient-hero)" }} />
        <div>
          <h1 className="text-2xl font-bold">Hey, Alex</h1>
          <p className="text-muted-foreground">Rank glow: Emerald • Gold</p>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-4 text-center"><p className="text-sm text-muted-foreground">XP</p><p className="text-2xl font-semibold"><AnimatedNumber value={12430} /></p></div>
        <div className="glass p-4 text-center"><p className="text-sm text-muted-foreground">Streak</p><p className="text-2xl font-semibold"><AnimatedNumber value={12} /></p></div>
        <div className="glass p-4 text-center"><p className="text-sm text-muted-foreground">Badges</p><p className="text-2xl font-semibold"><AnimatedNumber value={5} /></p></div>
        <div className="glass p-4 text-center"><p className="text-sm text-muted-foreground">Rank</p><p className="text-2xl font-semibold">Top 18%</p></div>
      </section>

      <section className="glass p-6">
        <h2 className="text-xl font-semibold mb-4">Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {badges.map((b) => (
            <motion.div key={b} className="glass p-4 text-center" animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }} transition={{ repeat: Infinity, duration: 6 }} style={{ backgroundImage: "linear-gradient(110deg, transparent, hsla(var(--brand-gold)/0.08), transparent)", backgroundSize: "200% 100%" }}>
              <p className="font-medium">{b}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="glass p-6">
        <h2 className="text-xl font-semibold mb-4">History</h2>
        <ul className="space-y-2 text-sm">
          {Array.from({ length: 8 }).map((_, i) => (
            <li key={i} className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0">
              <span>Activity {i + 1}</span>
              <span className="text-muted-foreground">+{(i + 1) * 4} XP</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
