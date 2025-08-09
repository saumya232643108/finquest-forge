import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Leaderboard() {
  useEffect(() => { document.title = "Finquest — Leaderboard"; }, []);

  const top = [
    { name: "Ava", score: 9820 },
    { name: "Leo", score: 9410 },
    { name: "Maya", score: 8990 },
  ];

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Top Players of the Season</h1>
        <p className="text-muted-foreground">Trade smart. Learn fast. Shine brighter.</p>
      </section>

      <section className="flex items-end justify-center gap-6 h-56">
        {top.map((p, i) => (
          <motion.div
            key={p.name}
            className="glass w-32 rounded-xl flex flex-col items-center justify-end pb-4"
            style={{ height: 120 + (3 - i) * 40 }}
            animate={{ rotateY: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          >
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="text-sm text-muted-foreground">{p.score}</div>
          </motion.div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["Top Traders", "Top Learners"].map((title) => (
          <div key={title} className="glass p-4">
            <h3 className="font-semibold mb-3">{title}</h3>
            <ul className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <li key={i} className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0">
                  <span>Player {i + 1}</span>
                  <span className="text-sm text-muted-foreground">Score {8000 - i * 120}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
