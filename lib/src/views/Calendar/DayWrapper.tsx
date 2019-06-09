import * as React from 'react';

export interface DayWrapperProps {
  value: any;
  children: React.ReactNode;
  dayInCurrentMonth?: boolean;
  disabled?: boolean;
  onSelect: (value: any) => void;
}

const DayWrapper: React.FC<DayWrapperProps> = ({
  children,
  value,
  disabled,
  onSelect,
  dayInCurrentMonth,
  ...other
}) => {
  const handleClick = React.useCallback(() => onSelect(value), [onSelect, value]);

  return (
    <div
      role="presentation"
      onClick={dayInCurrentMonth && !disabled ? handleClick : undefined}
      onKeyPress={dayInCurrentMonth && !disabled ? handleClick : undefined}
      {...other}
    >
      {children}
    </div>
  );
};

export default DayWrapper;
