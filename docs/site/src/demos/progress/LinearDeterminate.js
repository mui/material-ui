// @flow weak

import React, { PropTypes, Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { LinearProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('LinearDeterminate', () => ({
  root: {
    width: '100%',
    marginTop: 30,
  },
}));

export default class LinearDeterminate extends Component {
  state = {
    completed: 0,
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
      this.setState({ completed: 0 });
    } else {
      const diff = Math.random() * 10;
      this.setState({ completed: completed + diff });
    }
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div className={classes.root}>
        <LinearProgress mode="determinate" value={this.state.completed} />
      </div>
    );
  }
}

LinearDeterminate.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
