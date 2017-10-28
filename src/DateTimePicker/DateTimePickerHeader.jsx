import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import * as viewType from '../constants/date-picker-view';

const DateTimePickerHeader = (props) => {
  const {
    date, classes, openView, meridiemMode, onOpenViewChange, setMeridiemMode,
  } = props;

  const changeOpenView = view => () => onOpenViewChange(view);

  return (
    <PickerToolbar className={classes.toolbar}>
      <div className={classes.dateHeader}>
        <ToolbarButton
          type="subheading"
          onClick={changeOpenView(viewType.YEAR)}
          selected={openView === viewType.YEAR}
          label={date.format('YYYY')}
        />

        <ToolbarButton
          type="display1"
          onClick={changeOpenView(viewType.DATE)}
          selected={openView === viewType.DATE}
          label={date.format('MMM DD')}
        />
      </div>

      <div className={classes.timeHeader}>
        <ToolbarButton
          type="display2"
          onClick={changeOpenView(viewType.HOUR)}
          selected={openView === viewType.HOUR}
          label={date.format('hh')}
        />

        <ToolbarButton
          type="display2"
          label=":"
          selected={false}
          className={classes.separator}
        />

        <ToolbarButton
          type="display2"
          onClick={changeOpenView(viewType.MINUTES)}
          selected={openView === viewType.MINUTES}
          label={date.format('mm')}
        />

        <div className={classes.ampmSelection}>
          <ToolbarButton
            className={classes.ampmLabel}
            selected={meridiemMode === 'am'}
            type="subheading"
            label="AM"
            onClick={setMeridiemMode('am')}
          />
          <ToolbarButton
            className={classes.ampmLabel}
            selected={meridiemMode === 'pm'}
            type="subheading"
            label="PM"
            onClick={setMeridiemMode('pm')}
          />
        </div>
      </div>
    </PickerToolbar>
  );
};

DateTimePickerHeader.propTypes = {
  date: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  meridiemMode: PropTypes.string.isRequired,
  openView: PropTypes.string.isRequired,
  onOpenViewChange: PropTypes.func.isRequired,
  setMeridiemMode: PropTypes.func.isRequired,
};

const styles = () => ({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
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
  dateHeader: {
    width: '42%',
    height: 65,
  },
  timeHeader: {
    height: 65,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default withStyles(styles)(DateTimePickerHeader);
