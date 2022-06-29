/* eslint-disable @typescript-eslint/naming-convention */
import { OverridableStringUnion } from '@mui/types';
import { ThemeOptions, Theme } from './createTheme';
import { Palette, PaletteOptions } from './createPalette';
import { Shadows } from './shadows';
import { ZIndex } from './zIndex';
import { Components } from './components';

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
  palette?: Omit<PaletteOptions, 'mode'> & {
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

// The Palette should be sync with `../themeCssVarsAugmentation/index.d.ts`
export interface ColorSystem {
  palette: Palette & {
    colorScheme: SupportedColorScheme;
    common: PaletteCommonChannel;
    primary: PaletteColorChannel;
    secondary: PaletteColorChannel;
    error: PaletteColorChannel;
    info: PaletteColorChannel;
    success: PaletteColorChannel;
    text: PaletteTextChannel;
    dividerChannel: string;
    action: PaletteActionChannel;
    Alert: PaletteAlert;
    AppBar: PaletteAppBar;
    Avatar: PaletteAvatar;
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
  };
  opacity: Opacity;
  overlays: Overlays;
}

export interface CssVarsThemeOptions extends Omit<ThemeOptions, 'palette' | 'components'> {
  components?: Components<Omit<CssVarsTheme, 'components'>>;
  colorSchemes?: Partial<Record<SupportedColorScheme, ColorSystemOptions>>;
}

// should not include keys defined in `shouldSkipGeneratingVar` and have value typeof function
interface ThemeVars {
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
  zIndex: ZIndex;
  shape: Theme['shape'];
}

// shut off automatic exporting for the `ThemeVars` above
export {};

export interface CssVarsTheme extends Omit<Theme, 'palette' | 'components'>, ColorSystem {
  components?: Components<Omit<CssVarsTheme, 'components'>>;
  colorSchemes: Record<SupportedColorScheme, ColorSystem>;
  prefix: string;
  vars: ThemeVars;
  getCssVar: <CustomVar extends string = never>(
    field: string | CustomVar,
    ...vars: Array<string | CustomVar>
  ) => string;
  getColorSchemeSelector: (colorScheme: SupportedColorScheme) => string;
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function experimental_extendTheme(
  options?: CssVarsThemeOptions,
  ...args: object[]
): CssVarsTheme;
