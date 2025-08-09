import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { Trophy, BookOpen, LineChart, User } from "lucide-react";
import { toast } from "sonner";

function useTypedQuote(quotes: string[], speed = 35) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let i = 0;
    const current = quotes[index % quotes.length];
    setText("");
    const id = setInterval(() => {
      setText(current.slice(0, i + 1));
      i++;
      if (i >= current.length) {
        clearInterval(id);
        setTimeout(() => setIndex((v) => v + 1), 2500);
      }
    }, speed);
    return () => clearInterval(id);
  }, [index, quotes, speed]);
  return text;
}

function XPArc({ value = 62 }) {
  const radius = 90;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" className="glow-ring">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={`hsl(var(--brand-emerald))`} />
          <stop offset="100%" stopColor={`hsl(var(--brand-gold))`} />
        </linearGradient>
      </defs>
      <circle cx="110" cy="110" r={radius} stroke="hsl(var(--border))" strokeWidth="14" fill="none" />
      <circle
        cx="110"
        cy="110"
        r={radius}
        stroke="url(#grad)"
        strokeLinecap="round"
        strokeWidth="16"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        fill="none"
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="font-semibold" style={{ fill: "hsl(var(--foreground))" }}>
        {value}% XP
      </text>
    </svg>
  );
}

export default function Dashboard() {
  useEffect(() => {
    document.title = "Finquest — Dashboard";
  }, []);

  const navigate = useNavigate();
  const quotes = useMemo(
    () => [
      "Wealth is the product of a man’s capacity to think.",
      "Risk comes from not knowing what you’re doing.",
      "An investment in knowledge pays the best interest.",
    ],
    []
  );
  const quote = useTypedQuote(quotes, 28);

  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!bgRef.current) return;
    gsap.fromTo(
      bgRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  const actions = [
    { label: "Learn", icon: BookOpen, to: "/learn" },
    { label: "Trade", icon: LineChart, to: "/trade" },
    { label: "Leaderboard", icon: Trophy, to: "/leaderboard" },
    { label: "Profile", icon: User, to: "/profile" },
  ];

  const startChallenge = () => {
    toast.success("Daily challenge started — earn +50 XP when complete!", { duration: 2500 });
  };

  const recent = [
    { t: "Joined weekly challenge", meta: "+20 XP" },
    { t: "Completed Lesson: Compound Interest", meta: "+40 XP" },
    { t: "Placed a paper trade: AAPL", meta: "+12 XP" },
    { t: "Unlocked badge: Streak Starter", meta: "Day 3" },
    { t: "Climbed 5 ranks on Leaderboard", meta: "Top 20%" },
  ];

  return (
    <div className="space-y-10">
      {/* Top Hero Row */}
      <section ref={bgRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Welcome back, <span className="gradient-text">Alex</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">{quote}</p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="glass p-6 flex flex-col items-center">
            <XPArc value={62} />
            <div className="mt-3 text-center">
              <p className="text-sm text-muted-foreground">Daily Streak</p>
              <p className="text-xl font-semibold">7 days 🔥</p>
            </div>
          </div>
        </div>
      </section>

      {/* Middle Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div whileHover={{ y: -2 }} className="glass p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Daily Finance Challenge</h2>
            <button onClick={startChallenge} className="ripple-btn rounded-lg px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Start
            </button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Complete 3 micro-lessons to claim your bonus.</p>
          <div className="mt-4 h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-secondary" style={{ width: "45%" }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Progress: 45%</p>
        </motion.div>

        <motion.div className="glass p-6 overflow-hidden">
          <h2 className="text-xl font-semibold mb-3">Achievements</h2>
          <motion.div
            className="flex gap-4"
            animate={{ x: [0, -200, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            {["Streak Starter", "Chart Tactician", "Lesson Master", "Risk Ranger"].map((b) => (
              <div key={b} className="min-w-[200px] glass p-4 text-center">
                <p className="text-sm text-muted-foreground">Badge</p>
                <p className="font-semibold">{b}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <motion.button
              key={a.label}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(a.to)}
              className="glass p-5 text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center gap-3">
                <Icon />
                <span className="font-medium">{a.label}</span>
              </div>
            </motion.button>
          );
        })}
      </section>

      {/* Timeline */}
      <section className="glass p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          {recent.map((r, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex items-center justify-between border-b border-border/40 pb-3 last:border-0"
            >
              <span>{r.t}</span>
              <span className="text-sm text-muted-foreground">{r.meta}</span>
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  );
}
