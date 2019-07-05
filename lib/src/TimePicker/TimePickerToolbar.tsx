import * as React from 'react';
import clsx from 'clsx';
import ClockType from '../constants/ClockType';
import ToolbarText from '../_shared/ToolbarText';
import ToolbarButton from '../_shared/ToolbarButton';
import PickerToolbar from '../_shared/PickerToolbar';
import { arrayIncludes } from '../_helpers/utils';
import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { ToolbarComponentProps } from '../Picker/Picker';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { convertToMeridiem, getMeridiem } from '../_helpers/time-utils';

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
  { name: 'MuiPickersTimePickerToolbar' }
);

export function useMeridiemMode(
  date: MaterialUiPickersDate,
  ampm: boolean | undefined,
  onChange: (date: MaterialUiPickersDate, isFinished?: boolean | undefined) => void
) {
  const utils = useUtils();
  const meridiemMode = getMeridiem(date, utils);

  const handleMeridiemChange = React.useCallback(
    (mode: 'am' | 'pm') => {
      const timeWithMeridiem = convertToMeridiem(date, mode, Boolean(ampm), utils);
      onChange(timeWithMeridiem, false);
    },
    [ampm, date, onChange, utils]
  );

  return { meridiemMode, handleMeridiemChange };
}

const TimePickerToolbar: React.FC<ToolbarComponentProps> = ({
  date,
  views,
  ampm,
  openView,
  onChange,
  setOpenView,
}) => {
  const utils = useUtils();
  const theme = useTheme();
  const classes = useStyles();
  const { meridiemMode, handleMeridiemChange } = useMeridiemMode(date, ampm, onChange);

  const hourMinuteClassName =
    theme.direction === 'rtl' ? classes.hourMinuteLabelReverse : classes.hourMinuteLabel;

  return (
    <PickerToolbar
      className={clsx(classes.toolbar, {
        [classes.toolbarLeftPadding]: ampm,
      })}
    >
      <div className={hourMinuteClassName}>
        {arrayIncludes(views, 'hours') && (
          <ToolbarButton
            variant="h2"
            onClick={() => setOpenView(ClockType.HOURS)}
            selected={openView === ClockType.HOURS}
            label={utils.getHourText(date, Boolean(ampm))}
          />
        )}

        {arrayIncludes(views, ['hours', 'minutes']) && (
          <ToolbarText variant="h2" label=":" selected={false} className={classes.separator} />
        )}

        {arrayIncludes(views, 'minutes') && (
          <ToolbarButton
            variant="h2"
            onClick={() => setOpenView(ClockType.MINUTES)}
            selected={openView === ClockType.MINUTES}
            label={utils.getMinuteText(date)}
          />
        )}

        {arrayIncludes(views, ['minutes', 'seconds']) && (
          <ToolbarText variant="h2" label=":" selected={false} className={classes.separator} />
        )}

        {arrayIncludes(views, 'seconds') && (
          <ToolbarButton
            variant="h2"
            onClick={() => setOpenView(ClockType.SECONDS)}
            selected={openView === ClockType.SECONDS}
            label={utils.getSecondText(date)}
          />
        )}
      </div>

      {ampm && (
        <div
          className={clsx(classes.ampmSelection, {
            [classes.ampmSelectionWithSeconds]: arrayIncludes(views, 'seconds'),
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
  );
};

export default TimePickerToolbar;
