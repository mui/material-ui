import { createMuiTheme } from '@material-ui/core/styles';

function getTheme(uiTheme) {
  const theme = createMuiTheme({
    direction: uiTheme.direction,
    nprogress: {
      color: uiTheme.paletteType === 'light' ? '#000' : '#fff',
    },
    palette: {
      ...uiTheme.paletteColors,
      type: uiTheme.paletteType,
      background: {
        default: uiTheme.paletteType === 'light' ? '#fff' : '#303030',
      },
    },
  });

  theme.palette.background.level1 =
    uiTheme.paletteType === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];

  theme.palette.background.level0 =
    uiTheme.paletteType === 'light' ? theme.palette.grey[50] : theme.palette.grey[900];

  // Expose the theme as a global variable so people can play with it.
  if (process.browser) {
    window.theme = theme;
  }

  return theme;
}

export default getTheme;
