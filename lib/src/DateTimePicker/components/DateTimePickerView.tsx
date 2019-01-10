import * as React from 'react';

export interface DateTimePickerViewProps {
  selected: boolean;
  children: React.ReactChild;
}

export const DateTimePickerView: React.SFC<DateTimePickerViewProps> = ({ selected, children }) => {
  if (!selected) {
    return null;
  }

  return <div children={children} />;
};

export default DateTimePickerView;
