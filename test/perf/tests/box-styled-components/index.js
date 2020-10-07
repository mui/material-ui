import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { styleFunction } from '@material-ui/core/Box';
import styledComponents, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';

const materialSystemTheme = createMuiTheme();
const BoxStyleComponents = styledComponents('div')(styleFunction);

const App = () => {
  return (
    <>
      {new Array(100).fill().map(() => (
        <StyledComponentsThemeProvider theme={materialSystemTheme}>
          <BoxStyleComponents
            color="primary.main"
            bgcolor="background.paper"
            fontFamily="h6.fontFamily"
            fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
            p={[2, 3, 4]}
            fuu={Math.round(Math.random() * 10000)}
          >
            styled-components
          </BoxStyleComponents>
        </StyledComponentsThemeProvider>
      ))}
    </>        
  );
}

export default App;
