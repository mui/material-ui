import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PickerToolbar from '../_shared/PickerToolbar';
import { useUtils } from '../_shared/hooks/useUtils';
import { ToolbarButton } from '../_shared/ToolbarButton';
import { withDefaultProps } from '../_shared/withDefaultProps';
import { ToolbarComponentProps } from '../Picker/SharedPickerProps';
import { DateRange, CurrentlySelectingRangeEndProps } from './RangeTypes';

const muiComponentConfig = { name: 'MuiPickersDateRangePickerToolbarProps' };
export const useStyles = makeStyles(
  {
    root: {},
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
        className={classes.root}
        toolbarTitle={toolbarTitle}
        isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
        toggleMobileKeyboardView={toggleMobileKeyboardView}
        isLandscape={false}
        penIconClassName={classes.penIcon}
      >
        <div className={classes.dateTextContainer}>
          <ToolbarButton
            variant={start !== null ? 'h5' : 'h6'}
            value={startDateValue}
            selected={currentlySelectingRangeEnd === 'start'}
            onClick={() => setCurrentlySelectingRangeEnd('start')}
          />
          <Typography variant="h5">&nbsp;{'–'}&nbsp;</Typography>
          <ToolbarButton
            variant={end !== null ? 'h5' : 'h6'}
            value={endDateValue}
            selected={currentlySelectingRangeEnd === 'end'}
            onClick={() => setCurrentlySelectingRangeEnd('end')}
          />
        </div>
      </PickerToolbar>
    );
  }
);
