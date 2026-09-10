import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layouts/container";
import { Section } from "@/components/layouts/section";
import { Button } from "@/components/ui/button";
import HomeAnimations from "@/components/home-animations";
import { getContent } from "@/lib/content";

export default function HomePage() {
  const { home } = getContent();
  const hero = home.hero;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,45%,12%)/0.92] via-[hsl(220,45%,12%)/0.75] to-[hsl(220,45%,12%)/0.5]" />
        </div>
        <Container size="lg">
          <div className="relative py-28 sm:py-36 lg:py-44 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.svg"
                alt="Logo Caretti F.lli"
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 drop-shadow-lg"
              />
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                {hero.brand}
              </span>
            </div>
            <p className="text-sm font-medium uppercase tracking-widest text-amber-400 mb-4">
              {hero.eyebrow}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              {hero.titlePrefix}{" "}
              <span className="text-amber-400">{hero.titleHighlight}</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold">
                <Link href={hero.primaryCtaHref}>{hero.primaryCtaLabel}</Link>
              </Button>
              <Button asChild size="lg" className="bg-white/15 hover:bg-white/25 text-white border border-white/30 font-semibold">
                <Link href={hero.secondaryCtaHref}>{hero.secondaryCtaLabel}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Servizi */}
      <Section>
        <Container size="lg">
          <HomeAnimations
            services={home.services}
            reasons={home.reasons}
            servicesSectionEyebrow={home.servicesSectionEyebrow}
            servicesSectionTitle={home.servicesSectionTitle}
            reasonsSectionEyebrow={home.reasonsSectionEyebrow}
            reasonsSectionTitle={home.reasonsSectionTitle}
            cta={home.cta}
          />
        </Container>
      </Section>
    </>
  );
}
