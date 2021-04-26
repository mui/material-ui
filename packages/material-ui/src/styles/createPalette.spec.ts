import { Color } from '@material-ui/core';
import { blue, common } from '@material-ui/core/colors';
import { createTheme, Theme } from '@material-ui/core/styles';

{
  const palette = createTheme().palette;
  const color: Color = blue;
  const option = { color: { main: blue[400] } };

  palette.augmentColor({ color });
  palette.augmentColor({ color, lightShade: 400 });
  palette.augmentColor({ color, lightShade: 400, mainShade: 200, darkShade: 600 });
  palette.augmentColor({ color, lightShade: 400, mainShade: 600 });
  palette.augmentColor(option);
  // @ts-expect-error
  palette.augmentColor(option, 400);
}

{
  const themeCommons: Theme['palette']['common'] = common;
}
