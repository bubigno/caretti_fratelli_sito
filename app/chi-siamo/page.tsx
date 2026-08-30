import type { Metadata } from "next";
import { Container } from "@/components/layouts/container";
import { Section } from "@/components/layouts/section";
import { Award, Heart, Handshake, Target } from "lucide-react";
import ChiSiamoAnimations from "@/components/chi-siamo-animations";

export const metadata: Metadata = {
  title: "Chi Siamo",
  description: "Scopri la storia di Caretti F.lli Snc, azienda con oltre 30 anni di esperienza nel settore argenteria, oreficeria e abbigliamento da lavoro a Loano.",
};

const values = [
  {
    iconName: "Award",
    title: "Eccellenza",
    desc: "Selezioniamo solo i migliori materiali e le migliori tecniche per garantire risultati di altissima qualità.",
  },
  {
    iconName: "Heart",
    title: "Passione",
    desc: "Ogni progetto viene seguito con dedizione e cura artigianale, come se fosse unico.",
  },
  {
    iconName: "Handshake",
    title: "Affidabilità",
    desc: "Rapporti duraturi costruiti sulla fiducia, la trasparenza e il rispetto dei tempi di consegna.",
  },
  {
    iconName: "Target",
    title: "Personalizzazione",
    desc: "Soluzioni su misura per ogni cliente, dall'idea alla realizzazione del prodotto finale.",
  },
];

export default function ChiSiamoPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-primary text-primary-foreground">
        <Container size="lg">
          <div className="py-20 sm:py-28 text-center max-w-3xl mx-auto">
            <p className="text-sm font-medium uppercase tracking-widest text-amber-400 mb-4">
              La Nostra Storia
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Chi Siamo
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
              Da oltre 30 anni, Caretti F.lli Snc è sinonimo di qualità e professionalità nel cuore della Liguria.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container size="lg">
          <ChiSiamoAnimations values={values} />
        </Container>
      </Section>
    </>
  );
}
