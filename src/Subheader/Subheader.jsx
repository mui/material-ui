import React from 'react';
import muiThemeable from './../muiThemeable';

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
   * @ignore
   * The material-ui theme applied to this component.
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

let Subheader = (props) => {
  const {
    muiTheme,
    children,
    inset,
    style,
    ...other,
  } = props;

  const {
    prepareStyles,
    subheader,
  } = muiTheme;

  const styles = {
    root: {
      boxSizing: 'border-box',
      color: subheader.color,
      fontSize: 14,
      fontWeight: subheader.fontWeight,
      lineHeight: '48px',
      paddingLeft: inset ? 72 : 16,
      width: '100%',
    },
  };

  return (
    <div {...other} style={prepareStyles(Object.assign({}, styles.root, style))}>
      {children}
    </div>
  );
};

Subheader.propTypes = propTypes;
Subheader.defaultProps = defaultProps;

Subheader = muiThemeable()(Subheader);
Subheader.displayName = 'Subheader';

export default Subheader;
