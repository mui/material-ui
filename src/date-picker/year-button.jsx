let React = require('react');
let StylePropable = require('../mixins/style-propable');
let EnhancedButton = require('../enhanced-button');


let YearButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    year: React.PropTypes.number,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      selected: false,
    };
  },

  getInitialState() {
    return {
      hover: false,
    };
  },

  getTheme() {
    return this.context.muiTheme.component.datePicker;
  },

  render() {
    let {
      className,
      year,
      onTouchTap,
      selected,
      ...other,
    } = this.props;

    let styles = {
      root: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        position: 'relative',
        display: 'block',
        margin: '0 auto',
        width: 36,
        fontSize: 14,
        padding: '8px 2px',
      },

      label: {
        position: 'relative',
        top: -1,
        color: this.context.muiTheme.palette.textColor,
      },

      buttonState: {
        position: 'absolute',
        height: 32,
        width: 32,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        backgroundColor: this.getTheme().selectColor,
      },
    };

    if (this.state.hover) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = 0.6;
      styles.buttonState.transform = 'scale(1.5)';
    }

    if (selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = 1;
      styles.buttonState.transform = 'scale(1.5)';
    }

    if (year === new Date().getFullYear()) {
      styles.root.color = this.getTheme().color;
    }

    return (
      <EnhancedButton {...other}
        style={styles.root}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        onTouchTap={this._handleTouchTap}>
        <div style={styles.buttonState} />
        <span style={styles.label}>{year}</span>
      </EnhancedButton>
    );
  },

  _handleMouseEnter() {
    this.setState({hover: true});
  },

  _handleMouseLeave() {
    this.setState({hover: false});
  },

  _handleTouchTap(e) {
    if (this.props.onTouchTap) this.props.onTouchTap(e, this.props.year);
  },

});

module.exports = YearButton;
