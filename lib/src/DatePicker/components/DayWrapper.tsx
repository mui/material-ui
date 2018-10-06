import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface DayWrapperProps {
  children: React.ReactNode;
  dayInCurrentMonth?: boolean,
  disabled?: boolean;
  onSelect: (value: any) => void;
  value: any;
}

class DayWrapper extends React.PureComponent<DayWrapperProps> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dayInCurrentMonth: PropTypes.bool,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
  }

  static defaultProps = {
    dayInCurrentMonth: true,
    disabled: false,
  }

  handleClick = () => {
    this.props.onSelect(this.props.value);
  }

  render() {
    const {
      children, value, dayInCurrentMonth, disabled, onSelect, ...other
    } = this.props;

    return (
      <div
        onClick={dayInCurrentMonth && !disabled ? this.handleClick : undefined}
        onKeyPress={dayInCurrentMonth && !disabled ? this.handleClick : undefined}
        role="presentation"
        {...other}
      >
        {children}
      </div>
    );
  }
}

export default DayWrapper;
