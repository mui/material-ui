import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

import ClockNumber from './ClockNumber';
import ClockPointer from './ClockPointer';
import * as clockType from '../constants/clock-types';

class Clock extends Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.values(clockType)).isRequired,
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
  }

  handleChange = () => {

  }

  render() {
    const { classes, type, value } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.clock}>
          <ClockPointer value={value} />

          <ClockNumber type={type} index={0} />
          <ClockNumber type={type} index={1} />
          <ClockNumber type={type} index={2} />
          <ClockNumber type={type} index={3} />
          <ClockNumber type={type} index={4} />
          <ClockNumber type={type} index={5} />
          <ClockNumber type={type} index={6} />
          <ClockNumber type={type} index={7} />
          <ClockNumber type={type} index={8} />
          <ClockNumber type={type} index={9} />
          <ClockNumber type={type} index={10} />
          <ClockNumber type={type} index={11} />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 40,
  },
  clock: {
    backgroundColor: 'rgba(0,0,0,.07)',
    borderRadius: '50%',
    height: 260,
    width: 260,
    position: 'relative',
  },
});

export default withStyles(styles)(Clock);

