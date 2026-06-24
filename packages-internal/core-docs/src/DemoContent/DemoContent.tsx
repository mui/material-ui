import * as React from 'react';
import { useRouter } from 'next/router';
import { Tabs } from '@base-ui/react/tabs';
import type { ContentProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { useDemo } from '@mui/internal-docs-infra/useDemo';
import { useCodeWindow } from '@mui/internal-docs-infra/useCodeWindow';
import { useScrollAnchor } from '@mui/internal-docs-infra/useScrollAnchor';
import { useUrlHashState } from '@mui/internal-docs-infra/useUrlHashState';
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
import {
  demoAnchorId,
  fileSourceAnchorIds,
  sourceAnchorTransform,
  toJavascriptFileName,
} from './sourceAnchors';
import { useMuiChatExporter } from './useMuiChatExporter';
import { buildExportConfig, codeSandboxTsconfigOverride } from './exportConfig';

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

  // When the rendered code has collapsible frames (from `enhanceCodeEmphasis`),
  // this expands all hidden context lines. Demos without emphasis frames render
  // identically in both states. Declared before `useDemo` so its `anchorScroll`
  // can be handed to `onExpand` below.
  // `scrollContainerRef` points at the fixed-height code window so the
  // expand/collapse anchoring compensates that panel's own scroll once the
  // expanded source exceeds the cap, rather than scrolling the page.
  const { containerRef, scrollContainerRef, toggleRef, anchorScroll } = useCodeWindow<
    HTMLButtonElement,
    HTMLDivElement
  >();

  const onExpand = React.useCallback(() => anchorScroll('expand'), [anchorScroll]);

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
    // Keyboard-driven expansion (the caret navigating past the visible top or
    // bottom of a collapsed code window) anchors the scroll just like clicking
    // the expand toggle does, instead of letting the viewport jump.
    onExpand,
  });
  useTypescriptRef.current = demo.selectedTransform !== 'js';

  const openMuiChat = useMuiChatExporter({
    props,
    selectedVariant: demo.selectedVariant,
    selectedTransform: demo.selectedTransform,
    exportConfig,
  });

  const t = useTranslate();
  const router = useRouter();

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

  // Picks the expand-button label: "full source" wording when the collapsed
  // view shows only a focused snippet, plain "source" wording when it already
  // shows the whole file. (The toolbar's bottom corners are driven separately,
  // from the `<code>`'s `data-focused-lines` in `DemoContainer`'s CSS.)
  // TODO: derive from `useDemo()` once it exposes whether the rendered code
  // has a focused source snippet (e.g. emphasis frames from
  // `enhanceCodeEmphasis`). Until then, treat all demos as focused-source.
  const hasSourceFocus = true;
  const showCodeLabel = hasSourceFocus
    ? t(demo.expanded ? 'hideFullSource' : 'showFullSource')
    : t(demo.expanded ? 'hideSource' : 'showSource');

  // Track whether the source viewer has ever been opened so the Carbon ad
  // only appears once the user actually engages with the demo.
  const [adShown, setAdShown] = React.useState(false);
  if (demo.expanded && !adShown) {
    setAdShown(true);
  }
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
  const handleToggleFrames = React.useCallback(() => {
    const next = !expandedRef.current;
    anchorScroll(next ? 'expand' : 'collapse');
    demo.setExpanded(next);
  }, [anchorScroll, demo]);

  // GA event label — the canonical demo slug is used since it uniquely
  // identifies a demo within a page and is stable across renders.
  const gaLabel = demo.slug ?? props.name ?? '';

  const { toolbarRef, handleKeyDown: handleToolbarKeyDown } = useToolbarKeyboard();

  // ---- Source deep links (custom, transform-only) ----
  // Render the ROOT (entry) file's `#<FileName>.{tsx,ts,js,jsx}` anchors (via
  // `DemoContainer`, so the loading skeleton emits them too) and, on a matching
  // hash, swap to the right language: `.tsx`/`.ts` -> TS source, `.js`/`.jsx` ->
  // the JS transform. Ids are FILENAME-based to match the existing/shipped slugs
  // (e.g. `ButtonBaseDemo.tsx` / `.jsx`). We only swap the language — no file or
  // variant selection. The native hash nav only reacts to `${kebab(slug)}:`-prefixed
  // hashes (`isHashRelevantToDemo`), so these colon-less ids never fight it. NEVER
  // join these ids with `:` or it re-enables native nav.
  const [hash] = useUrlHashState();
  const { availableTransforms, selectTransform, setExpanded } = demo;

  // The root file is the selected variant's entry file (`VariantCode.fileName`,
  // e.g. `ButtonBaseDemo.tsx`).
  const rootVariantCode = props.code?.[demo.selectedVariant];
  const rootFileName =
    rootVariantCode && typeof rootVariantCode !== 'string' ? rootVariantCode.fileName : undefined;

  // The demo's deep-link anchor: the root file's base name (e.g. `#ContainedButtons`
  // from `ContainedButtons.tsx`), matching the existing/shipped slugs in `master`
  // — not the kebab-case `demo.slug`. An explicit `anchorId` option overrides it
  // (`null` disables anchors).
  const anchorName = anchorIdOption === undefined ? demoAnchorId(rootFileName) : anchorIdOption;

  const sourceAnchorIds = React.useMemo(
    () => (!hideToolbar && rootFileName ? fileSourceAnchorIds([rootFileName]) : undefined),
    [hideToolbar, rootFileName],
  );

  // Apply the hash once per change. Gating on `appliedHashRef` is essential:
  // `selectTransform`'s identity changes on every JS/TS toggle, so without it the
  // effect would re-run with a stale hash and yank the user's toggle choice back.
  const appliedHashRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (!hash || hash === appliedHashRef.current || !sourceAnchorIds?.includes(hash)) {
      return;
    }
    appliedHashRef.current = hash;
    // Landing on a source link reveals the source and selects its language.
    setExpanded(true);
    selectTransform(sourceAnchorTransform(hash));
  }, [hash, sourceAnchorIds, setExpanded, selectTransform]);

  // The main `#<DemoName>` anchor is rendered by `DemoContainer` (via the
  // `anchorId` prop) so the loading skeleton emits it too. Here we only add the
  // styling-solution deep links (`#system-<DemoName>.js`, etc.), which are
  // live-only and need the toolbar.
  const anchors =
    anchorName != null && !hideToolbar ? (
      <React.Fragment>
        {Object.keys(stylingSolutionMapping).flatMap((key) => {
          const slug = stylingSolutionMapping[key as keyof typeof stylingSolutionMapping];
          return [
            <DemoAnchorLink key={`${slug}-js`} id={`${slug}-${anchorName}.js`} />,
            <DemoAnchorLink key={`${slug}-tsx`} id={`${slug}-${anchorName}.tsx`} />,
          ];
        })}
      </React.Fragment>
    ) : null;

  const demoSourceId = anchorName ? `demo-source-${anchorName}` : undefined;

  // GitHub "view source" link for the file currently shown in the viewer.
  // `selectedFileUrl` is the demo's local source URL rewritten to a hosted Git
  // URL by `createDemo`'s `projectUrl` (it's empty when no repository URL is
  // configured, e.g. local dev — the menu item is then disabled). The rewrite
  // yields a `/tree/<ref>/` prefix; swap it for `/blob/<ref>/` so the link
  // opens the file view rather than a directory listing.
  const githubLocation = demo.selectedFileUrl
    ? demo.selectedFileUrl.replace('/tree/', '/blob/')
    : undefined;

  // Anchor used by the deploy permalinks — the demo's own anchor id, so the
  // permalink hash always matches the rendered `<DemoAnchorLink>`. No fallback to
  // `demo.slug`: when anchors are disabled there's no matching target to link to.
  const sourceAnchor = anchorName ?? undefined;

  // Copy-link anchors for the demo's ROOT file: its TS source name and its JS twin
  // (e.g. `ButtonBaseDemo.tsx` / `ButtonBaseDemo.jsx`) — the ids rendered above, so
  // pasting the link opens the demo source in that language.
  const tsSourceAnchor = rootFileName;
  const jsSourceAnchor =
    rootFileName && availableTransforms.includes('js')
      ? toJavascriptFileName(rootFileName)
      : undefined;

  // Deploy permalinks are only meaningful on the staging / PR-preview Netlify
  // builds. They reuse the current route + demo anchor, swapping the origin for
  // the per-branch/per-deploy Netlify domains. `process.env` values are inlined
  // by `withDeploymentConfig`, so in production this branch is dead-code and the
  // links don't render.
  const devLinks = React.useMemo(() => {
    if (process.env.DEPLOY_ENV !== 'staging' && process.env.DEPLOY_ENV !== 'pull-request') {
      return null;
    }
    const routePath = router.asPath.split('#')[0].split('?')[0];
    const anchorHash = sourceAnchor ? `#${sourceAnchor}` : '';
    const siteName = process.env.NETLIFY_SITE_NAME;
    const pullRequestId = process.env.PULL_REQUEST_ID;
    return {
      pullRequest:
        pullRequestId && siteName
          ? `https://deploy-preview-${pullRequestId}--${siteName}.netlify.app${routePath}${anchorHash}`
          : undefined,
      next: `https://next--${siteName}.netlify.app${routePath}${anchorHash}`,
      permalink: `${process.env.NETLIFY_DEPLOY_URL ?? ''}${routePath}${anchorHash}`,
      master: `https://master--${siteName}.netlify.app${routePath}${anchorHash}`,
    };
  }, [router.asPath, sourceAnchor]);

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
      githubLocation={githubLocation}
      tsSourceAnchor={tsSourceAnchor}
      jsSourceAnchor={jsSourceAnchor}
      devLinks={devLinks}
    />
  );

  const hasMultipleFiles = !hideToolbar && demo.files.length > 1;

  // Keep the tab strip mounted whenever the demo exposes multiple files so
  // that toggling `expanded` doesn't re-mount the code panel below and reset
  // its CSS transitions. The wrapping `DemoFileTabBarCollapse` animates the
  // strip's height from 0 to `auto` (CSS-only via the grid `0fr → 1fr` trick).
  // While collapsed the strip is only clipped (`max-height: 0; overflow:
  // hidden`), so its tab `<button>`s stay in the DOM and tabbable — mark the
  // region `inert` so a hidden tab can't be Tab-focused, clicked, or announced
  // by assistive tech until the source viewer expands.
  const tabs = hasMultipleFiles ? (
    <DemoFileTabBarCollapse expanded={demo.expanded} inert={!demo.expanded}>
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
      anchorId={anchorName}
      anchors={anchors}
      sourceAnchorIds={sourceAnchorIds}
      preview={demo.component}
      isolated={isolated}
      iframe={iframe}
      name={demoName ?? demo.slug ?? 'demo'}
      onReset={demo.reset}
      bg={resolvedBg}
      hideToolbar={hideToolbar}
      previewStyle={previewStyle}
      previewOverlay={<DemoErrorOverlay message={demo.error} />}
      focusRef={demo.focusRef}
      toolbar={toolbar}
      toolbarRef={toolbarRef}
      toolbarLabel={t('demoToolbarLabel')}
      onToolbarKeyDown={handleToolbarKeyDown}
      expanded={demo.expanded}
      tabs={tabs}
      code={code}
      codeRef={setCodeContainerRef}
      codeScrollRef={scrollContainerRef}
      afterCode={afterCode}
      renderTabsAndCode={renderTabsAndCode}
    />
  );
}
