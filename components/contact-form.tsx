"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const oggetti = [
  "Premiazioni Sportive",
  "Argenteria & Oreficeria",
  "Abbigliamento da Lavoro & Antinfortunistica",
  "Personalizzazione Abbigliamento",
  "Oggettistica Pubblicitaria",
  "Stampa su Grandi e Piccoli Formati",
  "Cartellonistica & Targhe per Esterni",
  "Decorazione Automezzi",
  "Altro",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    oggetto: "",
    oggettoAltro: "",
    messaggio: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual-only form: just show success
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ nome: "", email: "", oggetto: "", oggettoAltro: "", messaggio: "" });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="font-display text-xl font-bold tracking-tight mb-2">
          Messaggio inviato!
        </h3>
        <p className="text-muted-foreground text-sm">
          Grazie per averci contattato. Ti risponderemo il prima possibile.
        </p>
        <Button variant="outline" className="mt-6" onClick={resetForm}>
          Invia un altro messaggio
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          placeholder="Il tuo nome"
          required
          value={formData.nome}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, nome: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="La tua email"
          required
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="oggetto">Oggetto</Label>
        <Select
          value={formData.oggetto}
          onValueChange={(v: string) =>
            setFormData({ ...formData, oggetto: v, oggettoAltro: v === "Altro" ? formData.oggettoAltro : "" })
          }
          required
        >
          <SelectTrigger id="oggetto">
            <SelectValue placeholder="Seleziona di cosa hai bisogno" />
          </SelectTrigger>
          <SelectContent>
            {oggetti.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {formData.oggetto === "Altro" && (
        <div className="space-y-2">
          <Label htmlFor="oggettoAltro">Specifica l'oggetto</Label>
          <Input
            id="oggettoAltro"
            placeholder="Di cosa hai bisogno?"
            required
            value={formData.oggettoAltro}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, oggettoAltro: e.target.value })
            }
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="messaggio">Messaggio</Label>
        <Textarea
          id="messaggio"
          placeholder="Scrivi il tuo messaggio..."
          rows={5}
          required
          value={formData.messaggio}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormData({ ...formData, messaggio: e.target.value })
          }
        />
      </div>
      <Button type="submit" className="w-full">
        <Send className="h-4 w-4 mr-2" />
        Invia Messaggio
      </Button>
    </form>
  );
}
