import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus, AlertOctagon, Eye } from "lucide-react";

type Priority = "critical" | "high" | "medium" | "low";

interface Patient {
  id: string;
  name: string;
  complaint: string;
  priority: Priority;
  time: string;
}

const initialPatients: Patient[] = [
  { id: "P-001", name: "John D.", complaint: "Severe chest pain, shortness of breath", priority: "critical", time: "2 min ago" },
  { id: "P-002", name: "Sarah M.", complaint: "Deep laceration on forearm, heavy bleeding", priority: "critical", time: "5 min ago" },
  { id: "P-003", name: "Mike R.", complaint: "Suspected fracture, left ankle swelling", priority: "high", time: "8 min ago" },
  { id: "P-004", name: "Emily T.", complaint: "High fever 104°F, confusion, neck stiffness", priority: "critical", time: "10 min ago" },
  { id: "P-005", name: "David K.", complaint: "Allergic reaction, facial swelling", priority: "high", time: "12 min ago" },
  { id: "P-006", name: "Lisa W.", complaint: "Migraine with visual aura", priority: "medium", time: "15 min ago" },
  { id: "P-007", name: "Tom B.", complaint: "Minor burn on hand from cooking", priority: "low", time: "18 min ago" },
];

const randomComplaints: { complaint: string; priority: Priority }[] = [
  { complaint: "Cardiac arrest — CPR in progress", priority: "critical" },
  { complaint: "Severe abdominal pain, vomiting blood", priority: "critical" },
  { complaint: "Motor vehicle accident, conscious but disoriented", priority: "high" },
  { complaint: "Difficulty breathing, asthma exacerbation", priority: "high" },
  { complaint: "Sprained wrist from fall", priority: "medium" },
  { complaint: "Persistent cough for 3 days", priority: "low" },
];

const names = ["Alex J.", "Nina P.", "Carlos R.", "Priya S.", "James L.", "Fatima A.", "Yuki T.", "Omar H."];

const priorityOrder: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 };

const badgeClass: Record<Priority, string> = {
  critical: "priority-badge-critical",
  high: "priority-badge-high",
  medium: "priority-badge-medium",
  low: "priority-badge-low",
};

export default function PatientQueue() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [codeBlue, setCodeBlue] = useState(false);

  const addRandomPatient = () => {
    const random = randomComplaints[Math.floor(Math.random() * randomComplaints.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const newPatient: Patient = {
      id: `P-${String(patients.length + 1).padStart(3, "0")}`,
      name,
      complaint: random.complaint,
      priority: random.priority,
      time: "Just now",
    };
    const updated = [...patients, newPatient].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    setPatients(updated);
  };

  const toggleCodeBlue = () => {
    setCodeBlue(!codeBlue);
    if (!codeBlue) {
      document.body.classList.add("code-blue-shake");
      setTimeout(() => document.body.classList.remove("code-blue-shake"), 300);
    }
  };

  return (
    <section className={`py-20 px-4 transition-colors duration-500 ${codeBlue ? "bg-destructive/5" : ""}`}>
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Live Emergency <span className="text-primary">Queue</span>
        </h2>
        <p className="text-muted-foreground text-center mb-6">Real-time patient prioritization dashboard</p>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={addRandomPatient} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <UserPlus className="w-4 h-4" /> Simulate New Patient
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={toggleCodeBlue}
              variant={codeBlue ? "destructive" : "outline"}
              className={`gap-2 ${!codeBlue ? "border-destructive/50 text-destructive hover:bg-destructive/10" : ""}`}
            >
              <AlertOctagon className="w-4 h-4" /> {codeBlue ? "Cancel Code Blue" : "Code Blue"}
            </Button>
          </motion.div>
        </div>

        {/* Queue */}
        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/30 bg-secondary/20">
            <div className="col-span-1">ID</div>
            <div className="col-span-2">Patient</div>
            <div className="col-span-5">Chief Complaint</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-1">Time</div>
            <div className="col-span-1"></div>
          </div>

          <LayoutGroup>
            <AnimatePresence>
              {patients.map((patient) => (
                <motion.div
                  key={patient.id}
                  layout
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3 }}
                  className={`grid grid-cols-12 gap-4 p-4 items-center border-b border-border/10 hover:bg-secondary/20 transition-colors ${
                    codeBlue && patient.priority === "critical" ? "bg-destructive/10" : ""
                  }`}
                >
                  <div className="col-span-1 font-mono text-xs text-muted-foreground">{patient.id}</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-foreground">
                      {patient.name.charAt(0)}
                    </div>
                    <span className="text-sm text-foreground">{patient.name}</span>
                  </div>
                  <div className="col-span-5 text-sm text-foreground/70 truncate">{patient.complaint}</div>
                  <div className="col-span-2">
                    <span className={badgeClass[patient.priority]}>{patient.priority}</span>
                  </div>
                  <div className="col-span-1 text-xs text-muted-foreground">{patient.time}</div>
                  <div className="col-span-1">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10 p-1">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </motion.div>
    </section>
  );
}
