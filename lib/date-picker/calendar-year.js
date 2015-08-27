'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Colors = require('../styles/colors');
var DateTime = require('../utils/date-time');
var YearButton = require('./year-button');

var CalendarYear = React.createClass({
  displayName: 'CalendarYear',

  mixins: [StylePropable],

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onYearTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object
  },

  componentDidMount: function componentDidMount() {
    this._scrollToSelectedYear();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._scrollToSelectedYear();
  },

  render: function render() {
    var years = this._getYears();
    var styles = {
      position: 'relative',
      height: 'inherit',
      lineHeight: '36px',
      textAlign: 'center',
      padding: '8px 14px 0 14px',
      backgroundColor: Colors.white,
      overflowX: 'hidden',
      overflowY: 'scroll'
    };

    return React.createElement(
      'div',
      { style: styles },
      years
    );
  },

  _getYears: function _getYears() {
    var minYear = this.props.minDate.getFullYear();
    var maxYear = this.props.maxDate.getFullYear();

    var years = [];
    var dateCheck = DateTime.clone(this.props.selectedDate);
    for (var year = minYear; year <= maxYear; year++) {
      dateCheck.setFullYear(year);
      if (!DateTime.isBetweenDates(dateCheck, this.props.minDate, this.props.maxDate)) continue;
      var selected = this.props.selectedDate.getFullYear() === year;
      var selectedProps = {};
      if (selected) {
        selectedProps = { ref: 'selectedYearButton' };
      }

      var yearButton = React.createElement(YearButton, _extends({
        key: 'yb' + year,
        year: year,
        onTouchTap: this._handleYearTouchTap,
        selected: selected
      }, selectedProps));

      years.push(yearButton);
    }

    return years;
  },

  _scrollToSelectedYear: function _scrollToSelectedYear() {
    if (this.refs.selectedYearButton === undefined) return;

    var container = this.getDOMNode();
    var yearButtonNode = this.refs.selectedYearButton.getDOMNode();

    var containerHeight = container.clientHeight;
    var yearButtonNodeHeight = yearButtonNode.clientHeight || 32;

    var scrollYOffset = yearButtonNode.offsetTop + yearButtonNodeHeight / 2 - containerHeight / 2;
    container.scrollTop = scrollYOffset;
  },

  _handleYearTouchTap: function _handleYearTouchTap(e, year) {
    if (this.props.onYearTouchTap) this.props.onYearTouchTap(e, year);
  }

});

module.exports = CalendarYear;