import * as React from 'react';
import PropTypes from 'prop-types';
import { deepmerge } from '@mui/utils';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';

export default function BrandingProvider({ children }) {
  const upperTheme = useTheme();
  const theme = React.useMemo(() => {
    let designTokens = getDesignTokens(upperTheme.palette.mode);
    designTokens = deepmerge(designTokens, {
      palette: { primary: upperTheme.palette.primary, secondary: upperTheme.palette.secondary },
      spacing: upperTheme.spacing,
    });
    let newTheme = createTheme(designTokens);
    newTheme = deepmerge(newTheme, getThemedComponents(newTheme));
    return deepmerge(newTheme, { components: upperTheme.components });
  }, [upperTheme]);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

BrandingProvider.propTypes = {
  children: PropTypes.node,
};
