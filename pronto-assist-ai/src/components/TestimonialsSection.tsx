import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Amara Okafor",
    role: "Chief of Emergency Medicine",
    hospital: "Metro General Hospital",
    text: "TriageAI reduced our critical patient wait times by 40%. The multimodal analysis catches patterns that even experienced physicians might miss during peak hours.",
    rating: 5,
  },
  {
    name: "Nurse Rachel Torres",
    role: "Lead Triage Nurse",
    hospital: "St. Mary's Medical Center",
    text: "The voice input feature is a game-changer. I can describe symptoms while attending to the patient — no need to stop and type. It understands medical terminology perfectly.",
    rating: 5,
  },
  {
    name: "Dr. James Whitfield",
    role: "Emergency Physician",
    hospital: "University Hospital",
    text: "What impressed me most is the AI's reasoning transparency. It doesn't just assign a priority — it shows exactly why, building trust with the entire clinical team.",
    rating: 5,
  },
  {
    name: "Dr. Lin Chen",
    role: "Medical Director",
    hospital: "Pacific Coast Medical",
    text: "We integrated TriageAI across three departments. The consistency in triage scoring has dramatically improved our inter-department handoffs and patient outcomes.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell, RN",
    role: "ER Department Head",
    hospital: "Bayview Hospital",
    text: "During mass casualty events, TriageAI becomes indispensable. It processes patients 3x faster than manual triage while maintaining clinical accuracy above 95%.",
    rating: 5,
  },
  {
    name: "Dr. Raj Patel",
    role: "Trauma Surgeon",
    hospital: "Central Trauma Center",
    text: "The image analysis capability is remarkable. Upload a wound photo and it identifies severity, potential complications, and suggests interventions within seconds.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  // Duplicate for seamless loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-24 overflow-hidden">
      <motion.div
        className="text-center mb-12 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-primary font-semibold tracking-widest uppercase mb-3">Testimonials</p>
        <h2 className="text-3xl md:text-5xl font-serif text-foreground">
          Trusted by healthcare<br />professionals <span className="text-primary italic">worldwide</span>
        </h2>
      </motion.div>

      {/* Marquee track */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="marquee-track">
          {doubled.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[380px] mx-3 p-6 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-sm text-foreground/80 leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-semibold text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
              <p className="text-xs text-muted-foreground/70">{t.hospital}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
