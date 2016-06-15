import React, {PropTypes} from 'react';
import {mixout, remix, muiMixout} from '../utils/muiMixout';

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
  /**
   * @ignore
   */
  muiTheme: PropTypes.object,
};

const defaultProps = {
  inset: false,
};

let Divider = (props) => {
  const {
    inset,
    style,
    muiTheme,
    muiTheme: {prepareStyles},
    ...other,
  } = props;

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

Divider = mixout(muiMixout)(remix('Divider', Divider));
Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;

export default Divider;
