import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { exactProp } from '@material-ui/utils';
import ThemeContext from '../useTheme/ThemeContext';
import useTheme from '../useTheme';
import nested from './nested';

// To support composition of theme.
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === 'function') {
    const mergedTheme = localTheme(outerTheme);

    warning(
      mergedTheme,
      [
        'Material-UI: you should return an object from your theme function, i.e.',
        '<ThemeProvider theme={() => ({})} />',
      ].join('\n'),
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
  const outerTheme = useTheme();

  warning(
    outerTheme !== null || typeof localTheme !== 'function',
    [
      'Material-UI: you are providing a theme function property ' +
        'to the ThemeProvider component:',
      '<ThemeProvider theme={outerTheme => outerTheme} />',
      '',
      'However, no outer theme is present.',
      'Make sure a theme is already injected higher in the React tree ' +
        'or provide a theme object.',
    ].join('\n'),
  );

  const theme = React.useMemo(() => {
    const output = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);

    if (outerTheme !== null && output) {
      output[nested] = true;
    }

    return output;
  }, [localTheme, outerTheme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
  /**
   * Your component tree
   */
  children: PropTypes.node.isRequired,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  ThemeProvider.propTypes = exactProp(ThemeProvider.propTypes);
}

export default ThemeProvider;
