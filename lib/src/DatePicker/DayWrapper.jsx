import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class DayWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onSelect: PropTypes.func.isRequired,
    day: PropTypes.any.isRequired,
    dayInCurrentMonth: PropTypes.bool,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    dayInCurrentMonth: true,
    disabled: false,
  }

  handleClick = () => {
    this.props.onSelect(this.props.day);
  }

  render() {
    const {
      children, day, dayInCurrentMonth, disabled, onSelect, ...other
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
