let React = require('react');
let StylePropable = require('../mixins/style-propable');
let EnhancedButton = require('../enhanced-button');
let Transitions = require('../styles/transitions');


let ClockButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    position: React.PropTypes.oneOf(['left', 'right']),
  },

  getDefaultProps() {
    return {
        position: "left",
    };
  },

  _handleTouchTap() {
    this.setState({
      selected: true,
    });
    this.props.onTouchTap();
  },

  getTheme() {
    return this.context.muiTheme.component.timePicker;
  },

  render() {
    let {
      className,
      ...other} = this.props;

    let styles = {
      root: {
        position: "absolute",
        bottom: 65,
        pointerEvents: "auto",
        height: 50,
        width: 50,
        borderRadius: "100%",
      },

      label : {
        position: "absolute",
        top: 17,
        left: 14,
      },

      select: {
        position: 'absolute',
        height: 50,
        width: 50,
        top: 0,
        left: 0,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transitions.easeOut(),
        backgroundColor: this.getTheme().accentColor,
      },
    };

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.select.opacity = 1;
      styles.select.transform = 'scale(1)';
    }

    if ( this.props.position === "right" ){
      styles.root.right = "5px";
    }
    else {
      styles.root.left = "5px";
    }

    return (
        <EnhancedButton {...other}
          style={this.mergeAndPrefix(styles.root)}
          disableFocusRipple={true}
          disableTouchRipple={true}
          onTouchTap={this._handleTouchTap}>
          <span style={this.mergeAndPrefix(styles.select)} />
          <span style={this.mergeAndPrefix(styles.label)} >{this.props.children}</span>
        </EnhancedButton>
    );
  },
});

module.exports = ClockButton;
