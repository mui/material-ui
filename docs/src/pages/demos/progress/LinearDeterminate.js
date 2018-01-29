import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

const styles = {
  root: {
    width: '100%',
    marginTop: 30,
  },
};

class LinearDeterminate extends React.Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer: number;

  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      this.setState({ completed: 0 });
    } else {
      const diff = Math.random() * 10;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress mode="determinate" value={this.state.completed} />
        <br />
        <LinearProgress color="secondary" mode="determinate" value={this.state.completed} />
      </div>
    );
  }
}

LinearDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearDeterminate);
