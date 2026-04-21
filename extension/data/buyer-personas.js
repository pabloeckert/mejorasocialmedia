/**
 * MejoraOK Buyer Personas Database
 * 8 perfiles psicograficos del segmento argentino
 * Fuente: Documentacion interna MejoraOK / Mejora Continua
 */
var MejoraOK = MejoraOK || {};

MejoraOK.BuyerPersonas = {
  personas: {
    "emprendedor-saturado": {
      id: "emprendedor-saturado",
      label: "El Emprendedor Saturado",
      emoji: "🤯",
      keywords: ["mil cosas", "no doy mas", "no se por donde empezar", "saturado", "agotado", "apagando incendios", "desorden", "caos", "todo depende de mi"],
      hooks: [
        "Si vos no empujas, nada avanza. ¿Eso te suena?",
        "Tenés 47 cosas abiertas y ninguna cerrada. ¿Cuántas?",
        "Dejá de apagar incendios. Empezá a prevenirlos.",
        "El caos no es tu estilo. Es tu ausencia de sistema.",
        "¿Cuántas decisiones tenés postergadas HOY?"
      ],
      cta: "Agendá 30 min. Te devuelvo orden mental.",
      dolor: "No sabe qué priorizar, vive apagando incendios, no puede delegar",
      deseo: "Claridad mental, control, saber qué hacer primero",
      hashtags: ["#emprendedoresargentinos", "#ordenmental", "#claridadestrategica", "#negocioenchapuza", "#dejadeimprovisar", "#empresarioorganizado", "#crecimientorecargado"]
    },
    "lider-validacion": {
      id: "lider-validacion",
      label: "La Líder que Necesita Validación",
      emoji: "👑",
      keywords: ["liderando bien", "mi equipo", "no me siguen", "decisiones correctas", "inseguridad", "comunicacion", "alineacion", "autoridad"],
      hooks: [
        "¿Estás liderando o estás sosteniendo?",
        "Tu equipo no te sigue porque no sabe a dónde vas.",
        "La inseguridad no es debilidad. Es falta de criterio externo.",
        "Necesitás que alguien te diga la verdad sin miedo.",
        "¿Cuántas reuniones tuviste esta semana sin decisión?"
      ],
      cta: "Necesitás una mirada externa. Hablemos.",
      dolor: "Equipo desalineado, comunicación confusa, miedo a perder autoridad",
      deseo: "Ser una líder clara, escuchada, respetada y segura",
      hashtags: ["#liderazgorealdelalma", "#equiposrealineados", "#decisionesconclaridad", "#mujereslideres", "#liderazgoconsciente", "#comunicacionefectiva"]
    },
    "profesional-crecimiento": {
      id: "profesional-crecimiento",
      label: "El Profesional Independiente en Crecimiento",
      emoji: "📈",
      keywords: ["soy bueno", "no se diferenciarme", "uno mas del monton", "subir precios", "no saben lo que hago", "infravalorado", "estancado", "propuesta de valor"],
      hooks: [
        "Sabés que sos bueno. El problema es que no lo saben ellos.",
        "No necesitás más clientes. Necesitás mejores clientes.",
        "Si no podés explicar lo que hacés en una frase, perdés.",
        "Tu competencia no es mejor. Comunica mejor.",
        "¿Cuánto estás cobrando por lo que realmente vales?"
      ],
      cta: "Te ayudo a encontrar tu posicionamiento real.",
      dolor: "No tiene propuesta de valor clara, compite por precio, es invisible",
      deseo: "Ser reconocido, tener mensaje claro, atraer clientes que valoren",
      hashtags: ["#marcapersonal", "#propuestadevalor", "#profesionalesindependientes", "#diferenciacion", "#preciosjustos", "#comunicaciondevalor"]
    },
    "equipo-desalineado": {
      id: "equipo-desalineado",
      label: "El Equipo Desalineado",
      emoji: "🔀",
      keywords: ["cada uno hace lo suyo", "no entiendo que quiere", "reuniones eternas", "nadie decide", "no estamos tirando", "friccion", "roles", "prioridades"],
      hooks: [
        "Tu equipo no es vago. Está desorientado.",
        "Si todos empujan para lados distintos, nadie avanza.",
        "Las reuniones eternas son síntoma, no causa.",
        "¿Tu equipo sabe cuál es la prioridad #1 de esta semana?",
        "El problema nunca es la gente. Es la falta de marco."
      ],
      cta: "Un equipo alineado rinde 3x. Empezá hoy.",
      dolor: "Falta claridad en roles, prioridades, comunicación y dirección",
      deseo: "Visión compartida, menos fricción, roles definidos",
      hashtags: ["#equiposdealtorendimiento", "#alineacionestrategica", "#rolesdefinidos", "#comunicacioninterna", "#culturaorganizacional"]
    },
    "mal-asesorado": {
      id: "mal-asesorado",
      label: "El Empresario Mal Asesorado",
      emoji: "🔍",
      keywords: ["mal asesorado", "humo", "no me dicen la verdad", "informes", "proveedores", "consultores", "desconfianza", "sospecha"],
      hooks: [
        "¿Cuánto estás pagando por cosas que no sabés si sirven?",
        "Tu consultor habla difícil para justificar la factura.",
        "La sospecha no es paranoia. Es intuición.",
        "Si nadie te dice lo que está mal, tenés un problema serio.",
        "¿Cuántas veces cambiaste de proveedor este año?"
      ],
      cta: "Criterio externo sin humo. Solo la verdad.",
      dolor: "Paga por servicios dudosos, nadie le dice la verdad, rodeado de humo",
      deseo: "Claridad total, criterio real, información confiable",
      hashtags: ["#consultoríaquesirve", "#sinhumo", "#asesoramientoreal", "#criterioexterno", "#verdadsinmaquillaje", "#empresariosdespiertos"]
    },
    "nueva-generacion": {
      id: "nueva-generacion",
      label: "La Nueva Generación que Busca su Lugar",
      emoji: "🌱",
      keywords: ["no me valoran", "no se hacerme escuchar", "quiero crecer", "no me reconocen", "mi lugar", "potencial", "estructura", "feedback"],
      hooks: [
        "No te falta capacidad. Te falta claridad en tu rol.",
        "Sabés que podés más. Pero nadie te dice cómo.",
        "Tu lugar no te lo dan. Lo ocupás.",
        "Si esperás que te validen, vas a esperar mucho.",
        "¿Sabés cuál es tu valor real en esta empresa?"
      ],
      cta: "Te devuelvo un mapa. Tu lugar existe.",
      dolor: "Subestimado, invisible, sin marco claro de crecimiento",
      deseo: "Un rol con peso, mapa de crecimiento, feedback real",
      hashtags: ["#nuevageneracion", "#crecimientoprofesional", "#potencialreal", "#liderazgojoven", "#desarrollodecarrera"]
    },
    "vendedor-sin-resultados": {
      id: "vendedor-sin-resultados",
      label: "El Vendedor que No Ve Resultados",
      emoji: "💸",
      keywords: ["no vendo", "esfuerzo", "caja", "resultados", "competencia", "me desespero", "no se que hago mal", "numeros"],
      hooks: [
        "Vendés mucho y entra poco. El problema no es el esfuerzo.",
        "Si no mirás los números, estás manejando a ciegas.",
        "La desesperación se huele. Y espanta ventas.",
        "¿Sabés cuánto necesitás vender para estar tranquilo?",
        "Tu competencia no es mejor. Tiene sistema."
      ],
      cta: "Números claros, estrategia simple. Hablemos.",
      dolor: "Mucho esfuerzo sin resultados, no interpreta números, desesperación",
      deseo: "Ver resultados reales, sentirse en control, sistema simple",
      hashtags: ["#ventasconestrategia", "#numeroshablan", "#comercialefectivo", "#sistemadeventas", "#resultadosreales"]
    },
    "orden-para-crecer": {
      id: "orden-para-crecer",
      label: "El que Necesita Orden para Crecer",
      emoji: "⚡",
      keywords: ["creci rapido", "estoy a mil", "me encanta la propuesta", "no llego a todo", "desorden", "quiero ordenar", "no se por donde", "ahora no"],
      hooks: [
        "Creciste rápido. Bien. ¿Y ahora?",
        "Si seguís así, el desorden te frena.",
        "Tu negocio no está tan prolijo como vos.",
        "\"Me encanta la propuesta pero...\" — ese pero es miedo.",
        "El orden no es frenar. Es crecer sin sufrir."
      ],
      cta: "30 minutos. Te devuelvo foco. Sin compromiso.",
      dolor: "Creció sin estructura, miedo a que ordenar implique frenar",
      deseo: "Crecer con orden, trabajar mejor, tener paz mental",
      hashtags: ["#ordenparacrecer", "#crecimientoconestrategia", "#estructuraempresarial", "#negociosorganizados", "#crecimientosostenible"]
    }
  },

  /**
   * Detecta que buyer persona coincide con un texto
   * @param {string} text - Caption o texto a analizar
   * @returns {Array} Personas ordenadas por relevancia
   */
  detectPersona: function(text) {
    var lower = (text || "").toLowerCase();
    var scores = [];
    for (var id in this.personas) {
      var p = this.personas[id];
      var score = 0;
      p.keywords.forEach(function(kw) {
        if (lower.indexOf(kw) !== -1) score += 2;
      });
      if (score > 0) scores.push({ persona: p, score: score });
    }
    scores.sort(function(a, b) { return b.score - a.score; });
    return scores;
  },

  /**
   * Sugiere hooks para un texto dado
   * @param {string} text
   * @returns {Object} { persona, hooks, cta }
   */
  suggestHooks: function(text) {
    var detected = this.detectPersona(text);
    if (detected.length === 0) {
      // Devolver hooks generales de MejoraOK
      return {
        persona: { label: "General", emoji: "🎯" },
        hooks: [
          "¿Cuánto tiempo perdés en cosas que no importan?",
          "Si no tenés claro qué hacer, todo es urgente.",
          "La claridad no llega sola. Se busca.",
          "Tu competencia ya tiene foco. ¿Vos?",
          "Dejá de improvisar. Empezá a decidir."
        ],
        cta: "Agendá una llamada. 30 minutos. Sin humo."
      };
    }
    return {
      persona: detected[0].persona,
      hooks: detected[0].persona.hooks,
      cta: detected[0].persona.cta
    };
  },

  /**
   * Genera un caption completo con hook + cuerpo + CTA
   * @param {string} topic - Tema del post
   * @param {string} personaId - ID del buyer persona (opcional)
   * @returns {string} Caption formateado
   */
  generateCaption: function(topic, personaId) {
    var persona = personaId ? this.personas[personaId] : null;
    if (!persona) {
      var detected = this.detectPersona(topic);
      persona = detected.length > 0 ? detected[0].persona : null;
    }
    var hook = persona ? persona.hooks[Math.floor(Math.random() * persona.hooks.length)] : "¿Estás trabajando o estás improvisando?";
    var cta = persona ? persona.cta : "Agendá una llamada. 30 minutos.";
    
    return hook + "\n\n" +
      "━━━━━━━━━━━━━━━━━━\n\n" +
      topic + "\n\n" +
      "━━━━━━━━━━━━━━━━━━\n\n" +
      "📩 " + cta + "\n" +
      "👆 Link en bio.";
  }
};
