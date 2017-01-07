import React, {PropTypes} from 'react';

const Subheader = (props, context) => {
  const {
    children,
    desktop, // eslint-disable-line no-unused-vars
    focusState, // eslint-disable-line no-unused-vars
    inset,
    style,
    ...other
  } = props;

  const {
    prepareStyles,
    subheader,
  } = context.muiTheme;

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
    <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
      {children}
    </div>
  );
};

Subheader.muiName = 'Subheader';

Subheader.propTypes = {
  /**
   * Node that will be placed inside the `Subheader`.
   */
  children: PropTypes.node,
  /**
   * @ignore
   * If true, the menu item will render with compact desktop
   * styles.
   */
  desktop: PropTypes.bool,
  /**
   * @ignore
   * The focus state of the menu item. This prop is used to set the focus
   * state of the underlying `ListItem`.
   */
  focusState: PropTypes.oneOf([
    'none',
    'focused',
    'keyboard-focused',
  ]),
  /**
   * If true, the `Subheader` will be indented.
   */
  inset: PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
};

Subheader.defaultProps = {
  inset: false,
};

Subheader.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default Subheader;
