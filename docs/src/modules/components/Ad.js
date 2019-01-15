import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import CodeFund from 'docs/src/modules/components/CodeFund';
import Carbon from 'docs/src/modules/components/Carbon';

const styles = theme => ({
  root: {
    position: 'relative',
    minHeight: 116,
    maxWidth: 350,
    display: 'block',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 3,
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
    padding: theme.spacing.unit,
    display: 'block',
  },
});

function getAdblock(classes) {
  return (
    <Paper component="span" elevation={0} className={classes.paper}>
      <Typography component="span" gutterBottom>
        Like Material-UI?
      </Typography>
      <Typography component="span" gutterBottom>
        {`If you don't mind tech-related ads, and want to support Open Source,
            please whitelist Material-UI in your ad blocker.`}
      </Typography>
      <Typography component="span">
        Thank you!{' '}
        <span role="img" aria-label="Love">
          ❤️
        </span>
      </Typography>
    </Paper>
  );
}

class Ad extends React.Component {
  random = Math.random();

  state = {
    disable: process.env.NODE_ENV !== 'production',
    adblock: null,
  };

  componentDidMount() {
    if (this.state.disable) {
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

    if (attempt < 30) {
      this.timerAdblock = setTimeout(() => {
        this.checkAdblock(attempt + 1);
      }, 500);
    }

    if (attempt > 6 && this.state.adblock !== true) {
      this.setState({
        adblock: true,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { adblock, disable } = this.state;

    if (disable) {
      return <span className={classes.root}>{getAdblock(classes)}</span>;
    }

    return (
      <span className={classes.root}>
        {this.random >= 0.90 ? <CodeFund /> : <Carbon />}
        {adblock === true ? getAdblock(classes) : null}
        {adblock === false ? (
          <Tooltip
            id="ad-info"
            title="This ad is designed to support Open Source."
            placement="left"
          >
            <span className={classes.info}>i</span>
          </Tooltip>
        ) : null}
      </span>
    );
  }
}

Ad.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ad);
