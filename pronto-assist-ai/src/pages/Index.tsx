import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import { PatientIntakeForm } from "@/components/PatientIntakeForm";
import TriageResultCard from "@/components/TriageResultCard";
import PatientQueue from "@/components/PatientQueue";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useState } from "react";

const HospitalScene = lazy(() => import("@/components/HospitalScene"));

export default function Index() {
  const [showResult, setShowResult] = useState(false);

  const handleTriageSubmit = (data: { text: string; image?: string; voice?: string }) => {
    console.log("Triage data:", data);
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <PatientIntakeForm />
      <TriageResultCard visible={showResult} />
      <PatientQueue />
      <Suspense fallback={<div className="h-[500px] flex items-center justify-center text-muted-foreground">Loading 3D view...</div>}>
        <HospitalScene />
      </Suspense>
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
