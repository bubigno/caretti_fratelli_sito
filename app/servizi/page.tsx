import type { Metadata } from "next";
import { Container } from "@/components/layouts/container";
import { Section } from "@/components/layouts/section";
import ServiziAnimations from "@/components/servizi-animations";
import { getServiziHeaderFromFile } from "@/lib/content";
import { getServizi } from "@/lib/servizi";
import type { ServizioItem } from "@/app/servizi/servizi-data";
import type { Servizio } from "@/lib/content-types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Servizi",
  description:
    "Scopri tutti i servizi offerti da Caretti F.lli Snc: premiazioni sportive, argenteria, abbigliamento da lavoro, personalizzazione, stampa e molto altro.",
};

// Immagine di riserva se un servizio non ha ancora foto.
const PLACEHOLDER_IMG = "/og-image.png";

// Converte un servizio del database nella struttura usata dal componente pubblico.
function toServizioItem(s: Servizio): ServizioItem {
  const foto = Array.isArray(s.foto) ? s.foto.filter(Boolean) : [];
  return {
    slug: s.id,
    title: s.nome,
    desc: s.descrizione,
    longDesc: s.descrizione,
    image: foto[0] || PLACEHOLDER_IMG,
    alt: s.nome,
    features: [],
    gallery: foto.map((src) => ({ src, alt: s.nome })),
    cataloghi: [],
  };
}

export default async function ServiziPage() {
  const serviziHeader = getServiziHeaderFromFile();
  const servizi = await getServizi();
  const items = servizi.map(toServizioItem);

  return (
    <>
      {/* Header */}
      <section className="bg-primary text-primary-foreground">
        <Container size="lg">
          <div className="py-20 sm:py-28 text-center max-w-3xl mx-auto">
            <p className="text-sm font-medium uppercase tracking-widest text-amber-400 mb-4">
              {serviziHeader.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              {serviziHeader.title}
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
              {serviziHeader.description}
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container size="lg">
          {items.length > 0 ? (
            <ServiziAnimations servizi={items} />
          ) : (
            <div className="py-16 text-center text-muted-foreground">
              Nessun servizio disponibile al momento.
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
