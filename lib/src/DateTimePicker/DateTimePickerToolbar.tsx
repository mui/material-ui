import * as React from 'react';
import ToolbarText from '../_shared/ToolbarText';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import DateTimePickerTabs from './DateTimePickerTabs';
import { useUtils } from '../_shared/hooks/useUtils';
import { DateTimePickerView } from './DateTimePicker';
import { makeStyles } from '@material-ui/core/styles';
import { ToolbarComponentProps } from '../Picker/Picker';

export const useStyles = makeStyles(
  _ => ({
    toolbar: {
      paddingLeft: 16,
      paddingRight: 16,
      justifyContent: 'space-around',
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default',
    },
    timeContainer: {
      display: 'flex',
    },
    dateContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    timeTypography: {},
    penIcon: {
      position: 'absolute',
      top: 8,
      right: 8,
    },
  }),
  { name: 'MuiPickerDTToolbar' }
);

export const DateTimePickerToolbar: React.FC<ToolbarComponentProps> = ({
  date,
  openView,
  setOpenView,
  ampm,
  hideTabs,
  dateRangeIcon,
  timeIcon,
  toolbarFormat,
  isMobileKeyboardViewOpen,
  toggleMobileKeyboardView,
  toolbarTitle = 'SELECT DATE & TIME',
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const showTabs = !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;

  return (
    <>
      <PickerToolbar
        toolbarTitle={toolbarTitle}
        isLandscape={false}
        penIconClassName={classes.penIcon}
        className={classes.toolbar}
        isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
        toggleMobileKeyboardView={toggleMobileKeyboardView}
      >
        <div className={classes.dateContainer}>
          <ToolbarButton
            tabIndex={-1}
            variant="subtitle1"
            onClick={() => setOpenView('year')}
            selected={openView === 'year'}
            label={utils.format(date, 'year')}
          />

          <ToolbarButton
            tabIndex={-1}
            variant="h4"
            onClick={() => setOpenView('date')}
            selected={openView === 'date'}
            label={
              toolbarFormat
                ? utils.formatByString(date, toolbarFormat)
                : utils.format(date, 'shortDate')
            }
          />
        </div>

        <div className={classes.timeContainer}>
          <ToolbarButton
            tabIndex={-1}
            variant="h3"
            onClick={() => setOpenView('hours')}
            selected={openView === 'hours'}
            label={ampm ? utils.format(date, 'hours12h') : utils.format(date, 'hours24h')}
            typographyClassName={classes.timeTypography}
          />

          <ToolbarText variant="h3" label=":" className={classes.separator} />

          <ToolbarButton
            tabIndex={-1}
            variant="h3"
            onClick={() => setOpenView('minutes')}
            selected={openView === 'minutes'}
            label={utils.format(date, 'minutes')}
            typographyClassName={classes.timeTypography}
          />
        </div>
      </PickerToolbar>

      {showTabs && (
        <DateTimePickerTabs
          dateRangeIcon={dateRangeIcon}
          timeIcon={timeIcon}
          view={openView as DateTimePickerView}
          onChange={setOpenView}
        />
      )}
    </>
  );
};
