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
 * from these options with the values the copy changed, so that every value that depends on a
 * changed one is generated again.
 * `Symbol.for()` keeps the key the same across copies of the package.
 */
const themeInputsKey = Symbol.for('mui.material.themeInputs');

interface ThemeInputs {
  /**
   * The options, as `createThemeWithVars()` takes them: every color scheme in `colorSchemes`,
   * with its values, and the CSS variables options at the top level.
   */
  options: Record<string, any>;
  theme: Record<string, any>;
  /**
   * Changes a theme created again from these inputs like `theme` was changed after it was
   * created, as `enhanceDensity()` does.
   */
  enhance?: ((theme: Theme) => Theme) | undefined;
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
 * The options that a theme builder takes whole instead of merging them with its defaults, like
 * `breakpoints.values`. A change inside one of them takes the whole value of the copy.
 * `true` marks such an option, and `'*'` stands for every key.
 */
interface WholeOptions {
  [key: string]: WholeOptions | true;
}
const wholeOptions: WholeOptions = {
  breakpoints: { values: true },
  mixins: { '*': true },
  unstable_sxConfig: { '*': true },
};

/**
 * Whether `value` is merged key by key, like `deepmerge()` does: React elements and components
 * like `React.memo()` ones are taken whole.
 */
function isMergeable(value: unknown): value is Record<string, any> {
  return isPlainObject(value) && !('$$typeof' in value);
}

/**
 * Returns the values of `value` that differ from `base`, looking into the objects they both
 * merge, or `undefined` if there's none. A value missing from `base` that's the same as in
 * `fallback` isn't a change. A value of `base` that `value` drops, or sets to `undefined`, is
 * removed when `options`, the options at the same place, have it: the other values of `base` are
 * generated from the options, so they're generated again without it.
 */
function getChanges(
  value: any,
  base: any,
  options: any,
  whole?: WholeOptions | true,
  fallback?: Record<string, any>,
): any {
  if (value === base) {
    return undefined;
  }
  if (value === undefined) {
    return options === undefined ? undefined : removedValue;
  }
  if (whole === true || !isMergeable(value) || !isMergeable(base)) {
    return value;
  }
  const valueOptions: Record<string, any> = isMergeable(options) ? options : {};
  const changes: Record<string, any> = {};
  new Set([...Object.keys(value), ...Object.keys(base)]).forEach((key) => {
    if (fallback && !(key in base) && value[key] === fallback[key]) {
      return;
    }
    const change = getChanges(
      value[key],
      base[key],
      valueOptions[key],
      whole?.[key] ?? whole?.['*'],
    );
    if (change !== undefined) {
      changes[key] = change;
    }
  });
  return Object.keys(changes).length > 0 ? changes : undefined;
}

/**
 * `createPalette()` takes a color like `primary` whole and generates the values it lacks from its
 * `main`. So a color changed without its `main` keeps the `main` it has in `palette`, the palette
 * of the color scheme it changes, and the `light`, `dark` and `contrastText` that match it.
 */
function completeColors(changes: Record<string, any>, palette: Record<string, any> | undefined) {
  Object.keys(changes).forEach((key) => {
    const change = changes[key];
    const color = palette?.[key];
    if (isMergeable(change) && !('main' in change) && typeof color?.main === 'string') {
      ['main', 'light', 'dark', 'contrastText'].forEach((name) => {
        if (!(name in change) && color[name] !== undefined) {
          change[name] = color[name];
        }
      });
    }
  });
}

/**
 * Removes from `target` the values that `changes` marks as removed.
 */
function removeValues(target: Record<string, any>, changes: Record<string, any>) {
  Object.keys(changes).forEach((key) => {
    if (changes[key] === removedValue) {
      delete target[key];
    } else if (isMergeable(changes[key]) && isMergeable(target[key])) {
      removeValues(target[key], changes[key]);
    }
  });
}

/**
 * Returns the options of a theme passed back to `createTheme()`: the options the theme was created
 * from, with the values changed in `copy`, the theme or a copy of it.
 */
function getThemeOptions(
  copy: Record<string | symbol, any>,
  inputs: ThemeInputs,
): Record<string, any> {
  const { options, theme } = inputs;
  const changes: Record<string, any> = {};
  const schemeChanges: Record<string, any> = {};
  // The values of a color scheme, like `palette`, are at the top level too: the ones of the
  // default color scheme, or with `forceThemeRerender`, the ones of the color scheme in use that
  // `ThemeProvider` merged there.
  const providerScheme = copy[themeColorSchemeKey];
  const sourceName: string =
    providerScheme in theme.colorSchemes ? providerScheme : theme.defaultColorScheme;
  // A change to them goes to that color scheme. Like the `palette` option, it goes to the default
  // color scheme of the copy instead when they're the default one's, or the copy changes it.
  let targetName: string =
    sourceName !== theme.defaultColorScheme && copy.defaultColorScheme === theme.defaultColorScheme
      ? sourceName
      : (copy.defaultColorScheme ?? 'light');
  const sourceScheme = theme.colorSchemes[sourceName];
  const defaultScheme = theme.colorSchemes[theme.defaultColorScheme];
  // Like the `palette` option, a `palette.mode` that differs from the one of a built-in color
  // scheme makes the color scheme of that mode the default one, or turns this one into it.
  const mode = copy.palette?.mode;
  const isModeChange =
    (sourceName === 'light' || sourceName === 'dark') &&
    (mode === 'light' || mode === 'dark') &&
    mode !== sourceName;
  if (isModeChange) {
    targetName = mode;
    changes.defaultColorScheme = mode;
    if (!(mode in theme.colorSchemes)) {
      const { palette: { mode: sourceMode, ...palette } = {}, ...other } = isMergeable(
        options.colorSchemes[sourceName],
      )
        ? options.colorSchemes[sourceName]
        : {};
      schemeChanges[sourceName] = removedValue;
      schemeChanges[mode] = { ...other, palette };
    }
  }
  const targetOptions = options.colorSchemes[targetName];
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
      const change = getChanges(copy[key], theme[key], options[key], wholeOptions[key]);
      if (change !== undefined) {
        changes[key] = change;
      }
      return;
    }
    let value = copy[key];
    if (key === 'palette' && isModeChange) {
      const { mode: modeValue, ...other } = value;
      value = other;
    }
    const base = key in sourceScheme ? sourceScheme[key] : defaultScheme[key];
    const schemeOptions = isMergeable(targetOptions) ? targetOptions[key] : undefined;
    // `ThemeProvider` merges the values of a color scheme over the default ones, so a value missing
    // from that color scheme is the default one.
    const change = getChanges(value, base, schemeOptions, undefined, defaultScheme[key]);
    if (change === undefined) {
      return;
    }
    if (key === 'palette' && isMergeable(change)) {
      completeColors(change, theme.colorSchemes[targetName]?.palette);
    }
    schemeChanges[targetName] = deepmerge(schemeChanges[targetName] ?? {}, { [key]: change });
  });
  if (isMergeable(changes.colorSchemes)) {
    Object.keys(changes.colorSchemes).forEach((name) => {
      const change = changes.colorSchemes[name];
      if (change === true && options.colorSchemes[name]) {
        // `true` enables a color scheme, so it keeps one that the options already have.
        delete changes.colorSchemes[name];
      } else if (isMergeable(change?.palette)) {
        completeColors(change.palette, theme.colorSchemes[name]?.palette);
      }
    });
  }
  if (Object.keys(schemeChanges).length > 0) {
    changes.colorSchemes = deepmerge(changes.colorSchemes ?? {}, schemeChanges);
  }
  if (typeof options.typography === 'function' && isMergeable(changes.typography)) {
    // The changes are made to the typography that the function returns.
    const { typography } = options;
    const typographyChanges = changes.typography;
    changes.typography = (palette: any) => {
      const merged = deepmerge(typography(palette), typographyChanges);
      removeValues(merged, typographyChanges);
      return merged;
    };
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
 * When `options` has `cssVariables`, or is a theme created with it, the theme is then created again
 * with the values they change, so that the values that depend on them are generated again.
 * @returns A complete, ready-to-use theme object.
 */
export default function createTheme(
  options: ThemeOptions = {} as any, // cast type to skip module augmentation test
  ...args: object[]
): Theme {
  const inputs: ThemeInputs | undefined = (options as any)[themeInputsKey];
  if (inputs) {
    // An argument changes the theme, like a copy of it does.
    const copy = args.reduce<Record<string | symbol, any>>(
      (acc, argument) => deepmerge(acc, argument),
      options,
    );
    const theme = createTheme(getThemeOptions(copy, inputs) as ThemeOptions);
    return inputs.enhance ? inputs.enhance(theme) : theme;
  }
  if (options.cssVariables && args.length > 0) {
    // The arguments change the created theme, which is created again with their changes, so that
    // their values get CSS variables, and the values that depend on them are generated again.
    return createTheme(createTheme(options), ...args);
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

  const themeOptions: Record<string, any> = {
    ...other,
    colorSchemes: colorSchemesInput,
    defaultColorScheme: defaultColorSchemeInput,
    ...(typeof cssVariables !== 'boolean' && cssVariables),
  };
  // A copy, taken before `createThemeWithVars()` adds the generated values to the color schemes
  // it's given, and so that changing the options later doesn't change the themes created again.
  const inputOptions: Record<string, any> = deepmerge({}, themeOptions);
  // `createThemeWithVars()` adds values to the color schemes it's given, so it gets a copy too.
  const theme = createThemeWithVars(deepmerge({}, themeOptions));
  // Every color scheme of the theme is in `colorSchemes`, with the values of the default one given
  // at the top level, like `createThemeWithVars()` does, so that a change goes to one place.
  const inputSchemes = inputOptions.colorSchemes;
  Object.keys(theme.colorSchemes).forEach((name) => {
    if (!inputSchemes[name]) {
      inputSchemes[name] = true;
    }
  });
  Object.keys(theme.colorSchemes[defaultColorSchemeInput]!).forEach((key) => {
    if (key !== 'palette' && key in inputOptions) {
      const scheme = isPlainObject(inputSchemes[defaultColorSchemeInput])
        ? inputSchemes[defaultColorSchemeInput]
        : {};
      scheme[key] =
        isPlainObject(scheme[key]) && isPlainObject(inputOptions[key])
          ? deepmerge(scheme[key], inputOptions[key])
          : inputOptions[key];
      inputSchemes[defaultColorSchemeInput] = scheme;
      delete inputOptions[key];
    }
  });
  inputOptions.cssVariables = true;
  (theme as any)[themeInputsKey] = { options: inputOptions, theme } satisfies ThemeInputs;
  return theme;
}
