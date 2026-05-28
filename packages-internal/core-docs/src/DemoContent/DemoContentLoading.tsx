import * as React from 'react';
import type { ContentLoadingProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { useCodeFallback } from '@mui/internal-docs-infra/CodeHighlighter';
import { hastToJsx } from '@mui/internal-docs-infra/pipeline/hastUtils';
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
  const { source } = useCodeFallback(props);
  const {
    hideToolbar,
    defaultCodeOpen,
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

  // Show the SSR'd source by default so the code block is visible before
  // hydration. The live `DemoContent` then takes over and respects the
  // author's `defaultCodeOpen` (collapsed unless explicitly opted in) — a
  // brief collapse-on-hydration is preferable to an empty placeholder that
  // hides documented source code during initial paint.
  const codeOpen = defaultCodeOpen !== false;

  // Only render the file tab bar when the author explicitly opted into an
  // open code panel — the live demo starts on the first file, so a multi-file
  // tab list is meaningless until the user actually opens the source viewer.
  const tabs =
    defaultCodeOpen === true && fileNames && fileNames.length > 1 ? (
      <DemoFileTabBarSkeleton aria-hidden />
    ) : null;

  // Reuse the live `CodeSource` wrapper so the SSR'd code panel matches the
  // hydrated demo exactly (dark background, rounded bottom corners, padding,
  // and the `enhanceCodeEmphasis` styles). The SSR `source` ReactNode is just
  // the inner tokens, so wrap it in `<pre><code>` to satisfy `CodeSource`'s
  // descendant selectors.
  const code = codeOpen ? (
    // TODO: use defaultCodeOpen prop
    <CodeSource expanded={false}>
      <pre>
        <code data-collapsible="">{source ? hastToJsx(source) : null}</code>
      </pre>
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
      codeOpen={codeOpen}
      tabs={tabs}
      code={code}
    />
  );
}
