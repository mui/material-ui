import React, {PropTypes} from 'react';
import {mixout, remix, muiMixout} from '../utils/muiMixout';

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
  /**
   * @ignore
   */
  muiTheme: PropTypes.object,
};

const defaultProps = {
  inset: false,
};

let Subheader = (props) => {
  const {
    children,
    inset,
    style,
    muiTheme: {prepareStyles, subheader},
    ...other,
  } = props;

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

Subheader = mixout(muiMixout)(remix('Subheader', Subheader));
Subheader.propTypes = propTypes;
Subheader.defaultProps = defaultProps;

export default Subheader;
