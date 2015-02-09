var React = require('react');
var DateTime = require('../utils/date-time.js');
var IconButton = require('../icon-button.jsx');
var NavigationChevronLeft = require('../svg-icons/navigation-chevron-left.jsx');
var NavigationChevronRight = require('../svg-icons/navigation-chevron-right.jsx');
var SlideInTransitionGroup = require('../transition-groups/slide-in.jsx');

var CalendarToolbar = React.createClass({

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onLeftTouchTap: React.PropTypes.func,
    onRightTouchTap: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      transitionDirection: 'up'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var direction;

    if (nextProps.displayDate !== this.props.displayDate) {
      direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },

  render: function() {
    var month = DateTime.getFullMonth(this.props.displayDate);
    var year = this.props.displayDate.getFullYear();

    return (
      <div className="mui-date-picker-calendar-toolbar">

        <SlideInTransitionGroup
          className="mui-date-picker-calendar-toolbar-title"
          direction={this.state.transitionDirection}>
          <div key={month + '_' + year}>{month} {year}</div>
        </SlideInTransitionGroup>

        <IconButton
          className="mui-date-picker-calendar-toolbar-button-left"
          onTouchTap={this.props.onLeftTouchTap}>
            <NavigationChevronLeft/>
        </IconButton>

        <IconButton
          className="mui-date-picker-calendar-toolbar-button-right"
          iconClassName="navigation-chevron-right"
          onTouchTap={this.props.onRightTouchTap}>
            <NavigationChevronRight/>
        </IconButton>

      </div>
    );
  }

});

module.exports = CalendarToolbar;