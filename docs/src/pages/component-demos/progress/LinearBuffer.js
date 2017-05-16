// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('LinearBuffer', {
  root: {
    width: '100%',
    marginTop: 30,
  },
});

class LinearBuffer extends Component {
  timer: number
  state = {
    completed: 0,
    buffer: 10,
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed > 100) {
      this.setState({ completed: 0, buffer: 10 });
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
    }
  }

  render() {
    const classes = this.props.classes;
    const { completed, buffer } = this.state;
    return (
      <div className={classes.root}>
        <LinearProgress mode="buffer" value={completed} valueBuffer={buffer} />
      </div>
    );
  }
}

LinearBuffer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(LinearBuffer);
