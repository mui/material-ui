import * as React from 'react';
import clsx from 'clsx';
import PickerToolbar from '../_shared/PickerToolbar';
import { DatePickerView } from './DatePicker';
import { useUtils } from '../_shared/hooks/useUtils';
import { ToolbarComponentProps } from '../Picker/Picker';
import { Typography, makeStyles } from '@material-ui/core';
import { isYearAndMonthViews, isYearOnlyView } from '../_helpers/date-utils';

export const useStyles = makeStyles(
  {
    dateTitleLandscape: {
      margin: 'auto 16px auto auto',
    },
    penIcon: {
      position: 'relative',
      top: 4,
    },
  },
  { name: 'MuiPickersDatePickerRoot' }
);

export const DatePickerToolbar: React.FC<ToolbarComponentProps> = ({
  date,
  views,
  isLandscape,
  isMobileKeyboardViewOpen,
  toggleMobileKeyboardView,
  title = 'SELECT DATE',
}) => {
  const utils = useUtils();
  const classes = useStyles();

  const dateText = React.useMemo(() => {
    if (isYearOnlyView(views as DatePickerView[])) {
      return utils.format(date, 'year');
    }

    if (isYearAndMonthViews(views as DatePickerView[])) {
      return utils.format(date, 'month');
    }

    return utils.format(date, 'normalDate');
  }, [date, utils, views]);

  return (
    <PickerToolbar
      title={title}
      isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
      toggleMobileKeyboardView={toggleMobileKeyboardView}
      isLandscape={isLandscape}
      penIconClassName={classes.penIcon}
    >
      <Typography
        variant="h4"
        children={dateText}
        align={isLandscape ? 'left' : 'center'}
        className={clsx({ [classes.dateTitleLandscape]: isLandscape })}
      />
    </PickerToolbar>
  );
};
