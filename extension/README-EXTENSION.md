# 🎯 MejoraINSSIST — Instagram Assistant para MejoraOK

Extensión Chrome personal optimizada para el nicho de **MejoraOK / Mejora Continua** — servicios de claridad estratégica para emprendedores, líderes y profesionales argentinos.

Fork basado en [INSSIST](https://github.com/zulfakar404/INSSIST-Pro-Mod-Chrome-Extentions) con módulos personalizados para tu segmento.

---

## 🚀 Qué tiene de diferente

INSSIST genérico sirve para cualquiera. **MejoraINSSIST** está diseñado para **tu audiencia específica**:

| INSSIST Original | MejoraINSSIST |
|---|---|
| Hashtags genéricos | 🏷️ Hashtag Packs por Buyer Persona argentino |
| Quick replies básicas | ⚡ 20+ replies de ventas con tono argentino |
| Sin contexto de nicho | 🎯 Caption Helper que detecta tu buyer persona |
| Música, Reels, Ghost | ❌ Eliminados (no los necesitás) |

---

## 📦 Módulos Incluidos

### 1. 🎯 Caption Helper
**Archivo:** `app/caption-helper.js`

Cuando escribís un caption en Instagram, detecta automáticamente qué Buyer Persona estás hablando y te sugiere:
- **Hooks** en tono argentino directo
- **CTA** específico para ese perfil
- **Hashtag Pack** optimizado

**Cómo funciona:**
1. Abrí el creador de posts en Instagram
2. Empezá a escribir tu caption
3. Aparece el panel de sugerencias de MejoraOK
4. Click en cualquier hook para copiarlo
5. "GENERAR CAPTION COMPLETO" te da un caption estructurado listo

### 2. 🏷️ Hashtag Packs
**Archivo:** `app/hashtag-packs.js` + `data/hashtags-db.js`

6 colecciones de hashtags organizadas por Buyer Persona:

| Pack | Para qué posts |
|---|---|
| 🤯 Emprendedor Saturado | Caos, desorden, falta de foco |
| 👑 Líder que Busca Validación | Liderazgo, equipos, decisiones |
| 📈 Profesional en Crecimiento | Posicionamiento, marca personal, precios |
| 🔀 Equipo Desalineado | Alineación, roles, comunicación |
| 🔍 Empresario Mal Asesorado | Humo, verdad, criterio externo |
| 🎯 General MejoraOK | Contenido de marca, reflexiones |

Cada pack tiene 3 niveles:
- **Low** (nicho): menos competencia, más alcance orgánico
- **Medium** (equilibrado): buen punto medio
- **High** (volumen): más tráfico, más competencia

**Distribución automática:** 40% low + 40% medium + 20% high

### 3. ⚡ Sales Quick Replies
**Archivo:** `app/sales-quick-replies.js` + `data/sales-replies.js`

24 respuestas rápidas para ventas por DM, organizadas por categoría:

**Saludo:** `/hola`, `/gracias-seguir`

**Objeciones:**
- `/no-plata` → "No tengo plata"
- `/no-tiempo` → "No tengo tiempo"
- `/no-listo` → "No estoy listo"
- `/ya-probe-todo` → "Ya probé de todo"
- `/pensarlo` → "Lo tengo que pensar"
- `/consultor-anterior` → "Malas experiencias con consultores"

**Seguimiento:**
- `/seguimiento-1` → Día 1
- `/seguimiento-3` → Día 3
- `/seguimiento-7` → Día 7 (último mensaje)

**Cierre:**
- `/cierre-suave` → Cierre suave
- `/cierre-directo` → Cierre directo
- `/cierre-urgencia` → Cierre con urgencia

**Info:**
- `/quien-soy` → Presentación
- `/que-hago` → Qué hacés
- `/como-funciona` → Cómo funciona

**Cómo usar:**
1. Abrí un DM en Instagram
2. Escribí `/` en el chat
3. Aparece el popup con todas las replies
4. Buscá por shortcut o categoría
5. Click para insertar en el chat

### 4. 📊 Core de INSSIST (conservado)

- ✅ **Post Later** — Scheduling con calendar y time slots
- ✅ **Dark/Wide/Zen Mode** — Modos de visualización
- ✅ **Multi-account** — Cambio de cuentas
- ✅ **Grid Preview** — Preview del feed antes de publicar
- ✅ **Post Assistant** — Publicar photos, videos, carousels

### 5. ❌ Módulos Eliminados

- ~~Music Assist~~ — No necesitás música para posts de coaching
- ~~Cover Assist~~ — Tus covers son screenshots o texto
- ~~Ghost Story View~~ — Investigación puntual, no diaria
- ~~Reels posting~~ — Tu contenido es imagen + texto
- ~~Billing/FastSpring~~ — Uso personal

---

## 👥 Los 8 Buyer Personas

Los datos están en `data/buyer-personas.js`:

1. 🤯 **El Emprendedor Saturado** — "No doy más, estoy en mil cosas"
2. 👑 **La Líder que Necesita Validación** — "¿Estaré liderando bien?"
3. 📈 **El Profesional Independiente** — "Soy bueno pero no lo saben"
4. 🔀 **El Equipo Desalineado** — "Cada uno hace lo suyo"
5. 🔍 **El Empresario Mal Asesorado** — "Estoy rodeado de humo"
6. 🌱 **La Nueva Generación** — "No me valoran, quiero crecer"
7. 💸 **El Vendedor sin Resultados** — "Trabajo mucho, no vendo"
8. ⚡ **El que Necesita Orden** — "Crecí rápido, ahora estoy desordenado"

---

## 🔧 Instalación

### Desarrollo
```bash
git clone https://github.com/pabloeckert/MejoraINSSIST.git
cd MejoraINSSIST
```

### Chrome
1. Abrí `chrome://extensions/`
2. Activá "Modo desarrollador" (arriba a la derecha)
3. Click "Cargar descomprimida"
4. Seleccioná la carpeta `MejoraINSSIST`
5. ¡Listo! El icono aparece en la barra de Chrome

---

## 📁 Estructura del Proyecto

```
MejoraINSSIST/
├── app/
│   ├── bg.js                    # Background (core INSSIST)
│   ├── caption-helper.js        # 🆕 Caption Helper por Buyer Persona
│   ├── hashtag-packs.js         # 🆕 Panel de Hashtag Packs
│   ├── sales-quick-replies.js   # 🆕 Quick Replies de Ventas
│   ├── ig-cs.js                 # Content Script (Instagram)
│   ├── ig-nj.js                 # Instagram injected script
│   ├── fb-cs.js                 # Content Script (Facebook)
│   ├── fb-nj.js                 # Facebook injected script
│   ├── cs.js                    # Content Script base
│   ├── nj.js                    # Injected script base
│   ├── pp.js                    # Post Assistant
│   └── viewer.js                # Viewer
├── data/
│   ├── buyer-personas.js        # 🆕 8 Buyer Personas de MejoraOK
│   ├── hashtags-db.js           # 🆕 Hashtag Packs por nicho
│   └── sales-replies.js         # 🆕 24 Quick Replies de Ventas
├── img/                         # Imágenes y assets
├── js/                          # Librerías externas
├── _locales/
│   ├── es/messages.json         # Español
│   └── en/messages.json         # Inglés
├── manifest.json                # Manifest V2
├── inssist.html                 # Popup principal
├── viewer.html                  # Viewer
└── README.md                    # Este archivo
```

---

## 🎨 Customización

### Agregar un Buyer Persona

Editá `data/buyer-personas.js` y agregá un objeto al diccionario `personas`:

```javascript
"mi-nuevo-perfil": {
  id: "mi-nuevo-perfil",
  label: "Mi Nuevo Perfil",
  emoji: "🔥",
  keywords: ["palabra1", "palabra2"],
  hooks: ["Hook 1", "Hook 2", "Hook 3"],
  cta: "Mi CTA aquí",
  hashtags: ["#tag1", "#tag2"]
}
```

### Agregar una Quick Reply

Editá `data/sales-replies.js`:

```javascript
"/mi-shortcut": {
  shortcut: "/mi-shortcut",
  label: "Descripción corta",
  content: "Contenido completo de la reply. {@name} se reemplaza por el nombre."
}
```

### Modificar Hashtag Packs

Editá `data/hashtags-db.js`:

```javascript
"mi-pack": {
  label: "🔥 Mi Pack",
  description: "Para posts sobre X tema",
  low: ["#tag-nicho-1", "#tag-nicho-2"],
  medium: ["#tag-medio-1", "#tag-medio-2"],
  high: ["#tag-general-1", "#tag-general-2"]
}
```

---

## 📊 Roadmap

- [x] Caption Helper por Buyer Persona
- [x] Hashtag Packs con engagement levels
- [x] Sales Quick Replies con categorías
- [x] Eliminación de módulos innecesarios
- [ ] Analytics de qué hooks convierten mejor
- [ ] A/B testing de captions
- [ ] Exportar/importar configuración
- [ ] Integración con calendario de contenido
- [ ] Auto-post en horarios óptimos por zona horaria AR

---

## 📝 Notas

- Extensión para **uso personal** — no es un producto comercial
- Basada en INSSIST v24.0.1 (Manifest V2)
- Los datos de buyer personas están basados en documentación interna de MejoraOK
- Los hashtags están optimizados para el mercado argentino

---

## 📬 Contacto

- Instagram: [@mejoraok](https://instagram.com/mejoraok)
- Email: contacto@mejoraok.com

---

## ⚖️ Licencia

Uso personal. Basado en INSSIST (proyecto educativo).
