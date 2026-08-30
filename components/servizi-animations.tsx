"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface ServizioItem {
  title: string;
  desc: string;
  image: string;
  alt: string;
}

function ServizioCard({ servizio, index }: { servizio: ServizioItem; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card className={`overflow-hidden group`}>
        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
          <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto md:min-h-[280px] bg-muted">
            <Image
              src={servizio?.image ?? ""}
              alt={servizio?.alt ?? servizio?.title ?? ""}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-3">
              {servizio?.title ?? ""}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {servizio?.desc ?? ""}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function ServiziAnimations({ servizi }: { servizi: ServizioItem[] }) {
  return (
    <div className="py-12 space-y-8">
      {(servizi ?? []).map((servizio: ServizioItem, i: number) => (
        <ServizioCard key={servizio?.title ?? i} servizio={servizio} index={i} />
      ))}
    </div>
  );
}
