import { createMuiTheme } from '@material-ui/core/styles';

function getTheme(uiTheme) {
  const theme = createMuiTheme({
    direction: uiTheme.direction,
    nprogress: { color: uiTheme.paletteType === 'light' ? '#000' : '#fff' },
    palette: { ...uiTheme.paletteColors, type: uiTheme.paletteType },
  });

  // Expose the theme as a global variable so people can play with it.
  if (process.browser) {
    window.theme = theme;
  }

  return theme;
}

export default getTheme;
