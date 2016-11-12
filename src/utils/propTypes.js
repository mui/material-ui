// @flow weak

import { PropTypes } from 'react';

const horizontal = PropTypes.oneOfType([
  PropTypes.oneOf(['left', 'center', 'right']),
  PropTypes.number,
]);

const vertical = PropTypes.oneOfType([
  PropTypes.oneOf(['top', 'center', 'bottom']),
  PropTypes.number,
]);

export default {
  horizontal,

  vertical,

  origin: PropTypes.shape({ horizontal, vertical }),

  stringOrNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
