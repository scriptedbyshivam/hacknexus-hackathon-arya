import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Monitor, Save, Palette, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Settings() {
  const [name, setName] = useState("Dr. Sarah Chen");
  const [role, setRole] = useState("attending");
  const [hospital, setHospital] = useState("Metro General Hospital");
  const [emailNotif, setEmailNotif] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  const handleSave = () => toast.success("Settings saved successfully");

  const sections = [
    {
      icon: User,
      title: "Profile",
      description: "Your personal and professional details",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-xs text-muted-foreground uppercase tracking-wider">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 rounded-xl" />
          </div>
          <div>
            <Label htmlFor="role" className="text-xs text-muted-foreground uppercase tracking-wider">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="attending">Attending Physician</SelectItem>
                <SelectItem value="resident">Resident</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
                <SelectItem value="triage">Triage Officer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="hospital" className="text-xs text-muted-foreground uppercase tracking-wider">Hospital</Label>
            <Input id="hospital" value={hospital} onChange={(e) => setHospital(e.target.value)} className="mt-1.5 rounded-xl" />
          </div>
        </div>
      ),
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Control when and how you receive alerts",
      content: (
        <div className="space-y-3">
          {[
            { label: "Email Notifications", desc: "Receive shift summaries via email", checked: emailNotif, onChange: setEmailNotif },
            { label: "Critical Alerts", desc: "Immediate alerts for critical patients", checked: criticalAlerts, onChange: setCriticalAlerts },
            { label: "Sound Alerts", desc: "Play sound for Code Blue and critical arrivals", checked: soundAlerts, onChange: setSoundAlerts },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch checked={item.checked} onCheckedChange={item.onChange} />
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: Monitor,
      title: "Display",
      description: "Customize the interface appearance",
      content: (
        <div className="space-y-3">
          {[
            { label: "Compact View", desc: "Show more patients per page", checked: compactView, onChange: setCompactView },
            { label: "Auto-Refresh Dashboard", desc: "Update stats every 30 seconds", checked: autoRefresh, onChange: setAutoRefresh },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch checked={item.checked} onCheckedChange={item.onChange} />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar demoMode={demoMode} onToggleDemo={() => setDemoMode(!demoMode)} />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm text-primary font-semibold tracking-widest uppercase mb-2">Preferences</p>
            <h1 className="text-3xl md:text-5xl font-serif mb-2">Settings</h1>
            <p className="text-muted-foreground mb-10">Manage your account and preferences</p>
          </motion.div>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * (i + 1) }}>
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-serif">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>{section.content}</CardContent>
                </Card>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Button onClick={handleSave} className="w-full gap-2 h-12 rounded-xl text-base">
                <Save className="w-4 h-4" /> Save Settings
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
