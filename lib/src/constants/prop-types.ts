import * as PropTypes from 'prop-types';

const date = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Date),
]);

export type DateType = object | string | number | Date | null | undefined;

export const DomainPropTypes = { date };
