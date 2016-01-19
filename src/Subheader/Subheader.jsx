import React from 'react';
import muiThemeable from './../muiThemeable';
import {mergeStyles, prepareStyles} from './../utils/styles';
import Typography from '../styles/typography';

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

  const styles = {
    root: {
      boxSizing: 'border-box',
      color: Typography.textLightBlack,
      fontSize: 14,
      fontWeight: Typography.fontWeightMedium,
      lineHeight: '48px',
      paddingLeft: inset ? 72 : 16,
      width: '100%',
    },
  };

  return (
    <div {...other} style={prepareStyles(muiTheme, mergeStyles(styles.root, style))}>
      {children}
    </div>
  );
};

Subheader.displayName = 'Subheader';
Subheader.propTypes = propTypes;
Subheader.defaultProps = defaultProps;
Subheader = muiThemeable(Subheader);

export default Subheader;
