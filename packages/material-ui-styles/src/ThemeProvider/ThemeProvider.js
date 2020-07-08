import React from 'react';
import PropTypes from 'prop-types';
import { exactProp } from '@material-ui/utils';
import ThemeContext from '../useTheme/ThemeContext';
import useTheme from '../useTheme';
import nested from './nested';

export function isPlainObject(item) {
  return item && typeof item === 'object' && item.constructor === Object;
}

export function mergeThemes(target, source, options = { clone: true }) {
  const output = options.clone ? { ...target } : target;

  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isPlainObject(source[key]) && key in target) {
        output[key] = mergeThemes(target[key], source[key], options);
      } else if(Array.isArray(source[key]) && key in target && Array.isArray(target[key]) && key.substring(0, 3) === 'Mui') {
        output[key] = [...target[key], ...source[key]];
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
}

// To support composition of theme.
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === 'function') {
    const mergedTheme = localTheme(outerTheme);

    if (process.env.NODE_ENV !== 'production') {
      if (!mergedTheme) {
        console.error(
          [
            'Material-UI: You should return an object from your theme function, i.e.',
            '<ThemeProvider theme={() => ({})} />',
          ].join('\n'),
        );
      }
    }

    return mergedTheme;
  }

  return mergeThemes(outerTheme, localTheme);
}

/**
 * This component takes a `theme` prop.
 * It makes the `theme` available down the React tree thanks to React context.
 * This component should preferably be used at **the root of your component tree**.
 */
function ThemeProvider(props) {
  const { children, theme: localTheme } = props;
  const outerTheme = useTheme();

  if (process.env.NODE_ENV !== 'production') {
    if (outerTheme === null && typeof localTheme === 'function') {
      console.error(
        [
          'Material-UI: You are providing a theme function prop to the ThemeProvider component:',
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
    const output = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);

    if (output != null) {
      output[nested] = outerTheme !== null;
    }

    return output;
  }, [localTheme, outerTheme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
  /**
   * Your component tree.
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
