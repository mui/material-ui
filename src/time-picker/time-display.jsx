import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

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

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      mode: 'hour',
      affix: '',
    };
  },

  getInitialState() {
    return {
      transitionDirection: 'up',
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });

    if (nextProps.selectedTime !== this.props.selectedTime) {
      const direction = nextProps.selectedTime > this.props.selectedTime ? 'up' : 'down';

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
    if (hour.length < 2 ) hour = `0${hour}`;
    if (min.length < 2 ) min = `0${min}`;

    return [hour, min];
  },

  getTheme() {
    return this.state.muiTheme.timePicker;
  },

  render() {
    const {
      selectedTime,
      mode,
      affix,
      ...other,
    } = this.props;

    const {
      prepareStyles,
      timePicker,
    } = this.state.muiTheme;

    const styles = {
      root: {
        padding: '14px 0',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        backgroundColor: timePicker.headerColor,
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

    const [hour, min] = this.sanitizeTime();

    let buttons = [];
    if (this.props.format === 'ampm') {
      buttons = [
        <div
          key="pm"
          style={prepareStyles(Object.assign({}, styles.clickable, affix === 'pm' ? {} : styles.inactive))}
          onTouchTap={() => this.props.onSelectAffix('pm')}
        >
          {"PM"}
        </div>,
        <div
          key="am"
          style={prepareStyles(Object.assign({},
            styles.affixTop, styles.clickable, affix === 'am' ? {} : styles.inactive))}
          onTouchTap={() => this.props.onSelectAffix('am')}
        >
          {"AM"}
        </div>,
      ];
    }

    return (
      <div {...other} style={prepareStyles(styles.root)}>
        <div style={prepareStyles(styles.text)}>
          <div style={prepareStyles(Object.assign({}, styles.affix))} />
          <div style={prepareStyles(styles.time)}>
            <span
              style={prepareStyles(Object.assign({}, styles.clickable, mode === 'hour' ? {} : styles.inactive))}
              onTouchTap={this.props.onSelectHour}
            >
              {hour}
            </span>
            <span>:</span>
            <span
              style={prepareStyles(Object.assign({},
                styles.clickable, mode === 'minute' ? {} : styles.inactive))}
              onTouchTap={this.props.onSelectMin}
            >
              {min}
            </span>
          </div>
          <div style={prepareStyles(Object.assign({}, styles.affix))}>
            {buttons}
          </div>
        </div>
      </div>
    );
  },

});

export default TimeDisplay;
