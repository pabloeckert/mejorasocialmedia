/**
 * MejoraINSSIST — Sales Quick Replies Module
 * 
 * Sistema de respuestas rapidas para ventas via DM de Instagram.
 * Integrado con los 8 buyer personas de MejoraOK.
 * 
 * Uso: Escribir / en el chat para ver atajos disponibles
 */
(function() {
  'use strict';

  var MejoraSalesReplies = {

    isActive: false,
    popup: null,

    init: function() {
      console.log("[MejoraOK] Sales Quick Replies initialized");
      this._injectStyles();
      this._watchDMInputs();
    },

    /**
     * Inyecta estilos para el popup de quick replies
     */
    _injectStyles: function() {
      var style = document.createElement('style');
      style.id = 'mejora-sales-replies-styles';
      style.textContent = `
        .mejora-qr-popup {
          position: fixed;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          max-height: 450px;
          background: #0a0a1a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          z-index: 10000;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          display: none;
        }
        .mejora-qr-popup.visible {
          display: block;
          animation: mejora-qr-slide 0.2s ease;
        }
        @keyframes mejora-qr-slide {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .mejora-qr-header {
          padding: 12px 16px;
          background: rgba(233,69,96,0.15);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mejora-qr-title {
          font-size: 13px;
          font-weight: 700;
          color: #e94560;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .mejora-qr-close {
          background: none;
          border: none;
          color: #888;
          font-size: 18px;
          cursor: pointer;
          padding: 0 4px;
          line-height: 1;
        }
        .mejora-qr-search {
          padding: 8px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .mejora-qr-search input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 8px 12px;
          color: #e0e0e0;
          font-size: 13px;
          outline: none;
        }
        .mejora-qr-search input:focus {
          border-color: #53d8fb;
        }
        .mejora-qr-categories {
          display: flex;
          gap: 4px;
          padding: 8px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          overflow-x: auto;
          white-space: nowrap;
        }
        .mejora-qr-cat-btn {
          font-size: 10px;
          padding: 4px 10px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          color: #aaa;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        .mejora-qr-cat-btn:hover, .mejora-qr-cat-btn.active {
          background: rgba(233,69,96,0.2);
          color: #e94560;
        }
        .mejora-qr-list {
          max-height: 280px;
          overflow-y: auto;
          padding: 8px;
        }
        .mejora-qr-item {
          padding: 10px 12px;
          margin: 4px 0;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
          border-left: 3px solid transparent;
        }
        .mejora-qr-item:hover {
          background: rgba(83,216,251,0.08);
          border-left-color: #53d8fb;
        }
        .mejora-qr-item-shortcut {
          font-size: 12px;
          font-weight: 700;
          color: #53d8fb;
          font-family: monospace;
        }
        .mejora-qr-item-label {
          font-size: 11px;
          color: #888;
          margin: 2px 0;
        }
        .mejora-qr-item-preview {
          font-size: 12px;
          color: #ccc;
          line-height: 1.4;
          margin-top: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .mejora-qr-empty {
          padding: 20px;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
      `;
      document.head.appendChild(style);
    },

    /**
     * Observa inputs de DM
     */
    _watchDMInputs: function() {
      var self = this;

      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) {
              // Buscar inputs de DM
              var inputs = node.querySelectorAll ? 
                node.querySelectorAll('[contenteditable="true"], textarea, .MWPCometComposerInner') : [];
              inputs.forEach(function(input) {
                self._attachToDMInput(input);
              });
            }
          });
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });
    },

    /**
     * Adjunta el sistema de quick replies a un input de DM
     */
    _attachToDMInput: function(input) {
      if (input._mejoraQRAttached) return;
      input._mejoraQRAttached = true;

      var self = this;

      input.addEventListener('input', function(e) {
        self._onInputChange(input);
      });

      input.addEventListener('keydown', function(e) {
        self._onKeyDown(e, input);
      });
    },

    /**
     * Maneja cambios en el input
     */
    _onInputChange: function(input) {
      var text = this._getInputText(input);
      
      // Detectar "/" para mostrar popup
      if (text === '/' || (text.endsWith(' /') && text.length > 1)) {
        this._showPopup(input);
      } else if (text.length === 0) {
        this._hidePopup();
      } else if (this.popup && this.popup.classList.contains('visible')) {
        this._filterPopup(text);
      }
    },

    /**
     * Maneja teclas especiales
     */
    _onKeyDown: function(e, input) {
      if (!this.popup || !this.popup.classList.contains('visible')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        this._hidePopup();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        var firstItem = this.popup.querySelector('.mejora-qr-item');
        if (firstItem) firstItem.click();
      }
    },

    /**
     * Obtiene el texto del input
     */
    _getInputText: function(input) {
      if (input.contentEditable === 'true') {
        return input.textContent || input.innerText || '';
      }
      return input.value || '';
    },

    /**
     * Establece el texto del input
     */
    _setInputText: function(input, text) {
      if (input.contentEditable === 'true') {
        input.textContent = text;
        // Trigger input event
        input.dispatchEvent(new Event('input', { bubbles: true }));
      } else {
        input.value = text;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    },

    /**
     * Muestra el popup de quick replies
     */
    _showPopup: function(input) {
      if (!this.popup) {
        this.popup = this._createPopup();
        document.body.appendChild(this.popup);
      }

      this._activeInput = input;
      this._renderReplies();
      this.popup.classList.add('visible');
    },

    /**
     * Oculta el popup
     */
    _hidePopup: function() {
      if (this.popup) {
        this.popup.classList.remove('visible');
      }
    },

    /**
     * Crea el elemento popup
     */
    _createPopup: function() {
      var self = this;
      var popup = document.createElement('div');
      popup.className = 'mejora-qr-popup';
      popup.innerHTML = this._renderPopupHTML();

      // Eventos
      popup.querySelector('.mejora-qr-close').addEventListener('click', function() {
        self._hidePopup();
      });

      var searchInput = popup.querySelector('.mejora-qr-search input');
      searchInput.addEventListener('input', function() {
        self._filterReplies(this.value);
      });

      // Categorias
      popup.addEventListener('click', function(e) {
        var catBtn = e.target.closest('.mejora-qr-cat-btn');
        if (catBtn) {
          self._filterByCategory(catBtn.dataset.category);
        }
        var item = e.target.closest('.mejora-qr-item');
        if (item) {
          self._selectReply(item.dataset.shortcut);
        }
      });

      return popup;
    },

    /**
     * Renderiza el HTML del popup
     */
    _renderPopupHTML: function() {
      return `
        <div class="mejora-qr-header">
          <div class="mejora-qr-title">⚡ Quick Replies</div>
          <button class="mejora-qr-close">×</button>
        </div>
        <div class="mejora-qr-search">
          <input type="text" placeholder="Buscar reply... (/no-plata, /cierre, /seguimiento)">
        </div>
        <div class="mejora-qr-categories">
          <button class="mejora-qr-cat-btn active" data-category="all">Todos</button>
          <button class="mejora-qr-cat-btn" data-category="saludo">Saludo</button>
          <button class="mejora-qr-cat-btn" data-category="objecion">Objeción</button>
          <button class="mejora-qr-cat-btn" data-category="seguimiento">Seguimiento</button>
          <button class="mejora-qr-cat-btn" data-category="cierre">Cierre</button>
          <button class="mejora-qr-cat-btn" data-category="contenido">Info</button>
        </div>
        <div class="mejora-qr-list"></div>
      `;
    },

    /**
     * Renderiza la lista de replies
     */
    _renderReplies: function(replies) {
      replies = replies || MejoraOK.SalesReplies.getAll();
      var list = this.popup.querySelector('.mejora-qr-list');

      if (replies.length === 0) {
        list.innerHTML = '<div class="mejora-qr-empty">No se encontraron replies</div>';
        return;
      }

      var html = '';
      replies.forEach(function(reply) {
        html += '<div class="mejora-qr-item" data-shortcut="' + reply.shortcut + '">';
        html += '<div class="mejora-qr-item-shortcut">' + reply.shortcut + '</div>';
        html += '<div class="mejora-qr-item-label">' + reply.label + '</div>';
        html += '<div class="mejora-qr-item-preview">' + reply.content + '</div>';
        html += '</div>';
      });

      list.innerHTML = html;
    },

    /**
     * Filtra replies por texto de busqueda
     */
    _filterReplies: function(query) {
      var replies = MejoraOK.SalesReplies.getAll();
      if (!query || query === '/') {
        this._renderReplies(replies);
        return;
      }

      var q = query.toLowerCase().replace('/', '');
      var filtered = replies.filter(function(r) {
        return r.shortcut.toLowerCase().includes(q) || 
               r.label.toLowerCase().includes(q) ||
               r.content.toLowerCase().includes(q);
      });
      this._renderReplies(filtered);
    },

    /**
     * Filtra por categoria
     */
    _filterByCategory: function(category) {
      // Actualizar botones activos
      this.popup.querySelectorAll('.mejora-qr-cat-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.category === category);
      });

      if (category === 'all') {
        this._renderReplies();
      } else {
        this._renderReplies(MejoraOK.SalesReplies.getByCategory(category));
      }
    },

    /**
     * Filtra popup basado en texto actual
     */
    _filterPopup: function(text) {
      this._filterReplies(text);
    },

    /**
     * Selecciona una reply y la inserta en el input
     */
    _selectReply: function(shortcut) {
      var reply = MejoraOK.SalesReplies.findByShortcut(shortcut);
      if (!reply || !this._activeInput) return;

      // Renderizar con variables
      var content = MejoraOK.SalesReplies.render(reply.content, {});

      this._setInputText(this._activeInput, content);
      this._hidePopup();

      // Focus en el input
      this._activeInput.focus();
    }
  };

  window.MejoraSalesReplies = MejoraSalesReplies;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      MejoraSalesReplies.init();
    });
  } else {
    MejoraSalesReplies.init();
  }

})();
