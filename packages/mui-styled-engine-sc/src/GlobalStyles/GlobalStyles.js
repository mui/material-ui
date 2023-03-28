import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

function isEmpty(obj) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

const GlobalStyles = createGlobalStyle((props) => {
  const { styles, defaultTheme = {}, identifier } = props;

  if (typeof styles === 'function') {
    const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
    return styles(identifier ? theme[identifier] || theme : theme);
  }

  return styles;
});

export default GlobalStyles;

GlobalStyles.propTypes = {
  defaultTheme: PropTypes.object,
  identifier: PropTypes.string,
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
};
