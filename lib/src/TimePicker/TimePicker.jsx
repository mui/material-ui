import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Fade from '@material-ui/core/Fade';

import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import HourView from './HourView';
import MinutesView from './MinutesView';
import SecondsView from './SecondsView';
import { convertToMeridiem } from '../_helpers/time-utils';
import withUtils from '../_shared/WithUtils';

export class TimePicker extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node,
    utils: PropTypes.object.isRequired,
    ampm: PropTypes.bool,
    fadeTimeout: PropTypes.number.isRequired,
    seconds: PropTypes.bool,
  }

  static defaultProps = {
    children: null,
    ampm: true,
    seconds: false,
  }

  state = {
    isHourViewShown: true,
    isMinuteViewShown: false,
    meridiemMode: this.props.utils.getHours(this.props.date) >= 12 ? 'pm' : 'am',
  }

  setMeridiemMode = mode => () => {
    this.setState(
      { meridiemMode: mode },
      () => this.handleChange({
        time: this.props.date,
        isFinish: false,
        openMinutes: false,
        openSeconds: false,
      }),
    );
  }

  handleChange(params) {
    const {
      time,
      isFinish,
      openMinutes,
      openSeconds,
    } = params;

    const withMeridiem = convertToMeridiem(
      time,
      this.state.meridiemMode,
      this.props.ampm,
      this.props.utils,
    );

    if (isFinish) {
      if (!openMinutes && !openSeconds) {
        this.props.onChange(withMeridiem, isFinish);
        return;
      }

      if (openMinutes) {
        this.openMinutesView();
      }

      if (openSeconds) {
        this.openSecondsView();
      }
    }

    this.props.onChange(withMeridiem, false);
  }

  handleHourChange = (time, isFinish) => {
    this.handleChange({
      time,
      isFinish,
      openMinutes: true,
      openSeconds: false,
    });
  }

  handleMinutesChange = (time, isFinish) => {
    this.handleChange({
      time,
      isFinish,
      openMinutes: false,
      openSeconds: true,
    });
  }

  handleSecondsChange = (time, isFinish) => {
    this.handleChange({
      time,
      isFinish,
      openMinutes: false,
      openSeconds: false,
    });
  }

  openSecondsView = () => {
    this.setState({ isHourViewShown: false, isMinuteViewShown: false });
  }

  openMinutesView = () => {
    this.setState({ isHourViewShown: false, isMinuteViewShown: true });
  }

  openHourView = () => {
    this.setState({ isHourViewShown: true, isMinuteViewShown: false });
  }

  render() {
    const {
      classes, theme, date, utils, ampm, fadeTimeout, seconds,
    } = this.props;

    const { isHourViewShown, isMinuteViewShown, meridiemMode } = this.state;

    const rtl = theme.direction === 'rtl';
    const hourMinuteClassName = rtl
      ? classes.hourMinuteLabelReverse
      : classes.hourMinuteLabel;

    return (
      <Fragment>
        <PickerToolbar
          className={classnames(
            classes.toolbar,
            { [classes.toolbarLeftPadding]: ampm },
          )}
        >
          <div className={hourMinuteClassName}>
            <ToolbarButton
              variant="display3"
              onClick={this.openHourView}
              selected={isHourViewShown}
              label={utils.getHourText(date, ampm)}
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
              selected={isMinuteViewShown}
              label={utils.getMinuteText(date)}
            />

            {
              seconds &&
                <Fragment>
                  <ToolbarButton
                    variant="display3"
                    label=":"
                    selected={false}
                    className={classes.separator}
                  />

                  <ToolbarButton
                    variant="display3"
                    onClick={this.openSecondsView}
                    selected={!isHourViewShown && !isMinuteViewShown}
                    label={utils.getSecondText(date)}
                  />
                </Fragment>
            }
          </div>

          {
            ampm &&
              <div className={seconds ? classes.ampmSelectionWithSeconds : classes.ampmSelection}>
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

        <div className={classes.viewContainer}>
          <Fade
            timeout={fadeTimeout}
            in={isHourViewShown}
            mountOnEnter
            unmountOnExit
          >
            <div className={classes.viewRoot}>
              <HourView
                date={date}
                meridiemMode={meridiemMode}
                onChange={this.handleHourChange}
                utils={utils}
                ampm={ampm}
              />
            </div>
          </Fade>

          <Fade
            timeout={fadeTimeout}
            in={isMinuteViewShown}
            mountOnEnter
            unmountOnExit
          >
            <div className={classes.viewRoot}>
              <MinutesView
                date={date}
                onChange={this.handleMinutesChange}
                utils={utils}
              />
            </div>
          </Fade>

          <Fade
            timeout={fadeTimeout}
            in={!isHourViewShown && !isMinuteViewShown}
            mountOnEnter
            unmountOnExit
          >
            <div className={classes.viewRoot}>
              <SecondsView
                date={date}
                onChange={this.handleSecondsChange}
                utils={utils}
              />
            </div>
          </Fade>
        </div>
      </Fragment>
    );
  }
}

const styles = () => ({
  viewContainer: {
    position: 'relative',
    minHeight: 300,
    minWidth: 260,
  },
  viewRoot: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarLeftPadding: {
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
  ampmSelectionWithSeconds: {
    marginLeft: 15,
    marginRight: 10,
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
