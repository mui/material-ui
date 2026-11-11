import * as React from 'react';
import type { ContentLoadingProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import type { UseCodeFallbackResult } from '@mui/internal-docs-infra/CodeHighlighter';
import { useUrlHashState } from '@mui/internal-docs-infra/useUrlHashState';
import { CodeSource } from './CodeSource';
import { DemoFileTabBarSkeleton } from './DemoContainer';
import type { DemoContainerProps } from './DemoContainer';
import { DemoToolbar } from './DemoToolbar';
import { useTranslate } from '../i18n';
import type { DemoOptions } from './DemoContent';
import { demoAnchorId, fileSourceAnchorIds } from './sourceAnchors';
import { resolveDemoSourceView } from './DemoContent.helpers';

export type DemoContentLoadingProps = ContentLoadingProps<DemoOptions>;

const noop = () => {};
const noopAsync = async () => {};

export function useDemoLoading(
  props: DemoContentLoadingProps,
  fallback: UseCodeFallbackResult,
): DemoContainerProps {
  const { code: fallbackCode, focusedLines = 0, collapsible = false } = fallback;
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
    hideEditButton,
  } = props;
  const t = useTranslate();

  const previewStyle = maxWidth == null && height == null ? undefined : { maxWidth, height };
  const themeName = name ?? slug ?? 'demo';
  const resolvedBg = bg ?? (iframe ? true : undefined);

  const rootFileName = fileNames?.[0];

  const sourceAnchorIds = rootFileName ? fileSourceAnchorIds([rootFileName]) : undefined;

  const [hash] = useUrlHashState();
  const expanded =
    initialExpanded === true || (hash != null && sourceAnchorIds?.includes(hash) === true);
  const { sourceVisible, hasSourceFocus } = resolveDemoSourceView({
    expanded,
    focusedLines,
    collapsible,
    hasFocusProjection: collapsible,
  });

  const anchorId = anchorIdOption === undefined ? demoAnchorId(rootFileName) : anchorIdOption;
  const demoSourceId = `demo-source-${anchorId ?? slug ?? name ?? 'demo'}`;

  if (hideToolbar === true) {
    return {
      anchorId,
      preview: component,
      isolated,
      iframe,
      name: themeName,
      bg: resolvedBg,
      hideToolbar: true,
      previewStyle,
    };
  }

  const showCodeLabel = hasSourceFocus
    ? t(expanded ? 'hideFullSource' : 'showFullSource')
    : t(expanded ? 'hideSource' : 'showSource');
  const toolbar = (
    <DemoToolbar
      gaLabel={slug ?? name ?? ''}
      demoSourceId={demoSourceId}
      expanded={expanded}
      onToggleExpand={noop}
      toggleRef={null}
      showCodeLabel={showCodeLabel}
      hasJsTransform={false}
      isJsSelected={false}
      onLanguageClick={noop}
      variants={[]}
      selectedVariant=""
      onSelectVariant={noop}
      openMuiChat={noopAsync}
      hideEditButton={hideEditButton}
      onOpenStackBlitz={noop}
      onOpenCodeSandbox={noop}
      onCopySource={noopAsync}
      onResetFocus={noop}
      onReset={noop}
      tsSourceAnchor={rootFileName}
    />
  );

  const tabs =
    expanded && fileNames && fileNames.length > 1 ? <DemoFileTabBarSkeleton aria-hidden /> : null;

  const code = fallbackCode ? (
    <CodeSource expanded={expanded}>
      <pre>{fallbackCode}</pre>
    </CodeSource>
  ) : null;

  return {
    anchorId,
    preview: component,
    isolated,
    iframe,
    name: themeName,
    bg: resolvedBg,
    hideToolbar,
    previewStyle,
    toolbar,
    toolbarLabel: t('demoToolbarLabel'),
    toolbarBusy: true,
    expanded,
    sourceVisible,
    tabs,
    code,
    codeId: demoSourceId,
    sourceAnchorIds,
  };
}
