// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('LinearDeterminate', {
  root: {
    width: '100%',
    marginTop: 30,
  },
});

class LinearDeterminate extends Component {
  timer: number;
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed > 100) {
      this.setState({ completed: 0 });
    } else {
      const diff = Math.random() * 10;
      this.setState({ completed: completed + diff });
    }
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <LinearProgress mode="determinate" value={this.state.completed} />
      </div>
    );
  }
}

LinearDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(LinearDeterminate);
