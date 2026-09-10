"use client";

import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Trophy, Gem, HardHat, Shirt, Gift, Printer, Star, Users, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy, Gem, HardHat, Shirt, Gift, Printer, Star, Users, Clock,
};

interface ServiceItem {
  iconName: string;
  title: string;
  desc: string;
  href: string;
}

interface ReasonItem {
  iconName: string;
  title: string;
  desc: string;
}

interface CtaContent {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export default function HomeAnimations({
  services,
  reasons,
  servicesSectionEyebrow = "I Nostri Servizi",
  servicesSectionTitle = "Cosa Offriamo",
  reasonsSectionEyebrow = "I Nostri Punti di Forza",
  reasonsSectionTitle = "Perché Sceglierci",
  cta,
}: {
  services: ServiceItem[];
  reasons: ReasonItem[];
  servicesSectionEyebrow?: string;
  servicesSectionTitle?: string;
  reasonsSectionEyebrow?: string;
  reasonsSectionTitle?: string;
  cta?: CtaContent;
}) {
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [reasonsRef, reasonsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      {/* Services Section */}
      <div ref={servicesRef} className="py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-secondary mb-2">{servicesSectionEyebrow}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{servicesSectionTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(services ?? []).map((service: ServiceItem, i: number) => {
            const IconComp = iconMap[service?.iconName ?? ""] ?? Star;
            return (
              <motion.div
                key={service?.title ?? i}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={service?.href ?? "/servizi"}>
                  <Card variant="interactive" className="h-full group">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                        <IconComp className="h-6 w-6 text-secondary" />
                      </div>
                      <h3 className="font-display text-lg font-semibold tracking-tight mb-2">
                        {service?.title ?? ""}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service?.desc ?? ""}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Perché sceglierci */}
      <div ref={reasonsRef} className="py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-secondary mb-2">{reasonsSectionEyebrow}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{reasonsSectionTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(reasons ?? []).map((reason: ReasonItem, i: number) => {
            const IconComp = iconMap[reason?.iconName ?? ""] ?? Star;
            return (
              <motion.div
                key={reason?.title ?? i}
                initial={{ opacity: 0, y: 30 }}
                animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <IconComp className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight mb-2">
                  {reason?.title ?? ""}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason?.desc ?? ""}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="py-16"
      >
        <div className="rounded-2xl bg-primary p-8 sm:p-12 text-center text-primary-foreground">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            {cta?.title ?? "Hai un progetto in mente?"}
          </h2>
          <p className="text-sm opacity-80 max-w-lg mx-auto mb-6">
            {cta?.description ??
              "Contattaci per un preventivo gratuito. Siamo a tua disposizione per qualsiasi esigenza di personalizzazione, premiazione o abbigliamento professionale."}
          </p>
          <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold">
            <Link href={cta?.buttonHref ?? "/contatti"}>
              {cta?.buttonLabel ?? "Richiedi un Preventivo"} <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </>
  );
}
