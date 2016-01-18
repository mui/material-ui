import React from 'react';
import muiThemeable from './../muiThemeable';
import {mergeStyles, prepareStyles} from './../utils/styles';
import Typography from '../styles/typography';

const propTypes = {
  /**
   * Node that will be in subheader.
   */
  children: React.PropTypes.node,

  /**
   * If true, the subheader will be indented 72px
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

let Subheader = ({children, muiTheme, inset, style, ...other}) => {
  const styles = {
    root: {
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
