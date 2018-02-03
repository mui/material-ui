import React from 'react';
import PropTypes from 'prop-types';
import Fade from 'material-ui/transitions/Fade';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

class Delay extends React.Component {
  state = {
    props: {},
  };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.props !== this.props.props) {
      this.update();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  update() {
    const { delay, props } = this.props;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        props,
      });
    }, delay);
  }

  timer = null;

  render() {
    return this.props.children(this.state.props);
  }
}

Delay.propTypes = {
  children: PropTypes.func.isRequired,
  delay: PropTypes.number.isRequired,
  props: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing.unit * 2,
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
        <Delay delay={loading ? 800 : 0} props={{ loading }}>
          {({ loading: loadingDelayed }) => (
            <Fade in={loadingDelayed}>
              <CircularProgress />
            </Fade>
          )}
        </Delay>
        <Button onClick={this.handleClickLoading} className={classes.button}>
          {loading ? 'Stop loading' : 'Loading'}
        </Button>
        <Delay delay={query === 'progress' ? 800 : 0} props={{ query }}>
          {({ query: queryDelayed }) => {
            if (queryDelayed === 'success') {
              return <div>success</div>;
            }

            return (
              <Fade in={queryDelayed === 'progress'}>
                <CircularProgress />
              </Fade>
            );
          }}
        </Delay>
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
