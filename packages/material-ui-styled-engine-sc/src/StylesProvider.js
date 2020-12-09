import PropTypes from 'prop-types';

// Dumb component that does nothin, but complies with the API exported from @material-ui/styled-engine
export function StylesProvider({ chlidren }) {
  return chlidren;
}

StylesProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * By default, the styles are injected last in the <head> element of the page.
   * As a result, they gain more specificity than any other style sheet.
   * If you want to override Material-UI's styles, set this prop.
   */
  injectFirst: PropTypes.bool,
};

export default StylesProvider;