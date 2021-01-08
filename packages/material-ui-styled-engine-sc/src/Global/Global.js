import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const Global = createGlobalStyle((props) => {
  const { styles, defaultTheme } = props;

  if (typeof styles === 'function') {
    return styles(isEmpty(props.theme) ? defaultTheme : props.theme);
  }

  return styles;
});

export default Global;

Global.propTypes = {
  defaultTheme: PropTypes.object,
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
};
