import * as React from 'react';
import ToolbarText from '../_shared/ToolbarText';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import DateTimePickerTabs from './DateTimePickerTabs';
import { Grid } from '@material-ui/core';
import { useUtils } from '../_shared/hooks/useUtils';
import { makeStyles } from '@material-ui/core/styles';
import { DateTimePickerView } from './DateTimePicker';
import { ToolbarComponentProps } from '../Picker/Picker';
import { useMeridiemMode } from '../TimePicker/TimePickerToolbar';

export const useStyles = makeStyles(
  _ => ({
    toolbar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 12,
      justifyContent: 'space-around',
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default',
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
  onChange,
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const showTabs = !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;
  const { meridiemMode, handleMeridiemChange } = useMeridiemMode(date, ampm, onChange);

  return (
    <>
      <PickerToolbar className={classes.toolbar}>
        <Grid container justify="center" wrap="nowrap">
          <Grid item container xs={5} direction="row">
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
          </Grid>

          <Grid item container xs={6} justify="center" alignItems="flex-end">
            <ToolbarButton
              variant="h3"
              onClick={() => setOpenView('hours')}
              selected={openView === 'hours'}
              label={utils.getHourText(date, ampm!)}
            />

            <ToolbarText variant="h3" label=":" className={classes.separator} />

            <ToolbarButton
              variant="h3"
              onClick={() => setOpenView('minutes')}
              selected={openView === 'minutes'}
              label={utils.getMinuteText(date)}
            />
          </Grid>

          {ampm && (
            <Grid item container xs={1} direction="column" justify="flex-end">
              <ToolbarButton
                variant="subtitle1"
                selected={meridiemMode === 'am'}
                label={utils.getMeridiemText('am')}
                onClick={() => handleMeridiemChange('am')}
              />

              <ToolbarButton
                variant="subtitle1"
                selected={meridiemMode === 'pm'}
                label={utils.getMeridiemText('pm')}
                onClick={() => handleMeridiemChange('pm')}
              />
            </Grid>
          )}
        </Grid>
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
