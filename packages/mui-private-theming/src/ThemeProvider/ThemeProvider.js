import * as React from 'react';
import PropTypes from 'prop-types';
import { exactProp } from '@mui/utils';
import ThemeContext from '../useTheme/ThemeContext';
import useTheme from '../useTheme';
import nested from './nested';

// To support composition of theme.
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === 'function') {
    const mergedTheme = localTheme(outerTheme);

    if (process.env.NODE_ENV !== 'production') {
      if (!mergedTheme) {
        console.error(
          [
            'MUI: You should return an object from your theme function, i.e.',
            '<ThemeProvider theme={() => ({})} />',
          ].join('\n'),
        );
      }
    }

    return mergedTheme;
  }

  return { ...outerTheme, ...localTheme };
}

/**
 * This component takes a `theme` prop.
 * It makes the `theme` available down the React tree thanks to React context.
 * This component should preferably be used at **the root of your component tree**.
 */
function ThemeProvider(props) {
  const { children, theme: localTheme, identifier, enableThemeScope } = props;
  const outerTheme = useTheme();

  if (process.env.NODE_ENV !== 'production') {
    if (outerTheme === null && typeof localTheme === 'function') {
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

  const theme = React.useMemo(() => {
    let internalTheme = localTheme;
    if (identifier && typeof localTheme !== 'function') {
      internalTheme = localTheme[identifier] || localTheme;
    }
    const output =
      outerTheme === null ? internalTheme : mergeOuterLocalTheme(outerTheme, internalTheme);

    if (output != null) {
      output[nested] = outerTheme !== null;
    }

    return enableThemeScope ? { ...(outerTheme || {}), [identifier]: output } : output;
  }, [localTheme, outerTheme, identifier, enableThemeScope]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
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
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  ThemeProvider.propTypes = exactProp(ThemeProvider.propTypes);
}

export default ThemeProvider;
