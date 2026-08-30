import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layouts/container";
import { Section } from "@/components/layouts/section";
import ServiziAnimations from "@/components/servizi-animations";

export const metadata: Metadata = {
  title: "Servizi",
  description: "Scopri tutti i servizi offerti da Caretti F.lli Snc: premiazioni sportive, argenteria, abbigliamento da lavoro, personalizzazione, stampa e molto altro.",
};

const servizi = [
  {
    title: "Premiazioni Sportive",
    desc: "Coppe, trofei, medaglie, targhe, soggetti in resina e trofei in vetro. Offriamo un'ampia gamma di articoli per premiazioni di ogni tipo, dalle competizioni sportive agli eventi aziendali.",
    image: "https://images.pexels.com/photos/30689698/pexels-photo-30689698/free-photo-of-elegant-trophy-display-in-a-glass-case.jpeg",
    alt: "Coppe e trofei sportivi dorati in esposizione",
  },
  {
    title: "Argenteria & Oreficeria",
    desc: "Prodotti di argenteria e oreficeria di qualità, selezionati con cura per offrire eleganza e raffinatezza. Articoli ideali per regali, cerimonie e occasioni speciali.",
    image: "https://www.belarehome.com/cdn/shop/articles/handmade-silverware-a-timeless-trend-in-luxurious-home-decor-706668.webp?v=1739758043",
    alt: "Argenteria artigianale di alta qualità",
  },
  {
    title: "Abbigliamento da Lavoro & Antinfortunistica",
    desc: "Abiti da lavoro professionali, DPI (dispositivi di protezione individuale) e abbigliamento per il tempo libero. Forniamo soluzioni complete per la sicurezza e il comfort sul posto di lavoro.",
    image: "https://haiyuanworkclothes.com/wp-content/uploads/high-visibility-safety-work-uniform.jpg",
    alt: "Abbigliamento da lavoro e dispositivi di sicurezza",
  },
  {
    title: "Personalizzazione Abbigliamento",
    desc: "Serigrafia fino a 5 colori, termosaldatura, transfer a colori e ricami personalizzati. Trasformiamo capi ordinari in strumenti di comunicazione e identità aziendale.",
    image: "https://a.storyblok.com/f/165154/1280x720/c5662b5583/02_silk-screening-custom-t-shirts.jpg/m/",
    alt: "Processo di serigrafia su magliette personalizzate",
  },
  {
    title: "Oggettistica Pubblicitaria",
    desc: "Gadget e oggetti personalizzati per promuovere la tua azienda: penne, tazze, portachiavi e molto altro. Materiale promozionale efficace per fiere, eventi e campagne di marketing.",
    image: "https://tonysourcing.com/wp-content/uploads/2025/09/promotional-products.jpg",
    alt: "Gadget promozionali e oggettistica pubblicitaria aziendale",
  },
  {
    title: "Stampa su Grandi e Piccoli Formati",
    desc: "Stampa digitale professionale: striscioni, banner, adesivi e tele pittoriche. Dal piccolo formato per etichette al grande formato per allestimenti fieristici e decorazioni.",
    image: "https://i.ytimg.com/vi/AlaugMXqYhc/maxresdefault.jpg",
    alt: "Macchina per stampa digitale su grande formato",
  },
  {
    title: "Cartellonistica & Targhe per Esterni",
    desc: "Realizzazione di cartelli, insegne e targhe per esterni in vari materiali. Soluzioni durevoli e professionali per identificare la tua attività e comunicare al meglio.",
    image: "https://cdn.abacus.ai/images/b3625029-90b1-40d2-9f90-7ae5dfc153b1.png",
    alt: "Insegna professionale per esterni su edificio commerciale",
  },
  {
    title: "Decorazione Automezzi",
    desc: "Personalizzazione e decorazione di veicoli aziendali con adesivi, wrapping e grafiche su misura. Trasforma il tuo mezzo in un potente strumento pubblicitario in movimento.",
    image: "https://i.ytimg.com/vi/IM9ET5fi-Do/maxresdefault.jpg",
    alt: "Veicolo aziendale con decorazione grafica personalizzata",
  },
];

export default function ServiziPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-primary text-primary-foreground">
        <Container size="lg">
          <div className="py-20 sm:py-28 text-center max-w-3xl mx-auto">
            <p className="text-sm font-medium uppercase tracking-widest text-amber-400 mb-4">
              Le Nostre Competenze
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              I Nostri Servizi
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
              Un'offerta completa per soddisfare ogni esigenza: dalle premiazioni sportive all'abbigliamento professionale, dalla stampa alla personalizzazione.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container size="lg">
          <ServiziAnimations servizi={servizi} />
        </Container>
      </Section>
    </>
  );
}
