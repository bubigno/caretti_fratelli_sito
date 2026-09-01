export interface CatalogoItem {
  nome: string;
  file: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface ServizioItem {
  slug: string;
  title: string;
  desc: string;
  longDesc: string;
  image: string;
  alt: string;
  features: string[];
  gallery: GalleryImage[];
  cataloghi: CatalogoItem[];
}

export const servizi: ServizioItem[] = [
  {
    slug: "premiazioni-sportive",
    title: "Premiazioni Sportive",
    desc: "Coppe, trofei, medaglie, targhe, soggetti in resina e trofei in vetro per premiazioni di ogni tipo.",
    longDesc:
      "Da oltre 30 anni realizziamo premiazioni per società e squadre sportive, tornei, competizioni ed eventi aziendali. Offriamo un'ampia gamma di articoli — dalle coppe classiche ai trofei di design — tutti personalizzabili con incisioni, loghi e dediche. Diverse società e squadre sportive si affidano ai nostri lavori per le premiazioni di ogni tipo.",
    image: "/servizi/premiazioni-hero.jpg",
    alt: "Esposizione di trofei, targhe e premiazioni in negozio",
    features: [
      "Coppe e trofei classici e di design",
      "Medaglie personalizzate",
      "Targhe e piatti ricordo",
      "Soggetti in resina",
      "Trofei in vetro e cristallo",
      "Incisioni e personalizzazioni su misura",
    ],
    gallery: [
      { src: "/servizi/premiazioni-r1.jpg", alt: "Coppe e trofei in oro e argento sugli scaffali" },
      { src: "/servizi/premiazioni-r2.jpg", alt: "Trofei e coppe di vari formati e colori" },
      { src: "/servizi/premiazioni-r3.jpg", alt: "Trofei, targhe e piatti ricordo in esposizione" },
    ],
    cataloghi: [],
  },
  {
    slug: "argenteria-oreficeria",
    title: "Argenteria & Oreficeria",
    desc: "Prodotti di argenteria e oreficeria di qualità, selezionati con cura per eleganza e raffinatezza.",
    longDesc:
      "Una selezione curata di articoli di argenteria e oreficeria di pregio, ideali per regali, cerimonie, anniversari e occasioni speciali. Oggetti eleganti e raffinati per chi cerca qualità e stile senza tempo.",
    image: "/servizi/argenteria-hero.jpg",
    alt: "Articoli da regalo e argenteria in esposizione",
    features: [
      "Oggettistica in argento",
      "Gioielli in oro",
      "Articoli da regalo di pregio",
      "Idee per cerimonie e ricorrenze",
    ],
    gallery: [
      { src: "/servizi/argenteria-r1.jpg", alt: "Piatto in argento e articoli di pregio" },
      { src: "/servizi/argenteria-r2.jpg", alt: "Cornici e oggettistica in argento in esposizione" },
      { src: "/servizi/argenteria-r3.jpg", alt: "Articoli in argento e cristallo da regalo" },
    ],
    cataloghi: [],
  },
  {
    slug: "abbigliamento-lavoro-antinfortunistica",
    title: "Abbigliamento da Lavoro & Antinfortunistica",
    desc: "Abiti da lavoro, DPI e abbigliamento tempo libero: soluzioni complete per sicurezza e comfort.",
    longDesc:
      "Forniamo abbigliamento professionale da lavoro, dispositivi di protezione individuale (DPI) e capi per il tempo libero. Soluzioni complete e certificate per garantire sicurezza, comfort e resistenza sul posto di lavoro, con possibilità di personalizzazione con il logo aziendale.",
    image: "/servizi/lavoro-1.jpg",
    alt: "Abbigliamento da lavoro e dispositivi di sicurezza",
    features: [
      "Tute e capi da lavoro",
      "Abbigliamento alta visibilità",
      "Dispositivi di protezione individuale (DPI)",
      "Calzature antinfortunistiche",
      "Abbigliamento tempo libero",
      "Personalizzazione con logo aziendale",
    ],
    gallery: [
      { src: "/servizi/lavoro-2.webp", alt: "Indumenti alta visibilità per cantiere" },
      { src: "/servizi/lavoro-3.jpg", alt: "Capo da lavoro alta visibilità" },
    ],
    cataloghi: [],
  },
  {
    slug: "personalizzazione-abbigliamento",
    title: "Personalizzazione Abbigliamento",
    desc: "Serigrafia fino a 5 colori, termosaldatura, transfer a colori e ricami personalizzati.",
    longDesc:
      "Trasformiamo capi ordinari in strumenti di comunicazione e identità aziendale. Personalizziamo abbigliamento sportivo, promozionale e da lavoro con diverse tecniche, scegliendo di volta in volta la soluzione migliore per resa e durata.",
    image: "/servizi/personalizzazione-1.jpg",
    alt: "Serigrafia e ricamo su abbigliamento personalizzato",
    features: [
      "Serigrafia fino a 5 colori",
      "Termosaldatura a intaglio e a stampa digitale",
      "Transfer a colori",
      "Ricami personalizzati",
      "Abbigliamento sportivo, promozionale e da lavoro",
    ],
    gallery: [
      { src: "/servizi/personalizzazione-2.jpg", alt: "Stampa su polo personalizzate" },
      { src: "/servizi/personalizzazione-3.jpg", alt: "Ricamo personalizzato su abbigliamento" },
    ],
    cataloghi: [],
  },
  {
    slug: "oggettistica-pubblicitaria",
    title: "Oggettistica Pubblicitaria",
    desc: "Gadget e oggetti personalizzati per promuovere la tua azienda: penne, tazze, portachiavi e altro.",
    longDesc:
      "Materiale promozionale efficace per fiere, eventi e campagne di marketing. Realizziamo gadget e oggetti personalizzati con il tuo logo, per aumentare la visibilità del tuo brand e lasciare un ricordo tangibile a clienti e partner.",
    image: "/servizi/oggettistica-1.jpg",
    alt: "Gadget promozionali e oggettistica pubblicitaria aziendale",
    features: [
      "Penne, tazze e borracce brandizzate",
      "Portachiavi personalizzati",
      "Gadget per fiere ed eventi",
      "Materiale promozionale su misura",
      "Personalizzazione con logo",
    ],
    gallery: [
      { src: "/servizi/oggettistica-2.png", alt: "Tazze aziendali personalizzate" },
      { src: "/servizi/oggettistica-3.png", alt: "Portachiavi personalizzati" },
    ],
    cataloghi: [],
  },
  {
    slug: "stampa-grandi-piccoli-formati",
    title: "Stampa su Grandi e Piccoli Formati",
    desc: "Stampa digitale professionale: striscioni, banner, adesivi e tele pittoriche.",
    longDesc:
      "Dal piccolo formato per etichette e adesivi al grande formato per allestimenti fieristici e decorazioni. Offriamo stampa digitale professionale con risultati di alta qualità su un'ampia varietà di supporti e materiali.",
    image: "/servizi/stampa-1.jpg",
    alt: "Stampa digitale su grande formato",
    features: [
      "Stampa digitale",
      "Striscioni pubblicitari",
      "Banner pubblicitari",
      "Adesivi",
      "Carte e tele pittoriche",
    ],
    gallery: [
      { src: "/servizi/stampa-2.jpg", alt: "Stampa digitale grande formato" },
      { src: "/servizi/stampa-3.jpg", alt: "Striscioni pubblicitari personalizzati" },
    ],
    cataloghi: [],
  },
  {
    slug: "cartellonistica-targhe",
    title: "Cartellonistica & Targhe per Esterni",
    desc: "Cartelli, insegne e targhe per esterni in vari materiali: soluzioni durevoli e professionali.",
    longDesc:
      "Realizziamo cartelli, insegne e targhe per esterni in diversi materiali (metallo, plexiglass e altro). Soluzioni durevoli e professionali per identificare la tua attività e comunicare al meglio la tua immagine.",
    image: "/servizi/targhe-1.jpg",
    alt: "Targhe e insegne professionali per esterni",
    features: [
      "Insegne per negozi e attività",
      "Targhe in metallo e plexiglass",
      "Cartelli pubblicitari per esterni",
      "Materiali resistenti agli agenti atmosferici",
    ],
    gallery: [
      { src: "/servizi/targhe-2.jpg", alt: "Targhe personalizzate" },
      { src: "/servizi/targhe-3.jpg", alt: "Targhe da parete in plexiglass" },
    ],
    cataloghi: [],
  },
  {
    slug: "decorazione-automezzi",
    title: "Decorazione Automezzi",
    desc: "Personalizzazione e decorazione di veicoli aziendali con adesivi, wrapping e grafiche su misura.",
    longDesc:
      "Trasforma il tuo mezzo in un potente strumento pubblicitario in movimento. Realizziamo car wrapping, adesivi e grafiche su misura per veicoli aziendali e flotte, per dare visibilità al tuo brand ovunque tu vada.",
    image: "/servizi/automezzi-1.jpg",
    alt: "Veicolo aziendale con decorazione grafica personalizzata",
    features: [
      "Car wrapping",
      "Adesivi e grafiche su misura",
      "Decorazione furgoni e flotte aziendali",
      "Loghi e scritte pubblicitarie",
    ],
    gallery: [
      { src: "/servizi/automezzi-2.png", alt: "Decorazione automezzi e flotte" },
      { src: "/servizi/automezzi-3.webp", alt: "Car wrapping con grafiche" },
    ],
    cataloghi: [],
  },
];
