import PropTypes from 'prop-types';

const responsivePropType =
  __DEV__
    ? PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array])
    : {};

export default responsivePropType;
