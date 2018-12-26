import PropTypes from 'prop-types';

const resonsivePropType =
  process.env.NODE_ENV !== 'production'
    ? PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
    : {};

export default resonsivePropType;
