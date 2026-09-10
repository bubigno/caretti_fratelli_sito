import type { Metadata } from "next";
import { Container } from "@/components/layouts/container";
import { Section } from "@/components/layouts/section";
import ChiSiamoAnimations from "@/components/chi-siamo-animations";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Chi Siamo",
  description: "Scopri la storia di Caretti F.lli Snc, azienda con oltre 30 anni di esperienza nel settore argenteria, oreficeria e abbigliamento da lavoro a Loano.",
};

export default function ChiSiamoPage() {
  const { chiSiamo } = getContent();

  return (
    <>
      {/* Header */}
      <section className="bg-primary text-primary-foreground">
        <Container size="lg">
          <div className="py-20 sm:py-28 text-center max-w-3xl mx-auto">
            <p className="text-sm font-medium uppercase tracking-widest text-amber-400 mb-4">
              {chiSiamo.header.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              {chiSiamo.header.title}
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
              {chiSiamo.header.description}
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container size="lg">
          <ChiSiamoAnimations
            values={chiSiamo.values}
            storyTitle={chiSiamo.storyTitle}
            storyParagraphs={chiSiamo.storyParagraphs}
            valuesSectionEyebrow={chiSiamo.valuesSectionEyebrow}
            valuesSectionTitle={chiSiamo.valuesSectionTitle}
          />
        </Container>
      </Section>
    </>
  );
}
