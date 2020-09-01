import * as PropTypes from 'prop-types';

export default function chainPropTypes(
  propType1: PropTypes.Validator<unknown>,
  propType2: PropTypes.Validator<unknown>,
): PropTypes.Validator<unknown> {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  return function validate(...args) {
    return propType1(...args) || propType2(...args);
  };
}
