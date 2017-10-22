import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, withStyles } from 'material-ui';
import ToolbarButton from '../_shared/ToolbarButton';
import pickerStyles from '../styles/pickerStyles';
import HourView from './HourView';
import MinutesView from './MinutesView';

class TimePicker extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  state = {
    isHourViewShown: true,
    meridiemMode: this.props.date.format('a'),
  }

  setMeridiemMode = mode => () => {
    this.setState(
      { meridiemMode: mode },
      () => this.handleChange(this.props.date),
    );
  }

  handleChange = (time) => {
    const { meridiemMode } = this.state;

    if (time.format('a') !== meridiemMode) {
      const hours = meridiemMode === 'am'
        ? time.hours() - 12
        : time.hours() + 12;

      time = time.clone().hours(hours);
    }

    this.props.onChange(time);
  }

  openMinutesView = () => {
    this.setState({ isHourViewShown: false });
  }

  openHourView = () => {
    this.setState({ isHourViewShown: true });
  }

  render() {
    const { classes, date } = this.props;
    const { isHourViewShown, meridiemMode } = this.state;

    return (
      <div className={classes.container}>
        <Toolbar className={classes.toolbar}>
          <ToolbarButton
            type="display3"
            onClick={this.openHourView}
            selected={isHourViewShown}
            label={date.format('hh')}
          />

          <ToolbarButton
            type="display3"
            label=":"
            selected={false}
            className={classes.separator}
          />

          <ToolbarButton
            type="display3"
            onClick={this.openMinutesView}
            selected={!isHourViewShown}
            label={date.format('mm')}
          />

          <div className={classes.ampmSelection}>
            <ToolbarButton
              className={classes.ampmLabel}
              selected={meridiemMode === 'am'}
              type="subheading"
              label="AM"
              onClick={this.setMeridiemMode('am')}
            />
            <ToolbarButton
              className={classes.ampmLabel}
              selected={meridiemMode === 'pm'}
              type="subheading"
              label="PM"
              onClick={this.setMeridiemMode('pm')}
            />
          </div>
        </Toolbar>

        {
          isHourViewShown
            ?
              <HourView
                date={date}
                onChange={this.handleChange}
              />
            :
              <MinutesView
                date={date}
                onChange={this.handleChange}
              />
        }
      </div>

    );
  }
}

const styles = (theme) => {
  const globalStyles = pickerStyles(theme);

  return {
    ...globalStyles,
    toolbar: {
      ...globalStyles.toolbar,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 50,
    },
    separator: {
      margin: '0 2px 0 4px',
      cursor: 'default',
    },
    ampmSelection: {
      marginLeft: 20,
      marginRight: -20,
    },
    ampmLabel: {
      fontSize: 18,
    },
  };
};

export default withStyles(styles, { name: 'MuiPickersTimePicker' })(TimePicker);
