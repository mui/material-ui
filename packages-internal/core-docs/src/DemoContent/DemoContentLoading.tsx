import * as React from 'react';
import type { ContentLoadingProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { useCodeFallback } from '@mui/internal-docs-infra/CodeHighlighter';
import { CodeSource } from './CodeSource';
import { DemoContainer, DemoFileTabBarSkeleton } from './DemoContainer';
import type { DemoOptions } from './DemoContent';

// ---------------------------------------------------------------------------
// SSR / streaming placeholder rendered before the live `DemoContent` mounts.
// Shares the `DemoContainer` shell so the page layout doesn't shift when the
// real demo takes over. We render:
//   - the SSR'd `component` in the preview slot
//   - an empty toolbar shell (interactive buttons need `useDemo` state)
//   - the SSR'd `source` (initial file) in the code slot when expanded
// ---------------------------------------------------------------------------

export type DemoContentLoadingProps = ContentLoadingProps<DemoOptions> & {
  /**
   * Whether the rendered code has a focused source snippet (emphasis frames).
   * Forwarded to `DemoContainer` so the toolbar's bottom corners and expand
   * label match the final hydrated demo.
   */
  hasSourceFocus?: boolean;
};

export default function DemoContentLoading(props: DemoContentLoadingProps) {
  // `code` is the ready `<code>` for the displayed file — the hook applies
  // `data-collapsible`, `data-total-lines`, and `data-focused-lines` to match
  // the hydrated `<Pre>`, so the collapse CSS sizes the window identically
  // before highlighting swaps in. `focusedLines` is the collapsed window size
  // (0 for a `collapseToEmpty` / `oversizedFocus: 'hide'` block).
  const { code: fallbackCode } = useCodeFallback(props);
  const {
    hideToolbar,
    initialExpanded,
    component,
    fileNames,
    bg,
    maxWidth,
    height,
    isolated,
    name,
    slug,
    hasSourceFocus,
  } = props;

  const previewStyle = maxWidth == null && height == null ? undefined : { maxWidth, height };
  const themeName = slug ?? name ?? 'demo';

  if (hideToolbar === true) {
    return (
      <DemoContainer
        preview={component}
        isolated={isolated}
        name={themeName}
        bg={bg}
        hideToolbar
        previewStyle={previewStyle}
      />
    );
  }

  // The toolbar buttons need `useDemo` state, so render an empty placeholder
  // sized to match the live toolbar's content height. The tallest interactive
  // element is the default-size `IconButton`, which renders at 42px once MUI's
  // medium-size padding is applied. `DemoToolbarRoot` then adds 2px of
  // vertical padding plus a 1px bottom border, for a rendered toolbar of
  // 47px total. Sizing the placeholder to 42px keeps the layout from jumping
  // when the interactive `DemoContent` takes over. Matches the
  // `DemoToolbarFallback` value in master's `Demo.tsx`.
  const toolbar = <div style={{ minHeight: 42 }} />;

  // Only render the file tab bar when the author explicitly opted into an
  // open code panel — the live demo starts on the first file, so a multi-file
  // tab list is meaningless until the user actually opens the source viewer.
  const tabs =
    initialExpanded && fileNames && fileNames.length > 1 ? (
      <DemoFileTabBarSkeleton aria-hidden />
    ) : null;

  // Reuse the live `CodeSource` wrapper so the SSR'd code panel matches the
  // hydrated demo exactly (dark background, rounded bottom corners, padding,
  // and the `enhanceCodeEmphasis` styles). `fallbackCode` is the ready `<code>`
  // (with the `data-*` attributes the collapse CSS keys off), so it only needs
  // wrapping in `<pre>` to satisfy `CodeSource`'s descendant selectors. Render
  // the collapsed frame layout (`expanded={false}`) — full expansion needs the
  // live JS; the window stays sized to the focused snippet (empty for an
  // empty-focus block) until `DemoContent` hydrates.
  const code = fallbackCode ? (
    <CodeSource expanded={initialExpanded}>
      {/* `fallbackCode` is a bare `<code>` (from `useCodeFallback`); wrap it in
            `<pre>` so `CodeSource`'s `& pre > code` selectors apply — the live
            render gets its `<pre>` from `<Pre>`. Without it the panel is
            unstyled (no dark background, frame layout, or collapse). */}
      <pre>{fallbackCode}</pre>
    </CodeSource>
  ) : null;

  return (
    <DemoContainer
      preview={component}
      isolated={isolated}
      name={themeName}
      bg={bg}
      hideToolbar={hideToolbar}
      hasSourceFocus={hasSourceFocus}
      previewStyle={previewStyle}
      toolbar={toolbar}
      expanded={initialExpanded}
      tabs={tabs}
      code={code}
    />
  );
}
