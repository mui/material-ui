import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import { AppBar, Typography, Toolbar, withStyles } from 'material-ui';

import Calendar from './Calendar';
import YearSelection from './YearSelection';

class DatePicker extends PureComponent {
  static propTypes = {
    date: PropTypes.object,
    minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    classes: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    disableFuture: PropTypes.bool,
    animateYearScrolling: PropTypes.bool,
  }

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disableFuture: false,
    animateYearScrolling: true,
  }

  state = {
    showYearSelection: false,
  }

  get date() {
    return this.props.date.startOf('day');
  }

  get minDate() {
    return moment(this.props.minDate);
  }

  get maxDate() {
    return moment(this.props.maxDate);
  }

  openYearSelection = () => {
    this.setState({ showYearSelection: true });
  }

  openCalendar = () => {
    this.setState({ showYearSelection: false });
  }

  render() {
    const {
      classes, disableFuture, onChange, animateYearScrolling,
    } = this.props;
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
                onChange={onChange}
                minDate={this.minDate}
                maxDate={this.maxDate}
                disableFuture={disableFuture}
                animateYearScrolling={animateYearScrolling}
              />
            :
              <Calendar
                date={this.date}
                onChange={onChange}
                disableFuture={disableFuture}
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

