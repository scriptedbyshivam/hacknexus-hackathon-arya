import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Activity, Users, AlertTriangle, Clock, ArrowDown } from "lucide-react";
import HeroScene from "./HeroScene";

/** Counter animation hook */
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, ref };
}

export default function HeroSection() {
  const stats = [
    { icon: <Users className="w-5 h-5" />, label: "Active Patients", value: 12 },
    { icon: <AlertTriangle className="w-5 h-5" />, label: "Critical", value: 3 },
    { icon: <Clock className="w-5 h-5" />, label: "Avg Wait (min)", value: 4 },
    { icon: <Activity className="w-5 h-5" />, label: "Processed Today", value: 847 },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero-bg">
      {/* 3D Background */}
      <HeroScene />

      {/* Content overlay */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hero-muted/30 bg-hero-muted/10 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-2 h-2 rounded-full bg-low animate-pulse" />
          <span className="text-sm text-hero-muted tracking-wide">AI-Powered Emergency Triage System</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-hero-fg leading-[1.05] mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Smarter triage,
          <br />
          <span className="text-primary italic">saving lives</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-hero-muted mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Multimodal intelligence that processes text, images, and voice to prioritize emergency patients in real-time — saving critical minutes when every second counts.
        </motion.p>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {stats.map((stat, i) => (
            <CounterStat key={stat.label} {...stat} delay={1.2 + i * 0.15} />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-5 h-5 text-hero-muted/50" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient blend into background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}

function CounterStat({ icon, label, value, delay }: { icon: React.ReactNode; label: string; value: number; delay: number }) {
  const { count, ref } = useCounter(value);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex justify-center mb-2 text-primary">{icon}</div>
      <p className="text-3xl md:text-4xl font-serif text-hero-fg">{count}{value === 847 ? "+" : ""}</p>
      <p className="text-xs text-hero-muted mt-1 tracking-wide uppercase">{label}</p>
    </motion.div>
  );
}
