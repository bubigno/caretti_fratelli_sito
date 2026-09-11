import type { Metadata } from "next";
import { Container } from "@/components/layouts/container";
import { Section } from "@/components/layouts/section";
import { MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/contact-form";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Contatta Caretti F.lli Snc a Loano (SV). Richiedi un preventivo gratuito per premiazioni, abbigliamento da lavoro, personalizzazioni e stampa.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Clock,
};

export const dynamic = "force-dynamic";

export default async function ContattiPage() {
  const { contatti } = await getContent();

  return (
    <>
      {/* Header */}
      <section className="bg-primary text-primary-foreground">
        <Container size="lg">
          <div className="py-20 sm:py-28 text-center max-w-3xl mx-auto">
            <p className="text-sm font-medium uppercase tracking-widest text-amber-400 mb-4">
              {contatti.header.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              {contatti.header.title}
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
              {contatti.header.description}
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
                {contatti.infoTitle}
              </h2>
              <div className="space-y-4">
                {contatti.contactInfo.map((info) => {
                  const Icon = iconMap[info.icon] ?? MapPin;
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
                  <h3 className="font-display text-base font-semibold">{contatti.orariTitle}</h3>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  {contatti.orari.map((riga, i) => (
                    <p key={i}>{riga}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <h2 className="font-display text-2xl font-bold tracking-tight mb-2">
                    {contatti.formTitle}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    {contatti.formDescription}
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
