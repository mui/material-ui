import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TextField } from 'material-ui';

export default class DateTextField extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    format: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
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
      this.props.onChange(momentValue);
    }
  }

  render() {
    const { value, format, ...other } = this.props;

    return (
      <TextField
        value={this.getDisplayDate()}
        onChange={this.handleChange}
        {...other}
      />
    );
  }
}
