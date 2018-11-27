import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/styles/withStyles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

const styles = {
  pickersContainer: {
    width: '60%',
  },
};

class MuiPickersDemo extends React.Component {
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
          <DatePicker label="Date picker" value={selectedDate} onChange={this.handleDateChange} />
          <TimePicker label="Time picker" value={selectedDate} onChange={this.handleDateChange} />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(MuiPickersDemo);
