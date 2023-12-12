import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

function isEmpty(obj) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

const GlobalStyles = createGlobalStyle((props) => {
  const { styles, defaultTheme = {} } = props;

  if (typeof styles === 'function') {
    return styles(isEmpty(props.theme) ? defaultTheme : props.theme);
  }

  return styles;
});

export default GlobalStyles;

GlobalStyles.propTypes = {
  defaultTheme: PropTypes.object,
  styles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
};
