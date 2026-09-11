import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layouts/container";
import { Section } from "@/components/layouts/section";
import ChiSiamoAnimations from "@/components/chi-siamo-animations";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Chi Siamo",
  description: "Scopri la storia di Caretti F.lli Snc, azienda con oltre 30 anni di esperienza nel settore argenteria, oreficeria e abbigliamento da lavoro a Loano.",
};

export const dynamic = "force-dynamic";

export default async function ChiSiamoPage() {
  const { chiSiamo } = await getContent();
  const gallery = chiSiamo.gallery ?? [];

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

      {/* Galleria immagini */}
      {gallery.length > 0 && (
        <Section className="bg-muted/40">
          <Container size="lg">
            <div className="text-center mb-10">
              <p className="text-sm font-medium uppercase tracking-widest text-amber-500 mb-3">
                Galleria
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                La nostra azienda
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((src, i) => (
                <div key={src + i} className="relative aspect-square overflow-hidden rounded-lg shadow-sm">
                  <Image
                    src={src}
                    alt={`Immagine galleria ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
