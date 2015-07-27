'use strict';

var React = require('react');

module.exports = {

  corners: React.PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),

  cornersAndCenter: React.PropTypes.oneOf(['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right']),

  stringOrNumber: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),

  zDepth: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5])

};