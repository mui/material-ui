import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, withStyles } from 'material-ui';
import ToolbarButton from '../_shared/ToolbarButton';
import pickerStyles from '../styles/pickerStyles';
import HourView from './HourView';

class TimePicker extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  state = {
    isHourViewShown: true,
  }

  handleChange = (time) => {
    this.props.onChange(time);
  }

  toggleHourView = () => {
    this.setState({ isHourViewShown: !this.state.isHourViewShown });
  }

  render() {
    const { classes, date } = this.props;
    const { isHourViewShown } = this.state;

    return (
      <div className={classes.container}>
        <Toolbar className={classes.toolbar}>
          <ToolbarButton
            type="display2"
            onClick={this.toggleHourView}
            selected={isHourViewShown}
            label={date.format('hh')}
          />

          <ToolbarButton
            type="display2"
            label=":"
            className={classes.separator}
          />

          <ToolbarButton
            type="display2"
            onClick={this.toggleHourView}
            selected={!isHourViewShown}
            label={date.format('MM')}
          />
        </Toolbar>

        {
          isHourViewShown
            ?
              <HourView date={date} />
            :
              'No minutes view specified'
        }
      </div>

    );
  }
}

const styles = (theme) => {
  const globalStyles = pickerStyles(theme);

  return {
    ...globalStyles,
    toolbar: {
      ...globalStyles.toolbar,
      flexDirection: 'row',
      alignItems: 'center',
    },
    separator: {
      margin: '0 2px 0 4px',
      cursor: 'default',
    },
  };
};

export default withStyles(styles)(TimePicker);
