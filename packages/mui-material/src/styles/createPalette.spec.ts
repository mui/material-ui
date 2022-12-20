import { Color } from '@mui/material';
import { blue, common } from '@mui/material/colors';
import { createTheme, Theme } from '@mui/material/styles';

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
  const themeCommons: Pick<Theme['palette']['common'], 'black' | 'white'> = common;
}
