import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import CurrentYear from "@/components/current-year";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1 - Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img src="/logo.svg" alt="Logo Caretti F.lli" width={40} height={40} className="h-10 w-10 shrink-0" />
              <h3 className="font-display text-lg font-bold tracking-tight">
                Caretti F.lli Snc
              </h3>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Qualità e professionalità dal 1990. Argenteria, oreficeria, abbigliamento da lavoro, premiazioni sportive e materiale promozionale.
            </p>
          </div>

          {/* Col 2 - Links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-3 opacity-70">
              Navigazione
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/chi-siamo", label: "Chi Siamo" },
                { href: "/servizi", label: "Servizi" },
                { href: "/contatti", label: "Contatti" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Contatti */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-3 opacity-70">
              Contatti
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 opacity-70" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Caretti+F.lli+Via+Orsolani+11+17025+Loano+SV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Via Orsolani, 11 – 17025 Loano (SV)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 opacity-70" />
                <span suppressHydrationWarning className="opacity-80">+39 019 673085</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 opacity-70" />
                <span suppressHydrationWarning className="opacity-80">info@carettifratelli.it</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center text-xs opacity-60">
          © <CurrentYear /> Caretti F.lli Snc – Tutti i diritti riservati
        </div>
      </div>
    </footer>
  );
}
