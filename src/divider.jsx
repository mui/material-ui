import React from 'react';
import muiThemeable from './muiThemeable';
import styleUtils from './utils/styles';

const propTypes = {
  /**
   * The MUI Theme to use to render this component with.
   */
  _muiTheme: React.PropTypes.object.isRequired,

  /**
   * CSS class that will be added to the divider's root element
   */
  className: React.PropTypes.string,

  /**
   * If true, the divider will be indented 72px
   */
  inset: React.PropTypes.bool,

  /**
   * Override the inline-styles of the list divider's root element
   */
  style: React.PropTypes.object,
};

const defaultProps = {
  inset: false,
};

let Divider = ({inset, _muiTheme, style, ...other}) => {
  const styles = {
    root: {
      margin: 0,
      marginTop: -1,
      marginLeft: inset ? 72 : 0,
      height: 1,
      border: 'none',
      backgroundColor: _muiTheme.baseTheme.palette.borderColor,
    },
  };

  return (
    <hr {...other} style={styleUtils.prepareStyles(_muiTheme, styles.root, style)} />
  );
};

Divider.displayName = 'Divider';
Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;
Divider = muiThemeable(Divider);

export default Divider;
