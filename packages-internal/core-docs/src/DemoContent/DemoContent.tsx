import * as React from 'react';
import { Tabs } from '@base-ui/react/tabs';
import type { ContentProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { useDemo } from '@mui/internal-docs-infra/useDemo';
import { useCodeWindow } from '@mui/internal-docs-infra/useCodeWindow';
import { useScrollAnchor } from '@mui/internal-docs-infra/useScrollAnchor';
import { useTranslate } from '../i18n';
import DemoContext from '../DemoContext';
import { AdCarbonInline } from '../Ad/AdCarbon';
import { stylingSolutionMapping } from '../constants/constants';
import { DemoAiSuggestionHero } from './DemoAiSuggestionHero';
import {
  DemoAnchorLink,
  DemoContainer,
  DemoFileTabBar,
  DemoFileTabBarCollapse,
} from './DemoContainer';
import { DemoErrorOverlay } from './DemoErrorOverlay';
import { CodeSource, FileTab } from './CodeSource';
import { DemoToolbar, useToolbarKeyboard } from './DemoToolbar';
import { useMuiChatExporter } from './useMuiChatExporter';
import { buildExportConfig, codeSandboxTsconfigOverride } from './exportConfig';

// ---------------------------------------------------------------------------
// Page-global "demo is animating" flag
//
// While any demo on the page is expanding/collapsing, set
// `data-demo-transitioning` on `<html>`. Opted-in components (currently the
// rainbow MUI Chat button) match `html[data-demo-transitioning] &` in their
// own stylesheet and pause their continuous animations. Otherwise those
// animations compete for paint/composite time with the demo's height
// transition and visibly smear it.
//
// Refcounted so concurrent expansions don't clear each other early.
// ---------------------------------------------------------------------------

let transitioningCount = 0;

function beginDemoTransitioning() {
  if (typeof document === 'undefined') {
    return;
  }
  transitioningCount += 1;
  document.documentElement.setAttribute('data-demo-transitioning', '');
}

function endDemoTransitioning() {
  if (typeof document === 'undefined') {
    return;
  }
  transitioningCount = Math.max(0, transitioningCount - 1);
  if (transitioningCount === 0) {
    document.documentElement.removeAttribute('data-demo-transitioning');
  }
}

// Duration (ms) of one half of the transform swap window. The full
// `expand → swap → collapse` cycle lasts `TRANSFORM_DELAY * 2`. Must match
// the `.collapse` keyframe duration in `syntax.css`.
const TRANSFORM_DELAY = 350;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Options that drive demo presentation. These options are passed as
 * top-level meta on the demo component (e.g. via MDX
 * `{{"component": "...", "bg": true, "hideToolbar": true}}`).
 */
export interface DemoOptions {
  /** Hide the action toolbar entirely. Disables most other interactive features. */
  hideToolbar?: boolean;
  /** Suppress the inline Carbon ad even when ads are enabled globally. */
  disableAd?: boolean;
  /** Disable in-place editing of the demo source. */
  disableLiveEdit?: boolean;
  /** Prompt string shown in the "Customize with AI" hero. When unset, the hero is omitted. */
  aiSuggestion?: string;
  /** Hide the "Edit this page" button in the toolbar. */
  hideEditButton?: boolean;
  /** Override the anchor `id` used for deep-links. `null` disables anchors entirely. */
  anchorId?: string | null;
  /** Background treatment for the preview area. */
  bg?: string | boolean;
  /** Render the demo inside an iframe sandbox. */
  iframe?: boolean;
  /** Skip injecting the surrounding theme inside the iframe sandbox. */
  isolated?: boolean;
  /** Maximum width of the preview area. */
  maxWidth?: number;
  /** Fixed height of the preview area. */
  height?: number;
}

export type DemoContentProps = ContentProps<DemoOptions>;

export default function DemoContent(props: DemoContentProps) {
  const {
    hideToolbar,
    initialExpanded,
    disableAd: demoDisableAd,
    aiSuggestion,
    anchorId: anchorIdOption,
    hideEditButton,
    bg,
    maxWidth,
    height,
    isolated,
    iframe,
  } = props;

  // Iframe demos default to the filled background treatment so the sandboxed
  // surface reads as a distinct preview region (matching the legacy behavior).
  const resolvedBg = bg ?? (iframe ? true : undefined);

  // Demo identifier surfaced in error messages — `name` is set by `createDemo`
  // from the demo's file path (e.g. `BasicButtons.js`).
  const demoName = props.name;

  // Guard with NEXT_RUNTIME so this check is dead-code-eliminated from client bundles.
  if (process.env.NEXT_RUNTIME) {
    if (hideToolbar === false) {
      throw new Error(
        [
          '"hideToolbar": false is already the default.',
          `Please remove the property in {{"component": "${demoName}", …}}.`,
        ].join('\n'),
      );
    }
    if (hideToolbar === true && initialExpanded === true) {
      throw new Error(
        [
          '"hideToolbar": true, "initialExpanded": true combination is invalid.',
          `Please remove one of the properties in {{"component": "${demoName}", …}}.`,
        ].join('\n'),
      );
    }
    if (hideToolbar === true && demoDisableAd === true) {
      throw new Error(
        [
          '"hideToolbar": true, "disableAd": true combination is invalid.',
          `Please remove one of the properties in {{"component": "${demoName}", …}}.`,
        ].join('\n'),
      );
    }
  }

  if (
    demoName != null &&
    (demoName.endsWith('.ts') || demoName.endsWith('.tsx')) &&
    hideToolbar !== true
  ) {
    throw new Error(
      [
        `The following demos use TS directly: ${demoName}.`,
        '',
        "If it's not a code demo, hide the toolbar:",
        `{{"component": "${demoName}", "hideToolbar": true, …}}.`,
      ].join('\n'),
    );
  }

  const csbContext = React.useContext(DemoContext);
  const csbConfig = csbContext?.csb;
  const pageDisableAd = csbContext?.disableAd ?? false;

  // resolveDependencies needs to know whether we're exporting TS or JS, but
  // selectedTransform is only known after useDemo(). A ref bridges this — it's
  // read at click time (when openStackBlitz/openCodeSandbox fire), not at
  // render time, so the circular dependency is harmless.
  const useTypescriptRef = React.useRef(true);

  const exportConfig = React.useMemo(
    () => buildExportConfig({ csbConfig, useTypescriptRef }),
    [csbConfig],
  );

  // `initialExpanded` is read by `useDemo` straight from `props` (it's a
  // `contentProps` field, threaded from the MDX `{{"component": …}}` meta), so
  // it isn't passed as an opt here.
  const demo = useDemo(props, {
    export: exportConfig,
    exportCodeSandbox: codeSandboxTsconfigOverride,
    // Enables the expand → swap → collapse window on the rendered `<pre>` so
    // the `.collapse` placeholder animation in `syntax.css` has time to run
    // (must match the keyframe duration there).
    transformDelay: TRANSFORM_DELAY,
    // Only the file the user is currently looking at participates in the
    // coordinated swap window — other files defer their transform until
    // they're brought into view. Avoids paying layout-shift cost for code
    // the viewer can't see and prevents `hasCollapseInFocus` work from
    // spreading across files needlessly.
    transformLayoutShift: 'focus',
  });
  useTypescriptRef.current = demo.selectedTransform !== 'js';

  const openMuiChat = useMuiChatExporter({
    props,
    selectedVariant: demo.selectedVariant,
    useTypescript: demo.selectedTransform !== 'js',
    exportConfig,
  });

  const t = useTranslate();
  // When the rendered code has collapsible frames (from `enhanceCodeEmphasis`),
  // this expands all hidden context lines. Demos without emphasis frames render
  // identically in both states.
  // `scrollContainerRef` points at the fixed-height code window so the
  // expand/collapse anchoring compensates that panel's own scroll once the
  // expanded source exceeds the cap, rather than scrolling the page.
  const { containerRef, scrollContainerRef, toggleRef, anchorScroll } = useCodeWindow<
    HTMLButtonElement,
    HTMLDivElement
  >();

  // Separate scroll-anchor session for transform swaps. Watches the same
  // code container, but anchors the page scroll on the JS/TS toggle group
  // (which lives outside the code window) so the clicked button stays under
  // the user's pointer while the `expand → swap → collapse` window plays out.
  const { containerRef: transformAnchorContainerRef, anchorScroll: anchorTransformScroll } =
    useScrollAnchor<HTMLDivElement>();
  const languageToggleRef = React.useRef<HTMLDivElement | null>(null);

  // Combined ref that feeds the code container element into both
  // `useCodeWindow` (for expand/collapse anchoring) and the transform
  // `useScrollAnchor` session above.
  const setCodeContainerRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      (transformAnchorContainerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [containerRef, transformAnchorContainerRef],
  );

  const hasJsTransform = demo.availableTransforms.includes('js');
  const isJsSelected = demo.selectedTransform === 'js';

  const handleLanguageClick = React.useCallback(
    (_event: React.MouseEvent, value: string | null) => {
      if (value !== null) {
        if (languageToggleRef.current) {
          anchorTransformScroll(languageToggleRef.current, TRANSFORM_DELAY * 2);
        }
        demo.selectTransform(value === 'js' ? 'js' : null);
      }
    },
    [demo, anchorTransformScroll],
  );

  // Prefer Material UI's `ButtonBase#focusVisible()` (a non-standard helper
  // that forces the `:focus-visible` ring on regardless of input modality) so
  // a mouse-driven reset still shows a clear keyboard focus indicator. Falls
  // back to the generic `resetFocus` exposed by `useDemo` for non-ButtonBase
  // targets.
  const handleResetFocus = React.useCallback(() => {
    const target = demo.focusRef.current as
      | (HTMLButtonElement & { focusVisible?: () => void })
      | null;
    if (target && typeof target.focusVisible === 'function') {
      target.focusVisible();
      return;
    }
    demo.resetFocus();
  }, [demo]);

  // TODO: derive from `useDemo()` once it exposes whether the rendered code
  // has a focused source snippet (e.g. emphasis frames from
  // `enhanceCodeEmphasis`). Until then, treat all demos as full-source.
  const hasSourceFocus = true;
  const showCodeLabel = hasSourceFocus
    ? t(demo.expanded ? 'hideFullSource' : 'showFullSource')
    : t(demo.expanded ? 'hideSource' : 'showSource');

  const anchorName = anchorIdOption === undefined ? demo.slug : anchorIdOption;

  // Track whether the source viewer has ever been opened so the Carbon ad
  // only appears once the user actually engages with the demo.
  const [adShown, setAdShown] = React.useState(false);
  React.useEffect(() => {
    if (demo.expanded) {
      setAdShown(true);
    }
  }, [demo.expanded]);
  const showAd = adShown && !pageDisableAd && !demoDisableAd;

  // Build the file list for the AI hero from the current variant's source
  // and extra files. Pass whichever variant is selected — the underlying chat
  // API only needs a self-contained snapshot.
  const aiSuggestionParams = React.useMemo(() => {
    if (!aiSuggestion) {
      return null;
    }
    const variantCode = props.code?.[demo.selectedVariant];
    if (!variantCode || typeof variantCode === 'string') {
      return null;
    }
    const entrypoint = demo.selectedFileName ?? demoName ?? 'index';
    const files: Array<{ path: string; content: string; isEntry?: boolean }> = [];
    if (typeof variantCode.source === 'string') {
      files.push({ path: entrypoint, content: variantCode.source, isEntry: true });
    }
    const extra = variantCode.extraFiles;
    if (extra) {
      for (const [name, file] of Object.entries(extra)) {
        if (file && typeof file === 'object' && typeof file.source === 'string') {
          files.push({ path: name, content: file.source });
        }
      }
    }
    return {
      name: demoName ?? demo.slug ?? 'Demo',
      description: aiSuggestion,
      initialMessage: aiSuggestion,
      files,
    };
  }, [aiSuggestion, demoName, props.code, demo.selectedVariant, demo.selectedFileName, demo.slug]);

  const expandedRef = React.useRef(demo.expanded);
  expandedRef.current = demo.expanded;
  const transitionTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  React.useEffect(
    () => () => {
      if (transitionTimerRef.current !== undefined) {
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = undefined;
        endDemoTransitioning();
      }
    },
    [],
  );
  const handleToggleFrames = React.useCallback(() => {
    const next = !expandedRef.current;
    anchorScroll(next ? 'expand' : 'collapse');
    demo.setExpanded(next);
    // Pause every CSS animation on the page for the duration of the
    // expand/collapse so continuous paints don't smear the height transition.
    // Cleared a touch after `useScrollAnchor`'s default duration (300ms).
    if (transitionTimerRef.current !== undefined) {
      clearTimeout(transitionTimerRef.current);
    } else {
      beginDemoTransitioning();
    }
    transitionTimerRef.current = setTimeout(() => {
      transitionTimerRef.current = undefined;
      endDemoTransitioning();
    }, 400);
  }, [anchorScroll, demo]);

  // GA event label — the canonical demo slug is used since it uniquely
  // identifies a demo within a page and is stable across renders.
  const gaLabel = demo.slug ?? props.name ?? '';

  const {
    toolbarRef,
    handleKeyDown: handleToolbarKeyDown,
    handleFocus: handleToolbarFocus,
  } = useToolbarKeyboard();

  const anchors =
    anchorName != null ? (
      <React.Fragment>
        <DemoAnchorLink id={anchorName} />
        {hideToolbar
          ? null
          : Object.keys(stylingSolutionMapping).flatMap((key) => {
              const slug = stylingSolutionMapping[key as keyof typeof stylingSolutionMapping];
              return [
                <DemoAnchorLink key={`${slug}-js`} id={`${slug}-${anchorName}.js`} />,
                <DemoAnchorLink key={`${slug}-tsx`} id={`${slug}-${anchorName}.tsx`} />,
              ];
            })}
        {hideToolbar ? null : (
          <React.Fragment>
            <DemoAnchorLink id={`${anchorName}.js`} />
            <DemoAnchorLink id={`${anchorName}.tsx`} />
          </React.Fragment>
        )}
      </React.Fragment>
    ) : null;

  const demoSourceId = anchorName ? `demo-source-${anchorName}` : undefined;

  const toolbar = hideToolbar ? null : (
    <DemoToolbar
      gaLabel={gaLabel}
      demoSourceId={demoSourceId}
      expanded={demo.expanded}
      onToggleExpand={handleToggleFrames}
      toggleRef={toggleRef}
      showCodeLabel={showCodeLabel}
      hasJsTransform={hasJsTransform}
      isJsSelected={isJsSelected}
      onLanguageClick={handleLanguageClick}
      languageToggleRef={languageToggleRef}
      variants={demo.variants}
      selectedVariant={demo.selectedVariant}
      onSelectVariant={demo.selectVariant}
      openMuiChat={openMuiChat}
      hideEditButton={hideEditButton}
      onOpenStackBlitz={demo.openStackBlitz}
      onOpenCodeSandbox={demo.openCodeSandbox}
      onCopySource={demo.copy}
      onResetFocus={handleResetFocus}
      onReset={demo.reset}
    />
  );

  const hasMultipleFiles = !hideToolbar && demo.files.length > 1;

  // Keep the tab strip mounted whenever the demo exposes multiple files so
  // that toggling `expanded` doesn't re-mount the code panel below and reset
  // its CSS transitions. The wrapping `DemoFileTabBarCollapse` animates the
  // strip's height from 0 to `auto` (CSS-only via the grid `0fr → 1fr` trick).
  const tabs = hasMultipleFiles ? (
    <DemoFileTabBarCollapse expanded={demo.expanded}>
      <DemoFileTabBar activateOnFocus>
        {demo.files.map((file) => (
          <FileTab key={file.name} value={file.name}>
            {file.name}
          </FileTab>
        ))}
      </DemoFileTabBar>
    </DemoFileTabBarCollapse>
  ) : null;

  const code = hideToolbar ? null : (
    <CodeSource expanded={demo.expanded}>{demo.selectedFile}</CodeSource>
  );

  // When the demo has multiple files, wrap the tabs + code region in a
  // `Tabs.Root` so the `Tabs.List` / `Tabs.Tab` parts wired through
  // `DemoFileTabBar` / `FileTab` get their shared state.
  const renderTabsAndCode = hasMultipleFiles
    ? (children: React.ReactNode) => (
        <Tabs.Root
          value={demo.selectedFileName}
          onValueChange={(value) => {
            if (typeof value === 'string') {
              demo.selectFileName(value);
            }
          }}
        >
          {children}
        </Tabs.Root>
      )
    : undefined;

  const afterCode = hideToolbar ? null : (
    <React.Fragment>
      {aiSuggestion && aiSuggestionParams ? (
        <DemoAiSuggestionHero suggestion={aiSuggestion} params={aiSuggestionParams} />
      ) : null}
      {showAd ? <AdCarbonInline /> : null}
    </React.Fragment>
  );

  // Build the inner-sandbox style only when a constraint is set so the common
  // case keeps the preview area's flex-child layout untouched.
  const previewStyle = React.useMemo(() => {
    if (maxWidth == null && height == null) {
      return undefined;
    }
    return { maxWidth, height };
  }, [maxWidth, height]);

  return (
    <DemoContainer
      anchors={anchors}
      preview={demo.component}
      isolated={isolated}
      iframe={iframe}
      name={demoName ?? demo.slug ?? 'demo'}
      onReset={demo.reset}
      bg={resolvedBg}
      hideToolbar={hideToolbar}
      hasSourceFocus={hasSourceFocus}
      previewStyle={previewStyle}
      previewOverlay={<DemoErrorOverlay variantKey={demo.selectedVariant} />}
      focusRef={demo.focusRef}
      toolbar={toolbar}
      toolbarRef={toolbarRef}
      toolbarLabel={t('demoToolbarLabel')}
      onToolbarKeyDown={handleToolbarKeyDown}
      onToolbarFocus={handleToolbarFocus}
      codeOpen={demo.expanded}
      tabs={tabs}
      code={code}
      codeRef={setCodeContainerRef}
      codeScrollRef={scrollContainerRef}
      afterCode={afterCode}
      renderTabsAndCode={renderTabsAndCode}
    />
  );
}
