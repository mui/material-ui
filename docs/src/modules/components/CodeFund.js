import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import Tooltip from '@material-ui/core/Tooltip';

class Ad extends React.Component {
  timerAdblock = null;

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

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.src = 'https://codefund.io/scripts/71fdcb01-40be-4590-af75-cd1bd4773c2a/embed.js';
    const scriptSlot = document.querySelector('#code-fund-script-slot');
    scriptSlot.appendChild(script);
    this.checkAdblock();
  }

  componentWillUnmount() {
    clearTimeout(this.timerAdblock);
  }

  checkAdblock = (attempt = 1) => {
    if (document.querySelector('.cf-wrapper')) {
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
      return null;
    }

    if (adblock) {
      return (
        <div id="cf_ad">
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
        </div>
      );
    }

    return (
      <React.Fragment>
        <div id="code-fund-script-slot" />
        <div id="codefund_ad" />
        {adblock === false && (
          <Tooltip
            id="ad-info"
            title="This ad is designed to support Open Source."
            placement="left"
          >
            <span className={classes.info}>i</span>
          </Tooltip>
        )}
      </React.Fragment>
    );
  }
}

Ad.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

const AdWrapped = withWidth()(Ad);

const styles = theme => ({
  '@global': {
    '#cf_ad': {
      padding: theme.spacing.unit,
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      '&& .cf-wrapper': {
        padding: 0,
        backgroundColor: 'transparent',
      },
      '&& .cf-img-wrapper': {
        float: 'none',
        display: 'block',
      },
      '&& .cf-text': {
        ...theme.typography.body1,
        display: 'block',
        margin: `${theme.spacing.unit}px 0`,
        '& strong': {
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      '&& .cf-powered-by': {
        ...theme.typography.caption,
        marginTop: 0,
      },
    },
  },
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
});

function CodeFund(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AdWrapped classes={classes} />
    </div>
  );
}

CodeFund.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CodeFund);
