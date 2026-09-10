# Guida al Pannello Admin — Caretti F.lli

## 1. Credenziali di accesso

- **URL pannello admin:** `/admin` (es. https://carettifratellisito.vercel.app/admin)
- **Pagina di login:** `/admin/login`
- **Nome utente:** `admin`
- **Password:** `CarettiFratelli2024!`

> La password è memorizzata come hash bcrypt (mai in chiaro) nelle variabili d'ambiente.

## 2. Variabili d'ambiente da configurare su Vercel

Vai su **Vercel → Progetto → Settings → Environment Variables** e aggiungi (Environment: Production, Preview, Development):

| Nome | Valore |
|------|--------|
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD` | `$2a$10$aLzRpS2pfpRFMWyxVKKlKu8cEd.UmBui4z/zsB3.wXT8zVqysXzjW` |
| `NEXTAUTH_SECRET` | `1d0f77f8603dcf096e4858e9526d2065caf027f6ea1b8eaa3a268f9e013a50ae` |
| `NEXTAUTH_URL` | `https://carettifratellisito.vercel.app` |

> IMPORTANTE: su Vercel incolla il valore di `ADMIN_PASSWORD` **così com'è**, con i simboli `$` (senza backslash).
> Vercel NON interpreta i simboli `$`. Nel file locale `.env.local` invece i `$` sono preceduti da `\` (backslash)
> perché Next.js in locale li interpreterebbe come variabili.

Dopo aver aggiunto le variabili, esegui un nuovo **Redeploy** del progetto su Vercel.

## 3. Come caricare il codice su GitHub (per aggiornare il sito Vercel)

Il repository è collegato a Vercel: ogni push su GitHub avvia automaticamente un nuovo deploy.

```bash
cd caretti_fratelli_sito
git add .
git commit -m "Aggiunta pannello admin CMS"
git push origin main
```

Vercel rileverà il push e ricostruirà il sito. Ricordati di aver prima configurato le variabili d'ambiente (punto 2).

## 4. Come funziona

- I contenuti editabili del sito sono salvati in `src/data/content.json`.
- Le pagine pubbliche (Home, Chi Siamo, Servizi, Contatti) leggono i testi e le immagini da questo file.
- Dal pannello admin puoi modificare i testi e caricare immagini (salvate in `public/uploads/`).
- Premendo **"Salva Modifiche"** i contenuti vengono riscritti in `content.json`.

## 5. Nota importante sul salvataggio in produzione (Vercel)

Su Vercel il filesystem è **effimero**: le modifiche salvate su `content.json` e le immagini caricate
persistono durante l'esecuzione, ma **possono essere azzerate ad ogni nuovo deploy** (tornando ai valori
presenti nel repository). Per rendere permanenti le modifiche fatte dal pannello in produzione, dopo averle
salvate conviene fare commit del `content.json` aggiornato (e delle immagini in `public/uploads/`) su GitHub.
In alternativa, per una persistenza reale si consiglia in futuro un database o uno storage esterno (es. Vercel Blob).
