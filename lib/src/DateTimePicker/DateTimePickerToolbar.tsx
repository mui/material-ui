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
  title = 'SELECT DATE & TIME',
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const showTabs = !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;

  return (
    <>
      <PickerToolbar
        title={title}
        isLandscape={false}
        penIconClassName={classes.penIcon}
        className={classes.toolbar}
      >
        <div className={classes.dateContainer}>
          <ToolbarButton
            variant="subtitle1"
            onClick={() => setOpenView('year')}
            selected={openView === 'year'}
            label={utils.getYearText(date)}
          />

          <ToolbarButton
            variant="h4"
            onClick={() => setOpenView('date')}
            selected={openView === 'date'}
            label={utils.getDateTimePickerHeaderText(date)}
          />
        </div>

        <div className={classes.timeContainer}>
          <ToolbarButton
            variant="h3"
            onClick={() => setOpenView('hours')}
            selected={openView === 'hours'}
            label={utils.getHourText(date, ampm!)}
            typographyClassName={classes.timeTypography}
          />

          <ToolbarText variant="h3" label=":" className={classes.separator} />

          <ToolbarButton
            variant="h3"
            onClick={() => setOpenView('minutes')}
            selected={openView === 'minutes'}
            label={utils.getMinuteText(date)}
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
