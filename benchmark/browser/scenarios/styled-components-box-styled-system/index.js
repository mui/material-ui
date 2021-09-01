import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import styledComponents, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import { space, color, fontFamily, fontSize, compose } from 'styled-system';

const styledSystem = compose(color, space, fontFamily, fontSize);
const BoxStyledSystem = styledComponents('div')(styledSystem);

const styledSystemTheme = createTheme();
styledSystemTheme.breakpoints = ['40em', '52em', '64em'];
styledSystemTheme.colors = styledSystemTheme.palette;
styledSystemTheme.fontSizes = styledSystemTheme.typography;
styledSystemTheme.fonts = styledSystemTheme.typography;

export default function StyledComponentsBoxStyledSystem() {
  return (
    <StyledComponentsThemeProvider theme={styledSystemTheme}>
      {new Array(1000).fill().map(() => (
        <BoxStyledSystem
          color="primary.main"
          bg="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
          p={[2, 3, 4]}
        >
          styled-system
        </BoxStyledSystem>
      ))}
    </StyledComponentsThemeProvider>
  );
}
