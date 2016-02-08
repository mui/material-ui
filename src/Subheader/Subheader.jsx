import React from 'react';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import memoizeStyles from '../utils/memoizeStyles';
import muiThemeable from '../muiThemeable';

const propTypes = {
  /**
   * Node that will be placed inside the `Subheader`.
   */
  children: React.PropTypes.node,

  /**
   * If true, the `Subheader` will be indented by `72px`.
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
      boxSizing: 'border-box',
      color: muiTheme.subheader.color,
      fontSize: 14,
      fontWeight: muiTheme.subheader.fontWeight,
      lineHeight: '48px',
      paddingLeft: inset ? 72 : 16,
      width: '100%',
    }, style)),
  ],
};

let Subheader = (props) => {
  const {
    children,
    style,
    ...other,
  } = props;

  return (
    <div {...other} style={style}>
      {children}
    </div>
  );
};

Subheader = compose(
  muiThemeable(),
  pure(),
  memoizeStyles(styles),
)(Subheader);

Subheader.displayName = 'Subheader';
Subheader.propTypes = propTypes;
Subheader.defaultProps = defaultProps;

export default Subheader;
