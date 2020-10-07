import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import styledComponents, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';

const materialSystemTheme = createMuiTheme();
const NakedStyleComponents = styledComponents('div')(spacing);

const App = () => {
  return (
    <>
      {new Array(100).fill().map(() => (
        <StyledComponentsThemeProvider theme={materialSystemTheme}>
          <NakedStyleComponents
            color="primary.main"
            bgcolor="background.paper"
            fontFamily="h6.fontFamily"
            fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
            p={[2, 3, 4]}
            fuu={Math.round(Math.random() * 10000)}
          >
            styled-components
          </NakedStyleComponents>
        </StyledComponentsThemeProvider>
      ))}
    </>          
  );
}

export default App;
