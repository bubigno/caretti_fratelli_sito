// Tipi condivisi per i contenuti editabili del sito (letti da src/data/content.json)

export interface HomeHero {
  brand: string;
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface ServiceCard {
  iconName: string;
  title: string;
  desc: string;
  href: string;
}

export interface ReasonCard {
  iconName: string;
  title: string;
  desc: string;
}

export interface HomeCta {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface HomeContent {
  hero: HomeHero;
  servicesSectionEyebrow: string;
  servicesSectionTitle: string;
  services: ServiceCard[];
  reasonsSectionEyebrow: string;
  reasonsSectionTitle: string;
  reasons: ReasonCard[];
  cta: HomeCta;
}

export interface SectionHeader {
  eyebrow: string;
  title: string;
  description: string;
}

export interface ValueCard {
  iconName: string;
  title: string;
  desc: string;
}

export interface ChiSiamoContent {
  header: SectionHeader;
  storyTitle: string;
  storyParagraphs: string[];
  valuesSectionEyebrow: string;
  valuesSectionTitle: string;
  values: ValueCard[];
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface CatalogoItem {
  nome: string;
  file: string;
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

export interface ServiziContent {
  header: SectionHeader;
  items: ServizioItem[];
}

export interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  href: string;
}

export interface ContattiContent {
  header: SectionHeader;
  infoTitle: string;
  contactInfo: ContactInfoItem[];
  orariTitle: string;
  orari: string[];
  formTitle: string;
  formDescription: string;
}

export interface SiteContent {
  home: HomeContent;
  chiSiamo: ChiSiamoContent;
  servizi: ServiziContent;
  contatti: ContattiContent;
}
