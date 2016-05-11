import React, {PropTypes} from 'react';

const propTypes = {
  /**
   * Node that will be placed inside the `Subheader`.
   */
  children: PropTypes.node,
  /**
   * If true, the `Subheader` will be indented by `72px`.
   */
  inset: PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
};

const defaultProps = {
  inset: false,
};

const contextTypes = {
  muiTheme: PropTypes.object.isRequired,
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
