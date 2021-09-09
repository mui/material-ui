import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@mui/private-theming';
import { exactProp } from '@mui/utils';
import { ThemeContext as StyledEngineThemeContext, GlobalStyles } from '@mui/styled-engine';
import ModeProvider, { useModeToggle } from './ModeProvider';
import { makeCssVarsTheme, generateGlobalVars } from './cssVars';

function CssVarsContent({ ...props }) {
  const { defaultTheme, mode } = useModeToggle();
  const { children, theme: themeInput, alias } = props;
  const { theme, tokenThemeVars, aliasThemeVars } = makeCssVarsTheme(themeInput, { alias });
  const globalTokens = generateGlobalVars(tokenThemeVars);
  const globalAlias = generateGlobalVars(aliasThemeVars);
  const finalTheme = { ...theme, ...theme[mode || defaultTheme] };
  return (
    <MuiThemeProvider theme={finalTheme}>
      <StyledEngineThemeContext.Provider value={finalTheme}>
        <GlobalStyles
          styles={{
            body: {
              margin: 0,
              padding: 0,
            },
          }}
        />
        <GlobalStyles styles={globalTokens} />
        <GlobalStyles styles={globalAlias} />
        {children}
      </StyledEngineThemeContext.Provider>
    </MuiThemeProvider>
  );
}

/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 */
function CssVarsProvider({ children, initialMode, defaultTheme, ...props }) {
  return (
    <ModeProvider initialMode={initialMode} defaultTheme={defaultTheme}>
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
  defaultTheme: PropTypes.string,
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
