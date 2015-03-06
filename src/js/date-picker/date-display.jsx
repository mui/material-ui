var React = require('react');
var StylePropable = require('../mixins/style-propable');
var DateTime = require('../utils/date-time');
var CustomVariables = require('../styles/variables/custom-variables.js');
var Transitions = require('../styles/mixins/transitions');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var DateDisplay = React.createClass({

  mixins: [StylePropable],

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
    var datePadding = '16px';
    var dayMargin = '6px';

    if (isLandscape) {
      datePadding = this.props.weekCount === 5 ? '30px' :
        this.props.weekCount === 6 ? '50px' : '24px';
      if (this.props.weekCount > 4) dayMargin = '24px';
    }

    var styles = {
      root: {
        textAlign: 'center',
        position: 'relative'
      },

      date: {
        padding: datePadding + ' 0',
        backgroundColor: CustomVariables.datePickerColor,
        color: CustomVariables.datePickerTextColor,
        transition: Transitions.easeOut()
      },

      dow: {
        fontSize: '13px',
        height: '32px',
        lineHeight: '32px',
        backgroundColor: CustomVariables.datePickerSelectColor,
        color: CustomVariables.datePickerSelectTextColor,
        borderRadius: isLandscape ? '2px 0 0 0' : '2px 2px 0 0'
      },

      day: {
        margin: dayMargin + ' 0',
        lineHeight: isLandscape ? '76px' : '58px',
        height: isLandscape ? '76px' : '58px',
        fontSize: isLandscape ? '76px' : '58px',
        transition: Transitions.easeOut()
      },

      month: {
        fontSize: isLandscape ? '26px' : '22px',
        lineHeight: isLandscape ? '26px' : '24px',
        height: isLandscape ? '26px' : '24px',
        textTransform: 'uppercase'
      },

      year: {
        fontSize: isLandscape ? '26px' : '22px',
        lineHeight: isLandscape ? '26px' : '24px',
        height: isLandscape ? '26px' : '24px',
        textTransform: 'uppercase',
        opacity: '0.7'
      }
    };

    return (
      <div {...other} style={this.mergeAndPrefix(styles.root)}>

        <SlideInTransitionGroup
          style={styles.dow}
          direction={this.state.transitionDirection}>
          <div key={dayOfWeek}>{dayOfWeek}</div>
        </SlideInTransitionGroup>

        <div style={styles.date}>

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
    );
  }

});

module.exports = DateDisplay;