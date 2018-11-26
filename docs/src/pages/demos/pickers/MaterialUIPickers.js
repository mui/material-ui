import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/styles/withStyles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

class MuiPickersDemo extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    selectedDate: new Date(),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.pickersContainer} justify="space-around">
          <DatePicker value={selectedDate} onChange={this.handleDateChange} />
          <TimePicker value={selectedDate} onChange={this.handleDateChange} />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

const styles = {
  pickersContainer: {
    width: '60%',
  },
};

export default withStyles(styles)(MuiPickersDemo);
