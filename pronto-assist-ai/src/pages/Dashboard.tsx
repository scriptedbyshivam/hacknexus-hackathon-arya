import { motion } from "framer-motion";
import { Activity, Users, AlertTriangle, BedDouble, Clock, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const stats = [
  { label: "Total Patients", value: "47", icon: Users, color: "text-primary", trend: "+12%", up: true },
  { label: "Critical Cases", value: "5", icon: AlertTriangle, color: "text-destructive", trend: "-8%", up: false },
  { label: "Avg Wait Time", value: "6 min", icon: Clock, color: "text-primary", trend: "-22%", up: false },
  { label: "Beds Available", value: "23", icon: BedDouble, color: "text-low", trend: "+3", up: true },
];

const triageDist = [
  { name: "Critical", value: 5, color: "hsl(0, 78%, 60%)" },
  { name: "High", value: 12, color: "hsl(40, 90%, 55%)" },
  { name: "Medium", value: 18, color: "hsl(195, 60%, 45%)" },
  { name: "Low", value: 12, color: "hsl(155, 70%, 42%)" },
];

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

const recentActivity = [
  { time: "2 min ago", text: "Patient P-048 triaged as Critical — cardiac arrest", type: "critical" as const },
  { time: "5 min ago", text: "Patient P-047 discharged from General Ward", type: "low" as const },
  { time: "8 min ago", text: "ICU bed #4 freed up", type: "medium" as const },
  { time: "12 min ago", text: "Patient P-046 upgraded to High priority", type: "high" as const },
  { time: "15 min ago", text: "New shift started — 3 nurses checked in", type: "low" as const },
  { time: "18 min ago", text: "Code Blue resolved — Patient P-044 stabilized", type: "critical" as const },
];

const activityColor: Record<string, string> = {
  critical: "bg-destructive",
  high: "bg-high",
  medium: "bg-primary",
  low: "bg-low",
};

export default function Dashboard() {
  const [demoMode, setDemoMode] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar demoMode={demoMode} onToggleDemo={() => setDemoMode(!demoMode)} />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm text-primary font-semibold tracking-widest uppercase mb-2">Overview</p>
            <h1 className="text-3xl md:text-5xl font-serif mb-2">Dashboard</h1>
            <p className="text-muted-foreground mb-10">Real-time emergency department analytics</p>
          </motion.div>

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
                <CardHeader><CardTitle className="text-lg font-serif">Triage Distribution</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={triageDist} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={4} strokeWidth={0}>
                          {triageDist.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(220 15% 88%)", borderRadius: "12px", fontSize: "12px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mt-2">
                    {triageDist.map((d) => (
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
                  {recentActivity.map((a, i) => (
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
