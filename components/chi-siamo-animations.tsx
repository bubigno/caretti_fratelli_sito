"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Award, Heart, Handshake, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award, Heart, Handshake, Target,
};

interface ValueItem {
  iconName: string;
  title: string;
  desc: string;
}

export default function ChiSiamoAnimations({
  values,
  storyTitle = "La Nostra Storia",
  storyParagraphs = [],
  valuesSectionEyebrow = "I Nostri Valori",
  valuesSectionTitle = "Cosa Ci Guida",
}: {
  values: ValueItem[];
  storyTitle?: string;
  storyParagraphs?: string[];
  valuesSectionEyebrow?: string;
  valuesSectionTitle?: string;
}) {
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      {/* Story */}
      <motion.div
        ref={storyRef}
        initial={{ opacity: 0, y: 30 }}
        animate={storyInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="py-16 max-w-3xl mx-auto"
      >
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-6 text-center">
          {storyTitle}
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          {storyParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </motion.div>

      {/* Values */}
      <div ref={valuesRef} className="py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-secondary mb-2">{valuesSectionEyebrow}</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{valuesSectionTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(values ?? []).map((value: ValueItem, i: number) => {
            const IconComp = iconMap[value?.iconName ?? ""] ?? Award;
            return (
              <motion.div
                key={value?.title ?? i}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <IconComp className="h-7 w-7 text-secondary" />
                    </div>
                    <h3 className="font-display text-base font-semibold tracking-tight mb-2">
                      {value?.title ?? ""}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value?.desc ?? ""}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
