window.__ModuleLoader__.load({
  id: '@local/dsh-bg-switcher',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    /** Package id: module id, style-tag owner, and the theme override layer id. */
    const PLUGIN_ID = '@local/dsh-bg-switcher';
    /** Locale namespace owning this plugin's visible text. */
    const NS = 'bgSwitcher';
    /** Durable choice; a presentation preference, so it stays in this browser. */
    const STORAGE_KEY = 'dsh.bg-switcher.selection';
    const DEFAULT_SELECTION = { id: 'default' };

    /**
     * Backdrop art, one CSS background-image list per preset. Art carries the
     * colors; the readability scrim is added per color scheme in backdropCss.
     */
    const PRESETS = [
      { id: 'default', art: null },
      {
        id: 'aurora',
        art: 'radial-gradient(120% 90% at 10% 6%, rgba(110,231,249,0.85) 0%, rgba(110,231,249,0) 55%), radial-gradient(110% 95% at 92% 10%, rgba(167,139,250,0.8) 0%, rgba(167,139,250,0) 58%), radial-gradient(130% 110% at 50% 104%, rgba(52,211,153,0.75) 0%, rgba(52,211,153,0) 62%), linear-gradient(160deg, #0b1224, #16233d 55%, #0f1728)',
      },
      {
        id: 'sunset',
        art: 'radial-gradient(120% 90% at 88% 8%, rgba(253,186,116,0.9) 0%, rgba(253,186,116,0) 55%), radial-gradient(120% 100% at 10% 20%, rgba(244,114,182,0.75) 0%, rgba(244,114,182,0) 58%), linear-gradient(180deg, #3b1d4b, #7c3050 52%, #b4573f)',
      },
      {
        id: 'ocean',
        art: 'radial-gradient(120% 90% at 20% 10%, rgba(56,189,248,0.55) 0%, rgba(56,189,248,0) 60%), radial-gradient(140% 120% at 80% 100%, rgba(30,64,175,0.85) 0%, rgba(30,64,175,0) 65%), linear-gradient(180deg, #06121f, #0b2b45 60%, #04101c)',
      },
      {
        id: 'forest',
        art: 'radial-gradient(120% 90% at 15% 12%, rgba(134,239,172,0.6) 0%, rgba(134,239,172,0) 58%), radial-gradient(120% 100% at 88% 90%, rgba(22,101,52,0.9) 0%, rgba(22,101,52,0) 62%), linear-gradient(165deg, #04140d, #0d3320 55%, #05170f)',
      },
      {
        id: 'graphite',
        art: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0) 2px, rgba(255,255,255,0) 6px), radial-gradient(120% 100% at 20% 0%, rgba(148,163,184,0.35) 0%, rgba(148,163,184,0) 60%), linear-gradient(180deg, #14161a, #1f2228 60%, #101215)',
      },
      {
        id: 'sakura',
        art: 'radial-gradient(120% 90% at 12% 8%, rgba(251,207,232,0.85) 0%, rgba(251,207,232,0) 58%), radial-gradient(120% 100% at 90% 20%, rgba(244,114,182,0.45) 0%, rgba(244,114,182,0) 60%), linear-gradient(170deg, #fdf2f8, #fce7f3 45%, #e9d5ff)',
      },
    ];
    const PRESET_BY_ID = new Map(PRESETS.map((preset) => [preset.id, preset]));

    /** Simplified Chinese dictionary (the key-set source of truth). */
    const zh = {
      'row.title': '背景',
      'row.aria': '选择窗口背景',
      'gallery.aria': '背景色卡',
      'gallery.hint': '选中的背景铺满窗口，并记住你的选择。',
      'preset.default': '默认',
      'preset.aurora': '极光',
      'preset.sunset': '晚霞',
      'preset.ocean': '深海',
      'preset.forest': '森林',
      'preset.graphite': '石墨',
      'preset.sakura': '樱花',
      'preset.custom': '自定义图片',
      'custom.label': '图片地址',
      'custom.placeholder': 'https://… 或 /path/image.png',
      'custom.apply': '应用',
      'footer.label': '背景',
    };
    /** English dictionary, key-identical to the Chinese source of truth. */
    const en = {
      'row.title': 'Background',
      'row.aria': 'Choose the window background',
      'gallery.aria': 'Background presets',
      'gallery.hint': 'The chosen background fills the window and is remembered here.',
      'preset.default': 'Default',
      'preset.aurora': 'Aurora',
      'preset.sunset': 'Sunset',
      'preset.ocean': 'Ocean',
      'preset.forest': 'Forest',
      'preset.graphite': 'Graphite',
      'preset.sakura': 'Sakura',
      'preset.custom': 'Custom image',
      'custom.label': 'Image URL',
      'custom.placeholder': 'https://… or /path/image.png',
      'custom.apply': 'Apply',
      'footer.label': 'Background',
    };

    /**
     * Read the durable choice, keeping only values this plugin still defines.
     * @returns {{ id: string, url?: string }} the stored selection or the default.
     */
    function readSelection() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return DEFAULT_SELECTION;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return DEFAULT_SELECTION;
        if (parsed.id === 'custom') {
          const url = typeof parsed.url === 'string' ? parsed.url.trim() : '';
          return url ? { id: 'custom', url } : DEFAULT_SELECTION;
        }
        return PRESET_BY_ID.has(parsed.id) ? { id: parsed.id } : DEFAULT_SELECTION;
      } catch (error) {
        return DEFAULT_SELECTION;
      }
    }

    /**
     * Persist the choice; a browser refusing storage must not break switching.
     * @param selection - the selection to remember.
     */
    function writeSelection(selection) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
      } catch (error) {
        /* presentation-only preference: failing to store it is not an error */
      }
    }

    /**
     * Compare two selections by value.
     * @param left - first selection.
     * @param right - second selection.
     * @returns whether both describe the same backdrop.
     */
    function sameSelection(left, right) {
      return left.id === right.id && (left.url || '') === (right.url || '');
    }

    /* Selection is plugin-wide state: the backdrop must not depend on the
     * settings row staying mounted, so the owning effect subscribes here. */
    let selection = readSelection();
    const selectionListeners = new Set();

    /** @returns the current selection. */
    function getSelection() {
      return selection;
    }

    /**
     * Switch the backdrop and notify the owner and every mounted control.
     * @param next - the selection to apply.
     */
    function setSelection(next) {
      if (sameSelection(selection, next)) return;
      selection = next;
      writeSelection(next);
      for (const listener of Array.from(selectionListeners)) listener();
    }

    /**
     * Observe selection changes.
     * @param listener - change callback.
     * @returns unsubscribe.
     */
    function subscribeSelection(listener) {
      selectionListeners.add(listener);
      return () => {
        selectionListeners.delete(listener);
      };
    }

    /**
     * Turn a user-supplied address into one CSS image layer.
     * @param url - the raw address.
     * @returns the `url(...)` layer, or null when the address is unusable.
     */
    function urlArt(url) {
      const value = String(url == null ? '' : url).trim();
      if (!value || /^\s*javascript:/i.test(value)) return null;
      const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\n\r]/g, '');
      return 'url("' + escaped + '")';
    }

    /**
     * The art a selection paints, for a preview swatch.
     * @param current - the selection.
     * @returns the CSS image layer list, or null for the theme default.
     */
    function selectionArt(current) {
      if (!current) return null;
      if (current.id === 'custom') return urlArt(current.url);
      const preset = PRESET_BY_ID.get(current.id);
      return preset ? preset.art : null;
    }

    /**
     * The readability scrim drawn over the art for one color scheme.
     * @param scheme - `light` or `dark`.
     * @returns one CSS gradient layer.
     */
    function scrim(scheme) {
      return scheme === 'dark'
        ? 'linear-gradient(180deg, rgba(12,14,18,0.74) 0%, rgba(12,14,18,0.88) 100%)'
        : 'linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.88) 100%)';
    }

    /**
     * The stylesheet for one selection: the art on the canvas element, with a
     * scheme-matched scrim, so the frame's own surfaces can stay transparent.
     * @param current - the active selection.
     * @returns CSS text, or an empty string for the theme default.
     */
    function backdropCss(current) {
      const art = selectionArt(current);
      if (!art) return '';
      const paint = (scheme, color) =>
        'html{background-color:' + color + ';background-image:' + scrim(scheme) + ',' + art +
        ';background-size:cover;background-position:center;background-repeat:no-repeat;background-attachment:fixed}';
      return [
        paint('light', '#ffffff'),
        'html:has(body[data-ds-dark-theme]){background-image:' + scrim('dark') + ',' + art + ';background-color:#0b0d12}',
      ].join('\n');
    }

    /** Row and gallery styling: alias tokens only, namespaced under `.bgs-`. */
    const CSS_TEXT = [
      '.bgs-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(72px,1fr));gap:8px}',
      '.bgs-swatch{display:flex;flex-direction:column;gap:4px;min-width:0;padding:0;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;line-height:14px;cursor:pointer}',
      '.bgs-swatchArt{display:block;height:44px;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-sm,6px);background-size:cover;background-position:center}',
      '.bgs-swatchArt[data-plain=true]{background:var(--dsw-alias-bg-layer-2)}',
      '.bgs-swatch:hover .bgs-swatchLabel{color:var(--dsw-alias-label-primary)}',
      '.bgs-swatch:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;border-radius:var(--dsw-radius-sm,6px)}',
      '.bgs-swatchActive .bgs-swatchArt{box-shadow:0 0 0 2px var(--dsw-alias-brand-primary)}',
      '.bgs-swatchActive .bgs-swatchLabel{color:var(--dsw-alias-label-primary);font-weight:500}',
      '.bgs-swatchLabel{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.bgs-custom{grid-column:1/-1;margin-top:2px;padding-top:10px;border-top:.5px solid var(--dsw-alias-border-l2)}',
      '.bgs-customLabel{display:block;margin-bottom:6px;font-size:12px;color:var(--dsw-alias-label-secondary)}',
      '.bgs-customActive .bgs-customLabel{color:var(--dsw-alias-brand-primary)}',
      '.bgs-customRow{display:flex;gap:6px;align-items:center}',
      '.bgs-input{box-sizing:border-box;flex:1;min-width:0;height:32px;padding:0 10px;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-md,8px);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font:inherit;font-size:13px}',
      '.bgs-input:focus-visible{outline:1px solid var(--dsw-alias-brand-primary);outline-offset:-1px}',
      '.bgs-apply{flex:none;height:32px;padding:0 12px;border:0;border-radius:var(--dsw-radius-md,8px);background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-bg-layer-1);font:inherit;font-size:13px;cursor:pointer}',
      '.bgs-apply:disabled{opacity:.4;cursor:default}',
      '.bgs-apply:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.bgs-hint{grid-column:1/-1;margin:0;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary)}',
      /* Sidebar-foot trigger. Height and radius follow the settings row below
       * (`VOzbGW_trigger`: 42px, `radius-md`), so the two seats read as a pair;
       * the vertical margin is kept tight, since the settings row's own `4px`
       * row margin left this one looser than the panel rows above it. Hover
       * paint is the same `--dsw-alias-interactive-bg-hover` both use.
       *
       * The seat is a flex item of `sidebar.footer.action`, which would shrink
       * it to content width and leave the row's `calc(100% + 4px)` with no
       * basis; the host claims `width:100%` on itself for the same reason. */
      '.bgs-foot{flex:none;width:100%;min-width:0}',
      '.bgs-footRow{flex:none;display:flex;align-items:center;gap:8px;width:calc(100% + 4px);margin:1px -2px}',
      '.bgs-footButton{box-sizing:border-box;display:flex;align-items:center;flex:1;gap:8px;min-width:0;width:auto;height:42px;margin:0;padding:0 10px 0 8px;border:0;border-radius:var(--dsw-radius-md,8px);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:14px;line-height:22px;cursor:pointer;overflow:hidden}',
      '.bgs-footButton:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.bgs-footButton:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}',
      '.bgs-footIcon{flex:none;display:block}',
      '.bgs-footLabel{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      /* Narrow rail: the seat collapses to one centred 36px icon, matching the
       * settings row's own rail rule. */
      '.bgs-foot[data-wide=false]{width:auto}',
      '.bgs-foot[data-wide=false] .bgs-footRow{width:36px;margin:8px 0 10px}',
      '.bgs-foot[data-wide=false] .bgs-footButton{flex:none;justify-content:center;gap:0;width:36px;height:36px;margin:0;padding:0}',
      '.bgs-foot[data-wide=false] .bgs-footLabel{display:none}',
      /* The picker panel: a floating surface anchored beside the sidebar foot. */
      '.bgs-panel{position:fixed;z-index:1200;box-sizing:border-box;width:320px;max-width:calc(100vw - 24px);max-height:calc(100vh - 24px);overflow-y:auto;padding:14px;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-lg,10px);background:var(--dsw-alias-bg-layer-1);box-shadow:var(--dsw-elevation-prominent,0 8px 24px rgba(0,0,0,.18));color:var(--dsw-alias-label-primary);pointer-events:auto}',
      '.bgs-panelTitle{margin:0 0 10px;font-size:13px;line-height:20px;font-weight:500;color:var(--dsw-alias-label-primary)}',
      '.bgs-panel .bgs-gallery{grid-template-columns:repeat(auto-fill,minmax(72px,1fr))}',
    ].join('');

    /**
     * The sidebar-foot glyph: a framed picture, matching the neighbouring
     * settings row's icon weight.
     * @param size - square edge in pixels.
     */
    function frameIcon(size) {
      return h(
        'svg',
        {
          className: 'bgs-footIcon',
          viewBox: '0 0 16 16',
          width: size,
          height: size,
          'aria-hidden': true,
          focusable: false,
        },
        h('rect', {
          x: 1.75,
          y: 2.75,
          width: 12.5,
          height: 10.5,
          rx: 2,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.3,
        }),
        h('circle', { cx: 5.9, cy: 6.4, r: 1.15, fill: 'currentColor' }),
        h('path', {
          d: 'M2.4 11.2l3.1-2.7 2.3 2 1.9-1.6 3.9 3.2',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      );
    }

    /**
     * One preset swatch.
     * @param props - `preset`, `t`, `active`, `onPick`.
     */
    function Swatch(props) {
      const { preset, t, active, onPick } = props;
      return h(
        'button',
        {
          type: 'button',
          className: 'bgs-swatch' + (active ? ' bgs-swatchActive' : ''),
          'aria-pressed': active,
          title: t('preset.' + preset.id),
          onClick: () => onPick(preset.id),
        },
        h('span', {
          className: 'bgs-swatchArt',
          style: preset.art ? { backgroundImage: preset.art } : undefined,
          'data-plain': preset.art ? undefined : 'true',
        }),
        h('span', { className: 'bgs-swatchLabel' }, t('preset.' + preset.id)),
      );
    }

    /**
     * The preset grid plus the custom-URL row; the body shared by the settings
     * row and the sidebar picker panel.
     * @param props - `t`, `current`, `draft`, `setDraft`, `applyCustom`.
     */
    function Gallery(props) {
      const { t, current, draft, setDraft, applyCustom } = props;
      return h(
        'div',
        { className: 'bgs-gallery', role: 'group', 'aria-label': t('gallery.aria') },
        PRESETS.map((preset) =>
          h(Swatch, {
            key: preset.id,
            preset,
            t,
            active: current.id === preset.id,
            onPick: (id) => setSelection({ id }),
          }),
        ),
        h(
          'div',
          { className: 'bgs-custom' + (current.id === 'custom' ? ' bgs-customActive' : '') },
          h('label', { className: 'bgs-customLabel', htmlFor: 'bgs-custom-url' }, t('custom.label')),
          h(
            'div',
            { className: 'bgs-customRow' },
            h('input', {
              id: 'bgs-custom-url',
              className: 'bgs-input',
              type: 'text',
              spellCheck: false,
              placeholder: t('custom.placeholder'),
              value: draft,
              onChange: (event) => setDraft(event.target.value),
              onKeyDown: (event) => {
                if (event.key !== 'Enter') return;
                event.preventDefault();
                applyCustom();
              },
            }),
            h(
              'button',
              {
                type: 'button',
                className: 'bgs-apply',
                disabled: !urlArt(draft),
                onClick: applyCustom,
              },
              t('custom.apply'),
            ),
          ),
        ),
        h('p', { className: 'bgs-hint' }, t('gallery.hint')),
      );
    }

    /**
     * The sidebar-foot trigger plus the picker panel it discloses. The panel is
     * position-fixed beside the foot: the seat itself is as narrow as 56px when
     * the sidebar collapses, so the gallery cannot live inside it.
     * @param props - slot props; `wide` and `t` arrive from the slot.
     */
    function FooterButton(props) {
      const t = props.t;
      const wide = props.wide !== false;
      const [current, setCurrent] = React.useState(getSelection);
      const [open, setOpen] = React.useState(false);
      const [draft, setDraft] = React.useState(() => {
        const stored = getSelection();
        return stored.id === 'custom' && stored.url ? stored.url : '';
      });
      const [anchor, setAnchor] = React.useState(null);
      const rootRef = React.useRef(null);
      const triggerRef = React.useRef(null);
      const panelRef = React.useRef(null);

      React.useEffect(() => subscribeSelection(() => setCurrent(getSelection())), []);

      /* The panel rides above every column, so its position is measured from the
       * trigger each time it opens and on any resize while it is up. Its own
       * height is measured too: the trigger sits at the foot of the sidebar, so
       * a naive `top = button.top` pushes the gallery off the top of the view. */
      React.useEffect(() => {
        if (!open) return undefined;
        const place = () => {
          const node = triggerRef.current;
          if (!node) return;
          const box = node.getBoundingClientRect();
          const margin = 8;
          const width = panelRef.current ? panelRef.current.offsetWidth : 320;
          const height = panelRef.current ? panelRef.current.offsetHeight : 0;
          const left = Math.min(
            Math.max(margin, box.right + margin),
            Math.max(margin, window.innerWidth - width - margin),
          );
          /* Prefer aligning the panel's bottom with the trigger's bottom, then
           * pull it back inside the viewport whichever way it overflows. */
          const top = Math.min(
            Math.max(margin, box.bottom - height),
            Math.max(margin, window.innerHeight - height - margin),
          );
          setAnchor({ left, top });
        };
        place();
        /* A second pass once the panel has reported its size. */
        const raf = window.requestAnimationFrame(place);
        window.addEventListener('resize', place);
        return () => {
          window.cancelAnimationFrame(raf);
          window.removeEventListener('resize', place);
        };
      }, [open]);

      React.useEffect(() => {
        if (!open) return undefined;
        const onKeyDown = (event) => {
          if (event.key !== 'Escape') return;
          setOpen(false);
          if (triggerRef.current) triggerRef.current.focus();
        };
        const onPointerDown = (event) => {
          if (rootRef.current && rootRef.current.contains(event.target)) return;
          setOpen(false);
        };
        document.addEventListener('keydown', onKeyDown, true);
        document.addEventListener('mousedown', onPointerDown, true);
        return () => {
          document.removeEventListener('keydown', onKeyDown, true);
          document.removeEventListener('mousedown', onPointerDown, true);
        };
      }, [open]);

      const applyCustom = () => {
        const url = String(draft || '').trim();
        /* Reject an address the backdrop cannot use before storing it. */
        if (!url || !urlArt(url)) return;
        setSelection({ id: 'custom', url });
      };

      const panel = open && anchor
        ? h(
            'div',
            {
              ref: panelRef,
              className: 'bgs-panel',
              style: { left: anchor.left + 'px', top: anchor.top + 'px' },
              role: 'dialog',
              'aria-label': t('row.aria'),
            },
            h('p', { className: 'bgs-panelTitle' }, t('row.title')),
            h(Gallery, { t, current, draft, setDraft, applyCustom }),
          )
        : null;

      return h(
        React.Fragment,
        null,
        h('style', { dangerouslySetInnerHTML: { __html: CSS_TEXT } }),
        h(
          'div',
          { className: 'bgs-foot', 'data-wide': wide ? 'true' : 'false', ref: rootRef },
          h(
            'div',
            { className: 'bgs-footRow' },
            h(
              'button',
              {
                ref: triggerRef,
                type: 'button',
                className: 'bgs-footButton',
                'aria-label': t('row.aria'),
                'aria-expanded': open,
                title: wide ? undefined : t('footer.label'),
                onClick: () => setOpen((value) => !value),
              },
              frameIcon(16),
              h('span', { className: 'bgs-footLabel' }, t('footer.label')),
            ),
          ),
          panel,
        ),
      );
    }

    return {
      inject: ['slots', 'locale', 'theme'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'bg-switcher: dictionaries');

        /* The backdrop is owned here, not by the row: it must survive the
         * settings panel closing and follow the durable choice from boot. */
        ctx.effect(() => {
          let styleElement = null;
          let removeTokens = null;
          const clear = () => {
            if (styleElement) {
              styleElement.remove();
              styleElement = null;
            }
            if (removeTokens) {
              removeTokens();
              removeTokens = null;
            }
          };
          const project = () => {
            clear();
            const css = backdropCss(getSelection());
            if (!css) return;
            styleElement = document.createElement('style');
            styleElement.dataset.plugin = PLUGIN_ID;
            styleElement.dataset.pluginCss = PLUGIN_ID + '/backdrop';
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
            /* The frame paints `--dsw-alias-bg-base`; clearing it lets the
             * canvas backdrop show while raised surfaces stay opaque. */
            removeTokens = ctx.theme.overrideTokens(PLUGIN_ID, {
              '--dsw-alias-bg-base': { light: 'transparent', dark: 'transparent' },
            });
          };
          const unsubscribe = subscribeSelection(project);
          project();
          return () => {
            unsubscribe();
            clear();
          };
        }, 'bg-switcher: backdrop');

        /* Sidebar foot, above the shipped Settings row: the shell renders
         * `sidebar.footer.action` before `sidebar.settings`, so one entry here
         * lands directly above Settings. The picker panel rides in this
         * component as a position-fixed surface, since the seat itself collapses
         * to a 56px rail. */
        ctx.slots.inject('sidebar.footer.action', () =>
          ctx.slots.register(
            {
              name: 'sidebar.footer.action',
              id: 'bg-switcher',
              locale: NS,
            },
            FooterButton,
          ),
        );
      },
    };
  },
});
