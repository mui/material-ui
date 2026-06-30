import { styleSheetsToString } from '@mui/system/cssVars';
import type {
  BreakpointStyleSheets,
  BreakpointStylesDescriptor,
  BreakpointStyleTheme,
  ResolvedBreakpointStyleTheme,
} from './BreakpointStylesRegistry';
import toolbarBreakpointStyles from '../Toolbar/Toolbar.breakpoints';

export interface GenerateComponentBreakpointCssOptions {
  /**
   * Scope generated component rules to a nested static theme root.
   */
  rootSelector?: string | undefined;
  /**
   * Override the component breakpoint descriptors used by the generator.
   * Useful for tests and build-time experiments.
   */
  descriptors?: ReadonlyArray<BreakpointStylesDescriptor> | undefined;
}

const defaultComponentBreakpointStyles = [toolbarBreakpointStyles];

function getScopedSelector(rootSelector: string | undefined, selector: string) {
  if (!rootSelector || rootSelector === ':root') {
    return selector;
  }

  return selector
    .split(',')
    .map((part) => `${rootSelector} ${part.trim()}`)
    .join(', ');
}

function scopeStyleSheets(rootSelector: string | undefined, sheets: BreakpointStyleSheets) {
  return sheets.map((sheet) => {
    const scopedSheet: Record<string, any> = {};

    Object.entries(sheet).forEach(([key, value]) => {
      if (key.startsWith('@')) {
        scopedSheet[key] = {};
        Object.entries(value as Record<string, any>).forEach(([selector, styles]) => {
          scopedSheet[key][getScopedSelector(rootSelector, selector)] = styles;
        });
      } else {
        scopedSheet[getScopedSelector(rootSelector, key)] = value;
      }
    });

    return scopedSheet;
  });
}

/**
 * Build-time counterpart to the runtime breakpoint registry.
 * It serializes component responsive descriptors with the generated theme.
 */
export default function generateComponentBreakpointCss(
  theme: BreakpointStyleTheme,
  options: GenerateComponentBreakpointCssOptions = {},
) {
  const descriptors = options.descriptors ?? defaultComponentBreakpointStyles;

  if (
    descriptors.length === 0 ||
    !theme.breakpoints ||
    typeof theme.breakpoints.up !== 'function' ||
    typeof theme.spacing !== 'function'
  ) {
    return '';
  }

  const sheets: BreakpointStyleSheets = [];
  descriptors.forEach((descriptor) => {
    sheets.push(...descriptor(theme as ResolvedBreakpointStyleTheme));
  });

  const css = styleSheetsToString(scopeStyleSheets(options.rootSelector, sheets));

  return css ? `@layer mui.components {\n${css}}\n` : '';
}
