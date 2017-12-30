import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Day extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onSelect: PropTypes.func.isRequired,
    dayInCurrentMonth: PropTypes.bool,
    day: PropTypes.any.isRequired,
  }

  static defaultProps = {
    dayInCurrentMonth: true,
  }

  handleClick = () => {
    this.props.onSelect(this.props.day);
  }

  render() {
    const {
      children, day, dayInCurrentMonth, onSelect, ...other
    } = this.props;
    return (
      <div
        onClick={dayInCurrentMonth ? this.handleClick : undefined}
        onKeyPress={dayInCurrentMonth ? this.handleClick : undefined}
        role="presentation"
        {...other}
      >
        {children}
      </div>
    );
  }
}

export default Day;
