import React, {PropTypes} from 'react';

const propTypes = {
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If true, the `Divider` will be indented `72px`.
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

const Divider = (props, context) => {
  const {
    inset,
    style,
    ...other,
  } = props;

  const {muiTheme} = context;
  const {prepareStyles} = muiTheme;

  const styles = {
    root: {
      margin: 0,
      marginTop: -1,
      marginLeft: inset ? 72 : 0,
      height: 1,
      border: 'none',
      backgroundColor: muiTheme.baseTheme.palette.borderColor,
    },
  };

  return (
    <hr {...other} style={prepareStyles(Object.assign({}, styles.root, style))} />
  );
};

Divider.muiName = 'Divider';
Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;
Divider.contextTypes = contextTypes;

export default Divider;
