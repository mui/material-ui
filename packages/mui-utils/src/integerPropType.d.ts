import PropTypes from 'prop-types';

declare function integerPropType(
  props: { [key: string]: any },
  propName: string,
  componentName: string,
  location: string,
  propFullName: string,
): Error | null;

declare namespace integerPropType {
  let isRequired: PropTypes.Validator<number>;
}

export default integerPropType;
