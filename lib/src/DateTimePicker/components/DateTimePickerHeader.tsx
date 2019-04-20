import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import ToolbarText from '../../_shared/ToolbarText';
import PickerToolbar from '../../_shared/PickerToolbar';
import ToolbarButton from '../../_shared/ToolbarButton';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import { Theme } from '@material-ui/core';
import { MaterialUiPickersDate } from '../../typings/date';
import { DateTimePickerViewType } from '../DateTimePickerRoot';
import { withUtils, WithUtilsProps } from '../../_shared/WithUtils';

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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
  onOpenViewChange: (view: DateTimePickerViewType) => void;
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
          onClick={() => onOpenViewChange('year')}
          selected={openView === 'year'}
          label={utils.getYearText(date)}
        />

        <ToolbarButton
          variant="h4"
          onClick={() => onOpenViewChange('date')}
          selected={openView === 'date'}
          label={utils.getDateTimePickerHeaderText(date)}
        />
      </div>

      <div className={classes.timeHeader}>
        <div className={classes.hourMinuteLabel}>
          <ToolbarButton
            variant="h3"
            onClick={() => onOpenViewChange('hours')}
            selected={openView === 'hours'}
            label={utils.getHourText(date, ampm!)}
          />

          <ToolbarText variant="h3" label=":" selected={false} className={classes.separator} />

          <ToolbarButton
            variant="h3"
            onClick={() => onOpenViewChange('minutes')}
            selected={openView === 'minutes'}
            label={utils.getMinuteText(date)}
          />
        </div>

        {ampm && (
          <div className={classes.ampmSelection}>
            <ToolbarButton
              variant="subtitle1"
              typographyClassName={classes.ampmLabel}
              selected={meridiemMode === 'am'}
              label={utils.getMeridiemText('am')}
              onClick={setMeridiemMode('am')}
            />

            <ToolbarButton
              variant="subtitle1"
              typographyClassName={classes.ampmLabel}
              selected={meridiemMode === 'pm'}
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
