import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider, useTheme as muiUseTheme } from '@mui/private-theming';
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
 *
 * <ThemeProvider theme={theme} identifier="id"> // existing use case
 * <ThemeProvider theme={{ id: theme }} identifier="id"> // theme scoping
 */
function ThemeProvider(props) {
  const { children, theme: localTheme, identifier } = props;
  const upperTheme = muiUseTheme(); // user's provided theme or `null`.

  const theme = React.useMemo(() => {
    let resolvedTheme = {};
    if (upperTheme) {
      resolvedTheme = identifier ? upperTheme[identifier] || upperTheme : upperTheme;
    }

    if (typeof localTheme === 'function') {
      const mergedTheme = localTheme(resolvedTheme);
      return () =>
        identifier ? { ...(upperTheme || {}), [identifier]: mergedTheme } : mergedTheme;
    }
    return identifier
      ? { ...(upperTheme || {}), [identifier]: localTheme }
      : { ...(upperTheme || {}), ...localTheme };
  }, [identifier, upperTheme, localTheme]);
  return (
    <MuiThemeProvider theme={theme}>
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
