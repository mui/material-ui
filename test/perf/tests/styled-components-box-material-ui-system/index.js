import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import styledComponents, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import { spacing, palette, typography, compose } from '@material-ui/system';

const materialSystem = compose(palette, spacing, typography);
const materialSystemTheme = createMuiTheme();
const BoxMaterialSystem = styledComponents('div')(materialSystem);

const App = () => {
  return (
    <>
      {new Array(100).fill().map(() => (
        <StyledComponentsThemeProvider theme={materialSystemTheme}>
          <BoxMaterialSystem
            color="primary.main"
            bgcolor="background.paper"
            fontFamily="h6.fontFamily"
            fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
            p={[2, 3, 4]}
          >
            @material-ui/system
          </BoxMaterialSystem>
        </StyledComponentsThemeProvider>
      ))}
    </>            
  );
}

export default App;

