import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@mui/private-theming';
import { exactProp } from '@mui/utils';
import { ThemeContext as StyledEngineThemeContext, GlobalStyles } from '@mui/styled-engine';
import ModeProvider, { useModeToggle } from './ModeProvider';
import { generateSchemeVars, generateCssVars } from './cssVars';

function CssVarsContent({ ...props }) {
  const { mode } = useModeToggle();
  const { children, theme, paletteSchemes, alias } = props;

  const {
    theme: finalTheme,
    rootCssVars,
    schemeCssVars,
    aliasCssVars,
  } = generateCssVars({ theme, currentScheme: mode, paletteSchemes, alias });

  console.log('finalTheme', finalTheme);

  return (
    <MuiThemeProvider theme={finalTheme}>
      <StyledEngineThemeContext.Provider value={finalTheme}>
        <GlobalStyles styles={{ ':root': rootCssVars }} />
        <GlobalStyles styles={generateSchemeVars(schemeCssVars)} />
        <GlobalStyles styles={generateSchemeVars(aliasCssVars)} />
        {children}
      </StyledEngineThemeContext.Provider>
    </MuiThemeProvider>
  );
}

/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 */
function CssVarsProvider({ children, initialMode, ...props }) {
  return (
    <ModeProvider initialMode={initialMode}>
      <CssVarsContent {...props}>{children}</CssVarsContent>
    </ModeProvider>
  );
}

CssVarsProvider.propTypes = {
  alias: PropTypes.object.isRequired,
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  initialMode: PropTypes.string,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  CssVarsProvider.propTypes = exactProp(CssVarsProvider.propTypes);
}

export default CssVarsProvider;
