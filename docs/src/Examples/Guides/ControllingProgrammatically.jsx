import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui-pickers/DatePicker';

import Button from 'material-ui/Button';
import withStyles from 'material-ui/styles/withStyles';

class ControllingProgrammaticallyExample extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  openPicker = () => {
    this.picker.wrapper.open();
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <div className={this.props.classes.container}>
        <Button onClick={this.openPicker}> Open picker </Button>
        <div className="picker">
          <DatePicker
            clearable
            pickerRef={(node) => { this.picker = node; }}
            label="Localization done right"
            format="D MMM YYYY"
            value={selectedDate}
            onChange={this.handleDateChange}
            clearLabel="clair"
            cancelLabel="annuler"
          />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default withStyles(styles)(ControllingProgrammaticallyExample);

