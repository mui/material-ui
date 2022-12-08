import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import styledComponents, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import { spacing, palette, typography, compose } from '@mui/system';

const materialSystem = compose(palette, spacing, typography);
const materialSystemTheme = createTheme();
const BoxMaterialSystem = styledComponents('div')(materialSystem);

export default function StyledComponentsBoxMaterialUISystem() {
  return (
    <StyledComponentsThemeProvider theme={materialSystemTheme}>
      {new Array(1000).fill().map(() => (
        <BoxMaterialSystem
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
          p={[2, 3, 4]}
        >
          @mui/system
        </BoxMaterialSystem>
      ))}
    </StyledComponentsThemeProvider>
  );
}
