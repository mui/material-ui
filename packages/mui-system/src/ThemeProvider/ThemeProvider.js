import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@mui/private-theming';
import { exactProp } from '@mui/utils';
import { ThemeContext as StyledEngineThemeContext } from '@mui/styled-engine';
import useTheme from '../useTheme';

const EMPTY_THEME = {};

function InnerThemeProvider(props) {
  const theme = useTheme();
  return (
    <StyledEngineThemeContext.Provider value={typeof theme === 'object' ? theme : EMPTY_THEME}>
      {props.children}
    </StyledEngineThemeContext.Provider>
  );
}

InnerThemeProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
};

/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 */
function ThemeProvider(props) {
  const { children, theme: localTheme, identifier, enableThemeScope } = props;

  return (
    <MuiThemeProvider
      theme={localTheme}
      identifier={identifier}
      enableThemeScope={enableThemeScope}
    >
      <InnerThemeProvider>{children}</InnerThemeProvider>
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * If `true`, the theme scope is created to prevent conflict with other libraries's theme
   * that use emotion or styled-components
   */
  enableThemeScope: PropTypes.bool,
  /**
   * The design system's unique id for getting the corresponded theme when there are multiple design systems.
   */
  identifier: PropTypes.string,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  ThemeProvider.propTypes = exactProp(ThemeProvider.propTypes);
}

export default ThemeProvider;
