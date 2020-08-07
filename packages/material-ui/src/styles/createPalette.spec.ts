import { Color } from '@material-ui/core';
import { blue, common } from '@material-ui/core/colors';
import {
  createMuiTheme,
  PaletteColorOptions,
  SimplePaletteColorOptions,
  Theme,
} from '@material-ui/core/styles';

{
  const palette = createMuiTheme().palette;
  const color: Color = blue;
  const option: SimplePaletteColorOptions = { main: blue[400] };
  const colorOrOption: PaletteColorOptions = undefined as any;

  palette.augmentColor(color);
  palette.augmentColor(color, 400);
  palette.augmentColor(color, 400, 200, 600);
  palette.augmentColor(color, 400, undefined, 600);
  palette.augmentColor(option);
  // @ts-expect-error
  palette.augmentColor(option, 400);
  palette.augmentColor(colorOrOption);
  // @ts-expect-error
  palette.augmentColor(colorOrOption, 400);
  const augmentedColor = palette.augmentColor(colorOrOption);
}

{
  const themeCommons: Theme['palette']['common'] = common;
}
