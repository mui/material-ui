import React, {PropTypes} from 'react';

const Subheader = (props, context) => {
  const {
    children,
    inset,
    style,
    ...other
  } = props;

  const {
    prepareInline,
    theme,
  } = context.styleManager;

  const styles = {
    root: {
      boxSizing: 'border-box',
      color: theme.palette.text.primary,
      fontSize: 14,
      fontWeight: theme.typography.fontWeightMedium,
      lineHeight: '48px',
      paddingLeft: inset ? 72 : 16,
      width: '100%',
    },
  };

  return (
    <div {...other} style={prepareInline(Object.assign(styles.root, style))}>
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
  styleManager: PropTypes.object.isRequired,
};

export default Subheader;
