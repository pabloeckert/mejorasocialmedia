# 🚀 Prompt para Siguiente Sesión — MejoraSM

**Ubicación:** `Documents/PROMPT-SIGUIENTE-SESION.md`
**Repo:** https://github.com/pabloeckert/MejoraSM
**Producción:** https://util.mejoraok.com/MejoraSM/

---

## Copiar desde acá ↓

---

Estoy trabajando en **MejoraSocialMedia (EDA)** — sistema de gestión estratégica de contenidos en Instagram con IA para MejoraOK.

**Repo:** https://github.com/pabloeckert/MejoraSM
**Producción:** https://util.mejoraok.com/MejoraSM/
**Documentación:** `Documents/DOCUMENTACION.md` (documento único consolidado, v3.1)
**Setup Supabase:** `Documents/SUPABASE_SETUP.md`

## Estado actual (24/04/2026)

- ✅ Extensión Chrome v1.1.0 funcional (Manifest V3)
- ✅ Frontend React con 5 páginas + 4 hooks conectados
- ✅ Backend código listo (3 Edge Functions + schema SQL)
- ✅ Deploy automático (GitHub Actions → Hostinger)
- ✅ **9 tablas creadas en Supabase** (ejecutadas por bloques en SQL Editor)
- ✅ Bucket `vault` + políticas RLS + función RAG + 3 agentes seed
- ❌ **BLOQUEADOR: PostgREST no reconoce las tablas** (ver abajo)

## Bloqueador Crítico: PostgREST Schema Cache

Las 9 tablas existen en el schema `public` (verificadas con `pg_tables`), pero la API REST de Supabase no las ve. Error: `PGRST205: Could not find the table in the schema cache`.

**Ya intentado (no funcionó):**
- `NOTIFY pgrst, 'reload schema';`
- `SELECT pg_notify('pgrst', 'reload schema');`
- `GRANT ALL ON ALL TABLES IN SCHEMA public TO anon/authenticated;`
- Botón "Reload schema" en dashboard de Supabase

**Posibles soluciones a probar:**
1. **Reiniciar proyecto Supabase** — Project Settings → General → Restart project
2. **Usar Supabase CLI** — `supabase link + supabase db push` para forzar reconocimiento
3. **Verificar plan/free tier** — puede haber limitación en el plan gratuito
4. **Contactar soporte Supabase** — si nada funciona, es un bug del proyecto

## Tareas pendientes (ETAPA 1)

| # | Tarea | Estado |
|---|---|---|
| 1.1 | Ejecutar SQL schema en Supabase | ✅ (24/04, por bloques) |
| 1.2 | Crear bucket `vault` + políticas | ✅ (24/04) |
| 1.3 | **Resolver PostgREST schema cache** | ❌ BLOQUEADOR |
| 1.4 | Configurar API keys en Secrets | 🔲 (Groq, DeepSeek, Gemini) |
| 1.5 | Deploy Edge Functions | 🔲 (ai-gateway, orchestrator, vault-process) |
| 1.6 | Health check completo | 🔲 |

## Lo que quiero hacer hoy

[ESCRIBÍ ACÁ LO QUE QUERÉS LOGRAR EN ESTA SESIÓN]

## Información técnica

- **Supabase URL:** `https://exnjyxwmxknvzploeaex.supabase.co`
- **Supabase Project ID:** `exnjyxwmxknvzploeaex`
- **Tablas creadas:** documents, doc_chunks, agent_config, dialogue_sessions, dialogue_messages, proposals, calendar_events, metrics, success_rules
- **Agentes seed:** estratega (Groq), creativo (Groq), crítico (DeepSeek)
- **Storage bucket:** `vault` (privado)
- **Función SQL:** `match_documents(vector(384), int, real)` — búsqueda RAG

## Reglas

- Cuando diga **"documentar"**, actualizá `Documents/DOCUMENTACION.md` con los avances
- No toques archivos en `docs/` (legacy, solo lectura)
- Build: `npm install --legacy-peer-deps && npm run build`
- Tests: `npm test` (21 tests, Vitest)
- Documentación consolidada: `Documents/DOCUMENTACION.md` (v3.1)

---

## ↑ Hasta acá copiar
