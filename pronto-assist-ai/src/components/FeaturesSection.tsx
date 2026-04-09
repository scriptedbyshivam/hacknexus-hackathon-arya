import { motion } from "framer-motion";
import { MessageSquare, Image, Mic, Brain, Zap, Shield, BarChart3, Clock } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Natural Language Input",
    desc: "Describe symptoms in plain language — our NLP engine extracts structured medical data and identifies key risk indicators automatically.",
  },
  {
    icon: Image,
    title: "Visual Analysis",
    desc: "Upload injury photos for instant AI-powered severity assessment. Our model detects wound types, burn degrees, and visible trauma indicators.",
  },
  {
    icon: Mic,
    title: "Voice Transcription",
    desc: "Speak symptoms hands-free using our real-time speech recognition, designed for high-noise emergency environments with medical terminology support.",
  },
  {
    icon: Brain,
    title: "Explainable AI",
    desc: "Every triage decision comes with transparent reasoning — not a black box. Clinicians can review each factor that influenced the priority score.",
  },
  {
    icon: Zap,
    title: "Real-Time Prioritization",
    desc: "Dynamic queue that auto-sorts and re-prioritizes as new patients arrive, vitals change, or clinical escalation patterns are detected.",
  },
  {
    icon: Shield,
    title: "Clinical Safety Net",
    desc: "Built-in safeguards prevent under-triage. If symptoms match critical patterns, the system escalates automatically with alerts to the care team.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Track department performance, wait time trends, triage accuracy metrics, and resource utilization — all updated in real-time.",
  },
  {
    icon: Clock,
    title: "Time-Critical Protocols",
    desc: "Automatic detection of stroke, STEMI, sepsis, and trauma windows. Countdown timers for golden-hour interventions with protocol checklists.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-primary font-semibold tracking-widest uppercase mb-3">Capabilities</p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
            Multimodal intelligence for<br /><span className="text-primary italic">every scenario</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From text and images to voice — our AI processes multiple input types simultaneously to deliver the most accurate triage assessment possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="numbered-card group p-6 bg-card border border-border/40 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              data-number={String(i + 1).padStart(2, "0")}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-sans font-semibold text-foreground text-sm mb-2">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
