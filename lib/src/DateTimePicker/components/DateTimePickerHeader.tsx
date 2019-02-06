import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import PickerToolbar from '../../_shared/PickerToolbar';
import ToolbarButton from '../../_shared/ToolbarButton';
import { withUtils, WithUtilsProps } from '../../_shared/WithUtils';
import DateTimePickerView, { DateTimePickerViewType } from '../../constants/DateTimePickerView';
import { MaterialUiPickersDate } from '../../typings/date';

export const styles = (theme: Theme) =>
  createStyles({
    toolbar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      justifyContent: 'space-around',
    },
    toolBar24h: {
      paddingLeft: 32,
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default',
    },
    hourMinuteLabel: {
      top: 10,
      position: 'relative',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: theme.direction === 'rtl' ? 'row-reverse' : 'row',
    },
    dateHeader: {
      height: 60,
      minWidth: 110,
      marginRight: 4,
    },
    timeHeader: {
      height: 65,
      minWidth: 155,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    ampmSelection: {
      top: 11,
      position: 'relative',
      marginLeft: 10,
      marginRight: -10,
    },
    ampmLabel: {
      fontSize: 18,
    },
  });

export type MeridiemMode = 'am' | 'pm';
export interface DateTimePickerHeaderProps extends WithUtilsProps, WithStyles<typeof styles> {
  date: MaterialUiPickersDate;
  meridiemMode: MeridiemMode;
  openView: DateTimePickerViewType;
  onOpenViewChange: (view: DateTimePickerView) => void;
  setMeridiemMode: (mode: MeridiemMode) => () => void;
  ampm?: boolean;
}

export const DateTimePickerHeader: React.SFC<DateTimePickerHeaderProps> = ({
  date,
  classes,
  openView,
  meridiemMode,
  onOpenViewChange,
  setMeridiemMode,
  utils,
  ampm,
}) => {
  return (
    <PickerToolbar className={clsx(classes.toolbar, { [classes.toolBar24h]: !ampm })}>
      <div className={classes.dateHeader}>
        <ToolbarButton
          variant="subtitle1"
          onClick={() => onOpenViewChange(DateTimePickerView.YEAR)}
          selected={openView === DateTimePickerView.YEAR}
          label={utils.getYearText(date)}
        />

        <ToolbarButton
          variant="h4"
          onClick={() => onOpenViewChange(DateTimePickerView.DATE)}
          selected={openView === DateTimePickerView.DATE}
          label={utils.getDateTimePickerHeaderText(date)}
        />
      </div>

      <div className={classes.timeHeader}>
        <div className={classes.hourMinuteLabel}>
          <ToolbarButton
            variant="h3"
            onClick={() => onOpenViewChange(DateTimePickerView.HOUR)}
            selected={openView === DateTimePickerView.HOUR}
            label={utils.getHourText(date, ampm!)}
          />

          <ToolbarButton variant="h3" label=":" selected={false} className={classes.separator} />

          <ToolbarButton
            variant="h3"
            onClick={() => onOpenViewChange(DateTimePickerView.MINUTES)}
            selected={openView === DateTimePickerView.MINUTES}
            label={utils.getMinuteText(date)}
          />
        </div>

        {ampm && (
          <div className={classes.ampmSelection}>
            <ToolbarButton
              className={classes.ampmLabel}
              selected={meridiemMode === 'am'}
              variant="subtitle1"
              label={utils.getMeridiemText('am')}
              onClick={setMeridiemMode('am')}
            />

            <ToolbarButton
              className={classes.ampmLabel}
              selected={meridiemMode === 'pm'}
              variant="subtitle1"
              label={utils.getMeridiemText('pm')}
              onClick={setMeridiemMode('pm')}
            />
          </div>
        )}
      </div>
    </PickerToolbar>
  );
};

(DateTimePickerHeader as any).propTypes = {
  date: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  meridiemMode: PropTypes.string.isRequired,
  utils: PropTypes.object.isRequired,
  ampm: PropTypes.bool,
  innerRef: PropTypes.any,
};

export default withStyles(styles, { name: 'MuiPickerDTHeader' })(withUtils()(DateTimePickerHeader));
