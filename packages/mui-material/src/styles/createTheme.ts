import deepmerge, { isPlainObject } from '@mui/utils/deepmerge';
import createPalette from './createPalette';
import type { PaletteOptions } from './createPalette';
import {
  resolveFocusVisible,
  mergeFocusVisibleInput,
  isOutlineColorFromResolvedRing,
} from './focusVisible';
import type { ColorSystemOptions } from './createThemeFoundation';
import type { CssVarsThemeOptions, ColorSystem, DefaultColorScheme } from './createThemeWithVars';
import createThemeWithVars from './createThemeWithVars';
import type {
  Theme,
  CssThemeVariables,
  ThemeOptions as ThemeNoVarsOptions,
} from './createThemeNoVars';
import createThemeNoVars from './createThemeNoVars';

export type {
  Theme,
  CssThemeVariables,
  FocusVisible,
  FocusVisibleOptions,
} from './createThemeNoVars';

type CssVarsOptions = CssThemeVariables extends {
  enabled: true;
}
  ? ColorSystemOptions
  : {};

type CssVarsConfigList =
  | 'colorSchemeSelector'
  | 'rootSelector'
  | 'disableCssColorScheme'
  | 'cssVarPrefix'
  | 'shouldSkipGeneratingVar'
  | 'nativeColor';

export interface ThemeOptions extends CssVarsOptions, Omit<CssVarsThemeOptions, CssVarsConfigList> {
  cssVariables?: boolean | Pick<CssVarsThemeOptions, CssVarsConfigList> | undefined;
  palette?: PaletteOptions | undefined;
}

/**
 * A theme created with CSS variables keeps, under this key, the options it was created from and
 * the theme itself. When the theme, or a copy of it, is passed back to `createTheme()`, as in
 * `createTheme(theme, { palette })` or `createTheme({ ...theme, palette })`, it's created again
 * from these options, so that every value that depends on a changed one is generated again.
 * `Symbol.for()` keeps the key the same across copies of the package.
 */
const themeInputsKey = Symbol.for('mui.material.themeInputs');

interface ThemeInputs {
  options: ThemeOptions;
  theme: Record<string, any>;
}

/**
 * Returns the values of `value` that differ from `base`, looking into the plain objects they both
 * have, or `undefined` if there's none. A function that replaces a function isn't a change: the
 * theme creates its functions again, and `ThemeProvider` does too, like `typography.pxToRem()`.
 * A value missing from `base` that's the same as in `fallback` isn't a change either.
 */
function getChanges(value: any, base: any, fallback?: Record<string, any>): any {
  if (value === base || (typeof value === 'function' && typeof base === 'function')) {
    return undefined;
  }
  if (Array.isArray(base) && (Array.isArray(value) || isPlainObject(value))) {
    // `ThemeProvider` copies an array, like `overlays`, into an object with the same entries.
    const copy = value as Record<string, unknown>;
    const keys = Object.keys(copy);
    if (keys.length === base.length && keys.every((key) => copy[key] === base[Number(key)])) {
      return undefined;
    }
    return Array.isArray(value) ? value : Object.assign([], value);
  }
  if (!isPlainObject(value) || !isPlainObject(base)) {
    return value;
  }
  const changes: Record<string, any> = {};
  Object.keys(value).forEach((key) => {
    if (fallback && !(key in base) && value[key] === fallback[key]) {
      return;
    }
    const change = getChanges(value[key], base[key]);
    if (change !== undefined) {
      changes[key] = change;
    }
  });
  return Object.keys(changes).length > 0 ? changes : undefined;
}

/**
 * Returns the options of a theme passed back to `createTheme()`: the options the theme was created
 * from, with the values changed in `copy`, the theme or a copy of it.
 */
function getThemeOptions(copy: Record<string, any>, inputs: ThemeInputs): ThemeOptions {
  const { options, theme } = inputs;
  const defaultScheme = theme.defaultColorScheme;
  const changes: Record<string, any> = {};
  Object.keys(copy).forEach((key) => {
    // `vars` isn't an option, and `cssVariables: true` keeps the CSS variables options of the theme.
    if (key === 'vars' || (key === 'cssVariables' && copy[key] === true)) {
      return;
    }
    const schemes = Object.keys(theme.colorSchemes).filter(
      (scheme) => key in theme.colorSchemes[scheme],
    );
    if (schemes.length === 0) {
      const change = getChanges(copy[key], theme[key]);
      if (change !== undefined) {
        changes[key] = change;
      }
      return;
    }
    // The values of a color scheme, like `palette`, are at the top level too. They're copied from
    // the default color scheme, or by a `ThemeProvider` with `forceThemeRerender`, from the color
    // scheme in use over the default one. A change goes to the color scheme it was copied from.
    const fallback = theme.colorSchemes[defaultScheme]?.[key];
    let scheme = '';
    let schemeChange: any;
    let schemeChangeCount = Infinity;
    // The default color scheme goes first, so that it's chosen in a tie.
    schemes.sort((a, b) => Number(b === defaultScheme) - Number(a === defaultScheme));
    // Stops at a color scheme without changes, usually the default one.
    schemes.some((item) => {
      const change = getChanges(copy[key], theme.colorSchemes[item][key], fallback);
      const count = isPlainObject(change)
        ? Object.keys(change).length
        : Number(change !== undefined);
      if (count < schemeChangeCount) {
        scheme = item;
        schemeChange = change;
        schemeChangeCount = count;
      }
      return count === 0;
    });
    if (schemeChange === undefined) {
      return;
    }
    // A value given at the top level of the options, like `palette`, goes to the default color scheme.
    if (scheme === defaultScheme && key in options) {
      changes[key] = schemeChange;
    } else {
      changes.colorSchemes = deepmerge(changes.colorSchemes ?? {}, {
        [scheme]: { [key]: schemeChange },
      });
    }
  });
  return deepmerge(options, changes);
}

/**
 * Deep merges an extra argument of `createTheme()` into the options. The `palette` option replaces
 * the palette of the default color scheme, so the `palette` of the argument is merged into that
 * palette when the options don't have a `palette`.
 */
function mergeArgument(options: ThemeOptions, argument: Record<string, any>): ThemeOptions {
  const { palette, ...other } = argument;
  if (!palette || options.palette || !options.colorSchemes) {
    return deepmerge(options, argument);
  }
  return deepmerge(options, {
    ...other,
    colorSchemes: deepmerge(other.colorSchemes ?? {}, {
      [options.defaultColorScheme ?? 'light']: { palette },
    }),
  });
}

// eslint-disable-next-line consistent-return
function attachColorScheme(
  theme: { colorSchemes?: Partial<Record<string, any>> | undefined },
  scheme: 'light' | 'dark',
  colorScheme: boolean | Record<string, any> | undefined,
) {
  if (!theme.colorSchemes) {
    return undefined;
  }
  if (colorScheme) {
    theme.colorSchemes[scheme] = {
      ...(colorScheme !== true && colorScheme),
      palette: createPalette({
        ...(colorScheme === true ? {} : colorScheme.palette),
        mode: scheme,
      } as any), // cast type to skip module augmentation test
    };
  }
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * It can also be a theme created with `cssVariables`, which is created again from its options.
 * @param args Deep merge the arguments with the about to be returned theme.
 * When `options` has `cssVariables`, or is a theme created with it, they're deep merged into
 * `options` instead, so they're processed like `options`.
 * @returns A complete, ready-to-use theme object.
 */
export default function createTheme(
  options: ThemeOptions = {} as any, // cast type to skip module augmentation test
  ...args: object[]
): Theme {
  const inputs: ThemeInputs | undefined = (options as any)[themeInputsKey];
  if (inputs) {
    return createTheme(getThemeOptions(options, inputs), ...args);
  }
  if (options.cssVariables && args.length > 0) {
    // The arguments are merged into the options, so that they're processed the same way: their
    // values get CSS variables, and the values that depend on them are generated again.
    return createTheme(args.reduce<ThemeOptions>(mergeArgument, options));
  }
  const {
    palette,
    cssVariables = false,
    colorSchemes: initialColorSchemes = !palette ? { light: true } : undefined,
    defaultColorScheme: initialDefaultColorScheme = palette?.mode,
    ...other
  } = options;
  const defaultColorSchemeInput = (initialDefaultColorScheme as DefaultColorScheme) || 'light';
  const defaultScheme = initialColorSchemes?.[defaultColorSchemeInput];
  const colorSchemesInput = {
    ...initialColorSchemes,
    ...(palette
      ? {
          [defaultColorSchemeInput]: {
            ...(typeof defaultScheme !== 'boolean' && defaultScheme),
            palette,
          },
        }
      : undefined),
  };

  if (cssVariables === false) {
    if (!('colorSchemes' in options)) {
      // Behaves exactly as v5
      return createThemeNoVars(options as ThemeNoVarsOptions, ...args);
    }

    let paletteOptions = palette;
    if (!('palette' in options)) {
      if (colorSchemesInput[defaultColorSchemeInput]) {
        if (colorSchemesInput[defaultColorSchemeInput] !== true) {
          paletteOptions = colorSchemesInput[defaultColorSchemeInput].palette;
        } else if (defaultColorSchemeInput === 'dark') {
          paletteOptions = { mode: 'dark' };
        }
      }
    }

    const theme = createThemeNoVars(
      { ...options, palette: paletteOptions } as ThemeNoVarsOptions,
      ...args,
    ) as unknown as Theme & {
      defaultColorScheme?: 'light' | 'dark' | undefined;
      colorSchemes?: Partial<Record<string, any>> | undefined;
    };

    theme.defaultColorScheme = defaultColorSchemeInput;
    theme.colorSchemes = colorSchemesInput as Record<string, ColorSystem>;

    if (theme.palette.mode === 'light') {
      theme.colorSchemes.light = {
        ...(colorSchemesInput.light !== true && colorSchemesInput.light),
        palette: theme.palette,
      } as ColorSystem;
      attachColorScheme(theme, 'dark', colorSchemesInput.dark);
    }
    if (theme.palette.mode === 'dark') {
      theme.colorSchemes.dark = {
        ...(colorSchemesInput.dark !== true && colorSchemesInput.dark),
        palette: theme.palette,
      } as ColorSystem;
      attachColorScheme(theme, 'light', colorSchemesInput.light);
    }

    if (theme.focusVisible != null && theme.focusVisible !== false) {
      let focusVisibleInput = theme.focusVisible;
      const rawFocusVisible = mergeFocusVisibleInput(options.focusVisible, args);
      const authoredColor =
        rawFocusVisible && typeof rawFocusVisible === 'object'
          ? rawFocusVisible.outlineColor
          : undefined;
      // A re-composed theme carries a baked default that looks authored, so it falls back to value
      // equality — the one case where a pinned `primary.main` is indistinguishable and gets reset.
      if (
        !authoredColor ||
        (isOutlineColorFromResolvedRing(options.focusVisible, args) &&
          authoredColor === theme.palette.primary.main)
      ) {
        const { outlineColor, ...rest } = focusVisibleInput;
        focusVisibleInput = rest;
      }
      Object.keys(theme.colorSchemes).forEach((scheme) => {
        const schemePalette = theme.colorSchemes?.[scheme]?.palette;
        if (schemePalette?.primary) {
          theme.colorSchemes![scheme].focusVisible = resolveFocusVisible(
            focusVisibleInput,
            schemePalette.primary.main,
          );
        }
      });
    }

    return theme;
  }

  if (!palette && !('light' in colorSchemesInput) && defaultColorSchemeInput === 'light') {
    colorSchemesInput.light = true;
  }

  const theme = createThemeWithVars({
    ...other,
    colorSchemes: colorSchemesInput,
    defaultColorScheme: defaultColorSchemeInput,
    ...(typeof cssVariables !== 'boolean' && cssVariables),
  });
  // A copy of the options, so that changing them later doesn't change the themes created from this one.
  (theme as any)[themeInputsKey] = { options: deepmerge({}, options), theme } satisfies ThemeInputs;
  return theme;
}
