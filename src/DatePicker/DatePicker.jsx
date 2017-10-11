import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AppBar, Typography, Toolbar, withStyles } from 'material-ui';
import Calendar from './Calendar';

const datePickerFormat = 'ddd, MMM DD';

class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    classes: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = nextProps => (
    this.props.value !== nextProps.value
  )

  get date() {
    const { value } = this.props;
    return moment(value).startOf('day');
  }

  getDisplayTime = () => moment(this.date).format(datePickerFormat)

  handleDateChange = (date) => {
    this.props.onChange(date);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Typography type="subheading" color="inherit">
              { this.date.format('YYYY') }
            </Typography>
            <Typography type="display1" color="inherit">
              { this.getDisplayTime() }
            </Typography>
          </Toolbar>
        </AppBar>

        <Calendar date={this.date} onDateChange={this.handleDateChange} />
      </div>
    );
  }
}

const styles = {
  container: {
    width: 300,
    height: 400,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 100,
  },
};

export default withStyles(styles)(DatePicker);

