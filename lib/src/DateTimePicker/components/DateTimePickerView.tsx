import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface DateTimePickerViewProps {
  selected: boolean;
  children: React.ReactChild;
}

export const DateTimePickerView: React.SFC<DateTimePickerViewProps> = ({
  selected,
  children,
}) => {
  if (!selected) {
    return null;
  }

  return <div children={children} />;
};

(DateTimePickerView as any).propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default DateTimePickerView;
