
import React from 'react';
import { ThemeProvider as StylesThemeProvider } from '@material-ui/styles';
import BoxStyles from '@material-ui/core/Box';

const materialSystemTheme = createMuiTheme();

const App = () => {
  return (
    <StylesThemeProvider theme={materialSystemTheme}>
      <BoxStyles
        color="primary.main"
        bgcolor="background.paper"
        fontFamily="h6.fontFamily"
        fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
        p={[2, 3, 4]}
        fuu={Math.round(Math.random() * 10000)}
      >
        @material-ui/styles
      </BoxStyles>
    </StylesThemeProvider>
  );
}

export default App;
