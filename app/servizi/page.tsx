import type { Metadata } from "next";
import { Container } from "@/components/layouts/container";
import { Section } from "@/components/layouts/section";
import ServiziAnimations from "@/components/servizi-animations";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Servizi",
  description:
    "Scopri tutti i servizi offerti da Caretti F.lli Snc: premiazioni sportive, argenteria, abbigliamento da lavoro, personalizzazione, stampa e molto altro.",
};

export default function ServiziPage() {
  const { servizi: servizidata } = getContent();

  return (
    <>
      {/* Header */}
      <section className="bg-primary text-primary-foreground">
        <Container size="lg">
          <div className="py-20 sm:py-28 text-center max-w-3xl mx-auto">
            <p className="text-sm font-medium uppercase tracking-widest text-amber-400 mb-4">
              {servizidata.header.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              {servizidata.header.title}
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
              {servizidata.header.description}
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container size="lg">
          <ServiziAnimations servizi={servizidata.items} />
        </Container>
      </Section>
    </>
  );
}
