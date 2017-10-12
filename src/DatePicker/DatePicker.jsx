import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import { AppBar, Typography, Toolbar, withStyles } from 'material-ui';

import Calendar from './Calendar';
import YearSelection from './YearSelection';

class DatePicker extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    classes: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: undefined,
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
  }

  state = {
    showYearSelection: false,
  }

  get date() {
    return moment(this.props.value).startOf('day');
  }

  get minDate() {
    return moment(this.props.minDate);
  }

  get maxDate() {
    return moment(this.props.maxDate);
  }

  handleDateChange = (date) => {
    this.props.onChange(date);
  }

  openYearSelection = () => {
    this.setState({ showYearSelection: true });
  }

  openCalendar = () => {
    this.setState({ showYearSelection: false });
  }

  render() {
    const { classes } = this.props;
    const { showYearSelection } = this.state;

    return (
      <div className={classes.container}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Typography
              type="subheading"
              onClick={this.openYearSelection}
              className={classnames(classes.toolbarBtn, {
                [classes.toolbarBtnSelected]: showYearSelection,
              })}
            >
              { this.date.format('YYYY') }
            </Typography>

            <Typography
              type="display1"
              onClick={this.openCalendar}
              className={classnames(classes.toolbarBtn, {
                [classes.toolbarBtnSelected]: !showYearSelection,
              })}
            >
              { this.date.format('ddd, MMM DD') }
            </Typography>
          </Toolbar>
        </AppBar>

        {
          showYearSelection
            ?
              <YearSelection
                date={this.date}
                minDate={this.minDate}
                maxDate={this.maxDate}
                onChange={this.handleDateChange}
              />
            :
              <Calendar
                date={this.date}
                onChange={this.handleDateChange}
              />
        }

      </div>
    );
  }
}

const styles = theme => ({
  container: {
    width: 300,
    height: 420,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 100,
  },
  toolbarBtn: {
    cursor: 'pointer',
    color: theme.palette.common.lightWhite,
  },
  toolbarBtnSelected: {
    color: theme.palette.common.white,
  },
});

export default withStyles(styles)(DatePicker);

