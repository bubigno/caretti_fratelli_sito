import { Container } from "@/components/layouts/container";
import { Section } from "@/components/layouts/section";
import { PageHeader } from "@/components/layouts/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Informativa sulla privacy di Caretti F.lli Snc.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" description="Informativa sulla privacy ai sensi del Regolamento UE 2016/679 (GDPR)" />
      <Section>
        <Container size="md">
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
            <h2 className="text-lg font-display font-semibold text-foreground">Titolare del trattamento</h2>
            <p>
              Caretti F.lli Snc<br />
              Via Orsolani, 11 – 17025 Loano (SV)<br />
              P.IVA 01234567890<br />
              Email: <span suppressHydrationWarning>info@carettifratelli.it</span>
            </p>

            <h2 className="text-lg font-display font-semibold text-foreground">Tipologie di dati raccolti</h2>
            <p>
              Il presente sito web non raccoglie dati personali in modo automatico. Eventuali dati personali (nome, email, telefono) vengono forniti volontariamente dall&apos;utente attraverso il modulo di contatto e sono utilizzati esclusivamente per rispondere alle richieste ricevute.
            </p>

            <h2 className="text-lg font-display font-semibold text-foreground">Finalità del trattamento</h2>
            <p>I dati personali forniti tramite il modulo di contatto vengono trattati per le seguenti finalità:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Risposta a richieste di informazioni e preventivi</li>
              <li>Gestione dei rapporti commerciali</li>
            </ul>

            <h2 className="text-lg font-display font-semibold text-foreground">Base giuridica</h2>
            <p>
              Il trattamento dei dati si basa sul consenso dell&apos;interessato, espresso al momento dell&apos;invio del modulo di contatto, e sull&apos;esecuzione di misure precontrattuali adottate su richiesta dell&apos;interessato.
            </p>

            <h2 className="text-lg font-display font-semibold text-foreground">Conservazione dei dati</h2>
            <p>
              I dati personali sono conservati per il tempo strettamente necessario a soddisfare le finalità per cui sono stati raccolti, e comunque non oltre i termini previsti dalla normativa vigente.
            </p>

            <h2 className="text-lg font-display font-semibold text-foreground">Diritti dell&apos;interessato</h2>
            <p>Ai sensi degli artt. 15-22 del GDPR, l&apos;interessato ha diritto di:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Accedere ai propri dati personali</li>
              <li>Richiederne la rettifica o la cancellazione</li>
              <li>Opporsi al trattamento</li>
              <li>Richiedere la limitazione del trattamento</li>
              <li>Richiedere la portabilità dei dati</li>
            </ul>
            <p>
              Per esercitare tali diritti, è possibile contattare il Titolare all&apos;indirizzo email sopra indicato.
            </p>

            <h2 className="text-lg font-display font-semibold text-foreground">Cookie</h2>
            <p>
              Questo sito non utilizza cookie di profilazione. Potrebbero essere utilizzati cookie tecnici strettamente necessari al funzionamento del sito.
            </p>

            <p className="text-xs opacity-60 pt-4 border-t border-border">
              Ultimo aggiornamento: Settembre 2026
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
