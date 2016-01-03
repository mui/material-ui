import React from 'react';
import StylePropable from './mixins/style-propable';
import getMuiTheme from './styles/getMuiTheme';

const InkBar = React.createClass({

  propTypes: {
    color: React.PropTypes.string,
    left: React.PropTypes.number.isRequired,
    moveBarLeft: React.PropTypes.bool.isRequired,
    right: React.PropTypes.number.isRequired,

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
  ],

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
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

  render() {
    let {
      color,
      left,
      right,
      moveBarLeft,
      style,
      ...other,
    } = this.props;

    let colorStyle = color ? {backgroundColor: color} : undefined;
    let styles = this.mergeStyles({
      left: left,
      right: right,
      bottom: 0,
      display: 'block',
      backgroundColor: this.state.muiTheme.inkBar.backgroundColor,
      height: 2,
      marginTop: -2,
      position: 'absolute',
      transition: `left ${moveBarLeft ? '0.125' : '0.25'}s cubic-bezier(.35,0,.25,1),
        right ${moveBarLeft ? '0.25' : '0.125'}s cubic-bezier(.35,0,.25,1)`,
    }, this.props.style, colorStyle);

    return (
      <div style={this.prepareStyles(styles)}>
        &nbsp;
      </div>
    );
  },

});

export default InkBar;
