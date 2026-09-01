"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Check, FileDown, ArrowRight, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ServizioItem } from "@/app/servizi/servizi-data";

function ServizioCard({
  servizio,
  index,
  onOpen,
}: {
  servizio: ServizioItem;
  index: number;
  onOpen: (s: ServizioItem) => void;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      id={servizio?.slug}
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card
        className="overflow-hidden group cursor-pointer transition-shadow hover:shadow-lg"
        onClick={() => onOpen(servizio)}
      >
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
            <p className="text-muted-foreground leading-relaxed mb-5">
              {servizio?.desc ?? ""}
            </p>
            <div>
              <Button
                variant="outline"
                className="group/btn"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onOpen(servizio);
                }}
              >
                Scopri di più
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function ServizioDialog({
  servizio,
  open,
  onClose,
}: {
  servizio: ServizioItem | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!servizio) return null;

  return (
    <Dialog open={open} onOpenChange={(v: boolean) => (!v ? onClose() : undefined)}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold tracking-tight">
            {servizio.title}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-muted-foreground pt-2">
            {servizio.longDesc}
          </DialogDescription>
        </DialogHeader>

        {/* Cosa offriamo */}
        {servizio.features?.length > 0 && (
          <div className="mt-2">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Cosa offriamo
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {servizio.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Galleria */}
        {servizio.gallery?.length > 0 && (
          <div className="mt-6">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Galleria prodotti
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {servizio.gallery.map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cataloghi */}
        <div className="mt-6">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Cataloghi
          </h4>
          {servizio.cataloghi?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {servizio.cataloghi.map((cat) => (
                <a
                  key={cat.file}
                  href={cat.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border bg-muted/40 hover:bg-muted transition-colors"
                >
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm font-medium flex-1">{cat.nome}</span>
                  <FileDown className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground rounded-lg border border-dashed p-4">
              Cataloghi disponibili su richiesta.{" "}
              <a href="/contatti" className="text-primary font-medium underline underline-offset-2">
                Contattaci
              </a>{" "}
              per ricevere il catalogo aggiornato di questo servizio.
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button asChild className="flex-1">
            <a href="/contatti">Richiedi un preventivo</a>
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Chiudi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ServiziAnimations({ servizi }: { servizi: ServizioItem[] }) {
  const [selected, setSelected] = useState<ServizioItem | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (s: ServizioItem) => {
    setSelected(s);
    setOpen(true);
  };

  // Apre automaticamente il servizio indicato dal parametro ?servizio=<slug>
  // (usato quando si arriva cliccando una card dalla home page)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const slug = new URLSearchParams(window.location.search).get("servizio");
    if (!slug) return;
    const match = (servizi ?? []).find((s) => s?.slug === slug);
    if (!match) return;
    setSelected(match);
    setOpen(true);
    const el = document.getElementById(slug);
    if (el) {
      setTimeout(
        () => el.scrollIntoView({ behavior: "smooth", block: "center" }),
        300
      );
    }
  }, [servizi]);

  return (
    <div className="py-12 space-y-8">
      {(servizi ?? []).map((servizio: ServizioItem, i: number) => (
        <ServizioCard
          key={servizio?.slug ?? i}
          servizio={servizio}
          index={i}
          onOpen={handleOpen}
        />
      ))}
      <ServizioDialog servizio={selected} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
