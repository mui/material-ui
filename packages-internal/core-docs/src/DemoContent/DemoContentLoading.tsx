import type { ContentLoadingProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { useCodeFallback } from '@mui/internal-docs-infra/CodeHighlighter';
import { CodeSource } from './CodeSource';
import { DemoContainer, DemoFileTabBarSkeleton } from './DemoContainer';
import type { DemoOptions } from './DemoContent';
import { demoAnchorId, fileSourceAnchorIds } from './sourceAnchors';
import { resolveDemoSourceView } from './DemoContent.helpers';

// ---------------------------------------------------------------------------
// SSR / streaming placeholder rendered before the live `DemoContent` mounts.
// Shares the `DemoContainer` shell so the page layout doesn't shift when the
// real demo takes over. We render:
//   - the SSR'd `component` in the preview slot. `iframe` is forwarded to
//     `DemoContainer` so iframe demos render the `<iframe>` shell here too and
//     mount the demo in the client-only portal — never inline in the static
//     HTML (which would otherwise fail HTML validation), matching the live
//     `DemoContent`.
//   - an empty toolbar shell (interactive buttons need `useDemo` state)
//   - the SSR'd `source` (initial file) in the code slot when expanded
// ---------------------------------------------------------------------------

export type DemoContentLoadingProps = ContentLoadingProps<DemoOptions>;

export default function DemoContentLoading(props: DemoContentLoadingProps) {
  // `code` is the ready `<code>` for the displayed file — the hook applies
  // `data-collapsible`, `data-total-lines`, and `data-focused-lines` to match
  // the hydrated `<Pre>`, so the collapse CSS sizes the window identically
  // before highlighting swaps in. `focusedLines` is the collapsed window size
  // (0 for a `collapseToEmpty` / `oversizedFocus: 'hide'` block).
  const { code: fallbackCode, focusedLines = 0, collapsible = false } = useCodeFallback(props);
  const {
    hideToolbar,
    initialExpanded,
    component,
    fileNames,
    bg,
    maxWidth,
    height,
    isolated,
    iframe,
    name,
    slug,
    anchorId: anchorIdOption,
  } = props;

  const previewStyle = maxWidth == null && height == null ? undefined : { maxWidth, height };
  const themeName = name ?? slug ?? 'demo';
  const resolvedBg = bg ?? (iframe ? true : undefined);
  const { sourceVisible } = resolveDemoSourceView({
    expanded: initialExpanded === true,
    focusedLines,
    collapsible,
    hasFocusProjection: collapsible,
  });

  // The root file is the first entry in `fileNames`, used both for the demo's
  // deep-link anchor (its base name, e.g. `#ContainedButtons`) and the per-file
  // source anchors below.
  const rootFileName = fileNames?.[0];

  // Match the live `DemoContent` anchor (the root file's base name) so a deep
  // link resolves against the skeleton before the demo hydrates. An explicit
  // `anchorId` option overrides it (`null` disables anchors).
  const anchorId = anchorIdOption === undefined ? demoAnchorId(rootFileName) : anchorIdOption;
  const demoSourceId = `demo-source-${anchorId ?? slug ?? name ?? 'demo'}`;

  if (hideToolbar === true) {
    return (
      <DemoContainer
        anchorId={anchorId}
        preview={component}
        isolated={isolated}
        iframe={iframe}
        name={themeName}
        bg={resolvedBg}
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

  const tabs =
    initialExpanded && fileNames && fileNames.length > 1 ? (
      <DemoFileTabBarSkeleton aria-hidden />
    ) : null;

  // Reuse the live `CodeSource` wrapper so the SSR'd code panel matches the
  // hydrated demo exactly (dark background, rounded bottom corners, padding,
  // and the `enhanceCodeEmphasis` styles). `fallbackCode` is the ready `<code>`
  // (with the `data-*` attributes the collapse CSS keys off), so it only needs
  // wrapping in `<pre>` to satisfy `CodeSource`'s descendant selectors. The
  // shared `initialExpanded` value keeps its frame visibility aligned with the
  // hydrated source.
  const code = fallbackCode ? (
    <CodeSource expanded={initialExpanded}>
      {/* `fallbackCode` is a bare `<code>` (from `useCodeFallback`); wrap it in
            `<pre>` so `CodeSource`'s `& pre > code` selectors apply — the live
            render gets its `<pre>` from `<Pre>`. Without it the panel is
            unstyled (no dark background, frame layout, or collapse). */}
      <pre>{fallbackCode}</pre>
    </CodeSource>
  ) : null;

  // Root-file deep-link ids for the SSR skeleton: `#<RootFile>.{tsx,ts,js,jsx}`,
  // matching the live `DemoContent`, so a `#<RootFile>.tsx`/`.jsx` link resolves
  // before hydration.
  const sourceAnchorIds = rootFileName ? fileSourceAnchorIds([rootFileName]) : undefined;

  return (
    <DemoContainer
      anchorId={anchorId}
      preview={component}
      isolated={isolated}
      iframe={iframe}
      name={themeName}
      bg={resolvedBg}
      hideToolbar={hideToolbar}
      previewStyle={previewStyle}
      toolbar={toolbar}
      expanded={initialExpanded}
      sourceVisible={sourceVisible}
      tabs={tabs}
      code={code}
      codeId={demoSourceId}
      sourceAnchorIds={sourceAnchorIds}
    />
  );
}
