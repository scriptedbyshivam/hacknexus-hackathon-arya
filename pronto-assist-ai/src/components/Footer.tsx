import { Activity, Mail, MapPin, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "Patient Records", to: "/patients" },
      { label: "Settings", to: "/settings" },
      { label: "About", to: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", to: "/about" },
      { label: "API Reference", to: "/about" },
      { label: "Clinical Studies", to: "/about" },
      { label: "Privacy Policy", to: "/about" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-hero-bg text-hero-fg pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <span className="font-serif text-lg">TriageAI</span>
            </div>
            <p className="text-hero-muted text-sm leading-relaxed max-w-sm mb-6">
              AI-powered emergency triage system using multimodal intelligence to prioritize patients and save critical minutes in emergency departments worldwide.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-hero-muted">
                <Mail className="w-3.5 h-3.5" />
                <span>contact@triageai.health</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-hero-muted">
                <Phone className="w-3.5 h-3.5" />
                <span>+1 (800) TRIAGE-1</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-hero-muted">
                <MapPin className="w-3.5 h-3.5" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold text-hero-fg mb-4 tracking-wide uppercase">{group.title}</p>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <NavLink
                      to={link.to}
                      className="text-sm text-hero-muted hover:text-primary transition-colors"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider & bottom */}
        <div className="border-t border-hero-muted/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-hero-muted/60">
            © {new Date().getFullYear()} AI Triage Systems. All rights reserved.
          </p>
          <p className="text-xs text-hero-muted/40 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive/80 inline-block" />
            Emergency Use Only — Not a substitute for professional medical judgment
          </p>
        </div>
      </div>
    </footer>
  );
}
