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
  placeholder: number;
  inputTouchBottomLine: number;
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
  disabledChannel: string;
}

export interface PaletteAppBar {
  defaultBgColor: string;
}

export interface PaletteChip {
  defaultBorderColor: string;
  defaultAvatarColor: string;
  defaultIconColor: string;
}

export interface PaletteFilledInput {
  bgColor: string;
  hoverBgColor: string;
  disabledBgColor: string;
}

export interface PaletteLinearProgress {
  primaryBgColor: string;
  secondaryBgColor: string;
  errorBgColor: string;
  infoBgColor: string;
  successBgColor: string;
  warningBgColor: string;
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
  bgColor: string;
}

export interface PaletteStepConnector {
  borderColor: string;
}

export interface PaletteStepContent {
  borderColor: string;
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
  borderColor: string;
}

export interface PaletteTooltip {
  bgColor: string;
}

export interface ColorSystemOptions {
  palette?: PaletteOptions & {
    common?: Partial<PaletteCommonChannel>;
    primary?: Partial<PaletteColorChannel>;
    secondary?: Partial<PaletteColorChannel>;
    error?: Partial<PaletteColorChannel>;
    info?: Partial<PaletteColorChannel>;
    success?: Partial<PaletteColorChannel>;
    text?: Partial<PaletteTextChannel>;
    dividerChannel?: Partial<string>;
    action?: Partial<PaletteActionChannel>;
    AppBar?: Partial<PaletteAppBar>;
    Chip?: Partial<PaletteChip>;
    FilledInput?: Partial<PaletteFilledInput>;
    LinearProgress?: Partial<PaletteLinearProgress>;
    Slider?: Partial<PaletteSlider>;
    SnackbarContent?: Partial<PaletteSnackbarContent>;
    StepConnector?: Partial<PaletteStepConnector>;
    StepContent?: Partial<PaletteStepContent>;
    Switch?: Partial<PaletteSwitch>;
    TableCell?: Partial<PaletteTableCell>;
    Tooltip?: Partial<PaletteTooltip>;
  };
  opacity?: Partial<Opacity>;
  overlays?: Overlays;
}

export interface ColorSystem {
  palette: Palette & {
    common: PaletteCommonChannel;
    primary: PaletteColorChannel;
    secondary: PaletteColorChannel;
    error: PaletteColorChannel;
    info: PaletteColorChannel;
    success: PaletteColorChannel;
    text: PaletteTextChannel;
    dividerChannel: string;
    action: PaletteActionChannel;
    AppBar: PaletteAppBar;
    Chip: PaletteChip;
    FilledInput: PaletteFilledInput;
    LinearProgress: PaletteLinearProgress;
    Slider: PaletteSlider;
    SnackbarContent: PaletteSnackbarContent;
    StepConnector: PaletteStepConnector;
    StepContent: PaletteStepContent;
    Switch: PaletteSwitch;
    TableCell: PaletteTableCell;
    Tooltip: PaletteTooltip;
  };
  opacity: Opacity;
  overlays: Overlays;
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

export interface CssVarsThemeOptions extends Omit<ThemeOptions, 'palette' | 'components'> {
  components?: Components<Omit<CssVarsTheme, 'components'>>;
  colorSchemes?: Partial<Record<SupportedColorScheme, ColorSystemOptions>>;
}

/**
 * Our [TypeScript guide on theme customization](https://mui.com/material-ui/guides/typescript/#customization-of-theme) explains in detail how you would add custom properties.
 */
type ThemeCSSVar = string;

interface ThemeVars extends ColorSystem {
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
    field: ThemeCSSVar | CustomVar,
    ...vars: Array<ThemeCSSVar | CustomVar>
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
