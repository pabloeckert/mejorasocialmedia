/**
 * MejoraOK Sales Quick Replies
 * Respuestas rapidas para DM de ventas, objeciones y seguimiento
 * Tono: argentino, directo, emocional, sin vueltas
 */
var MejoraOK = MejoraOK || {};

MejoraOK.SalesReplies = {

  replies: {

    // ═══════════════════════════════════════════
    // SALUDO INICIAL
    // ═══════════════════════════════════════════
    "/hola": {
      shortcut: "/hola",
      label: "Saludo inicial",
      content: "Hola {@name}! Gracias por escribir. ¿En qué te puedo ayudar? Contame un poco qué situación estás viviendo y vemos si puedo aportarte algo de claridad."
    },
    "/gracias-seguir": {
      shortcut: "/gracias-seguir",
      label: "Gracias por seguir",
      content: "Hola {@name}! Gracias por seguir la cuenta. Si en algún momento necesitás una mirada externa sobre tu negocio o equipo, estoy acá. Sin compromiso."
    },

    // ═══════════════════════════════════════════
    // OBJECIONES COMUNES
    // ═══════════════════════════════════════════
    "/no-plata": {
      shortcut: "/no-plata",
      label: "Objeción: no tengo plata",
      content: "Entiendo perfecto {@name}. Pero pensalo así: si seguís como estás, ¿cuánto te está costando el desorden? No es una inversión, es un filtro. Si ahora no podés invertir en claridad, el caos te está cobrando mucho más de lo que imaginás."
    },
    "/no-tiempo": {
      shortcut: "/no-tiempo",
      label: "Objeción: no tengo tiempo",
      content: "Justamente por eso {@name}. No necesitás más tiempo. Necesitás saber qué soltar. En 30 minutos te puedo mostrar exactamente qué está frenando tu avance. ¿Te animás?"
    },
    "/no-listo": {
      shortcut: "/no-listo",
      label: "Objeción: no estoy listo",
      content: "Nadie está \"listo\" para enfrentar su desorden {@name}. Si esperás a estar listo, vas a esperar mucho. Lo que sí puedo decirte es: después de la primera sesión, vas a ver las cosas distinto. ¿Probamos?"
    },
    "/ya-probe-todo": {
      shortcut: "/ya-probe-todo",
      label: "Objeción: ya probé de todo",
      content: "Perfecto {@name}. Entonces sabés lo que NO funciona. La diferencia acá es que no te vendo humo ni procesos de 6 meses. 30 minutos. Si no te aporto nada, te lo digo yo. ¿Te parece?"
    },
    "/pensarlo": {
      shortcut: "/pensarlo",
      label: "Objeción: lo tengo que pensar",
      content: "Dale {@name}, pensalo. Pero una cosa: si estás acá escribiéndome, algo te está haciendo ruido. Ese ruido no se va a ir solo. Cuando estés listo, escribime."
    },
    "/consultor-anterior": {
      shortcut: "/consultor-anterior",
      label: "Objeción: tuve malas experiencias con consultores",
      content: "Lo entiendo {@name}. El problema es que hay mucho humo en el mercado. La diferencia acá es simple: no te pido que confíes en mí. Pedí una sesión de 30 minutos. Si no te aporto valor real, te lo digo yo y no perdés nada."
    },

    // ═══════════════════════════════════════════
    // SEGUIMIENTO
    // ═══════════════════════════════════════════
    "/seguimiento-1": {
      shortcut: "/seguimiento-1",
      label: "Seguimiento día 1",
      content: "Hola {@name}! Te escribo por lo que hablamos ayer. ¿Pensaste en lo que charlamos? Si querés que lo veamos con más detalle, agendamos 30 minutos."
    },
    "/seguimiento-3": {
      shortcut: "/seguimiento-3",
      label: "Seguimiento día 3",
      content: "{@name}, ¿cómo va? Sé que estás en mil cosas, pero lo que hablamos sigue siendo relevante. El desorden no se resuelve solo. ¿Lo dejamos pasar o lo atacamos?"
    },
    "/seguimiento-7": {
      shortcut: "/seguimiento-7",
      label: "Seguimiento día 7",
      content: "Último mensaje {@name}. No te voy a insistir más. Pero si en algún momento sentís que necesitás una mirada externa, sabés dónde encontrarme. Sin presión, sin humo."
    },

    // ═══════════════════════════════════════════
    // CIERRE
    // ═══════════════════════════════════════════
    "/cierre-suave": {
      shortcut: "/cierre-suave",
      label: "Cierre suave",
      content: "{@name}, si sentís que esto puede aportarte algo, agendá acá: [LINK]. 30 minutos. Sin compromiso. Si no es para vos, te lo digo yo."
    },
    "/cierre-directo": {
      shortcut: "/cierre-directo",
      label: "Cierre directo",
      content: "Bueno {@name}, llegamos al punto. Si querés claridad, orden y criterio, agendá: [LINK]. Si no, todo bien. Pero el caos no se resuelve solo."
    },
    "/cierre-urgencia": {
      shortcut: "/cierre-urgencia",
      label: "Cierre con urgencia",
      content: "{@name}, este mes solo tengo 4 lugares disponibles. Si querés agarrar uno, escribime \"agendo\" y te paso el link. Si no, no pasa nada, seguimos en contacto."
    },

    // ═══════════════════════════════════════════
    // CONTENIDO / EDUCACIÓN
    // ═══════════════════════════════════════════
    "/quien-soy": {
      shortcut: "/quien-soy",
      label: "Quién soy (presentación)",
      content: "Soy de MejoraOK. Ayudo a emprendedores, líderes y profesionales a ordenar su mente, sus decisiones y su dirección. No vendo cursos. No vendo motivación. Te devuelvo claridad en 30 minutos."
    },
    "/que-hago": {
      shortcut: "/que-hago",
      label: "Qué hago",
      content: "Hago una cosa: te devuelvo claridad. Cuando estás saturado, perdido o rodeado de humo, yo te digo exactamente qué hacer, qué soltar y por dónde empezar. Sin procesos de 6 meses. Directo."
    },
    "/como-funciona": {
      shortcut: "/como-funciona",
      label: "Cómo funciona",
      content: "Simple: 1) Agendás 30 minutos. 2) Me contás tu situación. 3) Yo te devuelvo un diagnóstico claro y un plan de acción simple. 4) Si te sirve, seguimos. Si no, nos despedimos bien."
    },

    // ═══════════════════════════════════════════
    // RESPUESTAS A COMENTARIOS
    // ═══════════════════════════════════════════
    "/comentario-positivo": {
      shortcut: "/comentario-positivo",
      label: "Responder comentario positivo",
      content: "Gracias {@name}! Me alegro que resuene. Si en algún momento necesitás profundizar, escribime por DM. 🙌"
    },
    "/comentario-pregunta": {
      shortcut: "/comentario-pregunta",
      label: "Responder pregunta en comentario",
      content: "Buena pregunta {@name}! Te respondo por DM para darte una respuesta completa sin saturar los comentarios. 📩"
    },
    "/comentario-negativo": {
      shortcut: "/comentario-negativo",
      label: "Responder comentario negativo",
      content: "Respeto tu opinión {@name}. Si querés debatirlo con fundamentos, escribime por DM. Acá compartimos para sumar, no para restar."
    }
  },

  /**
   * Obtiene todas las replies como array
   * @returns {Array}
   */
  getAll: function() {
    var result = [];
    for (var key in this.replies) {
      result.push(this.replies[key]);
    }
    return result;
  },

  /**
   * Busca reply por shortcut
   * @param {string} shortcut
   * @returns {Object|null}
   */
  findByShortcut: function(shortcut) {
    return this.replies[shortcut] || null;
  },

  /**
   * Reemplaza variables en el contenido
   * Variables: {@name}, {fecha}, [LINK]
   * @param {string} content
   * @param {Object} vars - { name, link }
   * @returns {string}
   */
  render: function(content, vars) {
    vars = vars || {};
    var result = content;
    result = result.replace(/{@name}/g, vars.name || "");
    result = result.replace(/{fecha}/g, vars.fecha || new Date().toLocaleDateString("es-AR"));
    result = result.replace(/\[LINK\]/g, vars.link || "[TU LINK AQUÍ]");
    return result;
  },

  /**
   * Obtiene replies por categoria
   * @param {string} category - objecion | seguimiento | cierre | contenido
   * @returns {Array}
   */
  getByCategory: function(category) {
    var categories = {
      "saludo": ["/hola", "/gracias-seguir"],
      "objecion": ["/no-plata", "/no-tiempo", "/no-listo", "/ya-probe-todo", "/pensarlo", "/consultor-anterior"],
      "seguimiento": ["/seguimiento-1", "/seguimiento-3", "/seguimiento-7"],
      "cierre": ["/cierre-suave", "/cierre-directo", "/cierre-urgencia"],
      "contenido": ["/quien-soy", "/que-hago", "/como-funciona"],
      "comentarios": ["/comentario-positivo", "/comentario-pregunta", "/comentario-negativo"]
    };
    var ids = categories[category] || [];
    var self = this;
    return ids.map(function(id) { return self.replies[id]; }).filter(Boolean);
  }
};
