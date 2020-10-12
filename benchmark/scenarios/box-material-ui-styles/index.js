import * as React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as StylesThemeProvider } from '@material-ui/styles';
import BoxStyles from '@material-ui/core/Box';
import { logReactMetrics } from '../utils';

const materialSystemTheme = createMuiTheme();

export default function BoxMaterialUIStyles() {
  return (
    <React.Profiler id="box-material-ui-system" onRender={logReactMetrics}>
      {new Array(1000).fill().map(() => (
        <StylesThemeProvider theme={materialSystemTheme}>
          <BoxStyles
            color="primary.main"
            bgcolor="background.paper"
            fontFamily="h6.fontFamily"
            fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
            p={[2, 3, 4]}
          >
            @material-ui/styles
          </BoxStyles>
        </StylesThemeProvider>
      ))}
    </React.Profiler>
  );
}
