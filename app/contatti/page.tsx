import type { Metadata } from "next";
import { Container } from "@/components/layouts/container";
import { Section } from "@/components/layouts/section";
import { MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Contatta Caretti F.lli Snc a Loano (SV). Richiedi un preventivo gratuito per premiazioni, abbigliamento da lavoro, personalizzazioni e stampa.",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Indirizzo",
    value: "Via Orsolani, 11 – 17025 Loano (SV)",
    href: "https://www.google.com/maps/search/?api=1&query=Caretti+F.lli+Via+Orsolani+11+17025+Loano+SV",
  },
  {
    icon: Phone,
    label: "Telefono",
    value: "+39 019 673085",
    href: "tel:+39019673085",
  },
  {
    icon: Phone,
    label: "Cellulare",
    value: "+39 347 375 4784",
    href: "tel:+393473754784",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@carettifratelli.it",
    href: "mailto:info@carettifratelli.it",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@c.r_coppe_",
    href: "https://www.instagram.com/c.r_coppe_/",
  },
];

export default function ContattiPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-primary text-primary-foreground">
        <Container size="lg">
          <div className="py-20 sm:py-28 text-center max-w-3xl mx-auto">
            <p className="text-sm font-medium uppercase tracking-widest text-amber-400 mb-4">
              Siamo Qui Per Te
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Contattaci
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
              Hai bisogno di un preventivo o di maggiori informazioni? Scrivici o vieni a trovarci nel nostro punto vendita a Loano.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container size="lg">
          <div className="py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight mb-6">
                Dove Trovarci
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const Wrapper = info?.href ? "a" : "div";
                  const linkProps = info?.href
                    ? {
                        href: info.href,
                        target: info.href.startsWith("http") ? "_blank" as const : undefined,
                        rel: info.href.startsWith("http") ? "noopener noreferrer" : undefined,
                      }
                    : {};
                  return (
                    <Wrapper
                      key={info.label + info.value}
                      {...linkProps}
                      className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-0.5">
                          {info?.label ?? ""}
                        </p>
                        <p suppressHydrationWarning className="text-sm font-medium group-hover:text-primary transition-colors">
                          {info?.value ?? ""}
                        </p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>

              {/* Orari */}
              <div className="mt-8 p-5 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-base font-semibold">Orari di Apertura</h3>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Lunedì – Venerdì: 8:30 – 12:30 / 15:00 – 19:00</p>
                  <p>Sabato: 9:00 – 12:30</p>
                  <p>Domenica: Chiuso</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <h2 className="font-display text-2xl font-bold tracking-tight mb-2">
                    Scrivici
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Compila il modulo e ti risponderemo il prima possibile.
                  </p>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
