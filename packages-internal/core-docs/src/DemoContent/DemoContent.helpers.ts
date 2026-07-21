import type { UseDemoOpts } from '@mui/internal-docs-infra/useDemo';
import { buildExportConfig, codeSandboxTsconfigOverride } from './exportConfig';

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
