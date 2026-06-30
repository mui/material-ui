import { styleSheetsToString } from '@mui/system/cssVars';
import createTheme, { ThemeOptions } from './createTheme';
import generateComponentBreakpointCss, {
  GenerateComponentBreakpointCssOptions,
} from './generateComponentBreakpointCss';
import { defaultConfig } from '../InitColorSchemeScript/InitColorSchemeScript';

export interface GenerateThemeCssTheme {
  generateStyleSheets?: (() => Array<Record<string, any>>) | undefined;
  rootSelector?: string | undefined;
}

export interface GenerateThemeCssOptions extends Pick<
  GenerateComponentBreakpointCssOptions,
  'descriptors'
> {
  /**
   * Scope component breakpoint CSS to a nested static theme root.
   * Theme variables should be scoped by creating the theme with the same
   * `cssVariables.rootSelector`.
   */
  rootSelector?: string | undefined;
}

function isTheme(
  themeOrOptions: GenerateThemeCssTheme | ThemeOptions,
): themeOrOptions is GenerateThemeCssTheme {
  return typeof (themeOrOptions as GenerateThemeCssTheme).generateStyleSheets === 'function';
}

function createCssVarsTheme(options: ThemeOptions) {
  const cssVariables =
    typeof options.cssVariables === 'object'
      ? {
          colorSchemeSelector: defaultConfig.attribute,
          ...options.cssVariables,
        }
      : { colorSchemeSelector: defaultConfig.attribute };

  return createTheme({
    ...options,
    cssVariables,
    colorSchemes: options.colorSchemes ?? { light: true, dark: true },
  }) as unknown as GenerateThemeCssTheme;
}

/**
 * Serializes a CSS-variable theme into a static CSS file.
 * Component CSS files still ship separately; this file supplies their vars.
 */
export default function generateThemeCss(
  themeOrOptions: GenerateThemeCssTheme | ThemeOptions = {},
  options: GenerateThemeCssOptions = {},
) {
  const theme = isTheme(themeOrOptions)
    ? themeOrOptions
    : createCssVarsTheme(themeOrOptions as ThemeOptions);

  if (typeof theme.generateStyleSheets !== 'function') {
    throw new Error(
      'MUI: generateThemeCss requires a theme created with `cssVariables: true`. ' +
        'Pass theme options or a CSS variables theme from `createTheme({ cssVariables: true })`.',
    );
  }

  const rootSelector = options.rootSelector ?? theme.rootSelector;
  const themeCss = styleSheetsToString(theme.generateStyleSheets());
  const componentBreakpointCss = generateComponentBreakpointCss(theme, {
    rootSelector,
    descriptors: options.descriptors,
  });

  return [themeCss, componentBreakpointCss].filter(Boolean).join('\n');
}
