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
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 0,
      height: 1,            
      borderBottom: '1px solid ' + muiTheme.baseTheme.palette.lightBackground,
      borderTop: '1px solid ' + muiTheme.baseTheme.palette.borderColor,
      borderLeft: 0,
      borderRight: 0,

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
