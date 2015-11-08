const React = require('react');
const StylePropable = require('../mixins/style-propable');
const Transitions = require('../styles/transitions');
const SlideInTransitionGroup = require('../transition-groups/slide-in');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const DateDisplay = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    DateTimeFormat: React.PropTypes.func.isRequired,
    locale: React.PropTypes.string.isRequired,
    disableYearSelection: React.PropTypes.bool,
    monthDaySelected: React.PropTypes.bool,
    selectedDate: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
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
          direction={this.state.transitionDirection}>
          <div key={year} style={styles.year.title} onTouchTap={this._handleYearClick}>{year}</div>
        </SlideInTransitionGroup>

        <SlideInTransitionGroup
          style={styles.monthDay.root}
          direction={this.state.transitionDirection}>
            <div
              key={dateTimeFormatted}
              style={styles.monthDay.title}
              onTouchTap={this._handleMonthDayClick}>
                {dateTimeFormatted}
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
