-- ============================================================
-- Schema database Supabase — Caretti F.lli Snc
-- Esegui questo script nell'SQL Editor di Supabase (una sola volta).
-- ============================================================

-- Tabella per i contenuti generali (Home, Chi Siamo, Contatti)
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  home JSONB NOT NULL DEFAULT '{}',
  chi_siamo JSONB NOT NULL DEFAULT '{}',
  contatti JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabella per i servizi (ogni servizio è una riga)
CREATE TABLE IF NOT EXISTS servizi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descrizione TEXT NOT NULL,
  icona TEXT DEFAULT '',
  ordine INTEGER DEFAULT 0,
  foto TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Riga iniziale dei contenuti (verrà popolata dallo script di seed)
INSERT INTO site_content (id) VALUES ('main')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Row Level Security (RLS)
-- Le operazioni di scrittura passano SEMPRE dal backend Next.js
-- usando la SERVICE ROLE KEY, che bypassa la RLS.
-- Qui abilitiamo la lettura pubblica in modo che, volendo, anche
-- il client anonimo possa leggere i contenuti.
-- ============================================================

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE servizi ENABLE ROW LEVEL SECURITY;

-- Lettura pubblica dei contenuti
DROP POLICY IF EXISTS "Lettura pubblica site_content" ON site_content;
CREATE POLICY "Lettura pubblica site_content"
  ON site_content FOR SELECT
  USING (true);

-- Lettura pubblica dei servizi
DROP POLICY IF EXISTS "Lettura pubblica servizi" ON servizi;
CREATE POLICY "Lettura pubblica servizi"
  ON servizi FOR SELECT
  USING (true);

-- ============================================================
-- NOTA STORAGE:
-- Crea manualmente dal pannello Supabase un bucket chiamato
-- "immagini-sito" e impostalo come PUBLIC (vedi ADMIN_SETUP.md).
-- ============================================================
