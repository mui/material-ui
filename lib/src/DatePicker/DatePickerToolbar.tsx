import * as React from 'react';
import clsx from 'clsx';
import ToolbarButton from '../_shared/ToolbarButton';
import PickerToolbar from '../_shared/PickerToolbar';
import { useUtils } from '../_shared/hooks/useUtils';
import { makeStyles } from '@material-ui/core/styles';
import { ToolbarComponentProps } from '../Picker/Picker';
import { isYearAndMonthViews, isYearOnlyView } from '../_helpers/date-utils';

export const useStyles = makeStyles(
  {
    toolbar: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    toolbarLandscape: {
      padding: 16,
    },
    dateLandscape: {
      marginRight: 16,
    },
  },
  { name: 'MuiPickersDatePickerRoot' }
);

export const DatePickerToolbar: React.FC<ToolbarComponentProps> = ({
  date,
  views,
  setOpenView,
  isLandscape,
  openView,
}) => {
  const utils = useUtils();
  const classes = useStyles();

  const isYearOnly = React.useMemo(() => isYearOnlyView(views as any), [views]);
  const isYearAndMonth = React.useMemo(() => isYearAndMonthViews(views as any), [views]);

  return (
    <PickerToolbar
      isLandscape={isLandscape}
      className={clsx({
        [classes.toolbar]: !isYearOnly,
        [classes.toolbarLandscape]: isLandscape,
      })}
    >
      <ToolbarButton
        variant={isYearOnly ? 'h3' : 'subtitle1'}
        onClick={() => setOpenView('year')}
        selected={openView === 'year'}
        label={utils.getYearText(date)}
      />

      {!isYearOnly && !isYearAndMonth && (
        <ToolbarButton
          variant="h4"
          selected={openView === 'date'}
          onClick={() => setOpenView('date')}
          align={isLandscape ? 'left' : 'center'}
          label={utils.getDatePickerHeaderText(date)}
          className={clsx({ [classes.dateLandscape]: isLandscape })}
        />
      )}

      {isYearAndMonth && (
        <ToolbarButton
          variant="h4"
          onClick={() => setOpenView('month')}
          selected={openView === 'month'}
          label={utils.getMonthText(date)}
        />
      )}
    </PickerToolbar>
  );
};
