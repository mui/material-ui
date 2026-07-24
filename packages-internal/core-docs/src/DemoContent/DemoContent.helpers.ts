import type { UseDemoOpts } from '@mui/internal-docs-infra/useDemo';
import type { Code } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { buildExportConfig, codeSandboxTsconfigOverride } from './exportConfig';

const JAVASCRIPT_EXTENSIONS = ['.js', '.mjs', '.jsx', '.ts', '.tsx'];

interface CreateDemoUseOptionsParams {
  disableLiveEdit?: boolean;
  selectedTransform: string | null;
  onSelectedTransformChange: (transform: string | null) => void;
  exportConfig: ReturnType<typeof buildExportConfig>;
}

export function createDemoUseOptions({
  disableLiveEdit,
  selectedTransform,
  onSelectedTransformChange,
  exportConfig,
}: CreateDemoUseOptionsParams): UseDemoOpts {
  return {
    export: exportConfig,
    exportCodeSandbox: codeSandboxTsconfigOverride,
    disabled: disableLiveEdit,
    resetOnExpand: true,
    actionSource: 'initial',
    selectedTransform,
    onSelectedTransformChange,
  };
}

interface DemoSourceViewParams {
  expanded: boolean;
  focusedLines: number;
  collapsible: boolean;
  hasFocusProjection: boolean;
}

export function resolveDemoSourceView({
  expanded,
  focusedLines,
  collapsible,
  hasFocusProjection,
}: DemoSourceViewParams) {
  return {
    sourceVisible: expanded || focusedLines > 0,
    hasSourceFocus: collapsible && hasFocusProjection && focusedLines > 0,
  };
}

export function getDemoEditingDependencies(code: Code | undefined) {
  let js = false;
  let css = false;

  for (const variant of Object.values(code ?? {})) {
    if (!variant || typeof variant === 'string') {
      continue;
    }
    const fileNames = [
      variant.fileName,
      ...(variant.extraFiles ? Object.keys(variant.extraFiles) : []),
    ];
    for (const fileName of fileNames) {
      if (fileName?.endsWith('.css')) {
        css = true;
      } else if (
        fileName &&
        JAVASCRIPT_EXTENSIONS.some((extension) => fileName.endsWith(extension))
      ) {
        js = true;
      }
      if (js && css) {
        return { js, css };
      }
    }
  }

  return { js, css };
}

export function resetDemo(resetSource: (() => void) | undefined, remountPreview: () => void) {
  resetSource?.();
  remountPreview();
}

export function expandDemo(expand: () => void, remountPreview: () => void) {
  expand();
  remountPreview();
}

export function toggleDemoExpanded(
  expanded: boolean,
  expand: () => void,
  setExpanded: (expanded: boolean) => void,
  remountPreview: () => void,
) {
  if (expanded) {
    setExpanded(false);
  } else {
    expandDemo(expand, remountPreview);
  }
}
