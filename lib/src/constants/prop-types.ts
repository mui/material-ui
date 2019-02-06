import * as PropTypes from 'prop-types';

const date = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Date),
]);

const datePickerView = PropTypes.oneOf(['year', 'month', 'day']);

export type DateType = object | string | number | Date | null | undefined;

export const DomainPropTypes = { date, datePickerView };
