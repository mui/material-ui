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
 * The key, on a theme from `ThemeProvider`, of the color scheme whose values it merged at the top
 * level, like `palette`. It's the default color scheme, or with `forceThemeRerender`, the one in use.
 */
const themeColorSchemeKey = Symbol.for('mui.themeColorScheme');

/**
 * Marks, in the changes of a copy, a value that the copy dropped, to remove it from the options.
 */
const removedValue = Symbol('removed');

/**
 * Returns the values of `value` that differ from `base`, looking into the plain objects they both
 * have, or `undefined` if there's none. A value missing from `base` that's the same as in
 * `fallback` isn't a change. A value of `base` that `value` drops, or sets to `undefined`, is
 * removed when `options`, the options at the same place, have it: the other values of `base` are
 * generated from the options, so they're generated again without it.
 */
function getChanges(value: any, base: any, fallback?: Record<string, any>, options?: any): any {
  if (value === base) {
    return undefined;
  }
  if (value === undefined) {
    return options === undefined ? undefined : removedValue;
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
  const valueOptions: Record<string, any> = isPlainObject(options) ? options : {};
  const changes: Record<string, any> = {};
  new Set([...Object.keys(value), ...Object.keys(base)]).forEach((key) => {
    if (fallback && !(key in base) && value[key] === fallback[key]) {
      return;
    }
    const change = getChanges(value[key], base[key], undefined, valueOptions[key]);
    if (change !== undefined) {
      changes[key] = change;
    }
  });
  return Object.keys(changes).length > 0 ? changes : undefined;
}

/**
 * Removes from `target` the values that `changes` marks as removed.
 */
function removeValues(target: Record<string, any>, changes: Record<string, any>) {
  Object.keys(changes).forEach((key) => {
    if (changes[key] === removedValue) {
      delete target[key];
    } else if (isPlainObject(changes[key]) && isPlainObject(target[key])) {
      removeValues(target[key], changes[key]);
    }
  });
}

/**
 * Deep merges `colorSchemes` into `options`. `true` enables a color scheme, so it keeps one that
 * the options already have, with its values.
 */
function mergeColorSchemes(
  options: ThemeOptions,
  colorSchemes: Record<string, any>,
): Record<string, any> {
  if (!isPlainObject(colorSchemes)) {
    return colorSchemes;
  }
  const existing: Record<string, any> = options.colorSchemes ?? {};
  const changes: Record<string, any> = {};
  Object.keys(colorSchemes).forEach((scheme) => {
    if (!(colorSchemes[scheme] === true && existing[scheme])) {
      changes[scheme] = colorSchemes[scheme];
    }
  });
  return changes;
}

/**
 * Returns the options of a theme passed back to `createTheme()`: the options the theme was created
 * from, with the values changed in `copy`, the theme or a copy of it. They're merged into the
 * options like an extra argument.
 */
function getThemeOptions(copy: Record<string | symbol, any>, inputs: ThemeInputs): ThemeOptions {
  const { options, theme } = inputs;
  // The values of a color scheme, like `palette`, are at the top level too: the ones of the
  // default color scheme, or the ones `ThemeProvider` merged there.
  const defaultScheme = theme.colorSchemes[theme.defaultColorScheme];
  const sourceScheme = theme.colorSchemes[copy[themeColorSchemeKey]] ?? defaultScheme;
  // A change to them goes to the color scheme `ThemeProvider` took them from, or like the
  // `palette` option, to the default color scheme of the copy.
  const targetScheme: string = copy[themeColorSchemeKey] ?? copy.defaultColorScheme;
  const changes: Record<string, any> = {};
  // The keys of the theme too, for the values that the copy dropped.
  new Set([...Object.keys(copy), ...Object.keys(theme)]).forEach((key) => {
    if (
      // `vars` isn't an option, and `cssVariables: true` keeps the CSS variables options.
      key === 'vars' ||
      (key === 'cssVariables' && copy[key] === true) ||
      // `ThemeProvider` creates these again, from the same options.
      key === 'unstable_sx' ||
      (key === 'spacing' && copy[key]?.mui)
    ) {
      return;
    }
    const isSchemeValue = Object.values<any>(theme.colorSchemes).some((scheme) => key in scheme);
    if (!isSchemeValue) {
      const change = getChanges(
        copy[key],
        theme[key],
        undefined,
        options[key as keyof ThemeOptions],
      );
      if (change !== undefined) {
        changes[key] = change;
      }
      return;
    }
    const base = key in sourceScheme ? sourceScheme[key] : defaultScheme[key];
    const isOption = targetScheme === copy.defaultColorScheme && key in options;
    const schemeOptions = isOption
      ? options[key as keyof ThemeOptions]
      : (options.colorSchemes as Record<string, any> | undefined)?.[targetScheme]?.[key];
    // `ThemeProvider` merges the values of a color scheme over the default ones, so a value missing
    // from that color scheme is the default one.
    const change = getChanges(copy[key], base, defaultScheme[key], schemeOptions);
    if (change === undefined) {
      return;
    }
    if (isOption) {
      changes[key] = change;
    } else {
      changes.colorSchemes = deepmerge(changes.colorSchemes ?? {}, {
        [targetScheme]: { [key]: change },
      });
    }
  });
  return mergeArgument(options, changes);
}

/**
 * Deep merges an extra argument of `createTheme()` into the options, so that it's processed like
 * them. The `palette` option replaces the palette of the default color scheme, so the `palette` of
 * the argument is merged into that palette when the options have one in `colorSchemes` instead.
 */
function mergeArgument(options: ThemeOptions, argument: Record<string, any>): ThemeOptions {
  const { palette, colorSchemes, ...other } = argument;
  const changes: Record<string, any> = other;
  if (colorSchemes) {
    changes.colorSchemes = mergeColorSchemes(options, colorSchemes);
  }
  if (palette) {
    if (options.palette || !options.colorSchemes) {
      changes.palette = palette;
    } else {
      // The default color scheme of the options with the argument, like in `createTheme()`.
      const defaultColorScheme =
        other.defaultColorScheme ?? options.defaultColorScheme ?? palette.mode;
      if (defaultColorScheme && !options.defaultColorScheme) {
        changes.defaultColorScheme = defaultColorScheme;
      }
      changes.colorSchemes = deepmerge(changes.colorSchemes ?? {}, {
        [defaultColorScheme ?? 'light']: { palette },
      });
    }
  }
  const merged = deepmerge(options, changes);
  removeValues(merged, changes);
  return merged;
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
