import * as React from 'react';
import PickerToolbar from '../_shared/PickerToolbar';
import Typography from '@material-ui/core/Typography';
import { useUtils } from '../_shared/hooks/useUtils';
import { makeStyles } from '@material-ui/core/styles';
import { ToolbarComponentProps } from '../Picker/Picker';
import { ToolbarButton } from '../_shared/ToolbarButton';
import { withDefaultProps } from '../_shared/withDefaultProps';
import { DateRange, CurrentlySelectingRangeEndProps } from './RangeTypes';

const muiComponentConfig = { name: 'MuiPickersDateRangePickerToolbarProps' };
export const useStyles = makeStyles(
  {
    penIcon: {
      position: 'relative',
      top: 4,
    },
    dateTextContainer: {
      display: 'flex',
    },
  },
  muiComponentConfig
);

interface DateRangePickerToolbarProps
  extends CurrentlySelectingRangeEndProps,
    Pick<
      ToolbarComponentProps,
      'isMobileKeyboardViewOpen' | 'toggleMobileKeyboardView' | 'toolbarTitle' | 'toolbarFormat'
    > {
  date: DateRange;
  startText: React.ReactNode;
  endText: React.ReactNode;
  currentlySelectingRangeEnd: 'start' | 'end';
  setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}

export const DateRangePickerToolbar: React.FC<DateRangePickerToolbarProps> = withDefaultProps(
  muiComponentConfig,
  ({
    currentlySelectingRangeEnd,
    date: [start, end],
    endText,
    isMobileKeyboardViewOpen,
    setCurrentlySelectingRangeEnd,
    startText,
    toggleMobileKeyboardView,
    toolbarFormat,
    toolbarTitle = 'SELECT DATE RANGE',
  }) => {
    const utils = useUtils();
    const classes = useStyles();

    const startDateValue = start
      ? utils.formatByString(start, toolbarFormat || utils.formats.shortDate)
      : startText;

    const endDateValue = end
      ? utils.formatByString(end, toolbarFormat || utils.formats.shortDate)
      : endText;

    return (
      <PickerToolbar
        toolbarTitle={toolbarTitle}
        isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
        toggleMobileKeyboardView={toggleMobileKeyboardView}
        isLandscape={false}
        penIconClassName={classes.penIcon}
      >
        <div className={classes.dateTextContainer}>
          <ToolbarButton
            variant={Boolean(start) ? 'h5' : 'h6'}
            value={startDateValue}
            selected={currentlySelectingRangeEnd === 'start'}
            onClick={() => setCurrentlySelectingRangeEnd('start')}
          />
          <Typography variant="h5">&nbsp;{'–'}&nbsp;</Typography>
          <ToolbarButton
            variant={Boolean(end) ? 'h5' : 'h6'}
            value={endDateValue}
            selected={currentlySelectingRangeEnd === 'end'}
            onClick={() => setCurrentlySelectingRangeEnd('end')}
          />
        </div>
      </PickerToolbar>
    );
  }
);
