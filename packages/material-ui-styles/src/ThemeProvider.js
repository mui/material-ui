import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { exactProp } from '@material-ui/utils';
import ThemeContext from './ThemeContext';

// To support composition of theme.
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === 'function') {
    warning(
      outerTheme,
      [
        'Material-UI: you are providing a theme function property ' +
          'to the ThemeProvider component:',
        '<ThemeProvider theme={outerTheme => outerTheme} />',
        'However, no outer theme is present.',
        'Make sure a theme is already injected higher in the React tree ' +
          'or provide a theme object.',
      ].join('\n'),
    );

    const mergedTheme = localTheme(outerTheme);

    warning(
      mergedTheme,
      'Material-UI: return an object from your theme function, i.e. theme={() => ({})}!',
    );

    return mergedTheme;
  }

  return { ...outerTheme, ...localTheme };
}

/**
 * This component takes a `theme` property.
 * It makes the `theme` available down the React tree thanks to React context.
 * This component should preferably be used at **the root of your component tree**.
 */
function ThemeProvider(props) {
  const { children, theme: localTheme } = props;

  return (
    <ThemeContext.Consumer>
      {outerTheme => {
        const theme =
          outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);

        return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
      }}
    </ThemeContext.Consumer>
  );
}

ThemeProvider.propTypes = {
  /**
   * You can wrap a node.
   */
  children: PropTypes.node.isRequired,
  /**
   * A theme object.
   */
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  ThemeProvider.propTypes = exactProp(ThemeProvider.propTypes);
}

export default ThemeProvider;
