import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layouts/container";
import { Section } from "@/components/layouts/section";
import { Button } from "@/components/ui/button";
import HomeAnimations from "@/components/home-animations";

const services = [
  { iconName: "Trophy", title: "Premiazioni Sportive", desc: "Coppe, trofei, medaglie e targhe per ogni competizione.", href: "/servizi?servizio=premiazioni-sportive" },
  { iconName: "Gem", title: "Argenteria & Oreficeria", desc: "Prodotti di argenteria e oreficeria di alta qualità.", href: "/servizi?servizio=argenteria-oreficeria" },
  { iconName: "HardHat", title: "Abbigliamento da Lavoro", desc: "Abiti da lavoro, DPI e antinfortunistica professionale.", href: "/servizi?servizio=abbigliamento-lavoro-antinfortunistica" },
  { iconName: "Shirt", title: "Personalizzazione", desc: "Serigrafia, ricami e transfer per ogni esigenza.", href: "/servizi?servizio=personalizzazione-abbigliamento" },
  { iconName: "Gift", title: "Oggettistica Pubblicitaria", desc: "Gadget e materiale promozionale personalizzato.", href: "/servizi?servizio=oggettistica-pubblicitaria" },
  { iconName: "Printer", title: "Stampa & Cartellonistica", desc: "Stampa digitale su grandi e piccoli formati.", href: "/servizi?servizio=stampa-grandi-piccoli-formati" },
];

const reasons = [
  { iconName: "Clock", title: "30+ Anni di Esperienza", desc: "Dal 1990 al servizio di aziende, enti e privati con professionalità." },
  { iconName: "Star", title: "Qualità Garantita", desc: "Materiali selezionati e lavorazioni accurate per risultati eccellenti." },
  { iconName: "Users", title: "Servizio Personalizzato", desc: "Consulenza dedicata per trovare la soluzione ideale per ogni esigenza." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/30689698/pexels-photo-30689698/free-photo-of-elegant-trophy-display-in-a-glass-case.jpeg"
            alt="Elegante esposizione di trofei e coppe dorate"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,45%,12%)/0.92] via-[hsl(220,45%,12%)/0.75] to-[hsl(220,45%,12%)/0.5]" />
        </div>
        <Container size="lg">
          <div className="relative py-28 sm:py-36 lg:py-44 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.svg"
                alt="Logo Caretti F.lli"
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 drop-shadow-lg"
              />
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                Caretti F.lli
              </span>
            </div>
            <p className="text-sm font-medium uppercase tracking-widest text-amber-400 mb-4">
              Dal 1990 a Loano (SV)
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              Qualità e{" "}
              <span className="text-amber-400">Professionalità</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
              Argenteria, oreficeria, abbigliamento da lavoro, premiazioni sportive e materiale promozionale per aziende, enti e privati.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold">
                <Link href="/servizi">Scopri i Servizi</Link>
              </Button>
              <Button asChild size="lg" className="bg-white/15 hover:bg-white/25 text-white border border-white/30 font-semibold">
                <Link href="/contatti">Contattaci</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Servizi */}
      <Section>
        <Container size="lg">
          <HomeAnimations services={services} reasons={reasons} />
        </Container>
      </Section>
    </>
  );
}
