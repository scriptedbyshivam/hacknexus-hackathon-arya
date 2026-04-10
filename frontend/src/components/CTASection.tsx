import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 dark:bg-slate-900">
      <motion.div
        className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-hero-bg p-12 md:p-20 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Activity className="w-7 h-7 text-primary" />
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif text-hero-fg mb-4 leading-tight">
            Ready to transform your<br />emergency department?
          </h2>
          <p className="text-hero-muted max-w-lg mx-auto mb-10">
            Experience how AI-powered triage can reduce wait times, improve patient outcomes, and support your clinical team.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                className="h-13 px-8 text-base gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                onClick={() => navigate("/dashboard")}
              >
                Explore Dashboard <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                variant="outline"
                className="h-13 px-8 text-base border-hero-muted/30 text-hero-fg hover:bg-hero-muted/10 rounded-xl"
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
