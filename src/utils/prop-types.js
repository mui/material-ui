import React from 'react';

const horizontal = React.PropTypes.oneOf(['left', 'middle', 'right']);
const vertical = React.PropTypes.oneOf(['top', 'center', 'bottom']);

export default {

  corners: React.PropTypes.oneOf([
    'bottom-left',
    'bottom-right',
    'top-left',
    'top-right',
  ]),

  horizontal: horizontal,

  vertical: vertical,

  origin: React.PropTypes.shape({
    horizontal: horizontal,
    vertical: vertical,
  }),

  cornersAndCenter: React.PropTypes.oneOf([
    'bottom-center',
    'bottom-left',
    'bottom-right',
    'top-center',
    'top-left',
    'top-right',
  ]),

  stringOrNumber: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),

  zDepth: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5]),

};
