import React from 'react';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const Tab = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    label: React.PropTypes.node,
    onActive: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
    style: React.PropTypes.object,
    value: React.PropTypes.string,
    width: React.PropTypes.string,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getDefaultProps() {
    return {
      onActive: () => {},
      onTouchTap: () => {},
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  render() {
    let {
      label,
      onActive,
      onTouchTap,
      selected,
      style,
      value,
      width,
      ...other,
    } = this.props;
    let styles = this.prepareStyles({
      display: 'table-cell',
      cursor: 'pointer',
      textAlign: 'center',
      verticalAlign: 'middle',
      height: 48,
      color: selected ? this.state.muiTheme.tabs.selectedTextColor : this.state.muiTheme.tabs.textColor,
      outline: 'none',
      fontSize: 14,
      fontWeight: 500,
      whiteSpace: 'initial',
      fontFamily: this.state.muiTheme.rawTheme.fontFamily,
      boxSizing: 'border-box',
      width: width,
    }, style);

    return (
      <div
        {...other}
        style={styles}
        onTouchTap={this._handleTouchTap}>
        {label}
      </div>
    );
  },

  _handleTouchTap(e) {
    this.props.onTouchTap(this.props.value, e, this);
  },

});

export default Tab;
