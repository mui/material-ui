import React from 'react';
import Extend from '../utils/extend';
import OpenIcon from '../svg-icons/hardware/keyboard-arrow-up';
import CloseIcon from '../svg-icons/hardware/keyboard-arrow-down';
import IconButton from '../icon-button';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';
import ContextPure from '../mixins/context-pure';

const CardExpandable = React.createClass({

  propTypes: {
    expanded: React.PropTypes.bool,
    onExpanding: React.PropTypes.func.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
    ContextPure,
  ],

  statics: {
    getRelevantContextKeys(muiTheme) {
      return {
        isRtl: muiTheme.isRtl,
      };
    },
    getChildrenClasses() {
      return [
        IconButton,
      ];
    },
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getStyles() {
    const contextKeys = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    const directionStyle = contextKeys.isRtl ? {
      left: 4,
    } : {
      right: 4,
    };

    return {
      root: Extend({
        top: 0,
        bottom: 0,
        margin: 'auto',
        position: 'absolute',
      }, directionStyle),
    };
  },

  render() {
    let styles = this.getStyles();

    let expandable;
    if (this.props.expanded === true)
      expandable = <OpenIcon/>;
    else
      expandable = <CloseIcon/>;

    let mergedStyles = this.mergeStyles(styles.root, this.props.style);

    let expandableBtn = (
      <IconButton
        style={mergedStyles}
        onTouchTap={this.props.onExpanding}>
        {expandable}
      </IconButton>
    );


    return expandableBtn;
  },
});

export default CardExpandable;
