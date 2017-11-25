import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import HourView from './HourView';
import MinutesView from './MinutesView';
import { convertToMeridiem } from './utils/time-utils';
import * as defaultUtils from '../_shared/utils';

export class TimePicker extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node,
    utils: PropTypes.object,
  }

  static defaultProps = {
    children: null,
    utils: defaultUtils,
  }

  state = {
    isHourViewShown: true,
    meridiemMode: this.props.date.hours() >= 12 ? 'pm' : 'am',
  }

  setMeridiemMode = mode => () => {
    this.setState(
      { meridiemMode: mode },
      () => this.handleChange(false)(this.props.date, false),
    );
  }

  handleChange = openMinutes => (time, isFinish) => {
    const withMeridiem = convertToMeridiem(time, this.state.meridiemMode);

    if (isFinish) {
      if (!openMinutes) {
        this.props.onChange(withMeridiem, isFinish);
        return;
      }

      this.openMinutesView();
    }

    this.props.onChange(withMeridiem, false);
  }

  openMinutesView = () => {
    this.setState({ isHourViewShown: false });
  }

  openHourView = () => {
    this.setState({ isHourViewShown: true });
  }

  render() {
    const { classes, theme, date, utils } = this.props;
    const { isHourViewShown, meridiemMode } = this.state;

    const rtl = theme.direction === 'rtl';
    const hourMinuteClassname = rtl
      ? classes.hourMinuteLabelReverse
      : classes.hourMinuteLabel;

    return (
      <div className={classes.container}>
        <PickerToolbar className={classes.toolbar}>
          <div className={hourMinuteClassname}>
            <ToolbarButton
              type="display3"
              onClick={this.openHourView}
              selected={isHourViewShown}
              label={utils.getHourText(date)}
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
              label={utils.getMinuteText(date)}
            />
          </div>

          <div className={classes.ampmSelection}>
            <ToolbarButton
              className={classes.ampmLabel}
              selected={meridiemMode === 'am'}
              type="subheading"
              label={utils.getMeridiemText('am')}
              onClick={this.setMeridiemMode('am')}
            />

            <ToolbarButton
              className={classes.ampmLabel}
              selected={meridiemMode === 'pm'}
              type="subheading"
              label={utils.getMeridiemText('pm')}
              onClick={this.setMeridiemMode('pm')}
            />
          </div>
        </PickerToolbar>

        {this.props.children}

        {
          isHourViewShown
            ?
            <HourView
              date={date}
              meridiemMode={meridiemMode}
              onChange={this.handleChange(true)}
              utils={utils}
            />
            :
            <MinutesView
              date={date}
              onChange={this.handleChange(false)}
              utils={utils}
            />
        }
      </div>

    );
  }
}

const styles = () => ({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 50,
  },
  separator: {
    margin: '0 4px 0 2px',
    cursor: 'default',
  },
  ampmSelection: {
    marginLeft: 20,
    marginRight: -20,
  },
  ampmLabel: {
    fontSize: 18,
  },
  hourMinuteLabel: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  hourMinuteLabelReverse: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
  },
});

export default withStyles(
  styles,
  { withTheme: true, name: 'MuiPickersTimePicker' },
)(TimePicker);
