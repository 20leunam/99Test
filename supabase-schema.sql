-- ═══════════════════════════════════════════════════════════
--  99Test — Esquema para Supabase (Ranking Global)
--  Ejecutar en: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════

-- 1. Crear la tabla de rankings
CREATE TABLE rankings (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  alias TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  pct INTEGER NOT NULL,
  test_id INTEGER,
  test_title TEXT,
  date TEXT
);

-- 2. Activar Row Level Security
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;

-- 3. Permitir lectura pública (para mostrar el ranking)
CREATE POLICY "Lectura pública del ranking"
  ON rankings FOR SELECT
  USING (true);

-- 4. Permitir inserción anónima (para que cualquiera guarde su puntuación)
CREATE POLICY "Inserción anónima en ranking"
  ON rankings FOR INSERT
  WITH CHECK (true);

-- 5. Índice para ordenar rápido por puntuación
CREATE INDEX idx_rankings_pct ON rankings (pct DESC, score DESC);

-- ═══════════════════════════════════════════════════════════
--  Tabla: sugerencias de tests
-- ═══════════════════════════════════════════════════════════

CREATE TABLE suggestions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  suggestion TEXT NOT NULL,
  author TEXT DEFAULT 'Anónimo'
);

ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de sugerencias"
  ON suggestions FOR SELECT
  USING (true);

CREATE POLICY "Inserción anónima de sugerencias"
  ON suggestions FOR INSERT
  WITH CHECK (true);
