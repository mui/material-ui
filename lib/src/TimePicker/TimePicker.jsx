import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import HourView from './HourView';
import MinutesView from './MinutesView';
import { convertToMeridiem } from '../_helpers/time-utils';
import withUtils from '../_shared/WithUtils';

export class TimePicker extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node,
    utils: PropTypes.func.isRequired,
    ampm: PropTypes.bool,
  }

  static defaultProps = {
    children: null,
    ampm: true,
  }

  state = {
    isHourViewShown: true,
    meridiemMode: this.props.utils.getHours(this.props.date) >= 12 ? 'pm' : 'am',
  }

  setMeridiemMode = mode => () => {
    this.setState(
      { meridiemMode: mode },
      () => this.handleChange(this.props.date, false, false),
    );
  }

  handleChange(time, isFinish, openMinutes) {
    const withMeridiem = convertToMeridiem(
      time,
      this.state.meridiemMode,
      this.props.ampm,
      this.props.utils,
    );

    if (isFinish) {
      if (!openMinutes) {
        this.props.onChange(withMeridiem, isFinish);
        return;
      }

      this.openMinutesView();
    }

    this.props.onChange(withMeridiem, false);
  }


  handleHourChange = (time, isFinish) => {
    this.handleChange(time, isFinish, true);
  }

  handleMinutesChange = (time, isFinish) => {
    this.handleChange(time, isFinish, false);
  }

  openMinutesView = () => {
    this.setState({ isHourViewShown: false });
  }

  openHourView = () => {
    this.setState({ isHourViewShown: true });
  }

  render() {
    const {
      classes, theme, date, utils, ampm,
    } = this.props;

    const { isHourViewShown, meridiemMode } = this.state;

    const rtl = theme.direction === 'rtl';
    const hourMinuteClassName = rtl
      ? classes.hourMinuteLabelReverse
      : classes.hourMinuteLabel;

    return (
      <Fragment>
        <PickerToolbar className={classes.toolbar}>
          <div className={hourMinuteClassName}>
            <ToolbarButton
              variant="display3"
              onClick={this.openHourView}
              selected={isHourViewShown}
              label={utils.format(date, ampm ? 'hh' : 'HH')}
            />

            <ToolbarButton
              variant="display3"
              label=":"
              selected={false}
              className={classes.separator}
            />

            <ToolbarButton
              variant="display3"
              onClick={this.openMinutesView}
              selected={!isHourViewShown}
              label={utils.format(date, 'mm')}
            />
          </div>

          {
            ampm &&
              <div className={classes.ampmSelection}>
                <ToolbarButton
                  className={classes.ampmLabel}
                  selected={meridiemMode === 'am'}
                  variant="subheading"
                  label={utils.getMeridiemText('am')}
                  onClick={this.setMeridiemMode('am')}
                />

                <ToolbarButton
                  className={classes.ampmLabel}
                  selected={meridiemMode === 'pm'}
                  variant="subheading"
                  label={utils.getMeridiemText('pm')}
                  onClick={this.setMeridiemMode('pm')}
                />
              </div>
          }
        </PickerToolbar>

        {this.props.children}

        {
          isHourViewShown
            ?
              <HourView
                date={date}
                meridiemMode={meridiemMode}
                onChange={this.handleHourChange}
                utils={utils}
                ampm={ampm}
              />
            :
              <MinutesView
                date={date}
                onChange={this.handleMinutesChange}
                utils={utils}
              />
        }
      </Fragment>
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
)(withUtils()(TimePicker));
