import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, AlertTriangle, Brain, Eye, Stethoscope } from "lucide-react";

interface TriageResultCardProps {
  visible: boolean;
}

/** Radial progress ring */
function ConfidenceRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="hsl(var(--border))" strokeWidth="6" fill="none" />
        <motion.circle
          cx="50" cy="50" r="45"
          stroke="hsl(var(--primary))"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{score}%</span>
        <span className="text-xs text-muted-foreground">Confidence</span>
      </div>
    </div>
  );
}

export default function TriageResultCard({ visible }: TriageResultCardProps) {
  if (!visible) return null;

  const reasons = [
    { icon: <Brain className="w-4 h-4 text-primary" />, text: "Detected severe chest pain keywords with left arm radiation pattern" },
    { icon: <Stethoscope className="w-4 h-4 text-destructive" />, text: "Elevated heart rate (120 bpm) indicates cardiovascular distress" },
    { icon: <AlertTriangle className="w-4 h-4 text-high" />, text: "Blood pressure 180/110 — hypertensive crisis threshold" },
    { icon: <Eye className="w-4 h-4 text-primary" />, text: "Symptom onset <30 minutes — time-critical intervention window" },
    { icon: <CheckCircle className="w-4 h-4 text-low" />, text: "Patient history of hypertension supports cardiac event hypothesis" },
  ];

  return (
    <section className="py-20 px-4">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Triage <span className="text-primary">Assessment</span>
        </h2>
        <p className="text-muted-foreground text-center mb-10">AI-generated priority analysis</p>

        <div className="glass-card p-6 md:p-8">
          {/* Priority Level */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Triage Level</p>
              <div className="flex items-center gap-3">
                <span className="priority-badge-critical text-base px-4 py-2">⚠ CRITICAL</span>
                <span className="text-sm text-muted-foreground">— Immediate intervention required</span>
              </div>
            </div>
            <ConfidenceRing score={94} />
          </div>

          <div className="w-full h-px bg-border/30 mb-6" />

          {/* AI Reasoning Accordion */}
          <Accordion type="single" collapsible defaultValue="reasoning">
            <AccordionItem value="reasoning" className="border-border/30">
              <AccordionTrigger className="text-foreground hover:text-primary hover:no-underline">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Why this priority?
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {reasons.map((reason, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {reason.icon}
                      <p className="text-sm text-foreground/80">{reason.text}</p>
                    </motion.div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Recommended Actions */}
          <div className="mt-6 p-4 rounded-lg border border-destructive/30 bg-destructive/5">
            <p className="text-sm font-semibold text-destructive mb-2">Recommended Actions:</p>
            <ul className="text-sm text-foreground/70 space-y-1 list-disc list-inside">
              <li>Immediate ECG and cardiac enzyme panel</li>
              <li>Activate cardiac catheterization team</li>
              <li>Administer aspirin 325mg and nitroglycerin</li>
              <li>Continuous vitals monitoring</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
