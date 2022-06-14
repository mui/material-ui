import type {
  CssVarsTheme,
  ColorSystem,
  PaletteCommonChannel,
  PaletteColorChannel,
  PaletteTextChannel,
  PaletteActionChannel,
  PaletteAppBar,
  PaletteChip,
  PaletteFilledInput,
  PaletteLinearProgress,
  PaletteSlider,
  PaletteSnackbarContent,
  PaletteStepConnector,
  PaletteStepContent,
  PaletteSwitch,
  PaletteTableCell,
  PaletteTooltip,
} from '../styles/experimental_extendTheme';

/**
 * Enhance the theme types to include new properties from the CssVarsProvider.
 * - styled
 * - sx
 * - useTheme
 */
declare module '@mui/material/styles' {
  // The palette must be extended in each node.
  interface Theme extends Omit<ColorSystem, 'palette'> {
    prefix: string;
    vars: CssVarsTheme['vars'];
    getCssVar: CssVarsTheme['getCssVar'];
    getColorSchemeSelector: CssVarsTheme['getColorSchemeSelector'];
  }

  interface Palette {
    dividerChannel: string;
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
  }
}

declare module '@mui/material/styles/createPalette' {
  interface CommonColors extends PaletteCommonChannel {}

  interface PaletteColor extends PaletteColorChannel {}

  interface TypeText extends PaletteTextChannel {}

  interface TypeAction extends PaletteActionChannel {}
}
