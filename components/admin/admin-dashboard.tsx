"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Info,
  Wrench,
  Phone,
  LogOut,
  Save,
  Loader2,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";
import type { SiteContent } from "@/lib/content-types";
import { TextField, TextAreaField, ImageField } from "./fields";

type SectionKey = "home" | "chiSiamo" | "servizi" | "contatti";

const SECTIONS: { key: SectionKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "chiSiamo", label: "Chi Siamo", icon: Info },
  { key: "servizi", label: "Servizi", icon: Wrench },
  { key: "contatti", label: "Contatti", icon: Phone },
];

// Utility per aggiornamenti immutabili annidati.
function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

export default function AdminDashboard({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [active, setActive] = useState<SectionKey>("home");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  async function handleSave() {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback({ type: "success", msg: data.message || "Modifiche salvate con successo." });
      } else {
        setFeedback({ type: "error", msg: data.message || "Errore durante il salvataggio." });
      }
    } catch {
      setFeedback({ type: "error", msg: "Errore di rete durante il salvataggio." });
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 5000);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  // Helper per aggiornare una sezione mantenendo l'immutabilità.
  function update(mutator: (draft: SiteContent) => void) {
    setContent((prev) => {
      const draft = clone(prev);
      mutator(draft);
      return draft;
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-gray-100 md:min-h-screen flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-lg font-bold">Pannello Admin</h1>
          <p className="text-xs text-gray-400 mt-0.5">Caretti F.lli Snc</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active === s.key ? "bg-amber-500 text-gray-900" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                {s.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Vedi il sito
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Esci
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {SECTIONS.find((s) => s.key === active)?.label}
          </h2>
          <div className="flex items-center gap-4">
            {feedback && (
              <div
                className={`flex items-center gap-2 text-sm font-medium ${
                  feedback.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                {feedback.msg}
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-gray-900 font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Salva Modifiche
            </button>
          </div>
        </div>

        {/* Section forms */}
        <div className="flex-1 p-6 max-w-4xl w-full">
          {active === "home" && <HomeSection content={content} update={update} />}
          {active === "chiSiamo" && <ChiSiamoSection content={content} update={update} />}
          {active === "servizi" && <ServiziSection content={content} update={update} />}
          {active === "contatti" && <ContattiSection content={content} update={update} />}
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

type SectionProps = {
  content: SiteContent;
  update: (mutator: (draft: SiteContent) => void) => void;
};

/* ---------------- HOME ---------------- */
function HomeSection({ content, update }: SectionProps) {
  const h = content.home;
  return (
    <>
      <Card title="Sezione Hero (in alto)">
        <TextField label="Nome / Brand" value={h.hero.brand} onChange={(v) => update((d) => { d.home.hero.brand = v; })} />
        <TextField label="Sopratitolo" value={h.hero.eyebrow} onChange={(v) => update((d) => { d.home.hero.eyebrow = v; })} />
        <TextField label="Titolo (parte iniziale)" value={h.hero.titlePrefix} onChange={(v) => update((d) => { d.home.hero.titlePrefix = v; })} />
        <TextField label="Titolo (parte evidenziata)" value={h.hero.titleHighlight} onChange={(v) => update((d) => { d.home.hero.titleHighlight = v; })} />
        <TextAreaField label="Descrizione" value={h.hero.description} onChange={(v) => update((d) => { d.home.hero.description = v; })} />
        <ImageField label="Immagine di sfondo" value={h.hero.image} onChange={(v) => update((d) => { d.home.hero.image = v; })} />
        <TextField label="Testo immagine (alt)" value={h.hero.imageAlt} onChange={(v) => update((d) => { d.home.hero.imageAlt = v; })} />
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Pulsante 1 - Testo" value={h.hero.primaryCtaLabel} onChange={(v) => update((d) => { d.home.hero.primaryCtaLabel = v; })} />
          <TextField label="Pulsante 1 - Link" value={h.hero.primaryCtaHref} onChange={(v) => update((d) => { d.home.hero.primaryCtaHref = v; })} />
          <TextField label="Pulsante 2 - Testo" value={h.hero.secondaryCtaLabel} onChange={(v) => update((d) => { d.home.hero.secondaryCtaLabel = v; })} />
          <TextField label="Pulsante 2 - Link" value={h.hero.secondaryCtaHref} onChange={(v) => update((d) => { d.home.hero.secondaryCtaHref = v; })} />
        </div>
      </Card>

      <Card title="Sezione Servizi (anteprima)">
        <TextField label="Sopratitolo" value={h.servicesSectionEyebrow} onChange={(v) => update((d) => { d.home.servicesSectionEyebrow = v; })} />
        <TextField label="Titolo" value={h.servicesSectionTitle} onChange={(v) => update((d) => { d.home.servicesSectionTitle = v; })} />
        {h.services.map((s, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-3 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500">Servizio {i + 1}</p>
            <TextField label="Titolo" value={s.title} onChange={(v) => update((d) => { d.home.services[i].title = v; })} />
            <TextAreaField label="Descrizione" rows={2} value={s.desc} onChange={(v) => update((d) => { d.home.services[i].desc = v; })} />
          </div>
        ))}
      </Card>

      <Card title="Perché Sceglierci">
        <TextField label="Sopratitolo" value={h.reasonsSectionEyebrow} onChange={(v) => update((d) => { d.home.reasonsSectionEyebrow = v; })} />
        <TextField label="Titolo" value={h.reasonsSectionTitle} onChange={(v) => update((d) => { d.home.reasonsSectionTitle = v; })} />
        {h.reasons.map((r, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-3 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500">Punto {i + 1}</p>
            <TextField label="Titolo" value={r.title} onChange={(v) => update((d) => { d.home.reasons[i].title = v; })} />
            <TextAreaField label="Descrizione" rows={2} value={r.desc} onChange={(v) => update((d) => { d.home.reasons[i].desc = v; })} />
          </div>
        ))}
      </Card>

      <Card title="Invito all'azione (CTA finale)">
        <TextField label="Titolo" value={h.cta.title} onChange={(v) => update((d) => { d.home.cta.title = v; })} />
        <TextAreaField label="Descrizione" value={h.cta.description} onChange={(v) => update((d) => { d.home.cta.description = v; })} />
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Pulsante - Testo" value={h.cta.buttonLabel} onChange={(v) => update((d) => { d.home.cta.buttonLabel = v; })} />
          <TextField label="Pulsante - Link" value={h.cta.buttonHref} onChange={(v) => update((d) => { d.home.cta.buttonHref = v; })} />
        </div>
      </Card>
    </>
  );
}

/* ---------------- CHI SIAMO ---------------- */
function ChiSiamoSection({ content, update }: SectionProps) {
  const c = content.chiSiamo;
  return (
    <>
      <Card title="Intestazione">
        <TextField label="Sopratitolo" value={c.header.eyebrow} onChange={(v) => update((d) => { d.chiSiamo.header.eyebrow = v; })} />
        <TextField label="Titolo" value={c.header.title} onChange={(v) => update((d) => { d.chiSiamo.header.title = v; })} />
        <TextAreaField label="Descrizione" value={c.header.description} onChange={(v) => update((d) => { d.chiSiamo.header.description = v; })} />
      </Card>

      <Card title="La Nostra Storia">
        <TextField label="Titolo sezione" value={c.storyTitle} onChange={(v) => update((d) => { d.chiSiamo.storyTitle = v; })} />
        {c.storyParagraphs.map((p, i) => (
          <TextAreaField
            key={i}
            label={`Paragrafo ${i + 1}`}
            value={p}
            onChange={(v) => update((d) => { d.chiSiamo.storyParagraphs[i] = v; })}
          />
        ))}
      </Card>

      <Card title="I Nostri Valori">
        <TextField label="Sopratitolo" value={c.valuesSectionEyebrow} onChange={(v) => update((d) => { d.chiSiamo.valuesSectionEyebrow = v; })} />
        <TextField label="Titolo" value={c.valuesSectionTitle} onChange={(v) => update((d) => { d.chiSiamo.valuesSectionTitle = v; })} />
        {c.values.map((val, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-3 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500">Valore {i + 1}</p>
            <TextField label="Titolo" value={val.title} onChange={(v) => update((d) => { d.chiSiamo.values[i].title = v; })} />
            <TextAreaField label="Descrizione" rows={2} value={val.desc} onChange={(v) => update((d) => { d.chiSiamo.values[i].desc = v; })} />
          </div>
        ))}
      </Card>
    </>
  );
}

/* ---------------- SERVIZI ---------------- */
function ServiziSection({ content, update }: SectionProps) {
  const s = content.servizi;
  return (
    <>
      <Card title="Intestazione">
        <TextField label="Sopratitolo" value={s.header.eyebrow} onChange={(v) => update((d) => { d.servizi.header.eyebrow = v; })} />
        <TextField label="Titolo" value={s.header.title} onChange={(v) => update((d) => { d.servizi.header.title = v; })} />
        <TextAreaField label="Descrizione" value={s.header.description} onChange={(v) => update((d) => { d.servizi.header.description = v; })} />
      </Card>

      {s.items.map((item, i) => (
        <Card key={item.slug} title={`Servizio: ${item.title}`}>
          <TextField label="Titolo" value={item.title} onChange={(v) => update((d) => { d.servizi.items[i].title = v; })} />
          <TextAreaField label="Descrizione breve" rows={2} value={item.desc} onChange={(v) => update((d) => { d.servizi.items[i].desc = v; })} />
          <TextAreaField label="Descrizione estesa" rows={4} value={item.longDesc} onChange={(v) => update((d) => { d.servizi.items[i].longDesc = v; })} />
          <ImageField label="Immagine principale" value={item.image} onChange={(v) => update((d) => { d.servizi.items[i].image = v; })} />
          <TextField label="Testo immagine (alt)" value={item.alt} onChange={(v) => update((d) => { d.servizi.items[i].alt = v; })} />
        </Card>
      ))}
    </>
  );
}

/* ---------------- CONTATTI ---------------- */
function ContattiSection({ content, update }: SectionProps) {
  const c = content.contatti;
  return (
    <>
      <Card title="Intestazione">
        <TextField label="Sopratitolo" value={c.header.eyebrow} onChange={(v) => update((d) => { d.contatti.header.eyebrow = v; })} />
        <TextField label="Titolo" value={c.header.title} onChange={(v) => update((d) => { d.contatti.header.title = v; })} />
        <TextAreaField label="Descrizione" value={c.header.description} onChange={(v) => update((d) => { d.contatti.header.description = v; })} />
      </Card>

      <Card title="Informazioni di contatto">
        <TextField label="Titolo sezione" value={c.infoTitle} onChange={(v) => update((d) => { d.contatti.infoTitle = v; })} />
        {c.contactInfo.map((info, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-3 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500">{info.label}</p>
            <TextField label="Etichetta" value={info.label} onChange={(v) => update((d) => { d.contatti.contactInfo[i].label = v; })} />
            <TextField label="Valore" value={info.value} onChange={(v) => update((d) => { d.contatti.contactInfo[i].value = v; })} />
            <TextField label="Link" value={info.href} onChange={(v) => update((d) => { d.contatti.contactInfo[i].href = v; })} />
          </div>
        ))}
      </Card>

      <Card title="Orari di apertura">
        <TextField label="Titolo sezione" value={c.orariTitle} onChange={(v) => update((d) => { d.contatti.orariTitle = v; })} />
        {c.orari.map((o, i) => (
          <TextField key={i} label={`Riga ${i + 1}`} value={o} onChange={(v) => update((d) => { d.contatti.orari[i] = v; })} />
        ))}
      </Card>

      <Card title="Modulo di contatto">
        <TextField label="Titolo" value={c.formTitle} onChange={(v) => update((d) => { d.contatti.formTitle = v; })} />
        <TextAreaField label="Descrizione" rows={2} value={c.formDescription} onChange={(v) => update((d) => { d.contatti.formDescription = v; })} />
      </Card>
    </>
  );
}
