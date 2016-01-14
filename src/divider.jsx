import React from 'react';
import muiThemeable from './muiThemeable';
import {mergeStyles, prepareStyles} from './utils/styles';

const propTypes = {
  /**
   * CSS class that will be added to the divider's root element
   */
  className: React.PropTypes.string,

  /**
   * If true, the divider will be indented 72px
   */
  inset: React.PropTypes.bool,

  /**
   * Override the inline-styles of the root element.
   */
  style: React.PropTypes.object,
};

const defaultProps = {
  inset: false,
};

let Divider = ({inset, muiTheme, style, ...other}) => {
  const styles = {
    root: {
      margin: 0,
      marginTop: -1,
      marginLeft: inset ? 72 : 0,
      height: 1,
      border: 'none',
      backgroundColor: muiTheme.rawTheme.palette.borderColor,
    },
  };

  return (
    <hr {...other} style={prepareStyles(muiTheme, mergeStyles(styles.root, style))} />
  );
};

Divider.displayName = 'Divider';
Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;
Divider = muiThemeable(Divider);

export default Divider;
