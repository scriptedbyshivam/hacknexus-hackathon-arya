import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, ChevronUp, User, Activity, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Priority = "critical" | "high" | "medium" | "low";

interface Patient {
  id: string;
  name: string;
  age: number;
  complaint: string;
  priority: Priority;
  time: string;
  department: string;
  vitals: string;
  status: string;
}

const allPatients: Patient[] = [
  { id: "P-001", name: "John Davidson", age: 58, complaint: "Severe chest pain, shortness of breath", priority: "critical", time: "2 min ago", department: "ER", vitals: "BP 180/110, HR 120, SpO2 92%", status: "In Treatment" },
  { id: "P-002", name: "Sarah Mitchell", age: 34, complaint: "Deep laceration on forearm, heavy bleeding", priority: "critical", time: "5 min ago", department: "ER", vitals: "BP 100/60, HR 105, SpO2 97%", status: "Awaiting Surgery" },
  { id: "P-003", name: "Mike Rodriguez", age: 42, complaint: "Suspected fracture, left ankle swelling", priority: "high", time: "8 min ago", department: "General", vitals: "BP 130/85, HR 88, SpO2 98%", status: "Imaging" },
  { id: "P-004", name: "Emily Thompson", age: 67, complaint: "High fever 104°F, confusion, neck stiffness", priority: "critical", time: "10 min ago", department: "ICU", vitals: "BP 90/55, HR 115, SpO2 94%", status: "Monitoring" },
  { id: "P-005", name: "David Kim", age: 29, complaint: "Allergic reaction, facial swelling", priority: "high", time: "12 min ago", department: "ER", vitals: "BP 120/80, HR 100, SpO2 96%", status: "Medication" },
  { id: "P-006", name: "Lisa Wang", age: 45, complaint: "Migraine with visual aura", priority: "medium", time: "15 min ago", department: "General", vitals: "BP 125/82, HR 72, SpO2 99%", status: "Observation" },
  { id: "P-007", name: "Tom Baker", age: 23, complaint: "Minor burn on hand from cooking", priority: "low", time: "18 min ago", department: "General", vitals: "BP 118/76, HR 68, SpO2 99%", status: "Treated" },
  { id: "P-008", name: "Priya Sharma", age: 51, complaint: "Persistent abdominal pain, nausea", priority: "medium", time: "22 min ago", department: "ER", vitals: "BP 135/88, HR 82, SpO2 98%", status: "Lab Work" },
  { id: "P-009", name: "James Lee", age: 38, complaint: "Sprained wrist from fall", priority: "low", time: "30 min ago", department: "General", vitals: "BP 122/78, HR 70, SpO2 99%", status: "Discharged" },
];

const priorityOrder: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 };

const badgeClass: Record<Priority, string> = {
  critical: "priority-badge-critical",
  high: "priority-badge-high",
  medium: "priority-badge-medium",
  low: "priority-badge-low",
};

export default function Patients() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const filtered = allPatients
    .filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.complaint.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
      const matchesPriority = priorityFilter === "all" || p.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar demoMode={demoMode} onToggleDemo={() => setDemoMode(!demoMode)} />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm text-primary font-semibold tracking-widest uppercase mb-2">Records</p>
            <h1 className="text-3xl md:text-5xl font-serif mb-2">Patient Records</h1>
            <p className="text-muted-foreground mb-10">Search and manage patient data</p>
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by name, ID, or complaint..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-xl" />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <p className="text-sm text-muted-foreground mb-4">{filtered.length} patient{filtered.length !== 1 ? "s" : ""} found</p>

          {/* Patient list */}
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((patient, i) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card
                    className="glass-card-hover cursor-pointer"
                    onClick={() => setExpandedId(expandedId === patient.id ? null : patient.id)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-foreground">{patient.name}</span>
                            <span className="text-xs text-muted-foreground font-mono">{patient.id}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{patient.complaint}</p>
                        </div>
                        <span className={badgeClass[patient.priority]}>{patient.priority}</span>
                        <span className="text-xs text-muted-foreground hidden sm:block">{patient.time}</span>
                        {expandedId === patient.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </div>

                      <AnimatePresence>
                        {expandedId === patient.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 pt-5 border-t border-border/40 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground text-xs mb-1">Age</p>
                                <p className="font-medium">{patient.age}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Department</p>
                                <p className="font-medium">{patient.department}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1"><Activity className="w-3 h-3" /> Status</p>
                                <p className="font-medium">{patient.status}</p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-muted-foreground text-xs mb-1">Vitals</p>
                                <p className="font-medium font-mono text-xs">{patient.vitals}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
