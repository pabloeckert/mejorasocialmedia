# 🔧 MejoraSocialMedia — Sistema EDA

**Estrategia Digital Autónoma** para MejoraOK / Mejora Continua.

Sistema completo de gestión estratégica de contenidos en Instagram mediante múltiples agentes de IA.

---

## Estructura del Proyecto

```
mejorasocialmedia/
├── src/                ← Frontend web (Lovable/React)
├── extension/          ← Extensión Chrome (MejoraINSSIST)
├── backend/            ← Servidor EDA multi-agente (Fase 2)
├── dashboard/          ← Panel web de supervisión (Fase 5)
├── docs/               ← Documentación y especificaciones
├── supabase/           ← Configuración Supabase
└── public/             ← Assets públicos
```

---

## Estado Actual

### ✅ Fase 1 — Extensión Chrome v1.1.0
- Botón flotante 🎯 en Instagram
- Caption Helper por Buyer Persona (8 perfiles argentinos)
- Hashtag Packs con niveles de engagement (6 packs)
- Quick Replies de ventas (24 respuestas)
- Auto-detección de `/` en DMs
- Core INSSIST: Post Later, Dark/Wide/Zen Mode, multi-cuenta

### 🔲 Fase 2 — Backend EDA (Pendiente)
- Servidor multi-agente (Ollama + Groq + DeepSeek)
- Bóveda de conocimiento (RAG)
- Mesa de Diálogo multi-agente

### 🔲 Fase 3-6 — Ver docs/PLAN-DE-TRABAJO.md

---

## Instalación Rápida

### Extensión Chrome
1. Clonar este repo
2. Abrir `chrome://extensions/`
3. Activar "Modo desarrollador"
4. "Cargar descomprimida" → seleccionar carpeta `extension/`
5. Ir a `instagram.com`

### Frontend Web
```bash
npm install
npm run dev
```

---

## Documentación

| Documento | Descripción |
|---|---|
| [Estado Actual](docs/ESTADO-ACTUAL.md) | Estado del proyecto |
| [Arquitectura](docs/ARQUITECTURA.md) | Arquitectura técnica |
| [Plan de Trabajo](docs/PLAN-DE-TRABAJO.md) | Roadmap por fases |
| [Pendientes](docs/PENDIENTES.md) | Tareas y blockers |
| [Deploy](docs/DEPLOY.md) | Guía de deployment |
| [IA Gratuita](docs/IA-GRATUITA.md) | Catálogo de IAs gratuitas |
| [Spec EDA](docs/SPEC-EDA.md) | Especificación del sistema |

---

## Contacto
- Instagram: [@mejoraok](https://instagram.com/mejoraok)
- Email: contacto@mejoraok.com

---

*Basado en INSSIST (proyecto educativo). Uso personal.*
