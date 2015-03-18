var React = require('react');
var DateTime = require('../utils/date-time');
var IconButton = require('../icon-button');
var Toolbar = require('../toolbar');
var ToolbarGroup = require('../toolbar-group');
var DropDownMenu = require('../drop-down-menu');
var NavigationChevronLeft = require('../svg-icons/navigation-chevron-left');
var NavigationChevronLeftDouble = require('../svg-icons/navigation-chevron-left-double');
var NavigationChevronRight = require('../svg-icons/navigation-chevron-right');
var NavigationChevronRightDouble = require('../svg-icons/navigation-chevron-right-double');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var CalendarToolbar = React.createClass({

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onMonthChange: React.PropTypes.func,
    onYearChange: React.PropTypes.func,
    disabledPrevYear: React.PropTypes.bool,
    disabledNextYear: React.PropTypes.bool,
    disabledPrevMonth: React.PropTypes.bool,
    disabledNextMonth: React.PropTypes.bool,
    hideYearChange: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      disabledPrevYear: false,
      disabledNextYear: false,
      disabledPrevMonth: false,
      disabledNextYear: false,
      hideYearChange: false
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

  render: function() {
    var month = DateTime.getFullMonth(this.props.displayDate);
    var year = this.props.displayDate.getFullYear();
    
    var prevYearChangeIcon = this._getPrevYearChangeIcon();
    var nextYearChangeIcon = this._getNextYearChangeIcon();

    return (
      <Toolbar className="mui-date-picker-calendar-toolbar">
        <ToolbarGroup key={0} float="left">
        {prevYearChangeIcon}
              
          <IconButton
            onTouchTap={this._prevMonthTouchTap}
            disabled={this.props.disabledPrevMonth}>
              <NavigationChevronLeft/>
          </IconButton>
        </ToolbarGroup>
        
        <ToolbarGroup key={1} float="right">
          <IconButton
            onTouchTap={this._nextMonthTouchTap}
            disabled={this.props.disabledNextMonth}>
              <NavigationChevronRight/>
          </IconButton>
          
          {nextYearChangeIcon}
        </ToolbarGroup>
        
        <SlideInTransitionGroup
          className="mui-date-picker-calendar-toolbar-title"
          direction={this.state.transitionDirection}>
          <div key={month + '_' + year}>{month} {year}</div>
        </SlideInTransitionGroup>
      </Toolbar>
    );
  },
  
  _getPrevYearChangeIcon: function() {
    var icon = '';
    
    if (!this.state.hideYearChange) {
      icon = (
        <IconButton
          onTouchTap={this._prevYearTouchTap}
          disabled={this.props.disabledPrevYear}>
            <NavigationChevronLeftDouble/>
        </IconButton>);
    }
    
    return icon;
  },
  
  _getNextYearChangeIcon: function() {
    var icon = '';
    
    if (!this.state.hideYearChange) {
      icon = (
        <IconButton
          onTouchTap={this._nextYearTouchTap}
          disabled={this.props.disabledNextYear}>
            <NavigationChevronRightDouble/>
        </IconButton>);
    }
    
    return icon;
  },
  
  _prevYearTouchTap: function() {
    if (this.props.onYearChange && !this.props.disabledPrevYear) this.props.onYearChange(-1);
  },
  
  _nextYearTouchTap: function() {
    if (this.props.onYearChange && !this.props.disabledNextYear) this.props.onYearChange(1);
  },
  
  _prevMonthTouchTap: function() {
    if (this.props.onMonthChange && !this.props.disabledPrevMonth) this.props.onMonthChange(-1);
  },
  
  _nextMonthTouchTap: function() {
    if (this.props.onMonthChange && !this.props.disabledNextMonth) this.props.onMonthChange(1);
  }

});

module.exports = CalendarToolbar;
