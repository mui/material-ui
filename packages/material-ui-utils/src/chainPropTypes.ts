import * as PropTypes from 'prop-types';

export default function chainPropTypes(
  propType1: PropTypes.Validator<unknown>,
  propType2: PropTypes.Validator<unknown>,
): PropTypes.Requireable<unknown> {
  if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    return () => null;
  }

  // @ts-ignore
  return function validate(...args) {
    return propType1(...args) || propType2(...args);
  };
}
