// @flow weak

import React, { PropTypes, Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { LinearProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('LinearBuffer', () => ({
  root: {
    width: '100%',
    marginTop: 30,
  },
}));

export default class LinearBuffer extends Component {
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

  timer: number

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
    const classes = this.context.styleManager.render(styleSheet);
    const { completed, buffer } = this.state;
    return (
      <div className={classes.root}>
        <LinearProgress mode="buffer" value={completed} valueBuffer={buffer} />
      </div>
    );
  }
}

LinearBuffer.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
