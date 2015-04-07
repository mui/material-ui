var React = require('react');
var DateTime = require('../utils/date-time');
var IconButton = require('../icon-button');
var Toolbar = require('../toolbar/toolbar');
var ToolbarGroup = require('../toolbar/toolbar-group');
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
    hideYearChangeButtons: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      disabledPrevYear: false,
      disabledNextYear: false,
      disabledPrevMonth: false,
      disabledNextYear: false,
      hideYearChangeButtons: false
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
    
    var prevYearChangeButton = this._getPrevYearChangeButton();
    var nextYearChangeButton = this._getNextYearChangeButton();

    var styles = {
      root: {
        position: 'relative',
        padding: 0,
        backgroundColor: 'inherit'
      },

      buttonLeft: {
        position: 'absolute',
        left: '0px',
        top: '0px'
      },

      buttonRight: {
        position: 'absolute',
        right: '0px',
        top: '0px'
      },

      title: {
        position: 'absolute',
        top: '17px',
        lineHeight: '14px',
        fontSize: '14px',
        height: '14px',
        width: '100%',
        fontWeight: '500',
        textAlign: 'center',
        zIndex: -1
      }
    };

    return (
      <Toolbar className="mui-date-picker-calendar-toolbar" style={styles.root}>
        <ToolbarGroup key={0} float="left">
          {prevYearChangeButton}
              
          <IconButton
            onTouchTap={this._prevMonthTouchTap}
            disabled={this.props.disabledPrevMonth}>
              <NavigationChevronLeft />
          </IconButton>
        </ToolbarGroup>
        
        <ToolbarGroup key={1} float="right">
          <IconButton
            onTouchTap={this._nextMonthTouchTap}
            disabled={this.props.disabledNextMonth}>
              <NavigationChevronRight />
          </IconButton>
          
          {nextYearChangeButton}
        </ToolbarGroup>

        <SlideInTransitionGroup
          style={styles.title}
          direction={this.state.transitionDirection}>
          <div key={month + '_' + year}>{month} {year}</div>
        </SlideInTransitionGroup>
      </Toolbar>
    );
  },
  
  _getPrevYearChangeButton: function() {
    var icon = '';
    
    if (!this.props.hideYearChangeButtons) {
      icon = (
        <IconButton
          onTouchTap={this._prevYearTouchTap}
          disabled={this.props.disabledPrevYear}>
            <NavigationChevronLeftDouble />
        </IconButton>
      );
    }
    
    return icon;
  },
  
  _getNextYearChangeButton: function() {
    var icon = '';
    
    if (!this.props.hideYearChangeButtons) {
      icon = (
        <IconButton
          onTouchTap={this._nextYearTouchTap}
          disabled={this.props.disabledNextYear}>
            <NavigationChevronRightDouble />
        </IconButton>
      );
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
