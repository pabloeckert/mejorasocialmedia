/**
 * MejoraOK Hashtag Packs
 * Colecciones de hashtags optimizadas para el nicho argentino
 * de claridad estrategica, coaching empresarial y consultoria
 * 
 * Niveles de engagement:
 *   low    = nicho especifico, menos competencia, mas alcance organico
 *   medium = equilibrio entre alcance y relevancia  
 *   high   = mas volumen, mas competencia
 */
var MejoraOK = MejoraOK || {};

MejoraOK.HashtagPacks = {

  // ═══════════════════════════════════════════════════════════
  // PACKS POR BUYER PERSONA
  // ═══════════════════════════════════════════════════════════
  
  packs: {
    "emprendedor-saturado": {
      label: "🤯 Emprendedor Saturado",
      description: "Para posts sobre caos, desorden, falta de foco",
      low: [
        "#ordenmental", "#claridadparaemprender", "#negocioenchapuza",
        "#dejadeimprovisar", "#empresarioorganizado", "#focoestrategico",
        "#menteenorden", "#caosnoescrecimiento"
      ],
      medium: [
        "#emprendedoresargentinos", "#claridadestrategica", "#crecimientorecargado",
        "#empresarioslatinos", "#negociosconproposito", "#emprendedoreslatinos",
        "#desarrolloempresarial"
      ],
      high: [
        "#emprendedor", "#emprendedores", "#negocios", "#emprender",
        "#empresa", "#empresario", "#negocio", "#motivacion"
      ]
    },

    "lider-validacion": {
      label: "👑 Líder que Busca Validación",
      description: "Para posts sobre liderazgo, equipos, decisiones",
      low: [
        "#liderazgorealdelalma", "#equiposrealineados", "#decisionesconclaridad",
        "#mujereslideres", "#liderazgoconsciente", "#comunicacionefectiva",
        "#liderconproposito", "#gestiondeequipos"
      ],
      medium: [
        "#liderazgo", "#liderazgofemenino", "#equiposdetrabajo",
        "#management", "#desarrollodeliderazgo", "#coachingdeliderazgo",
        "#lidereslatinos"
      ],
      high: [
        "#liderazgo", "#equipo", "#lider", "#gerencia",
        "#management", "#trabajoenequipo", "#coaching"
      ]
    },

    "profesional-crecimiento": {
      label: "📈 Profesional en Crecimiento",
      description: "Para posts sobre posicionamiento, marca personal, precios",
      low: [
        "#marcapersonal", "#propuestadevalor", "#profesionalesindependientes",
        "#diferenciacionestrategica", "#preciosjustos", "#comunicaciondevalor",
        "#profesionalconsciente", "#posicionamientoautentico"
      ],
      medium: [
        "#marcapersonal", "#profesionales", "#trabajoindependiente",
        "#freelance", "#consultor", "#coachingprofesional",
        "#desarrollodecarrera"
      ],
      high: [
        "#marca", "#profesional", "#freelance", "#consultoria",
        "#carrera", "#exito", "#trabajo"
      ]
    },

    "equipo-desalineado": {
      label: "🔀 Equipo Desalineado",
      description: "Para posts sobre alineacion, roles, comunicacion interna",
      low: [
        "#equiposdealtorendimiento", "#alineacionestrategica", "#rolesdefinidos",
        "#comunicacioninterna", "#culturaorganizacional", "#equiposproductivos",
        "#sinergiadeequipo"
      ],
      medium: [
        "#equiposdetrabajo", "#culturaempresa", "#trabajoenequipo",
        "#organizacion", "#rrhh", "#gestionhumana",
        "#climaorganizacional"
      ],
      high: [
        "#equipo", "#trabajo", "#empresa", "#organizacion",
        "#rrhh", "#teamwork", "#oficina"
      ]
    },

    "mal-asesorado": {
      label: "🔍 Empresario Mal Asesorado",
      description: "Para posts sobre humo, verdad, criterio externo",
      low: [
        "#consultoríaquesirve", "#sinhumo", "#asesoramientoreal",
        "#criterioexterno", "#verdadsinmaquillaje", "#empresariosdespiertos",
        "#asesoramientohonesto", "#consultoriaconvalor"
      ],
      medium: [
        "#consultoriaempresarial", "#asesoramiento", "#consultores",
        "#transformacionempresarial", "#estrategiaempresarial",
        "#consultoriaestrategica"
      ],
      high: [
        "#consultoria", "#empresa", "#negocio", "#estrategia",
        "#asesoramiento", "#consultor", "#management"
      ]
    },

    "general-mejoraok": {
      label: "🎯 General MejoraOK",
      description: "Para posts de marca, reflexiones, contenido pillar",
      low: [
        "#mejoraok", "#mejoracontinua", "#claridadtotal",
        "#criterioaplicado", "#ordenynoescaos", "#sinenvoltorio",
        "#hablarencristiano", "#argentinopuro"
      ],
      medium: [
        "#desarrollopersonal", "#crecimientopersonal", "#coachingargentina",
        "#consultoriaargentina", "#mentesestrategicas", "#pensamientoestrategico",
        "#transformacionpersonal"
      ],
      high: [
        "#coaching", "#desarrollo", "#crecimiento", "#exito",
        "#motivacion", "#cambio", "#transformacion"
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════
  // ROTACION INTELIGENTE
  // ═══════════════════════════════════════════════════════════
  
  _lastUsed: {},
  _usageFile: "hashtag-packs.usage",

  /**
   * Obtiene un set balanceado de hashtags (max 30 por post de IG)
   * Distribucion: 40% low + 40% medium + 20% high
   * @param {string} packId - ID del pack
   * @param {number} count - Cantidad total (default 20)
   * @returns {string[]} Array de hashtags
   */
  getBalancedSet: function(packId, count) {
    count = count || 20;
    var pack = this.packs[packId];
    if (!pack) return [];

    var lowCount = Math.round(count * 0.4);
    var medCount = Math.round(count * 0.4);
    var highCount = count - lowCount - medCount;

    var result = [];
    result = result.concat(this._pickRandom(pack.low, lowCount));
    result = result.concat(this._pickRandom(pack.medium, medCount));
    result = result.concat(this._pickRandom(pack.high, highCount));

    return result;
  },

  /**
   * Genera string de hashtags listo para copiar al caption
   * @param {string} packId
   * @param {number} count
   * @returns {string}
   */
  getHashtagString: function(packId, count) {
    return this.getBalancedSet(packId, count).join(" ");
  },

  /**
   * Detecta el mejor pack basado en el contenido del caption
   * @param {string} caption
   * @returns {string} packId
   */
  suggestPack: function(caption) {
    var lower = (caption || "").toLowerCase();
    var bestPack = "general-mejoraok";
    var bestScore = 0;

    for (var id in this.packs) {
      var pack = this.packs[id];
      var score = 0;
      var allTags = pack.low.concat(pack.medium);
      allTags.forEach(function(tag) {
        var clean = tag.replace("#", "").toLowerCase();
        if (lower.indexOf(clean) !== -1) score++;
      });
      if (score > bestScore) {
        bestScore = score;
        bestPack = id;
      }
    }
    return bestPack;
  },

  /**
   * Rota los hashtags para no repetir siempre los mismos
   * Usa fecha del dia como seed para consistencia
   * @param {string[]} tags
   * @param {number} count
   * @returns {string[]}
   */
  _pickRandom: function(tags, count) {
    if (!tags || tags.length === 0) return [];
    if (tags.length <= count) return tags.slice();

    // Seed por dia para que no cambien en cada carga
    var today = new Date();
    var seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    var shuffled = tags.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      var j = seed % (i + 1);
      var temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled.slice(0, count);
  },

  /**
   * Obtiene todos los pack IDs disponibles
   * @returns {string[]}
   */
  getPackIds: function() {
    return Object.keys(this.packs);
  },

  /**
   * Obtiene info de un pack
   * @param {string} packId
   * @returns {Object}
   */
  getPackInfo: function(packId) {
    return this.packs[packId] || null;
  }
};
