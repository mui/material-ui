import { OverridableStringUnion } from '@mui/types';
import { SxConfig, SxProps, CSSObject, ApplyStyles, Theme as SystemTheme } from '@mui/system';
import { ExtractTypographyTokens } from '@mui/system/cssVars';
import { Palette, PaletteOptions } from './createPalette';
import { Shadows } from './shadows';
import { Transitions } from './createTransitions';
import { Mixins } from './createMixins';
import { TypographyVariants } from './createTypography';
import { ZIndex } from './zIndex';

/**
 * default MD color-schemes
 */
export type DefaultColorScheme = 'light' | 'dark';

/**
 * The application can add more color-scheme by extending this interface via module augmentation
 *
 * Ex.
 * declare module @mui/material/styles {
 *   interface ColorSchemeOverrides {
 *     foo: true;
 *   }
 * }
 *
 * // SupportedColorScheme = 'light' | 'dark' | 'foo';
 */
export interface ColorSchemeOverrides {}
export type ExtendedColorScheme = OverridableStringUnion<never, ColorSchemeOverrides>;

/**
 * All color-schemes that the application has
 */
export type SupportedColorScheme = DefaultColorScheme | ExtendedColorScheme;

export interface Opacity {
  inputPlaceholder: number;
  inputUnderline: number;
  switchTrackDisabled: number;
  switchTrack: number;
}

export type Overlays = [
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
  string | undefined,
];

export interface PaletteBackgroundChannel {
  defaultChannel: string;
  paperChannel: string;
}

export interface PaletteCommonChannel {
  background: string;
  backgroundChannel: string;
  onBackground: string;
  onBackgroundChannel: string;
}

export interface PaletteColorChannel {
  mainChannel: string;
  lightChannel: string;
  darkChannel: string;
  contrastTextChannel: string;
}

export interface PaletteActionChannel {
  activeChannel: string;
  selectedChannel: string;
}

export interface PaletteTextChannel {
  primaryChannel: string;
  secondaryChannel: string;
}

export interface PaletteAlert {
  errorColor: string;
  infoColor: string;
  successColor: string;
  warningColor: string;
  errorFilledBg: string;
  infoFilledBg: string;
  successFilledBg: string;
  warningFilledBg: string;
  errorFilledColor: string;
  infoFilledColor: string;
  successFilledColor: string;
  warningFilledColor: string;
  errorStandardBg: string;
  infoStandardBg: string;
  successStandardBg: string;
  warningStandardBg: string;
  errorIconColor: string;
  infoIconColor: string;
  successIconColor: string;
  warningIconColor: string;
}

export interface PaletteAppBar {
  defaultBg: string;
  darkBg: string;
  darkColor: string;
}

export interface PaletteAvatar {
  defaultBg: string;
}

export interface PaletteButton {
  inheritContainedBg: string;
  inheritContainedHoverBg: string;
}

export interface PaletteChip {
  defaultBorder: string;
  defaultAvatarColor: string;
  defaultIconColor: string;
}

export interface PaletteFilledInput {
  bg: string;
  hoverBg: string;
  disabledBg: string;
}

export interface PaletteLinearProgress {
  primaryBg: string;
  secondaryBg: string;
  errorBg: string;
  infoBg: string;
  successBg: string;
  warningBg: string;
}

export interface PaletteSkeleton {
  bg: string;
}

export interface PaletteSlider {
  primaryTrack: string;
  secondaryTrack: string;
  errorTrack: string;
  infoTrack: string;
  successTrack: string;
  warningTrack: string;
}

export interface PaletteSnackbarContent {
  bg: string;
  color: string;
}

export interface PaletteSpeedDialAction {
  fabHoverBg: string;
}

export interface PaletteStepConnector {
  border: string;
}

export interface PaletteStepContent {
  border: string;
}

export interface PaletteSwitch {
  defaultColor: string;
  defaultDisabledColor: string;
  primaryDisabledColor: string;
  secondaryDisabledColor: string;
  errorDisabledColor: string;
  infoDisabledColor: string;
  successDisabledColor: string;
  warningDisabledColor: string;
}

export interface PaletteTableCell {
  border: string;
}

export interface PaletteTooltip {
  bg: string;
}

// The Palette should be sync with `../themeCssVarsAugmentation/index.d.ts`
export interface ColorSystemOptions {
  palette?: PaletteOptions & {
    background?: Partial<PaletteBackgroundChannel>;
    common?: Partial<PaletteCommonChannel>;
    primary?: Partial<PaletteColorChannel>;
    secondary?: Partial<PaletteColorChannel>;
    error?: Partial<PaletteColorChannel>;
    info?: Partial<PaletteColorChannel>;
    success?: Partial<PaletteColorChannel>;
    text?: Partial<PaletteTextChannel>;
    dividerChannel?: Partial<string>;
    action?: Partial<PaletteActionChannel>;
    Alert?: Partial<PaletteAlert>;
    AppBar?: Partial<PaletteAppBar>;
    Avatar?: Partial<PaletteAvatar>;
    Button?: Partial<PaletteButton>;
    Chip?: Partial<PaletteChip>;
    FilledInput?: Partial<PaletteFilledInput>;
    LinearProgress?: Partial<PaletteLinearProgress>;
    Skeleton?: Partial<PaletteSkeleton>;
    Slider?: Partial<PaletteSlider>;
    SnackbarContent?: Partial<PaletteSnackbarContent>;
    SpeedDialAction?: Partial<PaletteSpeedDialAction>;
    StepConnector?: Partial<PaletteStepConnector>;
    StepContent?: Partial<PaletteStepContent>;
    Switch?: Partial<PaletteSwitch>;
    TableCell?: Partial<PaletteTableCell>;
    Tooltip?: Partial<PaletteTooltip>;
  };
  opacity?: Partial<Opacity>;
  overlays?: Overlays;
}

export interface CssVarsPalette {
  common: PaletteCommonChannel;
  primary: PaletteColorChannel;
  secondary: PaletteColorChannel;
  error: PaletteColorChannel;
  info: PaletteColorChannel;
  success: PaletteColorChannel;
  warning: PaletteColorChannel;
  text: PaletteTextChannel;
  background: PaletteBackgroundChannel;
  dividerChannel: string;
  action: PaletteActionChannel;
  Alert: PaletteAlert;
  AppBar: PaletteAppBar;
  Avatar: PaletteAvatar;
  Button: PaletteButton;
  Chip: PaletteChip;
  FilledInput: PaletteFilledInput;
  LinearProgress: PaletteLinearProgress;
  Skeleton: PaletteSkeleton;
  Slider: PaletteSlider;
  SnackbarContent: PaletteSnackbarContent;
  SpeedDialAction: PaletteSpeedDialAction;
  StepConnector: PaletteStepConnector;
  StepContent: PaletteStepContent;
  Switch: PaletteSwitch;
  TableCell: PaletteTableCell;
  Tooltip: PaletteTooltip;
}

export interface ColorSystem {
  palette: Palette & CssVarsPalette;
  opacity: Opacity;
  overlays: Overlays;
}

// should not include keys defined in `shouldSkipGeneratingVar` and have value typeof function
export interface ThemeVars {
  font: ExtractTypographyTokens<TypographyVariants>;
  palette: Omit<
    ColorSystem['palette'],
    | 'colorScheme'
    | 'mode'
    | 'contrastThreshold'
    | 'tonalOffset'
    | 'getContrastText'
    | 'augmentColor'
  >;
  opacity: Opacity;
  overlays: Overlays;
  shadows: Shadows;
  shape: SystemTheme['shape'];
  spacing: string;
  zIndex: ZIndex;
}

type Split<T, K extends keyof T = keyof T> = K extends string | number
  ? { [k in K]: Exclude<T[K], undefined> }
  : never;

type ConcatDeep<T> =
  T extends Record<string | number, infer V>
    ? keyof T extends string | number
      ? V extends string | number
        ? keyof T
        : keyof V extends string | number
          ? `${keyof T}-${ConcatDeep<Split<V>>}`
          : never
      : never
    : never;

/**
 * Does not work for these cases:
 * - { borderRadius: string | number } // the value can't be a union
 * - { shadows: [string, string, ..., string] } // the value can't be an array
 */
type NormalizeVars<T> = ConcatDeep<Split<T>>;

// shut off automatic exporting for the Generics above
export {};

export interface ThemeCssVarOverrides {}

export type ThemeCssVar = OverridableStringUnion<
  | NormalizeVars<Omit<ThemeVars, 'overlays' | 'shadows' | 'shape'>>
  | 'shape-borderRadius'
  | 'shadows-0'
  | 'shadows-1'
  | 'shadows-2'
  | 'shadows-3'
  | 'shadows-4'
  | 'shadows-5'
  | 'shadows-6'
  | 'shadows-7'
  | 'shadows-8'
  | 'shadows-9'
  | 'shadows-10'
  | 'shadows-11'
  | 'shadows-12'
  | 'shadows-13'
  | 'shadows-14'
  | 'shadows-15'
  | 'shadows-16'
  | 'shadows-17'
  | 'shadows-18'
  | 'shadows-19'
  | 'shadows-20'
  | 'shadows-21'
  | 'shadows-22'
  | 'shadows-23'
  | 'shadows-24'
  | 'overlays-0'
  | 'overlays-1'
  | 'overlays-2'
  | 'overlays-3'
  | 'overlays-4'
  | 'overlays-5'
  | 'overlays-6'
  | 'overlays-7'
  | 'overlays-8'
  | 'overlays-9'
  | 'overlays-10'
  | 'overlays-11'
  | 'overlays-12'
  | 'overlays-13'
  | 'overlays-14'
  | 'overlays-15'
  | 'overlays-16'
  | 'overlays-17'
  | 'overlays-18'
  | 'overlays-19'
  | 'overlays-20'
  | 'overlays-21'
  | 'overlays-22'
  | 'overlays-23'
  | 'overlays-24',
  ThemeCssVarOverrides
>;

/**
 * Theme properties generated by extendTheme and CssVarsProvider
 */
export interface CssVarsTheme extends ColorSystem {
  colorSchemes: Partial<Record<SupportedColorScheme, ColorSystem>>;
  rootSelector: string;
  colorSchemeSelector: 'media' | 'class' | 'data' | string;
  cssVarPrefix: string;
  defaultColorScheme: SupportedColorScheme;
  vars: ThemeVars;
  getCssVar: (field: ThemeCssVar, ...vars: ThemeCssVar[]) => string;
  getColorSchemeSelector: (colorScheme: SupportedColorScheme) => string;
  generateThemeVars: () => ThemeVars;
  generateStyleSheets: () => Array<Record<string, any>>;
  generateSpacing: () => SystemTheme['spacing'];

  // Default theme tokens
  spacing: SystemTheme['spacing'];
  breakpoints: SystemTheme['breakpoints'];
  shape: SystemTheme['shape'];
  typography: TypographyVariants;
  transitions: Transitions;
  shadows: Shadows;
  mixins: Mixins;
  zIndex: ZIndex;
  direction: SystemTheme['direction'];
  /**
   * A function to determine if the key, value should be attached as CSS Variable
   * `keys` is an array that represents the object path keys.
   *  Ex, if the theme is { foo: { bar: 'var(--test)' } }
   *  then, keys = ['foo', 'bar']
   *        value = 'var(--test)'
   */
  shouldSkipGeneratingVar: (keys: string[], value: string | number) => boolean;
  unstable_sxConfig: SxConfig;
  unstable_sx: (props: SxProps<CssVarsTheme>) => CSSObject;
  applyStyles: ApplyStyles<SupportedColorScheme>;
}
