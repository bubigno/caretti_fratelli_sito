"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  Loader2,
  Save,
  X,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { Servizio } from "@/lib/content-types";
import { TextField, TextAreaField, GalleryField } from "./fields";

type Feedback = { type: "success" | "error"; msg: string } | null;

type FormState = {
  id: string | null;
  nome: string;
  descrizione: string;
  icona: string;
  foto: string[];
};

const EMPTY_FORM: FormState = {
  id: null,
  nome: "",
  descrizione: "",
  icona: "",
  foto: [],
};

export default function ServiziManager() {
  const [servizi, setServizi] = useState<Servizio[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  function notify(fb: Feedback) {
    setFeedback(fb);
    if (fb) setTimeout(() => setFeedback(null), 5000);
  }

  async function loadServizi() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/servizi");
      const data = await res.json();
      if (res.ok && data.success) {
        setServizi(data.servizi ?? []);
      } else {
        notify({ type: "error", msg: data.message || "Impossibile caricare i servizi." });
      }
    } catch {
      notify({ type: "error", msg: "Errore di rete durante il caricamento dei servizi." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServizi();
  }, []);

  function startCreate() {
    setForm({ ...EMPTY_FORM });
  }

  function startEdit(s: Servizio) {
    setForm({
      id: s.id,
      nome: s.nome,
      descrizione: s.descrizione,
      icona: s.icona ?? "",
      foto: s.foto ?? [],
    });
  }

  function cancelForm() {
    setForm(null);
  }

  async function handleSubmit() {
    if (!form) return;
    if (!form.nome.trim() || !form.descrizione.trim()) {
      notify({ type: "error", msg: "Nome e descrizione sono obbligatori." });
      return;
    }
    setSaving(true);
    try {
      const isEdit = form.id !== null;
      const url = isEdit ? `/api/admin/servizi/${form.id}` : "/api/admin/servizi";
      const method = isEdit ? "PUT" : "POST";
      const payload = {
        nome: form.nome,
        descrizione: form.descrizione,
        icona: form.icona,
        foto: form.foto,
        ...(isEdit ? {} : { ordine: servizi.length }),
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        notify({ type: "success", msg: data.message || "Servizio salvato." });
        setForm(null);
        await loadServizi();
      } else {
        notify({ type: "error", msg: data.message || "Errore durante il salvataggio." });
      }
    } catch {
      notify({ type: "error", msg: "Errore di rete durante il salvataggio." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(s: Servizio) {
    if (!confirm(`Vuoi davvero eliminare il servizio "${s.nome}"? L'operazione non è reversibile.`)) {
      return;
    }
    setBusyId(s.id);
    try {
      const res = await fetch(`/api/admin/servizi/${s.id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        notify({ type: "success", msg: data.message || "Servizio eliminato." });
        await loadServizi();
      } else {
        notify({ type: "error", msg: data.message || "Errore durante l'eliminazione." });
      }
    } catch {
      notify({ type: "error", msg: "Errore di rete durante l'eliminazione." });
    } finally {
      setBusyId(null);
    }
  }

  // Scambia l'ordine di due servizi adiacenti e persiste su entrambi.
  async function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= servizi.length) return;
    const a = servizi[index];
    const b = servizi[target];
    setBusyId(a.id);
    // Aggiornamento ottimistico dell'ordine in UI.
    const reordered = [...servizi];
    reordered[index] = b;
    reordered[target] = a;
    setServizi(reordered);
    try {
      await Promise.all([
        fetch(`/api/admin/servizi/${a.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ordine: target }),
        }),
        fetch(`/api/admin/servizi/${b.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ordine: index }),
        }),
      ]);
      await loadServizi();
    } catch {
      notify({ type: "error", msg: "Errore durante il riordino." });
      await loadServizi();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      {/* Barra azioni + feedback */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <p className="text-sm text-gray-500">
          Gestisci i servizi mostrati nella pagina pubblica. Le modifiche sono permanenti.
        </p>
        <div className="flex items-center gap-3">
          {feedback && (
            <div
              className={`flex items-center gap-1.5 text-sm font-medium ${
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
          {!form && (
            <button
              onClick={startCreate}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <Plus className="h-4 w-4" />
              Nuovo servizio
            </button>
          )}
        </div>
      </div>

      {/* Form creazione/modifica */}
      {form && (
        <div className="bg-white rounded-xl border border-amber-200 ring-1 ring-amber-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">
              {form.id ? "Modifica servizio" : "Nuovo servizio"}
            </h3>
            <button onClick={cancelForm} className="text-gray-400 hover:text-gray-600" title="Chiudi">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <TextField
              label="Nome del servizio"
              value={form.nome}
              onChange={(v) => setForm((f) => (f ? { ...f, nome: v } : f))}
            />
            <TextAreaField
              label="Descrizione"
              rows={4}
              value={form.descrizione}
              onChange={(v) => setForm((f) => (f ? { ...f, descrizione: v } : f))}
            />
            <TextField
              label="Icona (nome icona Lucide, opzionale)"
              value={form.icona}
              onChange={(v) => setForm((f) => (f ? { ...f, icona: v } : f))}
              placeholder="es. Wrench, Award, Shirt"
            />
            <GalleryField
              label="Galleria fotografica"
              hint="Carica una o più foto. Puoi rimuoverle con la X o aggiungerne altre."
              value={form.foto}
              onChange={(paths) => setForm((f) => (f ? { ...f, foto: paths } : f))}
            />
          </div>
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-gray-900 font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {form.id ? "Salva modifiche" : "Crea servizio"}
            </button>
            <button
              onClick={cancelForm}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      {/* Lista servizi */}
      {loading ? (
        <div className="flex items-center gap-2 text-gray-500 py-10 justify-center">
          <Loader2 className="h-5 w-5 animate-spin" />
          Caricamento servizi...
        </div>
      ) : servizi.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
          Nessun servizio presente. Clicca su &quot;Nuovo servizio&quot; per aggiungerne uno.
        </div>
      ) : (
        <div className="space-y-3">
          {servizi.map((s, i) => (
            <div
              key={s.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
            >
              {/* Miniatura */}
              <div className="h-16 w-20 shrink-0 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                {s.foto && s.foto.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.foto[0]} alt={s.nome} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-300 text-xs">
                    No foto
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{s.nome}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{s.descrizione}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {(s.foto?.length ?? 0)} foto
                </p>
              </div>
              {/* Riordino */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0 || busyId !== null}
                  title="Sposta su"
                  className="p-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === servizi.length - 1 || busyId !== null}
                  title="Sposta giù"
                  className="p-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
              {/* Azioni */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(s)}
                  title="Modifica"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium"
                >
                  <Pencil className="h-4 w-4" />
                  Modifica
                </button>
                <button
                  onClick={() => handleDelete(s)}
                  disabled={busyId === s.id}
                  title="Elimina"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium disabled:opacity-50"
                >
                  {busyId === s.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Elimina
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
