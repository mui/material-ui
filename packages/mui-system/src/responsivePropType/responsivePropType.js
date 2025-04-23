import PropTypes from 'prop-types-compat';

const responsivePropType =
  process.env.NODE_ENV !== 'production'
    ? PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array])
    : {};

export default responsivePropType;
