import React from 'react';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';
import styleUtils from './utils/styles';

const propTypes = {
  /**
   * CSS class that will be added to the divider's root element
   */
  className: React.PropTypes.string,

  /**
   * If true, the divider will be indented 72px
   */
  inset: React.PropTypes.bool,

  /**
   * Override the inline-styles of the list divider's root element
   */
  style: React.PropTypes.object,
};

const contextTypes = {
  muiTheme: React.PropTypes.object,
};

const childContextTypes = {
  muiTheme: React.PropTypes.object,
};

const defaultProps = {
  inset: false,
};

const Divider = ({inset, style, ...other}, {muiTheme = ThemeManager.getMuiTheme(DefaultRawTheme)}) => {
  const styles = {
    root: {
      margin: 0,
      marginTop: -1,
      marginLeft: inset ? 72 : 0,
      height: 1,
      border: 'none',
      backgroundColor: muiTheme.rawTheme.palette.borderColor,
    },
  };

  return (
    <hr {...other} style={styleUtils.prepareStyles(muiTheme, styles.root, style)} />
  );
};

Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;
Divider.contextTypes = contextTypes;
Divider.childContextTypes = childContextTypes;

export default Divider;
