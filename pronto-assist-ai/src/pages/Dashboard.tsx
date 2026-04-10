import { motion } from "framer-motion";
import { Activity, Users, AlertTriangle, BedDouble, Clock, TrendingUp, ArrowUpRight, ArrowDownRight, Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { getAllPatients, getPriorityQueue } from "@/services/api";

interface PatientData {
  id: number;
  name: string;
  priority_level: number | null;
  triage_score: number | null;
  status: string | null;
  timestamp: string | null;
}

interface PriorityData {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

const activityColor: Record<number, string> = {
  1: "bg-destructive",
  2: "bg-orange-500",
  3: "bg-yellow-500",
  4: "bg-green-500",
  5: "bg-blue-500",
};

const priorityLabels: Record<number, string> = {
  1: "🔴 CRITICAL",
  2: "🟠 HIGH",
  3: "🟡 MEDIUM",
  4: "🟢 LOW",
  5: "🔵 MINIMAL",
};

export default function Dashboard() {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [priorityData, setPriorityData] = useState<PriorityData>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const patientResponse = await getAllPatients();
        const priorityResponse = await getPriorityQueue();

        if (patientResponse.patients) {
          setPatients(patientResponse.patients);
        }

        if (priorityResponse.priority_breakdown) {
          setPriorityData(priorityResponse.priority_breakdown);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calculate statistics
  const totalPatients = patients.length;
  const criticalCases = priorityData[1] || 0;
  const triageDistribution = [
    { name: "1: CRITICAL", value: priorityData[1] || 0, color: "hsl(0, 78%, 60%)" },
    { name: "2: HIGH", value: priorityData[2] || 0, color: "hsl(40, 90%, 55%)" },
    { name: "3: MEDIUM", value: priorityData[3] || 0, color: "hsl(40, 90%, 55%)" },
    { name: "4: LOW", value: priorityData[4] || 0, color: "hsl(155, 70%, 42%)" },
    { name: "5: MINIMAL", value: priorityData[5] || 0, color: "hsl(195, 60%, 45%)" },
  ].filter(d => d.value > 0);

  const stats = [
    { label: "Total Patients", value: totalPatients.toString(), icon: Users, color: "text-primary", trend: "+0%", up: true },
    { label: "Critical Cases", value: criticalCases.toString(), icon: AlertTriangle, color: "text-destructive", trend: `${criticalCases > 0 ? "🔴" : "✅"}`, up: criticalCases > 0 },
    { label: "High Priority", value: (priorityData[2] || 0).toString(), icon: TrendingUp, color: "text-orange-500", trend: "+0%", up: true },
    { label: "Avg Score", value: (patients.reduce((acc, p) => acc + (p.triage_score || 0), 0) / (totalPatients || 1)).toFixed(1), icon: Activity, color: "text-primary", trend: "avg", up: true },
  ];

  // Recent activity from last few triaged patients
  const recentActivity = patients
    .filter(p => p.priority_level && p.status)
    .sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime())
    .slice(0, 6)
    .map(p => ({
      time: p.timestamp ? `${Math.floor((Date.now() - new Date(p.timestamp).getTime()) / 60000)} min ago` : "just now",
      text: `Patient ${p.name} - Priority ${priorityLabels[p.priority_level || 5]}`,
      type: p.priority_level || 5,
    }));

  // Hourly data (mock for now)
  const hourlyData = [
    { hour: "6am", patients: 3 },
    { hour: "8am", patients: 8 },
    { hour: "10am", patients: 12 },
    { hour: "12pm", patients: 15 },
    { hour: "2pm", patients: 10 },
    { hour: "4pm", patients: 14 },
    { hour: "6pm", patients: 18 },
    { hour: "8pm", patients: 9 },
  ];

  const weeklyTrend = [
    { day: "Mon", patients: 32 },
    { day: "Tue", patients: 38 },
    { day: "Wed", patients: 45 },
    { day: "Thu", patients: 42 },
    { day: "Fri", patients: 50 },
    { day: "Sat", patients: 28 },
    { day: "Sun", patients: 22 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm text-primary font-semibold tracking-widest uppercase mb-2">Overview</p>
            <h1 className="text-3xl md:text-5xl font-serif mb-2">Dashboard</h1>
            <p className="text-muted-foreground mb-10">Real-time emergency department analytics with AI-powered triage</p>
          </motion.div>

          {/* Error state */}
          {error && (
            <Alert variant="destructive" className="mb-6 cursor-default">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Loading state */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader className="w-8 h-8 animate-spin text-primary" />
              <p className="ml-3 text-muted-foreground">Loading dashboard data...</p>
            </div>
          ) : (
            <>
              {/* Stat cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <Card className="glass-card-hover border-border/30">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                            <s.icon className={`w-5 h-5 ${s.color}`} />
                          </div>
                          <span className={`text-xs font-medium flex items-center gap-0.5 ${s.up ? "text-low" : "text-destructive"}`}>
                            {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {s.trend}
                          </span>
                        </div>
                        <p className="text-3xl font-serif text-foreground">{s.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Triage distribution */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Card className="glass-card">
                    <CardHeader><CardTitle className="text-lg font-serif">Priority Distribution</CardTitle></CardHeader>
                    <CardContent>
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={triageDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={4} strokeWidth={0}>
                              {triageDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(220 15% 88%)", borderRadius: "12px", fontSize: "12px" }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-wrap justify-center gap-4 mt-2">
                        {triageDistribution.map((d) => (
                          <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                            {d.name}: {d.value}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Hourly intake */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <Card className="glass-card">
                    <CardHeader><CardTitle className="text-lg font-serif">Hourly Patient Intake</CardTitle></CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={hourlyData}>
                            <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(220 15% 88%)", borderRadius: "12px", fontSize: "12px" }} />
                            <Bar dataKey="patients" fill="hsl(195, 60%, 45%)" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Weekly trend */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mb-8">
                <Card className="glass-card">
                  <CardHeader><CardTitle className="text-lg font-serif">Weekly Trend</CardTitle></CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weeklyTrend}>
                          <defs>
                            <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(195, 60%, 45%)" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="hsl(195, 60%, 45%)" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(220 15% 88%)", borderRadius: "12px", fontSize: "12px" }} />
                          <Area type="monotone" dataKey="patients" stroke="hsl(195, 60%, 45%)" fill="url(#colorPatients)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent activity */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-serif flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {recentActivity.length > 0 ? (
                        recentActivity.map((a, i) => (
                          <motion.div
                            key={i}
                            className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.05 }}
                          >
                            <div className={`w-2 h-2 rounded-full mt-1.5 ${activityColor[a.type]}`} />
                            <div className="flex-1">
                              <p className="text-sm text-foreground">{a.text}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
