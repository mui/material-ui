import PropTypes from 'prop-types';

const responsivePropType =
  process.env.NODE_ENV !== 'production'
    ? PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
    : {};

export default responsivePropType;
