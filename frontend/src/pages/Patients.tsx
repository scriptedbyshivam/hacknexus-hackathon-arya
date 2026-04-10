import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, ChevronUp, User, Activity, MapPin, AlertCircle, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPatients } from "@/services/api";

interface PatientFromAPI {
  id: number;
  name: string;
  age: number;
  phone: string | null;
  email: string | null;
  gender: string | null;
  address: string | null;
  medical_history: string | null;
  priority_level: number | null;
  priority_label: string | null;
  triage_score: number | null;
  status: string | null;
  injury: string | null;
  timestamp: string | null;
}

type PriorityFilter = "all" | "1" | "2" | "3" | "4" | "5";

const priorityLabels: Record<number, string> = {
  1: "🔴 CRITICAL",
  2: "🟠 HIGH",
  3: "🟡 MEDIUM",
  4: "🟢 LOW",
  5: "🔵 MINIMAL",
};

const priorityColors: Record<number, string> = {
  1: "bg-red-100 text-red-800",
  2: "bg-orange-100 text-orange-800",
  3: "bg-yellow-100 text-yellow-800",
  4: "bg-green-100 text-green-800",
  5: "bg-blue-100 text-blue-800",
};

export default function Patients() {
  const [allPatients, setAllPatients] = useState<PatientFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Fetch patients from API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await getAllPatients();
        setAllPatients(response.patients || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to load patients. Please try again.");
        setAllPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filter and sort patients
  const filtered = allPatients
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email?.toLowerCase().includes(search.toLowerCase()) ||
        p.phone?.includes(search) ||
        p.id.toString().includes(search);
      const matchesPriority =
        priorityFilter === "all" || (p.priority_level && p.priority_level.toString() === priorityFilter);
      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      // Sort by priority level (1 = highest), then by most recent
      if (a.priority_level && b.priority_level) {
        return a.priority_level - b.priority_level;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm text-primary font-semibold tracking-widest uppercase mb-2">Records</p>
            <h1 className="text-3xl md:text-5xl font-serif mb-2">Patient Records</h1>
            <p className="text-muted-foreground mb-10">Search and manage patient data with real-time priority triage</p>
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by name, ID, email, or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-xl" />
            </div>
            <Select value={priorityFilter} onValueChange={(val) => setPriorityFilter(val as PriorityFilter)}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="1">🔴 CRITICAL</SelectItem>
                <SelectItem value="2">🟠 HIGH</SelectItem>
                <SelectItem value="3">🟡 MEDIUM</SelectItem>
                <SelectItem value="4">🟢 LOW</SelectItem>
                <SelectItem value="5">🔵 MINIMAL</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="mb-4 cursor-default">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader className="w-8 h-8 animate-spin text-primary" />
              <p className="ml-3 text-muted-foreground">Loading patients...</p>
            </div>
          )}

          {/* Patient List */}
          {!loading && (
            <>
              <p className="text-sm text-muted-foreground mb-4">{filtered.length} patient{filtered.length !== 1 ? "s" : ""} found</p>

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
                      <Card className="glass-card-hover cursor-pointer" onClick={() => setExpandedId(expandedId === patient.id ? null : patient.id)}>
                        <CardContent className="p-5">
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-semibold text-foreground">{patient.name}</span>
                                <span className="text-xs text-muted-foreground font-mono">ID: {patient.id}</span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">
                                {patient.priority_label ? `Priority: ${patient.priority_label}` : "Not triaged yet"} • Status: {patient.status || "Pending"}
                              </p>
                            </div>
                            {patient.priority_level && (
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[patient.priority_level] || "bg-gray-100"}`}>
                                Level {patient.priority_level}
                              </span>
                            )}
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
                                <div className="mt-5 pt-5 border-t border-border/40 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <p className="text-muted-foreground text-xs mb-1">Age</p>
                                    <p className="font-medium">{patient.age} years</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1">
                                      <MapPin className="w-3 h-3" /> Location
                                    </p>
                                    <p className="font-medium">{patient.address || "N/A"}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1">
                                      <Activity className="w-3 h-3" /> Status
                                    </p>
                                    <p className="font-medium">{patient.status || "Pending"}</p>
                                  </div>
                                  <div className="md:col-span-3">
                                    <p className="text-muted-foreground text-xs mb-1">Contact</p>
                                    <p className="font-mono text-xs">Email: {patient.email || "N/A"} | Phone: {patient.phone || "N/A"}</p>
                                  </div>
                                  {patient.triage_score && (
                                    <div className="md:col-span-2">
                                      <p className="text-muted-foreground text-xs mb-1">Triage Score</p>
                                      <p className="font-bold text-lg">{patient.triage_score.toFixed(2)}/10</p>
                                    </div>
                                  )}
                                  {patient.injury && (
                                    <div>
                                      <p className="text-muted-foreground text-xs mb-1">Injury</p>
                                      <p className="font-medium">{patient.injury}</p>
                                    </div>
                                  )}
                                  {patient.medical_history && (
                                    <div className="md:col-span-3">
                                      <p className="text-muted-foreground text-xs mb-1">Medical History</p>
                                      <p className="font-medium text-xs">{patient.medical_history}</p>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {!loading && filtered.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No patients found</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
