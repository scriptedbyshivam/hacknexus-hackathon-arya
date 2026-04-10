import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Stethoscope, Zap, Shield, Activity, Heart, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  { icon: Stethoscope, title: "Patient Input", desc: "Text, image, or voice data is captured through our multimodal intake system in real-time." },
  { icon: Brain, title: "AI Analysis", desc: "Our engine processes symptoms, images, and vitals using clinically trained medical models." },
  { icon: Zap, title: "Priority Assignment", desc: "Patients receive a triage level with confidence scores and transparent reasoning." },
  { icon: Shield, title: "Queue Management", desc: "The live dashboard automatically sorts and escalates based on real-time data." },
];

const values = [
  { icon: Heart, title: "Patient-First Design", desc: "Every feature is designed with patient safety and outcomes as the primary objective." },
  { icon: Users, title: "Clinician Collaboration", desc: "Built in partnership with emergency physicians, nurses, and hospital administrators." },
  { icon: Award, title: "Clinical Validation", desc: "Our algorithms are validated against established triage protocols like ESI and MTS." },
  { icon: Shield, title: "Data Privacy", desc: "HIPAA-compliant with end-to-end encryption, ensuring patient data remains secure." },
];

export default function About() {
  const [demoMode, setDemoMode] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar demoMode={demoMode} onToggleDemo={() => setDemoMode(!demoMode)} />

      {/* Hero section */}
      <section className="pt-32 pb-20 px-4 bg-hero-bg text-hero-fg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-serif">TriageAI</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
              Bigger picture,<br /><span className="text-primary italic">better outcomes</span>
            </h1>
            <p className="text-hero-muted max-w-2xl mx-auto text-lg leading-relaxed">
              An AI-powered emergency triage system that uses multimodal intelligence to prioritize patients, reduce wait times, and support medical professionals in life-critical decisions.
            </p>
            <p className="text-xs text-hero-muted/50 mt-6">Version 1.0.0 • Research Preview</p>
          </motion.div>
        </div>
      </section>

      {/* Gradient transition */}
      <div className="h-20 bg-gradient-to-b from-hero-bg to-background" />

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-primary font-semibold tracking-widest uppercase mb-3">Process</p>
            <h2 className="text-3xl md:text-5xl font-serif">How AI Triage Works</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-card-hover h-full text-center numbered-card" data-number={String(i + 1).padStart(2, "0")}>
                  <CardContent className="p-7">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <p className="text-xs text-primary font-semibold tracking-widest uppercase mb-2">Step {i + 1}</p>
                    <h3 className="font-serif text-lg text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-primary font-semibold tracking-widest uppercase mb-3">Our Values</p>
            <h2 className="text-3xl md:text-5xl font-serif">Built on trust &<br /><span className="text-primary italic">clinical excellence</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="glass-card-hover h-full">
                  <CardContent className="p-6 flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                      <v.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-1">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-destructive/20 bg-destructive/3">
              <CardContent className="p-8">
                <h3 className="font-serif text-xl text-destructive mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Important Disclaimer
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  TriageAI is a decision-support tool designed to assist medical professionals. It is <strong className="text-foreground">not a substitute</strong> for professional medical judgment, diagnosis, or treatment. All triage decisions should be reviewed and confirmed by qualified healthcare providers. This system is intended for use in clinical settings under professional supervision only.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
