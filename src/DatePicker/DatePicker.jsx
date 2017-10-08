import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AppBar, Typography, Toolbar, withStyles } from 'material-ui';

const datePickerFormat = 'ddd, MMM DD';

const styles = {
  container: {
    width: 300,
    height: 400,
  },
};

class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    classes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate = nextProps => (
    this.props.value !== nextProps.value
  )

  getDisplayTime = () => {
    const { value } = this.props;
    return moment(value).format(datePickerFormat);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography type="headline" color="inherit">
              { this.getDisplayTime() }
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(DatePicker);

