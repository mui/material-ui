import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import withWidth from '@material-ui/core/withWidth';
import CodeFund from 'docs/src/modules/components/CodeFund';
import Carbon from 'docs/src/modules/components/Carbon';

const styles = theme => ({
  root: {
    position: 'relative',
    minHeight: 180,
  },
  info: {
    ...theme.typography.caption,
    position: 'absolute',
    padding: theme.spacing.unit,
    cursor: 'default',
    bottom: 0,
    right: 0,
  },
  paper: {
    padding: 8,
  },
});

class Ad extends React.Component {
  timerAdblock = null;

  random = Math.random();

  state = {
    adblock: null,
  };

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    if (this.props.width === 'xs') {
      return;
    }
    this.checkAdblock();
  }

  componentWillUnmount() {
    clearTimeout(this.timerAdblock);
  }

  checkAdblock = (attempt = 1) => {
    if (document.querySelector('.cf-wrapper') || document.querySelector('#carbonads')) {
      this.setState({
        adblock: false,
      });
      return;
    }

    if (attempt < 20) {
      this.timerAdblock = setTimeout(() => {
        this.checkAdblock(attempt + 1);
      }, 500);
    }

    if (attempt > 6) {
      this.setState({
        adblock: true,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { adblock } = this.state;

    if (process.env.NODE_ENV !== 'production') {
      return <div className={classes.root} />;
    }

    if (adblock) {
      return (
        <Paper elevation={0} className={classes.paper}>
          <Typography gutterBottom>Like Material-UI?</Typography>
          <Typography gutterBottom>
            {`If you don't mind tech-related ads, and want to support Open Source,
            please whitelist Material-UI in your ad blocker.`}
          </Typography>
          <Typography>
            Thank you!{' '}
            <span role="img" aria-label="Love">
              ❤️
            </span>
          </Typography>
        </Paper>
      );
    }

    return (
      <div className={classes.root}>
        {this.random >= 0.5 ? <CodeFund /> : <Carbon />}
        {adblock === false && (
          <Tooltip
            id="ad-info"
            title="This ad is designed to support Open Source."
            placement="left"
          >
            <span className={classes.info}>i</span>
          </Tooltip>
        )}
      </div>
    );
  }
}

Ad.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default withWidth()(withStyles(styles)(Ad));
