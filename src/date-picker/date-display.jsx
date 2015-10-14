const React = require('react');
const StylePropable = require('../mixins/style-propable');
const DateTime = require('../utils/date-time');
const Transitions = require('../styles/transitions');
const AutoPrefix = require('../styles/auto-prefix');
const SlideInTransitionGroup = require('../transition-groups/slide-in');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const DateDisplay = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    disableYearSelection: React.PropTypes.bool,
    monthDaySelected: React.PropTypes.bool,
    selectedDate: React.PropTypes.object.isRequired,
    weekCount: React.PropTypes.number,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

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

      month: {
        display: isLandscape ? 'block' : undefined,
        marginLeft: isLandscape ? undefined : 8,
        marginTop: isLandscape ? 5 : undefined,
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

  render() {
    let {
      selectedDate,
      style,
      ...other,
    } = this.props;
    let dayOfWeek = DateTime.getDayOfWeek(this.props.selectedDate);
    let month = DateTime.getShortMonth(this.props.selectedDate);
    let day = this.props.selectedDate.getDate();
    let year = this.props.selectedDate.getFullYear();
    let styles = this.getStyles();

    return (
    <div {...other} style={this.prepareStyles(styles.root, this.props.style)}>
        <SlideInTransitionGroup
          style={styles.year.root}
          direction={this.state.transitionDirection}>
          <div key={year} style={styles.year.title} onTouchTap={this._handleYearClick}>{year}</div>
        </SlideInTransitionGroup>

        <SlideInTransitionGroup
          style={styles.monthDay.root}
          direction={this.state.transitionDirection}>
            <div
              key={dayOfWeek + month + day}
              style={styles.monthDay.title}
              onTouchTap={this._handleMonthDayClick}>
                <span>{dayOfWeek},</span>
                <span style={styles.month}>{month} {day}</span>
            </div>
        </SlideInTransitionGroup>
      </div>
    );
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

});

module.exports = DateDisplay;
