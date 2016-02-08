import React from 'react';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import memoizeStyles from './utils/memoizeStyles';
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
   * Override the inline-styles of the root element.
   */
  style: React.PropTypes.object,
};

const defaultProps = {
  inset: false,
};

const styles = {
  style: [
    (props) => props.inset,
    (props) => props.style,
    (props) => props.muiTheme,
    (inset, style, muiTheme) => muiTheme.prepareStyles(Object.assign({
      margin: 0,
      marginTop: -1,
      marginLeft: inset ? 72 : 0,
      height: 1,
      border: 'none',
      backgroundColor: muiTheme.baseTheme.palette.borderColor,
    }, style)),
  ],
};

let Divider = (props) => {
  const {
    className,
    style,
    ...other,
  } = props;

  return (
    <hr {...other} className={className} style={style} />
  );
};

Divider = compose(
  muiThemeable(),
  pure(),
  memoizeStyles(styles),
)(Divider);

Divider.displayName = 'Divider';
Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;

export default Divider;
