var React = require('react');
var StylePropable = require('../mixins/style-propable');
var DateTime = require('../utils/date-time');
var Transitions = require('../styles/transitions');
var AutoPrefix = require('../styles/auto-prefix');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var DateDisplay = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    selectedDate: React.PropTypes.object.isRequired,
    weekCount: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      weekCount: 4
    };
  },

  getInitialState: function() {
    return {
      transitionDirection: 'up'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var direction;

    if (nextProps.selectedDate !== this.props.selectedDate) {
      direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },

  getTheme: function() {
    return this.context.theme.component.datePicker;
  },

  render: function() {
    var {
      selectedDate,
      style,
      ...other
    } = this.props;
    var dayOfWeek = DateTime.getDayOfWeek(this.props.selectedDate);
    var month = DateTime.getShortMonth(this.props.selectedDate);
    var day = this.props.selectedDate.getDate();
    var year = this.props.selectedDate.getFullYear();
    
    var isLandscape = this.props.mode === 'landscape';
    var dateYPosition = '0px';
    var dayYPosition = '30px';
    var yearYPosition = '95px';

    if (isLandscape) {
      dateYPosition = this.props.weekCount === 5 ? '14px' :
        this.props.weekCount === 6 ? '34px' : '8px';
      yearYPosition = this.props.weekCount === 4 ? '114px' : '150px';
      if (this.props.weekCount > 4) dayYPosition = '50px';
    }

    var styles = {
      root: {
        textAlign: 'center',
        position: 'relative'
      },

      dateContainer: {
        backgroundColor: this.getTheme().color,
        height: isLandscape ? this.props.weekCount * 40 + 36 + 'px' : '150px',
        padding: '16px 0',
        transition: Transitions.easeOut(),
        boxSizing: 'border-box',
      },

      date: {
        position: 'relative',
        color: this.getTheme().textColor,
        transition: Transitions.easeOut(),
        transform: 'translate3d(0,' + dateYPosition + ',0)'
      },

      dowContainer: {
        height: '32px',
        backgroundColor: this.getTheme().selectColor,
        borderRadius: isLandscape ? '2px 0 0 0' : '2px 2px 0 0',
        paddingTop: '9px',
        boxSizing: 'border-box',
      },

      dow: {
        fontSize: '13px',
        lineHeight: '13px',
        height: '100%',
        color: this.getTheme().selectTextColor
      },

      day: {
        position: 'absolute',
        lineHeight: isLandscape ? '76px' : '58px',
        fontSize: isLandscape ? '76px' : '58px',
        height: isLandscape ? '76px' : '58px',
        width: '100%',
        transition: Transitions.easeOut(),
        transform: 'translate3d(0,' + dayYPosition + ',0)'
      },

      month: {
        position: 'absolute',
        top: isLandscape ? '0px' : '1px',
        fontSize: isLandscape ? '26px' : '22px',
        lineHeight: isLandscape ? '26px' : '22px',
        height: isLandscape ? '26px' : '22px',
        width: '100%',
        textTransform: 'uppercase'
      },

      year: {
        position: 'absolute',
        margin: '0px',
        fontSize: isLandscape ? '26px' : '22px',
        lineHeight: isLandscape ? '26px' : '22px',
        height: isLandscape ? '26px' : '22px',
        width: '100%',
        textTransform: 'uppercase',
        opacity: '0.7',
        transition: Transitions.easeOut(),
        transform: 'translate3d(0,' + yearYPosition + ',0)'
      }
    };

    return (
      <div {...other} style={this.mergeAndPrefix(styles.root, this.props.style)}>

        <div style={styles.dowContainer}>
          <SlideInTransitionGroup
            style={styles.dow}
            direction={this.state.transitionDirection}>
            <div key={dayOfWeek}>{dayOfWeek}</div>
          </SlideInTransitionGroup>
        </div>

        <div style={AutoPrefix.all(styles.dateContainer)}>
          <div style={AutoPrefix.all(styles.date)}>

            <SlideInTransitionGroup
              style={styles.month}
              direction={this.state.transitionDirection}>
              <div key={month}>{month}</div>
            </SlideInTransitionGroup>

            <SlideInTransitionGroup
              style={styles.day}
              direction={this.state.transitionDirection}>
              <div key={day}>{day}</div>
            </SlideInTransitionGroup>

            <SlideInTransitionGroup
              style={styles.year}
              direction={this.state.transitionDirection}>
              <div key={year}>{year}</div>
            </SlideInTransitionGroup>

          </div>
        </div>

      </div>
    );
  }

});

module.exports = DateDisplay;