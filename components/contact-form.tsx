"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", messaggio: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual-only form: just show success
    setSubmitted(true);
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
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setSubmitted(false);
            setFormData({ nome: "", email: "", messaggio: "" });
          }}
        >
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
