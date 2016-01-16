import React from 'react';
import StylePropable from '../mixins/style-propable';
import Transitions from '../styles/transitions';
import SlideInTransitionGroup from '../transition-groups/slide-in';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const DateDisplay = React.createClass({

  propTypes: {
    DateTimeFormat: React.PropTypes.func.isRequired,
    disableYearSelection: React.PropTypes.bool,
    handleMonthDayClick: React.PropTypes.func,
    handleYearClick: React.PropTypes.func,
    locale: React.PropTypes.string.isRequired,
    mode: React.PropTypes.oneOf(['portrait', 'landscape']),
    monthDaySelected: React.PropTypes.bool,
    selectedDate: React.PropTypes.object.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    weekCount: React.PropTypes.number,
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

  getDefaultProps() {
    return {
      disableYearSelection: false,
      monthDaySelected: true,
      weekCount: 4,
    };
  },

  getInitialState() {
    return {
      selectedYear: !this.props.monthDaySelected,
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
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    let direction;

    if (nextProps.selectedDate !== this.props.selectedDate) {
      direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction,
      });
    }

    if (nextProps.monthDaySelected !== undefined) {
      this.setState({selectedYear: !nextProps.monthDaySelected});
    }
  },

  getTheme() {
    return this.state.muiTheme.datePicker;
  },

  getStyles() {
    const theme = this.getTheme();
    const isLandscape = this.props.mode === 'landscape';

    const styles = {
      root: {
        backgroundColor: theme.selectColor,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        color: theme.textColor,
        height: 60,
        padding: 20,
      },

      monthDay: {
        root: {
          display: 'inline-block',
          fontSize: 36,
          fontWeight: '400',
          lineHeight: '36px',
          height: isLandscape ? 76 : 38,
          opacity: this.state.selectedYear ? 0.7 : 1.0,
          transition: Transitions.easeOut(),
          width: '100%',
        },

        title: {
          cursor: !this.state.selectedYear ? 'default' : 'pointer',
        },
      },

      year: {
        root: {
          margin: 0,
          fontSize: 16,
          fontWeight: '400',
          lineHeight: '16px',
          height: 16,
          opacity: this.state.selectedYear ? 1.0 : 0.7,
          transition: Transitions.easeOut(),
          marginBottom: 10,
        },

        title: {
          cursor: (this.state.selectedYear && !this.props.disableYearSelection) ? 'pointer' : 'default',
        },
      },
    };

    return styles;
  },

  _handleMonthDayClick() {
    if (this.props.handleMonthDayClick && this.state.selectedYear) {
      this.props.handleMonthDayClick();
    }

    this.setState({selectedYear: false});
  },

  _handleYearClick() {
    if (this.props.handleYearClick && !this.props.disableYearSelection && !this.state.selectedYear) {
      this.props.handleYearClick();
    }

    if (!this.props.disableYearSelection) {
      this.setState({selectedYear: true});
    }
  },

  render() {
    let {
      DateTimeFormat,
      locale,
      selectedDate,
      style,
      ...other,
    } = this.props;
    const year = this.props.selectedDate.getFullYear();
    const styles = this.getStyles();

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'short',
      weekday: 'short',
      day: '2-digit',
    }).format(this.props.selectedDate);

    return (
      <div {...other} style={this.prepareStyles(styles.root, this.props.style)}>
        <SlideInTransitionGroup
          style={styles.year.root}
          direction={this.state.transitionDirection}
        >
          <div key={year} style={styles.year.title} onTouchTap={this._handleYearClick}>
            {year}
          </div>
        </SlideInTransitionGroup>
        <SlideInTransitionGroup
          style={styles.monthDay.root}
          direction={this.state.transitionDirection}
        >
          <div
            key={dateTimeFormatted}
            style={styles.monthDay.title}
            onTouchTap={this._handleMonthDayClick}
          >
            {dateTimeFormatted}
          </div>
        </SlideInTransitionGroup>
      </div>
    );
  },

});

export default DateDisplay;
