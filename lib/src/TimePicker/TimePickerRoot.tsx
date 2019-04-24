import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import ClockType from '../constants/ClockType';
import ToolbarText from '../_shared/ToolbarText';
import ToolbarButton from '../_shared/ToolbarButton';
import PickerToolbar from '../_shared/PickerToolbar';
import TimePickerView from './components/TimePickerView';
import { Theme } from '@material-ui/core';
import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { convertToMeridiem } from '../_helpers/time-utils';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { MeridiemMode } from '../DateTimePicker/components/DateTimePickerHeader';

export interface BaseTimePickerProps {
  /**
   * 12h/24h view for hour selection clock
   * @default true
   */
  ampm?: boolean;
  /**
   * Step over minutes
   * @default 1
   */
  minutesStep?: number;
  /** Show the seconds view */
  seconds?: boolean;
}

export const useStyles = makeStyles(
  {
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
      display: 'flex',
      flexDirection: 'column',
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
  },
  { name: 'MuiPickersTimePicker' }
);

export interface TimePickerProps extends BaseTimePickerProps {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
}

const TimePickerRoot: React.FC<TimePickerProps> = ({
  date,
  ampm,
  onChange,
  seconds,
  minutesStep,
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const [openView, setOpenView] = React.useState<ClockType>(ClockType.HOURS);

  const meridiemMode = utils.getHours(date) >= 12 ? 'pm' : 'am';
  const hourMinuteClassName =
    theme.direction === 'rtl' ? classes.hourMinuteLabelReverse : classes.hourMinuteLabel;

  const handleMeridiemChange = React.useCallback(
    (mode: MeridiemMode) => {
      const timeWithMeridiem = convertToMeridiem(date, mode, Boolean(ampm), utils);

      onChange(timeWithMeridiem, false);
    },
    [ampm, date, onChange, utils]
  );

  const handleChangeAndOpenNext = React.useCallback(
    (nextView: ClockType | null) => {
      return (time: MaterialUiPickersDate, isFinish?: boolean) => {
        const timeWithMeridiem = convertToMeridiem(time, meridiemMode, Boolean(ampm), utils);

        if (isFinish && nextView) {
          // do not close picker if needs to show next view
          onChange(timeWithMeridiem, false);
          setOpenView(nextView);

          return;
        }

        onChange(timeWithMeridiem, isFinish);
      };
    },
    [ampm, meridiemMode, onChange, utils]
  );

  return (
    <>
      <PickerToolbar
        className={clsx(classes.toolbar, {
          [classes.toolbarLeftPadding]: ampm,
        })}
      >
        <div className={hourMinuteClassName}>
          <ToolbarButton
            variant="h2"
            onClick={() => setOpenView(ClockType.HOURS)}
            selected={openView === ClockType.HOURS}
            label={utils.getHourText(date, Boolean(ampm))}
          />

          <ToolbarText variant="h2" label=":" selected={false} className={classes.separator} />

          <ToolbarButton
            variant="h2"
            onClick={() => setOpenView(ClockType.MINUTES)}
            selected={openView === ClockType.MINUTES}
            label={utils.getMinuteText(date)}
          />

          {seconds && (
            <>
              <ToolbarText variant="h2" label=":" selected={false} className={classes.separator} />

              <ToolbarButton
                variant="h2"
                onClick={() => setOpenView(ClockType.SECONDS)}
                selected={openView === ClockType.SECONDS}
                label={utils.getSecondText(date)}
              />
            </>
          )}
        </div>

        {ampm && (
          <div
            className={clsx(classes.ampmSelection, {
              [classes.ampmSelectionWithSeconds]: seconds,
            })}
          >
            <ToolbarButton
              disableRipple
              variant="subtitle1"
              selected={meridiemMode === 'am'}
              typographyClassName={classes.ampmLabel}
              label={utils.getMeridiemText('am')}
              onClick={() => handleMeridiemChange('am')}
            />

            <ToolbarButton
              disableRipple
              variant="subtitle1"
              selected={meridiemMode === 'pm'}
              typographyClassName={classes.ampmLabel}
              label={utils.getMeridiemText('pm')}
              onClick={() => handleMeridiemChange('pm')}
            />
          </div>
        )}
      </PickerToolbar>

      <TimePickerView
        ampm={ampm}
        date={date}
        type={openView}
        minutesStep={minutesStep}
        onHourChange={handleChangeAndOpenNext(ClockType.MINUTES)}
        onMinutesChange={handleChangeAndOpenNext(seconds ? ClockType.SECONDS : null)}
        onSecondsChange={handleChangeAndOpenNext(null)}
      />
    </>
  );
};

TimePickerRoot.propTypes = {
  ampm: PropTypes.bool,
  seconds: PropTypes.bool,
  minutesStep: PropTypes.number,
};

TimePickerRoot.defaultProps = {
  ampm: true,
  seconds: false,
  minutesStep: 1,
};

export default TimePickerRoot;
