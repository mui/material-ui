import * as React from 'react';
import clsx from 'clsx';
import { useTheme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import ToolbarText from '../internal/pickers/PickersToolbarText';
import ToolbarButton from '../internal/pickers/PickersToolbarButton';
import PickerToolbar from '../internal/pickers/PickersToolbar';
import { arrayIncludes } from '../internal/pickers/utils';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { useMeridiemMode } from '../internal/pickers/hooks/date-helpers-hooks';
import { ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';

export const styles = createStyles({
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
});

export type TimePickerToolbarClassKey = keyof WithStyles<typeof styles>['classes'];

const clockTypographyVariant = 'h3';

/**
 * @ignore - internal component.
 */
const TimePickerToolbar: React.FC<ToolbarComponentProps & WithStyles<typeof styles>> = (props) => {
  const {
    ampm,
    ampmInClock,
    classes,
    date,
    isLandscape,
    isMobileKeyboardViewOpen,
    onChange,
    openView,
    setOpenView,
    toggleMobileKeyboardView,
    toolbarTitle = 'SELECT TIME',
    views,
    ...other
  } = props;
  const utils = useUtils();
  const theme = useTheme();
  const showAmPmControl = Boolean(ampm && !ampmInClock);
  const { meridiemMode, handleMeridiemChange } = useMeridiemMode(date, ampm, onChange);

  const formatHours = (time: unknown) =>
    ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');

  const separator = (
    <ToolbarText
      tabIndex={-1}
      value=":"
      variant={clockTypographyVariant}
      selected={false}
      className={classes.separator}
    />
  );

  return (
    <PickerToolbar
      landscapeDirection="row"
      toolbarTitle={toolbarTitle}
      isLandscape={isLandscape}
      isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
      toggleMobileKeyboardView={toggleMobileKeyboardView}
      penIconClassName={clsx({ [classes.penIconLandscape]: isLandscape })}
      {...other}
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
            value={date ? formatHours(date) : '--'}
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
            value={date ? utils.format(date, 'minutes') : '--'}
          />
        )}
        {arrayIncludes(views, ['minutes', 'seconds']) && separator}
        {arrayIncludes(views, 'seconds') && (
          <ToolbarButton
            data-mui-test="seconds"
            variant={clockTypographyVariant}
            onClick={() => setOpenView('seconds')}
            selected={openView === 'seconds'}
            value={date ? utils.format(date, 'seconds') : '--'}
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
            value={utils.getMeridiemText('am')}
            onClick={() => handleMeridiemChange('am')}
          />
          <ToolbarButton
            disableRipple
            variant="subtitle2"
            data-mui-test="toolbar-pm-btn"
            selected={meridiemMode === 'pm'}
            typographyClassName={classes.ampmLabel}
            value={utils.getMeridiemText('pm')}
            onClick={() => handleMeridiemChange('pm')}
          />
        </div>
      )}
    </PickerToolbar>
  );
};

export default withStyles(styles, { name: 'MuiTimePickerToolbar' })(TimePickerToolbar);
