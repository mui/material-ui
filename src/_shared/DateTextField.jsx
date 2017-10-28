import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TextField } from 'material-ui';

export default class DateTextField extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    format: PropTypes.string.isRequired,
    // onChange: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = nextProps => (
    this.props.value !== nextProps.value ||
    this.props.format !== nextProps.format
  )

  getDisplayDate = () => {
    const { value, format } = this.props;

    return moment(value).format(format);
  }

  handleChange = (e) => {
    const { value } = e.target;
    const momentValue = moment(value);

    if (momentValue.isValid()) {
      console.warn('Currently not supported keyboad input');
      // this.props.onChange(momentValue);
    }
  }

  render() {
    const { value, format, ...other } = this.props;

    return (
      <TextField
        readOnly
        value={this.getDisplayDate()}
        onChange={this.handleChange}
        {...other}
      />
    );
  }
}
