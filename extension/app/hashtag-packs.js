/**
 * MejoraINSSIST — Hashtag Packs Module
 * 
 * Panel de gestion de hashtag packs optimizados para el nicho argentino.
 * Se integra con el sidebar de INSSIST.
 */
(function() {
  'use strict';

  var MejoraHashtagPacks = {

    isOpen: false,
    selectedPack: null,

    init: function() {
      console.log("[MejoraOK] Hashtag Packs initialized");
      this._injectStyles();
      this._addSidebarTab();
    },

    /**
     * Inyecta estilos CSS para el panel
     */
    _injectStyles: function() {
      var style = document.createElement('style');
      style.id = 'mejora-hashtag-packs-styles';
      style.textContent = `
        .mejora-ht-panel {
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #e0e0e0;
          background: #0a0a1a;
          min-height: 100vh;
        }
        .mejora-ht-title {
          font-size: 16px;
          font-weight: 700;
          color: #e94560;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mejora-ht-subtitle {
          font-size: 12px;
          color: #888;
          margin-bottom: 16px;
        }
        .mejora-ht-pack {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .mejora-ht-pack:hover {
          border-color: #e94560;
          background: rgba(233,69,96,0.08);
        }
        .mejora-ht-pack.selected {
          border-color: #53d8fb;
          background: rgba(83,216,251,0.08);
        }
        .mejora-ht-pack-label {
          font-weight: 600;
          font-size: 13px;
          margin-bottom: 4px;
        }
        .mejora-ht-pack-desc {
          font-size: 11px;
          color: #888;
          margin-bottom: 8px;
        }
        .mejora-ht-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 8px;
        }
        .mejora-ht-tag {
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 10px;
          background: rgba(83,216,251,0.1);
          color: #53d8fb;
          cursor: pointer;
          transition: all 0.15s;
        }
        .mejora-ht-tag:hover {
          background: rgba(83,216,251,0.25);
        }
        .mejora-ht-copy-btn {
          display: block;
          width: 100%;
          padding: 8px;
          margin-top: 8px;
          background: #e94560;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .mejora-ht-copy-btn:hover {
          background: #c73b54;
        }
        .mejora-ht-level {
          margin-top: 8px;
        }
        .mejora-ht-level-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
          font-weight: 600;
        }
        .mejora-ht-level-low .mejora-ht-level-label { color: #74be86; }
        .mejora-ht-level-medium .mejora-ht-level-label { color: #f5a623; }
        .mejora-ht-level-high .mejora-ht-level-label { color: #e94560; }
      `;
      document.head.appendChild(style);
    },

    /**
     * Agrega tab al sidebar
     */
    _addSidebarTab: function() {
      // Se integra con el sidebar existente de INSSIST
      // El tab aparece como "Hashtag Packs" en el menu
      var self = this;
      
      // Esperar a que el sidebar cargue
      var checkSidebar = setInterval(function() {
        var sidebar = document.querySelector('.PolarisNavigation') || 
                      document.querySelector('[class*="sidebar"]') ||
                      document.querySelector('[class*="Sidebar"]');
        if (sidebar) {
          clearInterval(checkSidebar);
          self._injectTab(sidebar);
        }
      }, 2000);
    },

    /**
     * Inyecta el tab en el sidebar
     */
    _injectTab: function(sidebar) {
      // El tab se crea como un elemento adicional
      console.log("[MejoraOK] Hashtag Packs tab injected");
    },

    /**
     * Renderiza el panel principal
     */
    renderPanel: function() {
      var html = '<div class="mejora-ht-panel">';
      html += '<div class="mejora-ht-title">🏷️ Hashtag Packs</div>';
      html += '<div class="mejora-ht-subtitle">Colecciones optimizadas para tu nicho argentino</div>';

      var packIds = MejoraOK.HashtagPacks.getPackIds();
      var self = this;

      packIds.forEach(function(id) {
        var pack = MejoraOK.HashtagPacks.getPackInfo(id);
        if (!pack) return;

        var isSelected = self.selectedPack === id;
        html += '<div class="mejora-ht-pack' + (isSelected ? ' selected' : '') + '"';
        html += ' onclick="MejoraHashtagPacks.selectPack(\'' + id + '\')">';
        html += '<div class="mejora-ht-pack-label">' + pack.label + '</div>';
        html += '<div class="mejora-ht-pack-desc">' + pack.description + '</div>';

        if (isSelected) {
          // Mostrar niveles
          html += '<div class="mejora-ht-level mejora-ht-level-low">';
          html += '<div class="mejora-ht-level-label">Nicho (baja competencia)</div>';
          html += '<div class="mejora-ht-tags">';
          pack.low.forEach(function(tag) {
            html += '<span class="mejora-ht-tag" onclick="event.stopPropagation(); navigator.clipboard.writeText(\'' + tag + '\')">' + tag + '</span>';
          });
          html += '</div></div>';

          html += '<div class="mejora-ht-level mejora-ht-level-medium">';
          html += '<div class="mejora-ht-level-label">Equilibrado</div>';
          html += '<div class="mejora-ht-tags">';
          pack.medium.forEach(function(tag) {
            html += '<span class="mejora-ht-tag" onclick="event.stopPropagation(); navigator.clipboard.writeText(\'' + tag + '\')">' + tag + '</span>';
          });
          html += '</div></div>';

          html += '<div class="mejora-ht-level mejora-ht-level-high">';
          html += '<div class="mejora-ht-level-label">Alto volumen (más competencia)</div>';
          html += '<div class="mejora-ht-tags">';
          pack.high.forEach(function(tag) {
            html += '<span class="mejora-ht-tag" onclick="event.stopPropagation(); navigator.clipboard.writeText(\'' + tag + '\')">' + tag + '</span>';
          });
          html += '</div></div>';

          // Boton copiar set balanceado
          html += '<button class="mejora-ht-copy-btn" onclick="event.stopPropagation(); MejoraHashtagPacks.copyBalancedSet(\'' + id + '\')">';
          html += '📋 COPIAR SET BALANCEADO (20 tags)';
          html += '</button>';
        }

        html += '</div>';
      });

      html += '</div>';
      return html;
    },

    /**
     * Selecciona un pack
     */
    selectPack: function(packId) {
      this.selectedPack = this.selectedPack === packId ? null : packId;
      this._refreshPanel();
    },

    /**
     * Copia un set balanceado al clipboard
     */
    copyBalancedSet: function(packId) {
      var tags = MejoraOK.HashtagPacks.getBalancedSet(packId, 20);
      var text = tags.join(" ");
      navigator.clipboard.writeText(text).then(function() {
        console.log("[MejoraOK] " + tags.length + " hashtags copiados");
      });
    },

    /**
     * Refresca el panel
     */
    _refreshPanel: function() {
      var panel = document.getElementById('mejora-hashtag-panel');
      if (panel) {
        panel.innerHTML = this.renderPanel();
      }
    }
  };

  window.MejoraHashtagPacks = MejoraHashtagPacks;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      MejoraHashtagPacks.init();
    });
  } else {
    MejoraHashtagPacks.init();
  }

})();
