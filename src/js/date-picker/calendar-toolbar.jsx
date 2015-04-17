var React = require('react');
var DateTime = require('../utils/date-time');
var IconButton = require('../icon-button');
var NavigationChevronLeft = require('../svg-icons/navigation-chevron-left');
var NavigationChevronRight = require('../svg-icons/navigation-chevron-right');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var CalendarToolbar = React.createClass({

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onLeftTouchTap: React.PropTypes.func,
    onRightTouchTap: React.PropTypes.func,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object
  },

  getDefaultProps: function () {
      return {
        maxDate: null,
        minDate: null
      };
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
  _isDisabled: function(direction){
    
    var date = this.props.displayDate;
    var minDate = this.props.minDate;
    var maxDate = this.props.maxDate;

    if(direction == "left" && minDate){      
      if(date.getFullYear() < minDate.getFullYear()) return true;
      if(date.getFullYear() == minDate.getFullYear()){
        return date.getMonth() <= minDate.getMonth();
      }
    }else if(direction == "right" && maxDate){
      if(date.getFullYear() > maxDate.getFullYear()) return true;
      if(date.getFullYear() == maxDate.getFullYear()){
        return date.getMonth() >= maxDate.getMonth();
      }
    }

    return false;
  },
  render: function() {
    var month = DateTime.getFullMonth(this.props.displayDate);
    var year = this.props.displayDate.getFullYear();

    var disableLeft = this._isDisabled("left");
    var disableRight = this._isDisabled("right");

    return (
      <div className="mui-date-picker-calendar-toolbar">

        <SlideInTransitionGroup
          className="mui-date-picker-calendar-toolbar-title"
          direction={this.state.transitionDirection}>
          <div key={month + '_' + year}>{month} {year}</div>
        </SlideInTransitionGroup>

        <IconButton
          disabled={disableLeft}
          className="mui-date-picker-calendar-toolbar-button-left"
          onTouchTap={this.props.onLeftTouchTap}>
            <NavigationChevronLeft/>
        </IconButton>

        <IconButton
          disabled={disableRight}        
          className="mui-date-picker-calendar-toolbar-button-right"
          onTouchTap={this.props.onRightTouchTap}>
            <NavigationChevronRight/>
        </IconButton>

      </div>
    );
  }

});

module.exports = CalendarToolbar;
