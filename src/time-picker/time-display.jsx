let React = require('react');
let StylePropable = require('../mixins/style-propable');


let TimeDisplay = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    selectedTime: React.PropTypes.object.isRequired,
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    mode: React.PropTypes.oneOf(['hour', 'minute']),
    affix: React.PropTypes.oneOf(['', 'pm', 'am']),
  },

  getInitialState() {
    return {
      transitionDirection: 'up',
    };
  },

  getDefaultProps() {
    return {
      mode: 'hour',
      affix: '',
    };
  },

  componentWillReceiveProps(nextProps) {
    let direction;

    if (nextProps.selectedTime !== this.props.selectedTime) {
      direction = nextProps.selectedTime > this.props.selectedTime ? 'up' : 'down';

      this.setState({
        transitionDirection: direction,
      });
    }
  },

  sanitizeTime() {
    let hour = this.props.selectedTime.getHours();
    let min = this.props.selectedTime.getMinutes().toString();

    if (this.props.format === "ampm") {
      hour %= 12;
      hour = hour || 12;
    }

    hour = hour.toString();
    if (hour.length < 2 ) hour = "0" + hour;
    if (min.length < 2 ) min = "0" + min;

    return [hour, min];
  },

  getTheme() {
    return this.context.muiTheme.component.timePicker;
  },

  render() {
    let {
      selectedTime,
      mode,
      ...other,
    } = this.props;

    let styles = {
      root: {
        textAlign: "center",
        position: "relative",
        width: 280,
        height: "100%",
      },

      time: {
        margin: "6px 0",
        lineHeight: "58px",
        height: 58,
        fontSize: "58px",
      },

      box: {
        padding: "16px 0",
        backgroundColor: this.getTheme().color,
        color: this.getTheme().textColor,
      },

      hour: {},

      minute: {},
    };

    let [hour, min] = this.sanitizeTime();

    styles[mode].color = this.getTheme().accentColor;

    return (
      <div {...other} style={this.mergeAndPrefix(styles.root)}>
        <div style={this.mergeAndPrefix(styles.box)}>
          <div style={this.mergeAndPrefix(styles.time)}>
            <span style={this.mergeAndPrefix(styles.hour)} onTouchTap={this.props.onSelectHour}>{hour}</span>
            <span>:</span>
            <span style={this.mergeAndPrefix(styles.minute)} onTouchTap={this.props.onSelectMin}>{min}</span>
          </div>

         <span key={"affix"}>{this.props.affix.toUpperCase()}</span>
        </div>
      </div>
    );
  },

});

module.exports = TimeDisplay;
