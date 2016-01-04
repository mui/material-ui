import React from 'react';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const TimeDisplay = React.createClass({

  propTypes: {
    affix: React.PropTypes.oneOf(['', 'pm', 'am']),
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    mode: React.PropTypes.oneOf(['hour', 'minute']),
    onSelectAffix: React.PropTypes.func,
    onSelectHour: React.PropTypes.func,
    onSelectMin: React.PropTypes.func,
    selectedTime: React.PropTypes.object.isRequired,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      mode: 'hour',
      affix: '',
    };
  },

  getInitialState() {
    return {
      transitionDirection: 'up',
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    let direction;
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

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

    if (this.props.format === 'ampm') {
      hour %= 12;
      hour = hour || 12;
    }

    hour = hour.toString();
    if (hour.length < 2 ) hour = '0' + hour;
    if (min.length < 2 ) min = '0' + min;

    return [hour, min];
  },

  getTheme() {
    return this.state.muiTheme.timePicker;
  },

  render() {
    let {
      selectedTime,
      mode,
      affix,
      ...other,
    } = this.props;

    let styles = {
      root: {
        position: 'relative',
        width: 280,
        height: '100%',
      },

      box: {
        padding: '14px 0',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        backgroundColor: this.getTheme().headerColor,
        color: 'white',
      },

      text: {
        margin: '6px 0',
        lineHeight: '58px',
        height: 58,
        fontSize: 58,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
      },

      time: {
        margin: '0 10px',
      },

      affix: {
        flex: 1,
        position: 'relative',
        lineHeight: '17px',
        height: 17,
        fontSize: 17,
      },

      affixTop: {
        position: 'absolute',
        top: -20,
        left: 0,
      },

      clickable: {
        cursor: 'pointer',
      },

      inactive: {
        opacity: 0.7,
      },
    };

    let [hour, min] = this.sanitizeTime();

    let buttons = [];
    if (this.props.format === 'ampm') {
      buttons = [
        <div key="pm"
          style={this.prepareStyles(styles.clickable, affix === 'pm' ? {} : styles.inactive)}
          onTouchTap={() => this.props.onSelectAffix('pm')}>
          {"PM"}
        </div>,
        <div key="am"
          style={this.prepareStyles(styles.affixTop, styles.clickable, affix === 'am' ? {} : styles.inactive)}
          onTouchTap={() => this.props.onSelectAffix('am')}>
          {"AM"}
        </div>,
      ];
    }

    return (
      <div {...other} style={this.prepareStyles(styles.root)}>
        <div style={this.prepareStyles(styles.box)}>
          <div style={this.prepareStyles(styles.text)}>
            <div style={this.prepareStyles(styles.affix)} />
            <div style={this.prepareStyles(styles.time)}>
              <span
                style={this.prepareStyles(styles.clickable, mode === 'hour' ? {} : styles.inactive)}
                onTouchTap={this.props.onSelectHour}>
                {hour}
              </span>
              <span>:</span>
              <span
                style={this.prepareStyles(styles.clickable, mode === 'minute' ? {} : styles.inactive)}
                onTouchTap={this.props.onSelectMin}>
                {min}
              </span>
            </div>
            <div style={this.prepareStyles(styles.affix)}>
              {buttons}
            </div>
          </div>
        </div>
      </div>
    );
  },

});

export default TimeDisplay;
