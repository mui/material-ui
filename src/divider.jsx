import React from 'react';
import muiThemeable from './muiThemeable';

const propTypes = {
  /**
   * The css class name of the root element.
   */
  className: React.PropTypes.string,

  /**
   * If true, the `Divider` will be indented `72px`.
   */
  inset: React.PropTypes.bool,

  /**
   * The material-ui theme applied to this component.
   * @ignore
   */
  muiTheme: React.PropTypes.object.isRequired,

  /**
   * Override the inline-styles of the root element.
   */
  style: React.PropTypes.object,
};

const defaultProps = {
  inset: false,
};

let Divider = (props) => {
  const {
    inset,
    muiTheme,
    style,
    ...other,
  } = props;

  const {
    prepareStyles,
  } = muiTheme;

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
    <hr {...other} style={prepareStyles(Object.assign({}, styles.root, style))} />
  );
};

Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;

Divider = muiThemeable()(Divider);
Divider.displayName = 'Divider';

export default Divider;
