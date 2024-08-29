'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider as MuiThemeProvider,
  useTheme as usePrivateTheme,
} from '@mui/private-theming';
import exactProp from '@mui/utils/exactProp';
import { ThemeContext as StyledEngineThemeContext } from '@mui/styled-engine';
import useThemeWithoutDefault from '../useThemeWithoutDefault';
import RtlProvider from '../RtlProvider';
import DefaultPropsProvider from '../DefaultPropsProvider';

const EMPTY_THEME = {};

function useThemeScoping(themeId, upperTheme, localTheme, isPrivate = false) {
  return React.useMemo(() => {
    const resolvedTheme = themeId ? upperTheme[themeId] || upperTheme : upperTheme;

    if (typeof localTheme === 'function') {
      const mergedTheme = localTheme(resolvedTheme);
      const result = themeId ? { ...upperTheme, [themeId]: mergedTheme } : mergedTheme;
      // must return a function for the private theme to NOT merge with the upper theme.
      // see the test case "use provided theme from a callback" in ThemeProvider.test.js
      if (isPrivate) {
        return () => result;
      }
      return result;
    }
    return themeId ? { ...upperTheme, [themeId]: localTheme } : { ...upperTheme, ...localTheme };
  }, [themeId, upperTheme, localTheme, isPrivate]);
}

/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 *
 * <ThemeProvider theme={theme}> // existing use case
 * <ThemeProvider theme={{ id: theme }}> // theme scoping
 */
function ThemeProvider(props) {
  const { children, theme: localTheme, themeId } = props;
  const upperTheme = useThemeWithoutDefault(EMPTY_THEME);
  const upperPrivateTheme = usePrivateTheme() || EMPTY_THEME;

  if (process.env.NODE_ENV !== 'production') {
    if (
      (upperTheme === null && typeof localTheme === 'function') ||
      (themeId && upperTheme && !upperTheme[themeId] && typeof localTheme === 'function')
    ) {
      console.error(
        [
          'MUI: You are providing a theme function prop to the ThemeProvider component:',
          '<ThemeProvider theme={outerTheme => outerTheme} />',
          '',
          'However, no outer theme is present.',
          'Make sure a theme is already injected higher in the React tree ' +
            'or provide a theme object.',
        ].join('\n'),
      );
    }
  }

  const engineTheme = useThemeScoping(themeId, upperTheme, localTheme);
  const privateTheme = useThemeScoping(themeId, upperPrivateTheme, localTheme, true);
  const rtlValue = engineTheme.direction === 'rtl';

  return (
    <MuiThemeProvider theme={privateTheme}>
      <StyledEngineThemeContext.Provider value={engineTheme}>
        <RtlProvider value={rtlValue}>
          <DefaultPropsProvider value={engineTheme?.components}>{children}</DefaultPropsProvider>
        </RtlProvider>
      </StyledEngineThemeContext.Provider>
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  /**
   * The design system's unique id for getting the corresponded theme when there are multiple design systems.
   */
  themeId: PropTypes.string,
};

if (process.env.NODE_ENV !== 'production') {
  ThemeProvider.propTypes = exactProp(ThemeProvider.propTypes);
}

export default ThemeProvider;
