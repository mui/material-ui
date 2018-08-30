import PropTypes from 'prop-types';

const date = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Date),
]);

export default {
  date,
};
