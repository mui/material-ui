import type {
  Theme as ThemeWithVars,
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

declare module '@mui/material/styles' {
  interface Theme extends Omit<ColorSystem, 'palette'> {
    prefix: string;
    vars: ThemeWithVars['vars'];
    getCssVar: ThemeWithVars['getCssVar'];
    getColorSchemeSelector: ThemeWithVars['getColorSchemeSelector'];
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
