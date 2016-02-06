import React from 'react';
import muiThemeable from './../muiThemeable';
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
   * @ignore
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

  const {
    prepareStyles,
    subheader,
  } = muiTheme;

  const styles = {
    root: {
      boxSizing: 'border-box',
      color: subheader.color,
      fontSize: 14,
      fontWeight: Typography.fontWeightMedium,
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

Subheader.displayName = 'Subheader';
Subheader.propTypes = propTypes;
Subheader.defaultProps = defaultProps;
Subheader = muiThemeable(Subheader);

export default Subheader;
