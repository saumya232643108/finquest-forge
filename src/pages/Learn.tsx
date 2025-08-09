import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { toast } from "sonner";

export default function Learn() {
  useEffect(() => { document.title = "Finquest — Learn"; }, []);

  const [progress, setProgress] = useState(72);

  useEffect(() => {
    if (progress >= 100) {
      // Simple confetti burst using GSAP circles
      const body = document.body;
      const dots = Array.from({ length: 24 }).map(() => {
        const d = document.createElement("div");
        d.style.position = "fixed";
        d.style.left = Math.random() * window.innerWidth + "px";
        d.style.top = "-10px";
        d.style.width = d.style.height = 6 + Math.random() * 6 + "px";
        d.style.borderRadius = "9999px";
        d.style.background = Math.random() > 0.5 ? "hsl(" + getComputedStyle(document.documentElement).getPropertyValue('--brand-gold') + ")" : "hsl(" + getComputedStyle(document.documentElement).getPropertyValue('--brand-emerald') + ")";
        body.appendChild(d);
        return d;
      });
      gsap.to(dots, { y: window.innerHeight + 40, x: "+=" + 100, duration: 1.2, ease: "power2.out", stagger: 0.02, onComplete: () => dots.forEach((d) => d.remove()) });
      toast.success("Lesson complete! Test unlocked ✨");
    }
  }, [progress]);

  const lessons = [
    { id: 1, title: "Compound Interest", desc: "Master exponential growth of money.", pct: 100 },
    { id: 2, title: "Risk & Volatility", desc: "Know your risk buckets.", pct: 45 },
    { id: 3, title: "Market Microstructure", desc: "Order books demystified.", pct: 10 },
    { id: 4, title: "Options Basics", desc: "Calls, puts, and payoffs.", pct: 0 },
  ];

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      toast("Searching lessons…");
    }
  };

  return (
    <div className="space-y-8">
      <section className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Your Financial Learning Journey</h1>
        <p className="text-muted-foreground">Bite-sized lessons. Real progress. Cinematic feedback.</p>
        <input onKeyDown={onEnter} placeholder="Search modules (press Enter)…" className="mt-3 w-full sm:w-[420px] mx-auto glass px-4 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((l) => (
          <motion.div key={l.id} whileHover={{ rotateX: 2, rotateY: -2 }} className="glass p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{l.title}</h3>
              <span className="text-sm text-muted-foreground">{l.pct}%</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{l.desc}</p>
            <div className="mt-4 h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-secondary" style={{ width: `${l.pct}%` }} />
            </div>
            <div className="mt-4 flex gap-3">
              <button className="ripple-btn rounded-lg px-4 py-2 bg-primary text-primary-foreground" onClick={() => toast("Continuing lesson…")}>Continue</button>
              <button className="ripple-btn rounded-lg px-4 py-2 border" onClick={() => setProgress((p) => Math.min(100, p + 15))}>Mark +15%</button>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="glass p-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Overall Progress</p>
          <p className="text-2xl font-semibold">{progress}%</p>
        </div>
        <button disabled={progress < 100} className={`ripple-btn rounded-lg px-4 py-2 ${progress >= 100 ? 'bg-secondary text-secondary-foreground glow-ring' : 'border text-muted-foreground'}`}>Take Test</button>
      </section>
    </div>
  );
}
