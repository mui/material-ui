import * as React from 'react';
import clsx from 'clsx';
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
    separator: {
      outline: 0,
      margin: '0 4px 0 2px',
      cursor: 'default',
    },
    hourMinuteLabel: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    hourMinuteLabelLandscape: {
      marginTop: 'auto',
    },
    hourMinuteLabelReverse: {
      flexDirection: 'row-reverse',
    },
    ampmSelection: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: 'auto',
      marginLeft: 12,
    },
    ampmLandscape: {
      margin: '4px 0 auto',
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexBasis: '100%',
    },
    ampmLabel: {
      fontSize: 17,
    },
    penIconLandscape: {
      marginTop: 'auto',
    },
  },
  { name: 'MuiPickersTimePickerToolbar' }
);

export function useMeridiemMode(
  date: MaterialUiPickersDate,
  ampm: boolean | undefined,
  onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void
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

const clockTypographyVariant = 'h3';

export const TimePickerToolbar: React.FC<ToolbarComponentProps> = ({
  date,
  views,
  ampm,
  openView,
  onChange,
  isLandscape,
  setOpenView,
  ampmInClock,
  isMobileKeyboardViewOpen,
  toggleMobileKeyboardView,
  title = 'SELECT TIME',
}) => {
  const utils = useUtils();
  const theme = useTheme();
  const classes = useStyles();
  const showAmPmControl = ampm && !ampmInClock;
  const { meridiemMode, handleMeridiemChange } = useMeridiemMode(date, ampm, onChange);

  const separator = (
    <ToolbarText
      tabIndex={-1}
      label=":"
      variant={clockTypographyVariant}
      selected={false}
      className={classes.separator}
    />
  );

  return (
    <PickerToolbar
      landscapeDirection="row"
      title={title}
      isLandscape={isLandscape}
      isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
      toggleMobileKeyboardView={toggleMobileKeyboardView}
      penIconClassName={clsx({ [classes.penIconLandscape]: isLandscape })}
    >
      <div
        className={clsx(classes.hourMinuteLabel, {
          [classes.hourMinuteLabelLandscape]: isLandscape,
          [classes.hourMinuteLabelReverse]: theme.direction === 'rtl',
        })}
      >
        {arrayIncludes(views, 'hours') && (
          <ToolbarButton
            data-mui-test="hours"
            tabIndex={-1}
            variant={clockTypographyVariant}
            onClick={() => setOpenView('hours')}
            selected={openView === 'hours'}
            label={ampm ? utils.format(date, 'hours12h') : utils.format(date, 'hours24h')}
          />
        )}

        {arrayIncludes(views, ['hours', 'minutes']) && separator}

        {arrayIncludes(views, 'minutes') && (
          <ToolbarButton
            data-mui-test="minutes"
            tabIndex={-1}
            variant={clockTypographyVariant}
            onClick={() => setOpenView('minutes')}
            selected={openView === 'minutes'}
            label={utils.format(date, 'minutes')}
          />
        )}

        {arrayIncludes(views, ['minutes', 'seconds']) && separator}

        {arrayIncludes(views, 'seconds') && (
          <ToolbarButton
            data-mui-test="seconds"
            variant={clockTypographyVariant}
            onClick={() => setOpenView('seconds')}
            selected={openView === 'seconds'}
            label={utils.format(date, 'seconds')}
          />
        )}
      </div>

      {showAmPmControl && (
        <div
          className={clsx(classes.ampmSelection, {
            [classes.ampmLandscape]: isLandscape,
          })}
        >
          <ToolbarButton
            disableRipple
            variant="subtitle2"
            data-mui-test="toolbar-am-btn"
            selected={meridiemMode === 'am'}
            typographyClassName={classes.ampmLabel}
            label={utils.getMeridiemText('am')}
            onClick={() => handleMeridiemChange('am')}
          />

          <ToolbarButton
            disableRipple
            variant="subtitle2"
            data-mui-test="toolbar-pm-btn"
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
