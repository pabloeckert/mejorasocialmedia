/**
 * MejoraINSSIST — Injector principal
 * Inyecta un botón flotante y gestiona los módulos de MejoraOK en Instagram
 */
(function() {
  'use strict';

  // Esperar a que los datos estén cargados
  function waitForData(cb) {
    var check = setInterval(function() {
      if (window.MejoraOK && window.MejoraOK.BuyerPersonas && window.MejoraOK.HashtagPacks && window.MejoraOK.SalesReplies) {
        clearInterval(check);
        cb();
      }
    }, 200);
    // Timeout después de 10s
    setTimeout(function() { clearInterval(check); }, 10000);
  }

  waitForData(function() {
    console.log('[MejoraOK] Datos cargados, inicializando injector...');
    MejoraInjector.init();
  });

  var MejoraInjector = {

    panelOpen: false,
    activeTab: 'caption',

    init: function() {
      this._injectStyles();
      this._createFAB();
      this._createPanel();
      this._initCaptionWatcher();
      this._initDMWatcher();
      console.log('[MejoraOK] Injector listo');
    },

    // ═══════════════════════════════════════════
    // ESTILOS
    // ═══════════════════════════════════════════
    _injectStyles: function() {
      var style = document.createElement('style');
      style.id = 'mejora-global-styles';
      style.textContent = `
        /* FAB Button */
        .mejora-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e94560 0%, #c23152 100%);
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(233,69,96,0.4);
          z-index: 99998;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .mejora-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 24px rgba(233,69,96,0.5);
        }
        .mejora-fab.active {
          transform: rotate(45deg);
          background: linear-gradient(135deg, #333 0%, #111 100%);
        }

        /* Panel */
        .mejora-panel {
          position: fixed;
          bottom: 90px;
          right: 24px;
          width: 380px;
          max-height: 520px;
          background: #0a0a1a;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          box-shadow: 0 12px 48px rgba(0,0,0,0.6);
          z-index: 99999;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #e0e0e0;
          overflow: hidden;
          display: none;
          animation: mejora-panel-in 0.25s ease;
        }
        .mejora-panel.visible {
          display: flex;
          flex-direction: column;
        }
        @keyframes mejora-panel-in {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Panel Header */
        .mejora-panel-header {
          padding: 14px 16px;
          background: rgba(233,69,96,0.12);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .mejora-panel-title {
          font-size: 13px;
          font-weight: 700;
          color: #e94560;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .mejora-panel-close {
          background: none;
          border: none;
          color: #666;
          font-size: 20px;
          cursor: pointer;
          padding: 0 4px;
          line-height: 1;
        }
        .mejora-panel-close:hover { color: #e94560; }

        /* Tabs */
        .mejora-tabs {
          display: flex;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .mejora-tab {
          flex: 1;
          padding: 10px 8px;
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #666;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.15s;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
        }
        .mejora-tab:hover { color: #aaa; }
        .mejora-tab.active {
          color: #e94560;
          border-bottom-color: #e94560;
        }

        /* Content */
        .mejora-content {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
        }
        .mejora-content::-webkit-scrollbar { width: 4px; }
        .mejora-content::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }

        /* Persona badge */
        .mejora-persona-badge {
          padding: 6px 10px;
          background: rgba(233,69,96,0.15);
          border-radius: 6px;
          font-size: 12px;
          margin-bottom: 10px;
        }

        /* Hook items */
        .mejora-hook-item {
          padding: 8px 10px;
          margin: 4px 0;
          background: rgba(83,216,251,0.06);
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          line-height: 1.5;
          border-left: 3px solid #53d8fb;
          transition: background 0.15s;
        }
        .mejora-hook-item:hover {
          background: rgba(83,216,251,0.12);
        }

        /* CTA */
        .mejora-cta {
          padding: 8px 10px;
          margin: 8px 0;
          background: rgba(83,216,251,0.08);
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          border-left: 3px solid #f5a623;
        }

        /* Tags */
        .mejora-tags {
          padding: 8px 10px;
          margin: 8px 0;
          background: rgba(245,166,35,0.06);
          border-radius: 6px;
          cursor: pointer;
          font-size: 11px;
          word-break: break-all;
          line-height: 1.6;
          border-left: 3px solid #f5a623;
        }

        /* Buttons */
        .mejora-btn {
          display: block;
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          background: #e94560;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: background 0.15s;
        }
        .mejora-btn:hover { background: #d63851; }
        .mejora-btn.secondary {
          background: rgba(255,255,255,0.06);
          color: #aaa;
        }
        .mejora-btn.secondary:hover { background: rgba(255,255,255,0.1); }

        /* Pack cards */
        .mejora-pack-card {
          padding: 10px 12px;
          margin: 6px 0;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          cursor: pointer;
          border-left: 3px solid transparent;
          transition: all 0.15s;
        }
        .mejora-pack-card:hover {
          background: rgba(255,255,255,0.06);
          border-left-color: #e94560;
        }
        .mejora-pack-card.selected {
          background: rgba(233,69,96,0.1);
          border-left-color: #e94560;
        }
        .mejora-pack-label {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 2px;
        }
        .mejora-pack-desc {
          font-size: 11px;
          color: #888;
        }

        /* Quick replies */
        .mejora-qr-item {
          padding: 10px 12px;
          margin: 4px 0;
          background: rgba(255,255,255,0.03);
          border-radius: 6px;
          cursor: pointer;
          border-left: 3px solid transparent;
          transition: all 0.15s;
        }
        .mejora-qr-item:hover {
          background: rgba(83,216,251,0.08);
          border-left-color: #53d8fb;
        }
        .mejora-qr-shortcut {
          font-size: 12px;
          font-weight: 700;
          color: #53d8fb;
          font-family: monospace;
        }
        .mejora-qr-label {
          font-size: 11px;
          color: #888;
          margin: 2px 0;
        }
        .mejora-qr-preview {
          font-size: 11px;
          color: #aaa;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Search */
        .mejora-search {
          width: 100%;
          padding: 8px 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #e0e0e0;
          font-size: 13px;
          outline: none;
          margin-bottom: 10px;
          box-sizing: border-box;
        }
        .mejora-search:focus { border-color: #53d8fb; }
        .mejora-search::placeholder { color: #555; }

        /* Category pills */
        .mejora-cat-row {
          display: flex;
          gap: 4px;
          margin-bottom: 10px;
          overflow-x: auto;
          white-space: nowrap;
          padding-bottom: 4px;
        }
        .mejora-cat-pill {
          font-size: 10px;
          padding: 4px 10px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          color: #888;
          border: none;
          cursor: pointer;
          font-weight: 600;
          text-transform: uppercase;
          transition: all 0.15s;
        }
        .mejora-cat-pill:hover, .mejora-cat-pill.active {
          background: rgba(233,69,96,0.2);
          color: #e94560;
        }

        /* Section label */
        .mejora-section-label {
          font-size: 11px;
          font-weight: 700;
          color: #53d8fb;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 10px 0 6px 0;
        }

        /* Toast */
        .mejora-toast {
          position: fixed;
          bottom: 100px;
          left: 50%;
          transform: translateX(-50%);
          background: #2d2d2d;
          color: #fff;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 13px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          z-index: 100000;
          box-shadow: 0 4px 16px rgba(0,0,0,0.4);
          animation: mejora-toast-in 0.2s ease;
          pointer-events: none;
        }
        @keyframes mejora-toast-in {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* Empty state */
        .mejora-empty {
          text-align: center;
          padding: 20px;
          color: #555;
          font-size: 12px;
        }

        /* Section header */
        .mejora-h2 {
          font-size: 14px;
          font-weight: 700;
          color: #e0e0e0;
          margin-bottom: 8px;
        }
      `;
      document.head.appendChild(style);
    },

    // ═══════════════════════════════════════════
    // FAB BUTTON
    // ═══════════════════════════════════════════
    _createFAB: function() {
      var self = this;
      var fab = document.createElement('button');
      fab.className = 'mejora-fab';
      fab.id = 'mejora-fab';
      fab.innerHTML = '🎯';
      fab.title = 'MejoraOK Tools';
      fab.addEventListener('click', function() {
        self.togglePanel();
      });
      document.body.appendChild(fab);
    },

    // ═══════════════════════════════════════════
    // PANEL PRINCIPAL
    // ═══════════════════════════════════════════
    _createPanel: function() {
      var self = this;
      var panel = document.createElement('div');
      panel.className = 'mejora-panel';
      panel.id = 'mejora-panel';

      panel.innerHTML = `
        <div class="mejora-panel-header">
          <div class="mejora-panel-title">🎯 MejoraOK</div>
          <button class="mejora-panel-close" id="mejora-panel-close">×</button>
        </div>
        <div class="mejora-tabs">
          <button class="mejora-tab active" data-tab="caption">📝 Caption</button>
          <button class="mejora-tab" data-tab="hashtags">#️⃣ Tags</button>
          <button class="mejora-tab" data-tab="replies">⚡ Replies</button>
        </div>
        <div class="mejora-content" id="mejora-content"></div>
      `;

      document.body.appendChild(panel);

      // Close button
      document.getElementById('mejora-panel-close').addEventListener('click', function() {
        self.togglePanel(false);
      });

      // Tab switching
      panel.querySelectorAll('.mejora-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
          panel.querySelectorAll('.mejora-tab').forEach(function(t) { t.classList.remove('active'); });
          this.classList.add('active');
          self.activeTab = this.dataset.tab;
          self._renderTab();
        });
      });
    },

    togglePanel: function(forceState) {
      var panel = document.getElementById('mejora-panel');
      var fab = document.getElementById('mejora-fab');
      this.panelOpen = forceState !== undefined ? forceState : !this.panelOpen;

      if (this.panelOpen) {
        panel.classList.add('visible');
        fab.classList.add('active');
        fab.innerHTML = '+';
        this._renderTab();
      } else {
        panel.classList.remove('visible');
        fab.classList.remove('active');
        fab.innerHTML = '🎯';
      }
    },

    _renderTab: function() {
      var content = document.getElementById('mejora-content');
      switch (this.activeTab) {
        case 'caption': this._renderCaptionTab(content); break;
        case 'hashtags': this._renderHashtagsTab(content); break;
        case 'replies': this._renderRepliesTab(content); break;
      }
    },

    // ═══════════════════════════════════════════
    // TAB: CAPTION HELPER
    // ═══════════════════════════════════════════
    _renderCaptionTab: function(container) {
      var self = this;
      var captionText = this._getCurrentCaption();
      var suggestion = MejoraOK.BuyerPersonas.suggestHooks(captionText);
      var packId = MejoraOK.HashtagPacks.suggestPack(captionText);
      var tags = MejoraOK.HashtagPacks.getHashtagString(packId, 15);

      var html = '';

      if (captionText && captionText.length >= 10) {
        // Persona detectada
        html += '<div class="mejora-persona-badge">';
        html += suggestion.persona.emoji + ' <strong>Perfil:</strong> ' + (suggestion.persona.label || 'General');
        html += '</div>';

        // Hooks
        html += '<div class="mejora-section-label">Hooks sugeridos</div>';
        suggestion.hooks.forEach(function(hook, i) {
          html += '<div class="mejora-hook-item" data-copy="' + self._escapeAttr(hook) + '">';
          html += (i + 1) + '. ' + hook;
          html += '</div>';
        });

        // CTA
        html += '<div class="mejora-section-label">CTA</div>';
        html += '<div class="mejora-cta" data-copy="' + self._escapeAttr(suggestion.cta) + '">';
        html += '📩 ' + suggestion.cta;
        html += '</div>';

        // Tags
        html += '<div class="mejora-section-label">Hashtag Pack: ' + (MejoraOK.HashtagPacks.packs[packId] ? MejoraOK.HashtagPacks.packs[packId].label : 'General') + '</div>';
        html += '<div class="mejora-tags" data-copy="' + self._escapeAttr(tags) + '">';
        html += tags;
        html += '</div>';

        // Generar caption completo
        html += '<button class="mejora-btn" id="mejora-gen-caption">📝 Generar Caption Completo</button>';

      } else {
        // Sin caption — mostrar hooks generales
        var general = MejoraOK.BuyerPersonas.suggestHooks('');
        html += '<div class="mejora-h2">Escribí un caption y te sugiero:</div>';
        html += '<div style="color:#888;font-size:12px;margin-bottom:12px;">Hooks por buyer persona, CTA, hashtags optimizados</div>';

        html += '<div class="mejora-section-label">Hooks generales para empezar</div>';
        general.hooks.forEach(function(hook, i) {
          html += '<div class="mejora-hook-item" data-copy="' + self._escapeAttr(hook) + '">';
          html += (i + 1) + '. ' + hook;
          html += '</div>';
        });

        html += '<div class="mejora-section-label">Todos los Buyer Personas</div>';
        var personas = MejoraOK.BuyerPersonas.personas;
        for (var id in personas) {
          var p = personas[id];
          html += '<div class="mejora-pack-card" data-persona="' + id + '">';
          html += '<div class="mejora-pack-label">' + p.emoji + ' ' + p.label + '</div>';
          html += '<div class="mejora-pack-desc">' + p.dolor + '</div>';
          html += '</div>';
        }
      }

      container.innerHTML = html;

      // Bind click-to-copy
      container.querySelectorAll('[data-copy]').forEach(function(el) {
        el.addEventListener('click', function() {
          self._copyToClipboard(this.dataset.copy);
          self._toast('✅ Copiado al clipboard');
        });
      });

      // Generar caption completo
      var genBtn = document.getElementById('mejora-gen-caption');
      if (genBtn) {
        genBtn.addEventListener('click', function() {
          self._generateFullCaption();
        });
      }

      // Click persona → mostrar hooks
      container.querySelectorAll('[data-persona]').forEach(function(el) {
        el.addEventListener('click', function() {
          var pid = this.dataset.persona;
          var persona = MejoraOK.BuyerPersonas.personas[pid];
          if (!persona) return;
          var hook = persona.hooks[Math.floor(Math.random() * persona.hooks.length)];
          self._copyToClipboard(hook);
          self._toast('✅ Hook copiado: ' + persona.emoji);
        });
      });
    },

    _getCurrentCaption: function() {
      // Buscar el textarea de caption activo en Instagram
      var ta = document.querySelector('textarea[placeholder*="caption" i]') ||
               document.querySelector('textarea[placeholder*="Write a caption" i]') ||
               document.querySelector('[contenteditable="true"][aria-label*="caption" i]') ||
               document.querySelector('[contenteditable="true"][aria-label*="escrib" i]');
      if (ta) {
        return ta.value || ta.textContent || ta.innerText || '';
      }
      return '';
    },

    _generateFullCaption: function() {
      var captionText = this._getCurrentCaption();
      var persona = MejoraOK.BuyerPersonas.suggestHooks(captionText).persona;
      var hook = persona.hooks[Math.floor(Math.random() * persona.hooks.length)];
      var cta = persona.cta;
      var packId = MejoraOK.HashtagPacks.suggestPack(hook);
      var tags = MejoraOK.HashtagPacks.getHashtagString(packId, 15);

      var fullCaption = hook + '\n\n' +
        '━━━━━━━━━━━━━━━━━━━\n\n' +
        '[Tu mensaje acá]\n\n' +
        '━━━━━━━━━━━━━━━━━━━\n\n' +
        '📩 ' + cta + '\n' +
        '👆 Link en bio.\n\n' +
        tags;

      this._copyToClipboard(fullCaption);
      this._toast('✅ Caption completo copiado!');
    },

    // ═══════════════════════════════════════════
    // TAB: HASHTAG PACKS
    // ═══════════════════════════════════════════
    _renderHashtagsTab: function(container) {
      var self = this;
      var html = '<div class="mejora-h2">🏷️ Hashtag Packs</div>';
      html += '<div style="color:#888;font-size:12px;margin-bottom:12px;">Colecciones optimizadas para el nicho argentino</div>';

      var packIds = MejoraOK.HashtagPacks.getPackIds();
      packIds.forEach(function(id) {
        var pack = MejoraOK.HashtagPacks.getPackInfo(id);
        if (!pack) return;
        var count = pack.low.length + pack.medium.length + pack.high.length;

        html += '<div class="mejora-pack-card" data-pack="' + id + '">';
        html += '<div class="mejora-pack-label">' + pack.label + '</div>';
        html += '<div class="mejora-pack-desc">' + pack.description + ' • ' + count + ' tags</div>';
        html += '</div>';

        // Expanded view
        html += '<div id="mejora-pack-detail-' + id + '" style="display:none;padding:0 0 8px 12px;">';
        html += '<div class="mejora-section-label">Low (nicho)</div>';
        html += '<div style="font-size:11px;color:#888;line-height:1.8;">' + pack.low.join(' ') + '</div>';
        html += '<div class="mejora-section-label">Medium</div>';
        html += '<div style="font-size:11px;color:#888;line-height:1.8;">' + pack.medium.join(' ') + '</div>';
        html += '<div class="mejora-section-label">High (volumen)</div>';
        html += '<div style="font-size:11px;color:#888;line-height:1.8;">' + pack.high.join(' ') + '</div>';
        html += '<button class="mejora-btn" data-copy-pack="' + id + '">📋 Copiar set balanceado (20 tags)</button>';
        html += '<button class="mejora-btn secondary" data-copy-all="' + id + '">Copiar TODOS (' + count + ' tags)</button>';
        html += '</div>';
      });

      container.innerHTML = html;

      // Expand/collapse packs
      container.querySelectorAll('[data-pack]').forEach(function(el) {
        el.addEventListener('click', function() {
          var id = this.dataset.pack;
          var detail = document.getElementById('mejora-pack-detail-' + id);
          if (detail) {
            var isVisible = detail.style.display !== 'none';
            // Hide all
            container.querySelectorAll('[id^="mejora-pack-detail-"]').forEach(function(d) { d.style.display = 'none'; });
            container.querySelectorAll('[data-pack]').forEach(function(c) { c.classList.remove('selected'); });
            if (!isVisible) {
              detail.style.display = 'block';
              this.classList.add('selected');
            }
          }
        });
      });

      // Copy balanced set
      container.querySelectorAll('[data-copy-pack]').forEach(function(el) {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          var id = this.dataset.copyPack;
          var tags = MejoraOK.HashtagPacks.getBalancedSet(id, 20);
          self._copyToClipboard(tags.join(' '));
          self._toast('✅ 20 hashtags copiados (set balanceado)');
        });
      });

      // Copy all
      container.querySelectorAll('[data-copy-all]').forEach(function(el) {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          var id = this.dataset.copyAll;
          var pack = MejoraOK.HashtagPacks.getPackInfo(id);
          if (pack) {
            var all = pack.low.concat(pack.medium, pack.high);
            self._copyToClipboard(all.join(' '));
            self._toast('✅ ' + all.length + ' hashtags copiados');
          }
        });
      });
    },

    // ═══════════════════════════════════════════
    // TAB: QUICK REPLIES
    // ═══════════════════════════════════════════
    _renderRepliesTab: function(container) {
      var self = this;
      var html = '<input type="text" class="mejora-search" id="mejora-qr-search" placeholder="Buscar reply... (/no-plata, /cierre)">';

      html += '<div class="mejora-cat-row">';
      html += '<button class="mejora-cat-pill active" data-cat="all">Todos</button>';
      html += '<button class="mejora-cat-pill" data-cat="saludo">Saludo</button>';
      html += '<button class="mejora-cat-pill" data-cat="objecion">Objeción</button>';
      html += '<button class="mejora-cat-pill" data-cat="seguimiento">Seguimiento</button>';
      html += '<button class="mejora-cat-pill" data-cat="cierre">Cierre</button>';
      html += '<button class="mejora-cat-pill" data-cat="contenido">Info</button>';
      html += '<button class="mejora-cat-pill" data-cat="comentarios">Comentarios</button>';
      html += '</div>';

      html += '<div id="mejora-qr-list"></div>';

      container.innerHTML = html;

      var listEl = document.getElementById('mejora-qr-list');
      this._renderQRList(listEl, MejoraOK.SalesReplies.getAll());

      // Search
      var searchInput = document.getElementById('mejora-qr-search');
      searchInput.addEventListener('input', function() {
        var q = this.value.toLowerCase().replace('/', '');
        var replies = MejoraOK.SalesReplies.getAll();
        if (q) {
          replies = replies.filter(function(r) {
            return r.shortcut.toLowerCase().includes(q) ||
                   r.label.toLowerCase().includes(q) ||
                   r.content.toLowerCase().includes(q);
          });
        }
        self._renderQRList(listEl, replies);
      });

      // Category filter
      container.querySelectorAll('.mejora-cat-pill').forEach(function(btn) {
        btn.addEventListener('click', function() {
          container.querySelectorAll('.mejora-cat-pill').forEach(function(b) { b.classList.remove('active'); });
          this.classList.add('active');
          var cat = this.dataset.cat;
          var replies = cat === 'all' ? MejoraOK.SalesReplies.getAll() : MejoraOK.SalesReplies.getByCategory(cat);
          self._renderQRList(listEl, replies);
        });
      });
    },

    _renderQRList: function(container, replies) {
      var self = this;
      if (replies.length === 0) {
        container.innerHTML = '<div class="mejora-empty">No se encontraron replies</div>';
        return;
      }

      var html = '';
      replies.forEach(function(reply) {
        html += '<div class="mejora-qr-item" data-shortcut="' + reply.shortcut + '">';
        html += '<div class="mejora-qr-shortcut">' + reply.shortcut + '</div>';
        html += '<div class="mejora-qr-label">' + reply.label + '</div>';
        html += '<div class="mejora-qr-preview">' + reply.content + '</div>';
        html += '</div>';
      });
      container.innerHTML = html;

      container.querySelectorAll('.mejora-qr-item').forEach(function(el) {
        el.addEventListener('click', function() {
          var shortcut = this.dataset.shortcut;
          var reply = MejoraOK.SalesReplies.findByShortcut(shortcut);
          if (reply) {
            var content = MejoraOK.SalesReplies.render(reply.content, {});
            self._insertIntoDM(content);
            self._toast('✅ Reply insertada en el chat');
            self.togglePanel(false);
          }
        });
      });
    },

    // ═══════════════════════════════════════════
    // CAPTION WATCHER
    // ═══════════════════════════════════════════
    _initCaptionWatcher: function() {
      var self = this;
      var debounce;

      var observer = new MutationObserver(function() {
        clearTimeout(debounce);
        debounce = setTimeout(function() {
          // Auto-refresh caption tab if panel is open
          if (self.panelOpen && self.activeTab === 'caption') {
            self._renderCaptionTab(document.getElementById('mejora-content'));
          }
        }, 1000);
      });

      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    },

    // ═══════════════════════════════════════════
    // DM WATCHER (para quick replies)
    // ═══════════════════════════════════════════
    _initDMWatcher: function() {
      var self = this;

      // Escuchar "/" en inputs de DM para auto-abrir panel de replies
      document.addEventListener('input', function(e) {
        var el = e.target;
        if (!el.getAttribute) return;
        var isDM = el.getAttribute('contenteditable') === 'true' ||
                   el.tagName === 'TEXTAREA';
        if (!isDM) return;

        var text = el.textContent || el.value || '';
        if (text.trim() === '/' && !self.panelOpen) {
          // Auto-switch to replies tab
          self.togglePanel(true);
          // Activate replies tab
          var panel = document.getElementById('mejora-panel');
          panel.querySelectorAll('.mejora-tab').forEach(function(t) { t.classList.remove('active'); });
          panel.querySelector('[data-tab="replies"]').classList.add('active');
          self.activeTab = 'replies';
          self._renderTab();
        }
      });
    },

    // ═══════════════════════════════════════════
    // INSERT TEXT INTO DM
    // ═══════════════════════════════════════════
    _insertIntoDM: function(text) {
      // Find the active contenteditable or textarea in DM
      var inputs = document.querySelectorAll('[contenteditable="true"]');
      var activeInput = null;

      for (var i = inputs.length - 1; i >= 0; i--) {
        var el = inputs[i];
        if (el.offsetHeight > 0 && el.offsetWidth > 0) {
          activeInput = el;
          break;
        }
      }

      if (activeInput) {
        activeInput.focus();
        activeInput.textContent = text;
        activeInput.dispatchEvent(new Event('input', { bubbles: true }));
      } else {
        // Fallback: copy to clipboard
        this._copyToClipboard(text);
        this._toast('📋 Copiado — pegalo en el chat');
      }
    },

    // ═══════════════════════════════════════════
    // UTILS
    // ═══════════════════════════════════════════
    _copyToClipboard: function(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function() {
          self._fallbackCopy(text);
        });
      } else {
        this._fallbackCopy(text);
      }
    },

    _fallbackCopy: function(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    },

    _toast: function(message) {
      var existing = document.querySelector('.mejora-toast');
      if (existing) existing.remove();

      var toast = document.createElement('div');
      toast.className = 'mejora-toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(function() { toast.remove(); }, 2000);
    },

    _escapeAttr: function(str) {
      return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    }
  };

})();
