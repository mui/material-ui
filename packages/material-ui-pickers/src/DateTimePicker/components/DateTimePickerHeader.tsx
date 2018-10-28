import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import PickerToolbar from '../../_shared/PickerToolbar';
import ToolbarButton from '../../_shared/ToolbarButton';
import { withUtils, WithUtilsProps } from '../../_shared/WithUtils';
import DateTimePickerView, {
  DateTimePickerViewType,
} from '../../constants/DateTimePickerView';
import { MaterialUiPickersDate } from '../../typings/date';

export type MeridiemMode = 'am' | 'pm';
export interface DateTimePickerHeaderProps
  extends WithUtilsProps,
    WithStyles<typeof styles, true> {
  date: MaterialUiPickersDate;
  meridiemMode: MeridiemMode;
  openView: DateTimePickerViewType;
  onOpenViewChange: (view: DateTimePickerView) => void;
  setMeridiemMode: (mode: MeridiemMode) => () => void;
  ampm?: boolean;
}

export const DateTimePickerHeader: React.SFC<
  DateTimePickerHeaderProps
> = props => {
  const {
    date,
    classes,
    openView,
    meridiemMode,
    onOpenViewChange,
    setMeridiemMode,
    theme,
    utils,
    ampm,
  } = props;

  const changeOpenView = (view: DateTimePickerView) => () =>
    onOpenViewChange(view);

  const rtl = theme.direction === 'rtl';
  const hourMinuteClassName = rtl
    ? classes.hourMinuteLabelReverse
    : classes.hourMinuteLabel;

  return (
    <PickerToolbar className={classes.toolbar}>
      <div className={classes.dateHeader}>
        <ToolbarButton
          variant="subtitle1"
          onClick={changeOpenView(DateTimePickerView.YEAR)}
          selected={openView === DateTimePickerView.YEAR}
          label={utils.getYearText(date)}
        />

        <ToolbarButton
          variant="h4"
          onClick={changeOpenView(DateTimePickerView.DATE)}
          selected={openView === DateTimePickerView.DATE}
          label={utils.getDateTimePickerHeaderText(date)}
        />
      </div>

      <div className={classes.timeHeader}>
        <div className={hourMinuteClassName}>
          <ToolbarButton
            variant="h3"
            onClick={changeOpenView(DateTimePickerView.HOUR)}
            selected={openView === DateTimePickerView.HOUR}
            label={utils.getHourText(date, ampm!)}
          />

          <ToolbarButton
            variant="h3"
            label=":"
            selected={false}
            className={classes.separator}
          />

          <ToolbarButton
            variant="h3"
            onClick={changeOpenView(DateTimePickerView.MINUTES)}
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
  theme: PropTypes.object.isRequired,
  meridiemMode: PropTypes.string.isRequired,
  openView: PropTypes.string.isRequired,
  onOpenViewChange: PropTypes.func.isRequired,
  setMeridiemMode: PropTypes.func.isRequired,
  utils: PropTypes.object.isRequired,
  ampm: PropTypes.bool,
  innerRef: PropTypes.any,
};

DateTimePickerHeader.defaultProps = {
  ampm: true,
};

const styles = () =>
  createStyles({
    toolbar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      justifyContent: 'space-around',
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default',
    },
    ampmSelection: {
      marginLeft: 10,
      marginRight: -10,
    },
    ampmLabel: {
      fontSize: 18,
    },
    hourMinuteLabel: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    hourMinuteLabelReverse: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: 'row-reverse',
    },
    dateHeader: {
      height: 65,
    },
    timeHeader: {
      height: 65,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  });

export default withStyles(styles, { withTheme: true })(
  withUtils()(DateTimePickerHeader)
);
