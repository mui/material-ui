import PropTypes from 'prop-types';
import { deepmerge } from '@material-ui/utils';
import { createGlobalStyles } from 'goober/global';

function isEmpty(obj) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

const GlobalStyles = createGlobalStyles((props) => {
  const { styles, defaultTheme = {} } = props;

  if (typeof styles === 'function') {
    const globalStyles = styles(isEmpty(props.theme) ? defaultTheme : props.theme);
    const mergeStyles = Array.isArray(globalStyles)
      ? globalStyles.reduce((acc, item) => deepmerge(acc, item), {})
      : globalStyles;

    return mergeStyles;
  }

  return styles;
});

GlobalStyles.propTypes = {
  defaultTheme: PropTypes.object,
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
};

export default GlobalStyles;
