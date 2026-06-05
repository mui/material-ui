import * as React from 'react';
import { Tabs } from '@base-ui/react/tabs';
import IconButton from '@mui/material/IconButton';
import { alpha, styled, type CSSObject, type Theme } from '@mui/material/styles';
import { DemoComponentTheme } from '../DemoThemeProviders';
import { DemoErrorBoundary } from './DemoErrorBoundary';

// ---------------------------------------------------------------------------
// Structural shell shared by `DemoContent` and `DemoContentLoading`.
//
// `DemoContainer` is a slot-based presentational primitive: callers populate
// the structural regions (preview, toolbar, tabs, code, after-code) and the
// container takes care of layout, borders, anchors, and the focus trap target.
// This keeps the loading skeleton visually identical to the live demo without
// duplicating styled-components.
// ---------------------------------------------------------------------------

export const DemoRoot = styled('div')(({ theme }) => ({
  marginBottom: 24,
  marginLeft: theme.spacing(-2),
  marginRight: theme.spacing(-2),
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
    marginRight: 0,
  },
  // Make each demo a layout/style boundary so the expand/collapse
  // `max-height` transition doesn't force the entire document tree (every
  // other demo, sidebar, etc.) to relayout on every frame. Without this,
  // Chrome reports `partialLayout: false` and reflows 6000+ objects per
  // animation frame; with it, sibling demos shift position but skip their
  // internal layout/style passes.
  //
  // `paint` containment is intentionally omitted — it creates a paint layer
  // per demo and multiplies Paint events (~30x on a typical docs page)
  // without further reducing layout cost.
  contain: 'layout style',

  // ---- Empty-focus collapse: re-round the toolbar's bottom corners ----
  // A `collapseToEmpty` / `oversizedFocus: 'hide'` block renders
  // `<code data-focused-lines="0">` and, while collapsed, shows nothing (see the
  // padding/frame rules in `CodeSource`). With an empty collapsed window the
  // toolbar is the visual bottom of the demo, so its bottom corners should
  // round — but `DemoToolbarRoot`'s `hasSourceFocus` variant squares them
  // unconditionally (it assumes a focused snippet is always visible below). Undo
  // that here while collapsed. `data-code-open` (set on expand) drops the rule
  // so the corners square off as the source appears; the toolbar's own
  // `transition: border-radius` animates the change.
  '&:has(pre > code[data-focused-lines="0"]):not([data-code-open]) [role="toolbar"]': {
    [theme.breakpoints.up('sm')]: {
      borderRadius: '0 0 12px 12px',
    },
  },
}));

// Outer preview wrapper — visual container around the rendered demo.
// `bg` selects the background treatment (`outlined` is the implicit default;
// `inline`, `playground`, `gradient`, and `true` are MDX-author overrides).
// `hideToolbar` switches the bottom corners between rounded and squared so
// the preview merges with the toolbar below it when one is present.
export const DemoPreviewArea = styled('div', {
  shouldForwardProp: (prop) => prop !== 'bg' && prop !== 'hideToolbar',
})<{ bg?: string | boolean; hideToolbar?: boolean }>(({ theme }) => ({
  position: 'relative',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  variants: [
    {
      props: ({ hideToolbar }) => !!hideToolbar,
      style: {
        [theme.breakpoints.up('sm')]: {
          borderRadius: 12,
        },
      },
    },
    {
      props: ({ hideToolbar }) => !hideToolbar,
      style: {
        [theme.breakpoints.up('sm')]: {
          borderRadius: '12px 12px 0 0',
        },
      },
    },
    {
      props: { bg: 'outlined' },
      style: {
        padding: theme.spacing(3),
        backgroundColor: (theme.vars || theme).palette.background.paper,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        [theme.breakpoints.up('sm')]: {
          borderLeftWidth: 1,
          borderRightWidth: 1,
        },
        ...theme.applyDarkStyles({
          backgroundColor: alpha(theme.palette.primaryDark[700], 0.1),
        }),
      },
    },
    {
      props: { bg: 'inline' },
      style: {
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(0),
        },
      },
    },
    {
      props: { bg: 'playground' },
      style: {
        backgroundColor: (theme.vars || theme).palette.background.paper,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        overflow: 'auto',
      },
    },
    {
      props: { bg: true },
      style: {
        padding: theme.spacing(3),
        backgroundColor: alpha(theme.palette.grey[50], 0.5),
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        ...theme.applyDarkStyles({
          backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
        }),
      },
    },
    {
      props: { bg: 'gradient' },
      style: {
        overflow: 'auto',
        padding: theme.spacing(4, 2),
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        backgroundClip: 'padding-box',
        backgroundColor: alpha(theme.palette.primary[50], 0.2),
        backgroundImage: `radial-gradient(120% 140% at 50% 10%, transparent 40%, ${alpha(theme.palette.primary[100], 0.2)} 70%)`,
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(12, 8),
          borderLeftWidth: 1,
          borderRightWidth: 1,
        },
        ...theme.applyDarkStyles({
          backgroundColor: (theme.vars || theme).palette.primaryDark[900],
          backgroundImage: `radial-gradient(120% 140% at 50% 10%, transparent 30%, ${alpha(theme.palette.primary[900], 0.3)} 80%)`,
        }),
      },
    },
  ],
}));

// Inner sandbox wrapper — receives `maxWidth` / `height` from MDX so authors
// can constrain the rendered demo without affecting the surrounding preview
// chrome. Only rendered when a style is supplied so unwrapped demos keep the
// preview area's flex-child layout untouched.
export const DemoPreviewSandbox = styled('div')({});

export const DemoInitialFocus = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: theme.spacing(4),
  height: theme.spacing(4),
  pointerEvents: 'none',
}));

export const DemoAnchorLink = styled('div')({
  marginTop: -64, // height of toolbar
  position: 'absolute',
});

// Action-button bar between preview and code. The `expanded` variant squares
// off the bottom corners so the toolbar visually merges with the code panel
// below it. When `hasSourceFocus` is true a focused source snippet is always
// visible beneath the toolbar, so the bottom corners stay square regardless
// of whether the full source is expanded.
export const DemoToolbarRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expanded' && prop !== 'hasSourceFocus',
})<{ expanded?: boolean; hasSourceFocus?: boolean }>(({ theme }) => [
  {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxHeight: 50,
      marginTop: -1,
      padding: theme.spacing('2px', 1),
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      borderTopWidth: 0,
      backgroundColor: alpha(theme.palette.grey[50], 0.2),
      borderRadius: '0 0 12px 12px',
      transition: theme.transitions.create('border-radius'),
    },
    '& .MuiIconButton-root': {
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.grey[100],
      },
    },
    '& .MuiSvgIcon-root': {
      fontSize: 16,
      color: (theme.vars || theme).palette.grey[900],
    },
    variants: [
      {
        props: { expanded: true },
        style: {
          [theme.breakpoints.up('sm')]: {
            borderRadius: 0,
          },
        },
      },
      {
        props: { hasSourceFocus: true },
        style: {
          [theme.breakpoints.up('sm')]: {
            borderRadius: 0,
          },
        },
      },
    ],
  },
  theme.applyDarkStyles({
    [theme.breakpoints.up('sm')]: {
      backgroundColor: alpha(theme.palette.primaryDark[800], 0.2),
    },
    '& .MuiIconButton-root': {
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.primaryDark[700],
      },
    },
    '& .MuiSvgIcon-root': {
      color: (theme.vars || theme).palette.grey[400],
    },
  }),
]);

// File tab bar — shown between toolbar and code when a demo exposes multiple
// files. Renders as a Base UI `Tabs.List` (must live under a `Tabs.Root`) so
// the tabs form a single Tab stop with arrow-key roving focus.
const fileTabBarStyles = ({ theme }: { theme: Theme }): CSSObject => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  overflowX: 'auto',
  padding: theme.spacing(1.5, 1),
  borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
  borderRight: `1px solid ${(theme.vars || theme).palette.divider}`,
  backgroundColor: alpha(theme.palette.grey[50], 0.2),
  ...theme.applyDarkStyles({
    backgroundColor: alpha(theme.palette.primaryDark[800], 0.2),
  }),
});

export const DemoFileTabBar = styled(Tabs.List)(fileTabBarStyles);

// Plain-div twin used by the SSR loading skeleton, where wrapping in a
// `Tabs.Root` would be pointless (no interactive state).
export const DemoFileTabBarSkeleton = styled('div')(fileTabBarStyles);

// CSS-only collapse wrapper for the file tab bar. Animates `max-height` from
// 0 to a fixed cap so the bar can slide open/closed without a JS measurement
// step. The cap (`100px`) only needs to exceed the bar's intrinsic height
// (~52px = 1.5*8 padding + 26 tab + 1.5*8 padding + borders); the actual
// rendered height is still determined by the child.
export const DemoFileTabBarCollapse = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded?: boolean }>({
  overflow: 'hidden',
  maxHeight: 0,
  transition: 'max-height 0.3s ease',
  variants: [
    {
      props: { expanded: true },
      style: {
        maxHeight: 100,
      },
    },
  ],
});

// Wraps the highlighted code. The fade overlay relies on `:has()` to detect
// the emphasis-frame markup emitted by `enhanceCodeEmphasis`; demos without
// emphasis frames render identically. The skeleton variant in
// `DemoContentLoading` can safely render a plain block child here.
export const DemoCodeWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded?: boolean }>(() => ({
  position: 'relative',

  '&:has(pre > code > .frame[data-frame-truncated="visible"])': {
    overflowY: 'clip',
  },
  '&:has(pre > code > .frame[data-frame-truncated="visible"])::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    background: `linear-gradient(to bottom, transparent, ${alpha('hsl(210, 25%, 9%)', 0.85)})`,
    transition: 'transform 0.3s ease',
    pointerEvents: 'none',
  },

  variants: [
    {
      props: { expanded: true },
      style: {
        '&:has(pre > code > .frame[data-frame-truncated="visible"])::after': {
          transform: 'translateY(100%)',
        },
      },
    },
  ],
}));

// Fixed-height scroll "window" wrapped around the source panel, and the single
// scroll container for both axes. The height is capped at `min(68vh, 1000px)`
// so a long expanded source scrolls internally instead of growing the page
// indefinitely; shorter collapsed/focused snippets sit under the cap and still
// render at their natural height (a `max-height` cap never stretches content
// beneath it).
//
// The vertical cap is applied in both states on purpose. Gating it on
// `expanded` made collapse drop the cap on the first frame — before the inner
// `.frame` elements had animated their height down (a 0.3s transition) — so the
// window briefly ballooned to the full expanded source height and then shrank, a
// visible jump. Keeping the cap means the window tracks the shrinking content
// smoothly. It also keeps the panel a scroll container for the whole collapse,
// which is what `useCodeWindow`'s `scrollContainerRef` anchoring (attached here)
// compensates against (the resizing `DemoCodeWrapper` inside stays the observed
// `containerRef`).
//
// Horizontal scroll lives here too — not on the inner `<pre>` — so the
// horizontal scrollbar sits at the window's bottom edge (always in view) rather
// than at the bottom of a collapsible `<pre>` whose full height runs past the
// cap and out of sight. It is gated on `expanded`: a collapsed focused snippet
// never scrolls horizontally; expanding the full source re-enables it.
//
// Because the window owns the horizontal scroll, `useCodeWindow`'s gutter swap
// runs on this element (it is wired as `scrollContainerRef`): the hook flips
// `data-scrollbar-gutter` on the window itself, so the rules below hold
// `overflow-x: hidden` for the duration of the swap and animate an equivalent
// `margin-bottom` on the inner `<code>` to reserve the scrollbar's height. When
// the hook clears the attribute the real scrollbar takes over the reserved gap
// without a snap.
export const DemoCodeWindow = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded?: boolean }>({
  maxHeight: 'min(68vh, 1000px)',
  overflowY: 'auto',
  overflowX: 'hidden',
  // Width reserved for the horizontal scrollbar during the gutter swap. Matches
  // the classic scrollbar thickness; overlay scrollbars (0px) make
  // `useCodeWindow` skip the swap entirely.
  '--scrollbar-gutter-size': '15px',
  // Keep the bottom corners rounded with the inner `<pre>` while clipping the
  // scrolled content.
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  // NB: no `overscroll-behavior: contain` here. As an `overflow: auto` element
  // the window is a scroll container, and `contain` stops the wheel from
  // chaining to the page — so hovering over a code block that can't scroll
  // (a short collapsed snippet) or is already at its edge would freeze the page
  // scroll. Default chaining keeps the page scrolling normally over the panel.
  // ---- Collapse-to-empty: suppress the vertical scrollbar ----
  // A `collapseToEmpty` / `oversizedFocus: 'hide'` block collapses to an empty
  // window (`<code data-focused-lines="0">`). Collapsed there is nothing to
  // scroll, yet `overflowY: auto` still paints a 1px scrollbar: the inner
  // `<pre>`'s `margin-top: -1` (which overlaps the toolbar border) leaves 1px of
  // content above the window's top edge. That same overflow flashes mid-collapse
  // as the content shrinks toward zero. Drop vertical scrolling while collapsed
  // so no scrollbar can show; the expanded variant restores `overflowY: auto`.
  '&:has(pre > code[data-focused-lines="0"])': {
    overflowY: 'hidden',
  },
  // Hold the horizontal scrollbar back while the gutter swap runs. The
  // attribute selectors out-specify the `expanded` variant below, so the lock
  // wins mid-animation.
  '&[data-scrollbar-gutter="expand-from"], &[data-scrollbar-gutter="expand-to"], &[data-scrollbar-gutter="collapse-from"], &[data-scrollbar-gutter="collapse-to"]':
    {
      overflowX: 'hidden',
    },
  // Animate the reserved gutter on the inner `<code>` in step with the swap.
  '&[data-scrollbar-gutter="expand-from"] pre > code': {
    marginBottom: 0,
    transition: 'none',
  },
  '&[data-scrollbar-gutter="expand-to"] pre > code': {
    marginBottom: 'var(--scrollbar-gutter-size)',
    transition: 'margin-bottom 0.3s ease',
  },
  '&[data-scrollbar-gutter="collapse-from"] pre > code': {
    marginBottom: 'var(--scrollbar-gutter-size)',
    transition: 'none',
  },
  '&[data-scrollbar-gutter="collapse-to"] pre > code': {
    marginBottom: 0,
    transition: 'margin-bottom 0.3s ease',
  },
  variants: [
    {
      props: { expanded: true },
      style: {
        overflowX: 'auto',
        // Expanded, the empty-focus source is revealed and may exceed the
        // height cap — restore vertical scrolling suppressed by the collapsed
        // rule above.
        '&:has(pre > code[data-focused-lines="0"])': {
          overflowY: 'auto',
        },
      },
    },
  ],
});

export interface DemoContainerProps {
  /** Anchor `<div>` elements rendered above the preview for deep-linking. */
  anchors?: React.ReactNode;
  /** Main demo preview (rendered React element or a skeleton placeholder). */
  preview: React.ReactNode;
  /**
   * Background treatment for the preview area. Defaults to `'outlined'`.
   */
  bg?: string | boolean;
  /**
   * When true, the preview area is rendered without a trailing toolbar and
   * gets fully rounded corners.
   */
  hideToolbar?: boolean;
  /** Optional inline style applied to the rendered demo (used for `maxWidth` / `height`). */
  previewStyle?: React.CSSProperties;
  /**
   * When true, the demo renders inside an isolated theme scope so it can own
   * its own `CssVarsProvider` without inheriting MUI / Joy UI theme from the
   * surrounding page.
   */
  isolated?: boolean;
  /**
   * When true, the demo renders inside an `<iframe>` sandbox so it gets its own
   * document, CSS cascade, viewport, and `window` — required for
   * `position: fixed`, responsive breakpoints, `useMediaQuery`, and
   * `window`-prop demos.
   */
  iframe?: boolean;
  /**
   * Identifier used to scope the per-demo `cssVarPrefix` when `isolated` is
   * true. Typically the demo `slug` or `name`.
   */
  name?: string;
  /**
   * Reset hook surfaced inside the error-boundary fallback. Typically wired to
   * `useDemo().reset` so the fallback's reset button does the same thing as
   * the toolbar reset button.
   */
  onReset?: () => void;
  /** Optional overlay placed on top of the preview (e.g. error alert). */
  previewOverlay?: React.ReactNode;
  /** Optional ref target for the initial-focus button inside the preview. */
  focusRef?: React.Ref<HTMLButtonElement>;
  /**
   * Toolbar content. When `null`/`undefined`, the toolbar (and any tabs/code/
   * after-code regions) are hidden.
   */
  toolbar?: React.ReactNode;
  /** Ref attached to the toolbar root for focus management. */
  toolbarRef?: React.Ref<HTMLDivElement>;
  /** Accessible label for the toolbar landmark. */
  toolbarLabel?: string;
  /** Keydown handler for ARIA toolbar keyboard navigation. */
  onToolbarKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /** Focus handler used by the roving-tabindex hook. */
  onToolbarFocus?: React.FocusEventHandler<HTMLDivElement>;
  /** Whether the source viewer is currently expanded (drives the toolbar variant). */
  expanded?: boolean;
  /**
   * Whether the code panel exposes a focused source snippet (e.g. emphasis
   * frames from `enhanceCodeEmphasis`). When `true`, the toolbar's expand
   * action reveals additional surrounding context rather than the entire
   * source, and the toolbar's bottom corners stay square because the focused
   * snippet is always visible below it.
   */
  hasSourceFocus?: boolean;
  /** Optional file tab bar — typically only present for multi-file demos when expanded. */
  tabs?: React.ReactNode;
  /** Code viewer / source panel. */
  code?: React.ReactNode;
  /** Optional ref forwarded to the code wrapper (the resizing element) for scroll-anchoring. */
  codeRef?: React.Ref<HTMLDivElement>;
  /**
   * Optional ref forwarded to the scrollable code window (the fixed-height
   * `overflow: auto` ancestor). Wire `useCodeWindow`'s `scrollContainerRef`
   * here so expand/collapse anchoring compensates the panel's scroll.
   */
  codeScrollRef?: React.Ref<HTMLDivElement>;
  /** Slot rendered after the code panel (AI hero, ads, etc.). */
  afterCode?: React.ReactNode;
  /**
   * Optional render wrapper for the tabs + code region. Used by the live
   * demo to inject a `<Tabs.Root>` provider connecting `DemoFileTabBar` and
   * the code panel; the loading skeleton omits it.
   */
  renderTabsAndCode?: (children: React.ReactNode) => React.ReactNode;
}

/**
 * Renders the structural shell of a demo. Callers control content via slots so
 * the loading skeleton and the live demo can share identical layout while
 * differing in what they put in each region.
 */
export function DemoContainer(props: DemoContainerProps) {
  const {
    anchors,
    preview,
    bg,
    hideToolbar,
    previewStyle,
    isolated,
    iframe,
    name,
    onReset,
    previewOverlay,
    focusRef,
    toolbar,
    toolbarRef,
    toolbarLabel,
    onToolbarKeyDown,
    onToolbarFocus,
    expanded,
    hasSourceFocus,
    tabs,
    code,
    codeRef,
    codeScrollRef,
    afterCode,
    renderTabsAndCode,
  } = props;

  // Default to the `'outlined'` background when none is specified.
  const resolvedBg = bg ?? 'outlined';

  // Wrap the rendered demo with the per-demo theme provider and a render-
  // error boundary so the live `DemoContent` and the SSR `DemoContentLoading`
  // skeleton share the exact same theming — hydration cannot shift visuals.
  const themedName = name ?? 'demo';
  const themedPreview = (
    <DemoComponentTheme isolated={isolated} iframe={iframe} name={themedName}>
      <DemoErrorBoundary name={themedName} onReset={onReset}>
        {preview}
      </DemoErrorBoundary>
    </DemoComponentTheme>
  );

  const tabsAndCode = (
    <React.Fragment>
      {tabs}
      {code != null ? (
        <DemoCodeWindow ref={codeScrollRef} expanded={expanded}>
          <DemoCodeWrapper ref={codeRef} expanded={expanded}>
            {code}
          </DemoCodeWrapper>
        </DemoCodeWindow>
      ) : null}
    </React.Fragment>
  );

  return (
    <DemoRoot data-code-open={expanded ? '' : undefined}>
      {anchors}
      <DemoPreviewArea className="demo-preview" bg={resolvedBg} hideToolbar={hideToolbar}>
        <DemoInitialFocus ref={focusRef} tabIndex={-1} />
        {previewStyle ? (
          <DemoPreviewSandbox style={previewStyle}>{themedPreview}</DemoPreviewSandbox>
        ) : (
          themedPreview
        )}
        {previewOverlay}
      </DemoPreviewArea>

      {toolbar != null ? (
        <React.Fragment>
          <DemoToolbarRoot
            expanded={expanded}
            hasSourceFocus={hasSourceFocus}
            ref={toolbarRef}
            role="toolbar"
            aria-label={toolbarLabel}
            onKeyDown={onToolbarKeyDown}
            onFocus={onToolbarFocus}
          >
            {toolbar}
          </DemoToolbarRoot>
          {renderTabsAndCode ? renderTabsAndCode(tabsAndCode) : tabsAndCode}
          {afterCode}
        </React.Fragment>
      ) : null}
    </DemoRoot>
  );
}
