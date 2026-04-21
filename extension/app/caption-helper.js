/**
 * MejoraINSSIST — Caption Helper Module
 * 
 * Detecta buyer persona del caption y sugiere hooks, CTAs y estructura.
 * Se integra con el flujo de creacion de posts de Instagram.
 */
(function() {
  'use strict';

  var MejoraCaptionHelper = {

    isActive: false,
    lastSuggestion: null,

    /**
     * Inicializa el modulo
     */
    init: function() {
      console.log("[MejoraOK] Caption Helper initialized");
      this._watchCaptionInputs();
      this._addUIElements();
    },

    /**
     * Observa inputs de caption en Instagram
     */
    _watchCaptionInputs: function() {
      var self = this;
      
      // Observer para detectar cuando se abre el creador de posts
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) {
              var textarea = node.querySelector ? 
                node.querySelector('textarea[placeholder*="caption"], textarea[placeholder*="Write a caption"], .PolarisCreationCaptionInput textarea') : null;
              if (textarea) {
                self._attachToTextarea(textarea);
              }
            }
          });
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });
    },

    /**
     * Adjunta el helper a un textarea de caption
     */
    _attachToTextarea: function(textarea) {
      var self = this;
      if (textarea._mejoraAttached) return;
      textarea._mejoraAttached = true;

      // Crear panel de sugerencias
      var panel = this._createSuggestionPanel();
      textarea.parentNode.insertBefore(panel, textarea.nextSibling);

      // Escuchar cambios
      var debounceTimer;
      textarea.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
          self._updateSuggestions(textarea.value, panel);
        }, 500);
      });
    },

    /**
     * Crea el panel visual de sugerencias
     */
    _createSuggestionPanel: function() {
      var panel = document.createElement('div');
      panel.id = 'mejora-caption-helper';
      panel.style.cssText = [
        'background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        'border: 1px solid #0f3460',
        'border-radius: 8px',
        'padding: 12px',
        'margin: 8px 0',
        'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        'font-size: 13px',
        'color: #e0e0e0',
        'display: none',
        'max-height: 300px',
        'overflow-y: auto'
      ].join(';');

      panel.innerHTML = '<div style="color: #e94560; font-weight: 700; margin-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">🎯 MejoraOK Caption Assistant</div>';

      return panel;
    },

    /**
     * Actualiza las sugerencias basado en el texto
     */
    _updateSuggestions: function(text, panel) {
      if (!text || text.length < 10) {
        panel.style.display = 'none';
        return;
      }

      // Detectar buyer persona
      var suggestion = MejoraOK.BuyerPersonas.suggestHooks(text);
      var packSuggestion = MejoraOK.HashtagPacks.suggestPack(text);

      if (!suggestion) {
        panel.style.display = 'none';
        return;
      }

      this.lastSuggestion = suggestion;
      panel.style.display = 'block';

      var html = '<div style="color: #e94560; font-weight: 700; margin-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">🎯 MejoraOK Caption Assistant</div>';

      // Persona detectada
      html += '<div style="margin-bottom: 10px; padding: 6px 10px; background: rgba(233,69,96,0.15); border-radius: 4px; font-size: 12px;">';
      html += '<strong>' + suggestion.persona.emoji + ' Perfil:</strong> ' + (suggestion.persona.label || 'General');
      html += '</div>';

      // Hooks sugeridos
      html += '<div style="margin-bottom: 8px;"><strong style="color: #53d8fb; font-size: 11px;">HOOKS SUGERIDOS:</strong></div>';
      suggestion.hooks.forEach(function(hook, i) {
        html += '<div class="mejora-hook-item" style="padding: 6px 8px; margin: 4px 0; background: rgba(83,216,251,0.08); border-radius: 4px; cursor: pointer; font-size: 12px; line-height: 1.4; border-left: 2px solid #53d8fb;"';
        html += ' onclick="navigator.clipboard.writeText(\'' + hook.replace(/'/g, "\\'") + '\')"';
        html += ' title="Click para copiar">';
        html += (i + 1) + '. ' + hook;
        html += '</div>';
      });

      // CTA
      html += '<div style="margin-top: 10px; padding: 6px 10px; background: rgba(83,216,251,0.1); border-radius: 4px; cursor: pointer; font-size: 12px;"';
      html += ' onclick="navigator.clipboard.writeText(\'' + suggestion.cta.replace(/'/g, "\\'") + '\')"';
      html += ' title="Click para copiar">';
      html += '<strong style="color: #53d8fb;">CTA:</strong> ' + suggestion.cta;
      html += '</div>';

      // Hashtag pack sugerido
      html += '<div style="margin-top: 10px;"><strong style="color: #f5a623; font-size: 11px;">HASHTAG PACK:</strong> ' + packSuggestion + '</div>';
      html += '<div style="padding: 6px 8px; margin: 4px 0; background: rgba(245,166,35,0.08); border-radius: 4px; cursor: pointer; font-size: 11px; word-break: break-all;"';
      html += ' onclick="navigator.clipboard.writeText(this.dataset.tags)"';
      html += ' data-tags="' + MejoraOK.HashtagPacks.getHashtagString(packSuggestion, 15).replace(/"/g, '&quot;') + '"';
      html += ' title="Click para copiar">';
      html += MejoraOK.HashtagPacks.getHashtagString(packSuggestion, 15);
      html += '</div>';

      // Generar caption completo
      html += '<div style="margin-top: 10px; text-align: center;">';
      html += '<button onclick="MejoraCaptionHelper.generateFullCaption()" style="background: #e94560; color: white; border: none; padding: 6px 16px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;">';
      html += '📝 GENERAR CAPTION COMPLETO</button>';
      html += '</div>';

      panel.innerHTML = html;
    },

    /**
     * Genera un caption completo y lo copia al clipboard
     */
    generateFullCaption: function() {
      if (!this.lastSuggestion) return;
      
      var persona = this.lastSuggestion.persona;
      var hook = persona.hooks[Math.floor(Math.random() * persona.hooks.length)];
      var cta = persona.cta;
      var packId = MejoraOK.HashtagPacks.suggestPack(hook);
      var tags = MejoraOK.HashtagPacks.getHashtagString(packId, 15);

      var fullCaption = hook + "\n\n" +
        "━━━━━━━━━━━━━━━━━━━\n\n" +
        "[Tu mensaje acá]\n\n" +
        "━━━━━━━━━━━━━━━━━━━\n\n" +
        "📩 " + cta + "\n" +
        "👆 Link en bio.\n\n" +
        tags;

      navigator.clipboard.writeText(fullCaption).then(function() {
        alert("✅ Caption copiado al clipboard!\nPegalo en el campo de texto.");
      });
    },

    /**
     * Agrega elementos UI al popup de la extension
     */
    _addUIElements: function() {
      // Se agrega al popup HTML si existe
      var root = document.getElementById('root');
      if (!root) return;

      // El panel se inyecta cuando se detecta el creador de posts
      console.log("[MejoraOK] Caption Helper UI ready");
    }
  };

  // Exponer globalmente
  window.MejoraCaptionHelper = MejoraCaptionHelper;

  // Auto-inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      MejoraCaptionHelper.init();
    });
  } else {
    MejoraCaptionHelper.init();
  }

})();
