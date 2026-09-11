# Guida al Pannello Admin — Caretti F.lli

Il sito usa **Supabase** (database PostgreSQL + Storage) per rendere **permanenti** tutte le
modifiche fatte dal pannello admin: testi, servizi e immagini restano salvati anche dopo un
nuovo deploy su Vercel.

---

## 1. Credenziali di accesso

- **URL pannello admin:** `/admin` (es. https://carettifratellisito.vercel.app/admin)
- **Pagina di login:** `/admin/login`
- **Nome utente:** `admin`
- **Password:** `CarettiFratelli2024!`

> La password è memorizzata come hash bcrypt (mai in chiaro) nelle variabili d'ambiente.

---

## 2. Configurazione di Supabase (da fare una sola volta)

### 2.1 Crea un account e un progetto

1. Vai su **https://supabase.com** e registrati (il piano gratuito è sufficiente).
2. Clicca **New Project**, scegli un nome (es. `caretti-fratelli`), imposta una password del
   database e la region (es. *West EU / Frankfurt*). Attendi che il progetto sia pronto.

### 2.2 Crea le tabelle

1. Nel menu a sinistra apri **SQL Editor** → **New query**.
2. Copia e incolla tutto il contenuto del file **`sql/schema.sql`** (presente in questo progetto).
3. Clicca **Run**. Questo crea le tabelle `site_content` e `servizi` con i relativi permessi.

### 2.3 Crea il bucket per le immagini

1. Nel menu a sinistra apri **Storage** → **New bucket**.
2. Nome del bucket: **`immagini-sito`** (esattamente così).
3. Attiva l'opzione **Public bucket** (bucket pubblico) e conferma.

> Il bucket deve essere pubblico affinché le immagini caricate siano visibili sul sito.

### 2.4 Copia le chiavi API

Vai su **Project Settings → API** e prendi nota di:

| Valore in Supabase | Variabile d'ambiente |
|--------------------|----------------------|
| **Project URL** | `NEXT_PUBLIC_SUPABASE_URL` |
| **anon public** key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **service_role** key (segreta) | `SUPABASE_SERVICE_KEY` |

> ⚠️ La chiave **service_role** è segreta: non va mai messa nel codice client né condivisa.

---

## 3. Variabili d'ambiente da configurare su Vercel

Vai su **Vercel → Progetto → Settings → Environment Variables** e aggiungi
(Environment: Production, Preview, Development):

| Nome | Valore |
|------|--------|
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD` | `$2a$10$aLzRpS2pfpRFMWyxVKKlKu8cEd.UmBui4z/zsB3.wXT8zVqysXzjW` |
| `NEXTAUTH_SECRET` | `1d0f77f8603dcf096e4858e9526d2065caf027f6ea1b8eaa3a268f9e013a50ae` |
| `NEXTAUTH_URL` | `https://carettifratellisito.vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | *(il Project URL di Supabase)* |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(la chiave anon public)* |
| `SUPABASE_SERVICE_KEY` | *(la chiave service_role)* |

> IMPORTANTE: su Vercel incolla il valore di `ADMIN_PASSWORD` **così com'è**, con i simboli `$`
> (senza backslash). Vercel NON interpreta i simboli `$`. Nel file locale `.env.local` invece i
> `$` sono preceduti da `\` (backslash) perché Next.js in locale li interpreterebbe come variabili.

Dopo aver aggiunto le variabili, esegui un nuovo **Redeploy** del progetto su Vercel.

---

## 4. Popolamento iniziale dei dati (seed)

Per caricare su Supabase i contenuti e le immagini già presenti nel sito, esegui **una volta** lo
script di seed dal tuo computer:

```bash
cd caretti_fratelli_sito

# 1. Installa le dipendenze (se non l'hai già fatto)
npm install

# 2. Crea il file .env.local con le variabili Supabase (vedi .env.example)
#    Servono almeno: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_KEY

# 3. Lancia il seed
npx tsx scripts/seed-supabase.ts
```

Lo script:
1. carica su Storage tutte le immagini dei servizi presenti in `public/servizi/`;
2. inserisce/aggiorna i contenuti generali (Home, Chi Siamo, Contatti);
3. inserisce gli 8 servizi con gli URL permanenti delle immagini.

Lo script è **rilanciabile**: puoi eseguirlo di nuovo senza creare duplicati.

---

## 5. Come caricare il codice su GitHub (per aggiornare il sito Vercel)

Il repository è collegato a Vercel: ogni push su GitHub avvia automaticamente un nuovo deploy.

```bash
cd caretti_fratelli_sito
git add .
git commit -m "Migrazione a Supabase + gestione servizi"
git push origin main
```

Vercel rileverà il push e ricostruirà il sito. Ricordati di aver prima configurato le variabili
d'ambiente (punto 3) e completato il seed (punto 4).

---

## 6. Come funziona il pannello admin

- **Home / Chi Siamo / Contatti:** modifichi testi, immagini e **gallerie fotografiche**
  (puoi aggiungere più foto e rimuoverle con la X). Premendo **"Salva Modifiche"** i contenuti
  vengono salvati nella tabella `site_content` di Supabase.
- **Servizi:** sezione completa di gestione (CRUD):
  - **Aggiungi** un nuovo servizio con nome, descrizione, icona e una galleria di foto;
  - **Modifica** o **Elimina** (con conferma) i servizi esistenti;
  - **Riordina** i servizi con le frecce su/giù.
  - Ogni servizio è salvato come riga nella tabella `servizi`.
- **Immagini:** ogni foto caricata dal pannello va nel bucket `immagini-sito` di Supabase Storage
  e ottiene un URL pubblico **permanente**.

---

## 7. Persistenza (importante)

Grazie a Supabase, **tutte le modifiche fatte dal pannello sono permanenti** e sopravvivono ai
deploy di Vercel: sono salvate nel database e nello storage, non più sul filesystem effimero.

> Se le variabili Supabase non sono configurate, il sito continua comunque a funzionare mostrando
> i contenuti del file `src/data/content.json` (modalità di riserva), ma in quel caso il
> salvataggio permanente dal pannello non sarà disponibile.
