import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing.unit * 2,
  },
  placeholder: {
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

  handleClickLoading = () => {
    this.setState(state => ({
      loading: !state.loading,
    }));
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
    }, 2000);
  };

  render() {
    const { classes } = this.props;
    const { loading, query } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.placeholder}>
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        </div>
        <Button onClick={this.handleClickLoading} className={classes.button}>
          {loading ? 'Stop loading' : 'Loading'}
        </Button>
        <div className={classes.placeholder}>
          {query === 'success' ? (
            <Typography>Success!</Typography>
          ) : (
            <Fade
              in={query === 'progress'}
              style={{
                transitionDelay: query === 'progress' ? '800ms' : '0ms',
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          )}
        </div>
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
