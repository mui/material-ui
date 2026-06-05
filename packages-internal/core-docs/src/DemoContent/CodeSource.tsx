import { Tabs } from '@base-ui/react/tabs';
import { alpha, styled } from '@mui/material/styles';
import { blueDark } from '../branding';

// Dark code-panel background used by the highlighted source viewer.
const CODE_BG = 'hsl(210, 25%, 9%)';

/**
 * Single-file tab button used in the multi-file tab bar between the toolbar
 * and the code panel. Renders as a Base UI `Tabs.Tab` so the surrounding
 * `Tabs.List` (`DemoFileTabBar`) provides the standard tablist semantics:
 * a single Tab stop and arrow-key roving focus.
 */
export const FileTab = styled(Tabs.Tab)(({ theme }) => ({
  flex: '0 0 auto',
  height: 26,
  minWidth: 45,
  padding: '2px 8px',
  border: '1px solid transparent',
  borderRadius: 99,
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  lineHeight: 1.2,
  outline: 'none',
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
  color: (theme.vars || theme).palette.text.tertiary,
  transition: 'background 100ms ease, color 100ms ease',
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.divider,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineOffset: '1px',
    outlineColor: (theme.vars || theme).palette.primary.light,
  },
  '&[data-active]': {
    color: (theme.vars || theme).palette.primary[700],
    backgroundColor: (theme.vars || theme).palette.primary[50],
    borderColor: (theme.vars || theme).palette.primary[200],
    ...theme.applyDarkStyles({
      color: (theme.vars || theme).palette.primary[200],
      backgroundColor: alpha(theme.palette.primary[900], 0.4),
      borderColor: (theme.vars || theme).palette.primary[800],
    }),
  },
}));

/**
 * Wraps the already-highlighted code from `useDemo`. Hosts the styles
 * required by the `enhanceCodeEmphasis` source enhancer: frame/line
 * highlights, indent shifting, fade overlay, and collapsible frame
 * transitions for `data-frame-type` / `data-collapsible` markup.
 */
export const CodeSource = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded?: boolean }>(({ theme }) => ({
  position: 'relative',

  // ---- Base <pre> styles (existing dark code panel) ----
  '& pre': {
    margin: 0,
    marginTop: -1,
    maxWidth: 'initial',
    borderRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'auto',
    backgroundColor: CODE_BG,
    border: '1px solid transparent',
    '-webkit-print-color-scheme': 'dark',
    colorScheme: 'dark',
    color: '#f8f8f2',
    padding: 'calc(2 * var(--muidocs-spacing))',
    fontFamily: 'Menlo, Consolas, "Droid Sans Mono", monospace',
    fontWeight: '400',
    fontSize: '0.8125rem',
    lineHeight: '1.5',
    // In dark mode the page background already matches the code panel's dark
    // surface, so the panel needs a visible divider border to separate it
    // from the surrounding content. Light mode keeps the transparent border
    // (the dark panel already contrasts with the page).
    ...theme.applyDarkStyles({
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
    }),
  },
  // Hover ring on the editable `<pre>`.
  '& .editable-code-wrapper pre:hover': {
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary[500], 0.5)}`,
  },
  // When the editable `<pre>` is focused (after pressing Enter), use the
  // brand-blue focus ring instead of the browser default (which is white in
  // dark color schemes).
  '& .editable-code-wrapper pre:focus, & .editable-code-wrapper pre:focus-visible': {
    outline: `3px solid ${alpha(theme.palette.primary[500], 0.8)}`,
    outlineOffset: 0,
  },

  // Cap height only on non-collapsible blocks; collapsible blocks animate their
  // own height via frame transitions and need clean overflow handling.
  '& pre:not(:has(> code[data-collapsible]))': {
    maxHeight: 'min(68vh, 1000px)',
  },

  // Collapsible blocks don't scroll on their own — the surrounding
  // `DemoCodeWindow` is the single scroll container for both axes, so the
  // horizontal scrollbar sits at the window's edge instead of the bottom of the
  // full-height `<pre>` (which scrolls out of view once the expanded source is
  // taller than the window's cap). The pre overflows freely; the window clips
  // and scrolls (and owns the scrollbar-gutter swap; see `DemoCodeWindow`).
  // `min-width: fit-content` grows the pre's box to the widest line (a block
  // would otherwise stay at the window's width), so the panel background and
  // border span the full horizontal scroll extent instead of stopping at the
  // window edge and leaving overflowing code on the bare page background.
  '& pre:has(> code[data-collapsible])': {
    overflow: 'visible',
    minWidth: 'fit-content',
  },

  '& pre:has(> code > .frame[data-frame-truncated="visible"])': {
    paddingBottom: 0,
  },

  // ---- Collapse-to-empty padding ----
  // A `collapseToEmpty` / `oversizedFocus: 'hide'` block records
  // `data-focused-lines="0"`: the collapsed window shows nothing — every frame
  // is hidden — so the panel must take no vertical space. The frames already
  // animate to zero height (see the collapsible frame rules below), but the
  // `<pre>`'s own vertical padding would otherwise leave a ~32px empty gap.
  // Zero the top/bottom padding while collapsed and transition it so the gap
  // grows and shrinks in step with the frames on expand/collapse instead of
  // snapping. The expanded variant restores it.
  '& pre:has(> code[data-collapsible][data-focused-lines="0"])': {
    paddingTop: 0,
    paddingBottom: 0,
    // Collapse the <pre>'s border to zero width too. With padding and content
    // already at zero, the only remaining height is the border-box — and since
    // `background-clip` defaults to `border-box`, the dark code background fills
    // those ~2px and pokes out (square top corners) past the rounded toolbar's
    // bottom corners. Zeroing the border width collapses the border-box to zero
    // height, so nothing renders below the toolbar (this also removes the
    // dark-mode divider line). The expanded variant restores the 1px border;
    // its color still comes from the base `& pre` rule.
    borderWidth: 0,
    transition: 'padding 0.3s cubic-bezier(0.5, 0, 0, 1), border-width 0.3s ease',
  },

  // Code element inside pre — block so frames stretch to the widest line.
  '& pre > code': {
    display: 'block',
    minWidth: 'fit-content',
  },

  // ---- Frame & line layout ----
  // The HAST emitted by `enhanceCodeEmphasis` separates `.line` spans with
  // whitespace text nodes (spaces/newlines). With `display: block` on `.line`,
  // each of those whitespace nodes also forms an anonymous line box that
  // takes up a full `line-height` of vertical space, doubling the apparent
  // line spacing. Setting `line-height: 0` on the frame collapses those
  // anonymous boxes to zero height; the explicit `line-height` on `.line`
  // restores normal spacing for the actual lines of code.
  '& pre > code > .frame': {
    display: 'block',
  },
  '& pre > code > .frame[data-lined]': {
    lineHeight: 0,
  },
  '& pre > code > .frame[data-lined] .line': {
    display: 'block',
    lineHeight: 1.5,
    whiteSpace: 'pre',
  },

  // Hide the selection highlight on the inter-line gap text nodes (the
  // literal `\n` between `.line` spans). Those characters are real text
  // positions in contentEditable, so when a user drags a selection across
  // multiple lines the browser paints a `line-height: 0` highlight strip
  // for each gap — visible as a thin horizontal bar between lines. Making
  // the frame's `::selection` transparent removes the strip; the explicit
  // `.line ::selection` rule re-enables the standard system highlight
  // inside actual code lines.
  '& pre > code > .frame[data-lined]::selection, & pre > code > .frame[data-lined] *::selection': {
    background: 'transparent',
  },
  '& pre > code > .frame[data-lined] .line::selection, & pre > code > .frame[data-lined] .line *::selection':
    {
      background: 'Highlight',
      color: 'HighlightText',
    },

  // Highlighted frames get rounded corners and a subtle background.
  '& .frame[data-frame-type="highlighted"], & .frame[data-frame-type="highlighted-unfocused"]': {
    background: alpha(theme.palette.primary.main, 0.18),
    borderRadius: 8,
    margin: '0 -6px',
    padding: '0 6px',
  },

  // Line-level highlight inside a frame (nested emphasis).
  '& .line[data-hl]': {
    background: alpha(theme.palette.primary.main, 0.18),
    margin: '0 -6px',
    padding: '0 6px',
  },
  // Inline highlights are emitted as `<mark>` by `enhanceCodeEmphasis`
  // (e.g. `@highlight-text`). Override the UA `mark` default (yellow fill,
  // dark text — unreadable on the dark panel): keep the surrounding code's
  // color and apply the brand tint. A bare `<mark>` is emitted for matches
  // outside a line highlight; marks inside one inherit the line's `data-hl`
  // tier (propagated by the enhancer) and read progressively stronger than
  // the line background they sit on.
  '& mark': {
    color: 'inherit',
    background: alpha(theme.palette.primary.main, 0.32),
    borderRadius: 4,
  },
  '& mark[data-hl]': {
    background: alpha(theme.palette.primary.main, 0.4),
  },
  '& mark[data-hl="strong"]': {
    background: alpha(theme.palette.primary.main, 0.5),
  },
  '& .line[data-hl="strong"]': {
    background: alpha(theme.palette.primary.main, 0.32),
    margin: '0 -6px',
    padding: '0 6px',
  },
  // Strong lines bordering a regular highlight need to stack above it so the
  // regular line's extended background sits underneath the rounded corners.
  '& .line[data-hl="strong"][data-hl-position="single"], & .line[data-hl="strong"][data-hl-position="end"]':
    {
      position: 'relative',
      zIndex: 1,
    },
  // Visually merge a regular highlighted line into an adjacent strong block.
  '& .line[data-hl=""]:has(+ .line[data-hl="strong"])': {
    paddingBottom: 6,
    marginBottom: -6,
  },
  '& .line[data-hl="strong"] + .line[data-hl=""]': {
    paddingTop: 6,
    marginTop: -6,
  },
  '& .line[data-hl-position="single"]': { borderRadius: 8 },
  '& .line[data-hl-position="start"]': {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  '& .line[data-hl-position="end"]': {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  // Description badges (rendered via `data-hl-description` / `data-frame-description`).
  '& .line[data-hl-description]::after': {
    content: 'attr(data-hl-description)',
    float: 'right',
    background: theme.palette.primary.main,
    borderRadius: 8,
    color: theme.palette.primary.contrastText,
    padding: '2px 4px',
    marginRight: -6,
  },
  '& .frame[data-frame-description]::before': {
    content: 'attr(data-frame-description)',
    float: 'right',
    background: theme.palette.primary.main,
    borderRadius: 8,
    color: theme.palette.primary.contrastText,
    padding: '2px 4px',
  },

  // ---- Editable code wrapper ----
  // Focus-trap wrapper added by `<Pre>` when `setSource` is provided. The
  // wrapper is the keyboard-only tab stop; pressing Enter focuses the inner
  // `<pre>` and engages contentEditable Tab-indents-line behavior. Escape
  // returns focus to the wrapper. The overlay is hidden via the [hidden]
  // attribute when the wrapper isn't armed; only shown after keyboard focus
  // arrives on the wrapper.
  '& .editable-code-wrapper': {
    position: 'relative',
    display: 'block',
    borderRadius: 8,
  },
  '& .editable-code-wrapper:focus-visible': {
    outline: 0,
  },
  // "Press Enter to start editing" overlay. `<Pre>` ships the overlay with
  // the `[hidden]` attribute by default and toggles `data-editable-prompt` on
  // the wrapper while the prompt is shown. Override `[hidden]` so the overlay
  // stays in layout, then animate the slide/fade + focus ring via
  // `data-editable-prompt`.
  '& .editable-code-wrapper .editable-code-overlay[hidden]': {
    display: 'block',
  },
  '& .editable-code-wrapper .editable-code-overlay': {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: theme.spacing(0.2, 1, 0.5, 1),
    border: '1px solid',
    borderColor: blueDark[600],
    backgroundColor: blueDark[700],
    color: '#FFF',
    borderRadius: 6,
    fontSize: theme.typography.pxToRem(13),
    // Animate the popup slide/fade together with its focus ring. `outline`
    // (rather than `box-shadow`) is used so the ring paints purely outside
    // the popup and never stacks under the popup's own background/border.
    transition: 'top 0.3s, opacity 0.3s, visibility 0.3s, outline-color 0.3s, outline-width 0.3s',
    outlineStyle: 'solid',
    outlineColor: alpha(theme.palette.primary[500], 0),
    outlineWidth: 0,
    outlineOffset: 0,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    visibility: 'hidden',
    opacity: 0,
    pointerEvents: 'none',
    zIndex: 1,
  },
  '& .editable-code-wrapper[data-editable-prompt] .editable-code-overlay': {
    top: theme.spacing(1),
    visibility: 'visible',
    opacity: 1,
    outlineColor: alpha(theme.palette.primary[500], 0.8),
    outlineWidth: 3,
  },
  '& .editable-code-wrapper .editable-code-overlay kbd': {
    padding: theme.spacing(0.2, 0.4),
    backgroundColor: blueDark[500],
    fontSize: theme.typography.pxToRem(11),
    borderRadius: 6,
    border: '1px solid',
    borderColor: blueDark[400],
  },

  // Truncated visible frame: only round top — bottom fades out via overlay.
  '& .frame[data-frame-truncated="visible"]': {
    borderRadius: '8px 8px 0 0',
  },
  // Truncated hidden frame is the bottom of the region.
  '& .frame[data-frame-truncated="hidden"]': {
    borderRadius: '0 0 8px 8px',
  },

  // ---- Collapsible frame behavior ----
  // Scoped to collapsible demos: in non-collapsible demos every frame lacks
  // `data-frame-type`, so an unscoped rule would hide all of them.
  '& pre:has(> code[data-collapsible]) .frame:not([data-frame-type]), & pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted-unfocused"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus-unfocused"]':
    {
      maxHeight: 0,
      overflow: 'hidden',
      overflowAnchor: 'none',
      opacity: 0,
      visibility: 'hidden',
      transition:
        'max-height 0.3s cubic-bezier(0.5, 0, 0, 1), opacity 0.2s ease 0.1s, visibility 0.3s',
      '@supports (interpolate-size: allow-keywords)': {
        interpolateSize: 'allow-keywords',
        maxHeight: 'unset',
        height: 0,
        overflow: 'clip',
        transition: 'height 0.3s ease, opacity 0.3s ease, visibility 0.3s',
      },
    } as any,
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted-unfocused"]': {
    opacity: 1,
  },

  // Indent shifting for the focused/highlighted region. Uses transform to
  // avoid layout reflow during height transitions.
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus"]':
    {
      transition: 'transform 0.3s ease',
    },
  // Highlight backgrounds for the collapsed/focused view are painted by a
  // pseudo-element rather than the element's own `background`, so indent-
  // shifting a frame left can extend the tint back to the code's right edge by
  // animating one always-rounded box (its `width`). There are no element
  // corners to square and un-square, so the un-indent animation stays smooth.
  // `--di-indent-shift` is published per indent level on the frame (below) and
  // inherited by nested lines, so a frame and its highlighted lines extend by
  // the same amount. The frame paints via `::after` (its `::before` is the
  // frame description badge); lines paint via `::before` (their `::after` is
  // the line description badge). Each pseudo sits at `z-index: -1` behind the
  // code text; `isolation` scopes that stacking to the frame.
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"]': {
    position: 'relative',
    isolation: 'isolate',
    background: 'transparent',
  },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl]': {
    position: 'relative',
    background: 'transparent',
  },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"]::after, & pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl]::before':
    {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 'calc(100% + var(--di-indent-shift, 0px))',
      zIndex: -1,
      transition: 'width 0.3s ease',
      pointerEvents: 'none',
    },
  // Frame tint — a single block, always fully rounded.
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"]::after': {
    background: alpha(theme.palette.primary.main, 0.18),
    borderRadius: 8,
  },
  // A truncated highlighted frame rounds only its visible end (mirrors the
  // element-level `data-frame-truncated` rules, which the now-transparent
  // element background no longer shows).
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"][data-frame-truncated="visible"]::after':
    {
      borderRadius: '8px 8px 0 0',
    },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"][data-frame-truncated="hidden"]::after':
    {
      borderRadius: '0 0 8px 8px',
    },
  // Line tint — matches the line's `data-hl` tier and its position rounding
  // (the pseudo is the whole line highlight, not just an extension).
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl]::before':
    {
      background: alpha(theme.palette.primary.main, 0.18),
    },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl="strong"]::before':
    {
      background: alpha(theme.palette.primary.main, 0.32),
    },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl][data-hl-position="single"]::before':
    {
      borderRadius: 8,
    },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl][data-hl-position="start"]::before':
    {
      borderRadius: '8px 8px 0 0',
    },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl][data-hl-position="end"]::before':
    {
      borderRadius: '0 0 8px 8px',
    },
  // Per indent level: pull the frame left and publish the extension width (the
  // `level * 2ch` shift plus 6px, so the tint reaches a touch past the code's
  // right edge) as a custom property the frame and nested line pseudos read.
  ...Object.fromEntries(
    Array.from({ length: 8 }, (_unused, idx) => {
      const level = idx + 1;
      return [
        `& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"][data-frame-indent="${level}"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus"][data-frame-indent="${level}"]`,
        {
          transform: `translateX(-${level * 2}ch)`,
          '--di-indent-shift': `calc(${level * 2}ch + 6px)`,
        },
      ];
    }),
  ),

  variants: [
    {
      props: { expanded: true },
      style: {
        // Show all frames when expanded.
        '& pre:has(> code[data-collapsible]) .frame:not([data-frame-type]), & pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted-unfocused"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus-unfocused"]':
          {
            maxHeight: 2220,
            opacity: 1,
            visibility: 'visible',
            transition:
              'max-height 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.15s ease, visibility 0s',
            '@supports (interpolate-size: allow-keywords)': {
              maxHeight: 'unset',
              height: 'auto',
              overflow: 'clip',
              transition: 'height 0.3s ease, opacity 0.3s ease, visibility 0s',
            },
          } as any,
        // Reset the indent shift and collapse the background extension when
        // expanded: the frame is back at its natural position, so zero
        // `--di-indent-shift` (the nested line pseudos inherit it) and the
        // frame and line pseudos animate their `width` back to natural. Must
        // match the per-indent base rules' specificity (which include
        // `[data-frame-indent="N"]`) or the base values would still win.
        ...Object.fromEntries(
          Array.from({ length: 8 }, (_unused, idx) => {
            const level = idx + 1;
            return [
              `& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"][data-frame-indent="${level}"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus"][data-frame-indent="${level}"]`,
              { transform: 'translateX(0)', '--di-indent-shift': '0px' },
            ];
          }),
        ),
        '& pre:has(> code > .frame[data-frame-truncated="visible"])': {
          paddingBottom: 'calc(2 * var(--muidocs-spacing))',
        },
        // Collapse-to-empty: restore the <pre>'s vertical padding and 1px border
        // width — both animated by the transitions declared on the collapsed
        // base rule above. The border color comes from the base `& pre` rule
        // (transparent in light mode, divider in dark).
        '& pre:has(> code[data-collapsible][data-focused-lines="0"])': {
          paddingTop: 'calc(2 * var(--muidocs-spacing))',
          paddingBottom: 'calc(2 * var(--muidocs-spacing))',
          borderWidth: '1px',
        },
      },
    },
  ],
}));
