import React from 'react';
import PropTypes from 'prop-types';
import Fade from 'material-ui/transitions/Fade';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing.unit * 2,
  },
  success: {
    height: 40,
  },
});

class DelayingAppearance extends React.Component {
  state = {
    loading: false,
    query: 'idle',
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  timer = null;

  handleClickLoading = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  handleClickQuery = () => {
    clearTimeout(this.timer);

    if (this.state.query !== 'idle') {
      this.setState({
        query: 'idle',
      });
      return;
    }

    this.setState({
      query: 'progress',
    });
    this.timer = setTimeout(() => {
      this.setState({
        query: 'success',
      });
    }, 2e3);
  };

  render() {
    const { classes } = this.props;
    const { loading, query } = this.state;

    return (
      <div className={classes.root}>
        <Fade in={loading} enterDelay={800}>
          <CircularProgress />
        </Fade>
        <Button onClick={this.handleClickLoading} className={classes.button}>
          {loading ? 'Stop loading' : 'Loading'}
        </Button>
        {query === 'success' ? (
          <Typography className={classes.success}>Success!</Typography>
        ) : (
          <Fade in={query === 'progress'} enterDelay={800}>
            <CircularProgress />
          </Fade>
        )}
        <Button onClick={this.handleClickQuery} className={classes.button}>
          {query !== 'idle' ? 'Reset' : 'Simulate a load'}
        </Button>
      </div>
    );
  }
}

DelayingAppearance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DelayingAppearance);
