import React from 'react';

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

const contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

const Subheader = (props, context) => {
  const {
    children,
    inset,
    style,
    ...other,
  } = props;

  const {prepareStyles, subheader} = context.muiTheme;

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

Subheader.muiName = 'Subheader';
Subheader.propTypes = propTypes;
Subheader.defaultProps = defaultProps;
Subheader.contextTypes = contextTypes;

export default Subheader;
