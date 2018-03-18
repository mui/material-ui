import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import BuildIcon from 'material-ui-icons/Build'; // eslint-disable-line import/no-unresolved
import WhatshotIcon from 'material-ui-icons/Whatshot';
import MarkdownElement from '@material-ui/docs/MarkdownElement';
import Link from 'docs/src/modules/components/Link';

const styles = theme => ({
  step: {
    border: `1px solid ${theme.palette.common.white}`,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 4}px`,
    },
  },
  stepTitle: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 3,
    alignItems: 'center',
  },
  stepIcon: {
    color: theme.palette.primary.dark,
    marginRight: theme.spacing.unit * 2,
    fontSize: 30,
  },
  stepBody: {
    minHeight: 270,
  },
  markdownElement: {
    maxWidth: `calc(100vw - ${(theme.spacing.unit * 5 + 1) * 2}px)`,
    '& pre, & pre[class*="language-"], & code': {
      backgroundColor: 'transparent',
    },
    '& pre, & pre[class*="language-"]': {
      padding: theme.spacing.unit,
      margin: 0,
    },
  },
  divider: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
  },
  img: {
    marginTop: theme.spacing.unit,
    maxWidth: 500,
    width: '100%',
    height: 'auto',
  },
});

function HomeSteps(props) {
  const classes = props.classes;

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={4} className={classes.step}>
        <div className={classes.stepTitle}>
          <FileDownloadIcon className={classes.stepIcon} />
          <Typography variant="title">Installation</Typography>
        </div>
        <div className={classes.stepBody}>
          <Typography variant="subheading" gutterBottom>
            {`
            Install Material-UI's source files via npm.
            We take care of injecting the CSS needed.
            `}
          </Typography>
          <MarkdownElement
            className={classes.markdownElement}
            text={`
  \`\`\`sh
  $ npm install material-ui@next
  \`\`\`
                `}
          />
          <Typography variant="subheading" gutterBottom>
            {'or use a CDN.'}
          </Typography>
          <MarkdownElement
            className={classes.markdownElement}
            text={`
  \`\`\`html
  <script src="https://unpkg.com/material-ui@next/umd/material-ui.production.min.js" crossorigin="anonymous"></script>
  \`\`\`
                `}
          />
          <Typography variant="subheading" gutterBottom>
            {'Load the default Roboto font.'}
          </Typography>
          <MarkdownElement
            className={classes.markdownElement}
            text={`
  \`\`\`html
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
  \`\`\`
                `}
          />
        </div>
        <Divider className={classes.divider} />
        <Button
          component={buttonProps => (
            <Link variant="button" prefetch href="/getting-started/installation" {...buttonProps} />
          )}
        >
          Read installation docs
        </Button>
      </Grid>
      <Grid item xs={12} md={4} className={classes.step}>
        <div className={classes.stepTitle}>
          <BuildIcon className={classes.stepIcon} />
          <Typography variant="title">Usage</Typography>
        </div>
        <div className={classes.stepBody}>
          <Typography variant="subheading" gutterBottom>
            {'Material-UI components work in isolation. They are self-supporting.'}
          </Typography>
          <MarkdownElement
            className={classes.markdownElement}
            text={`
  \`\`\`jsx
  import React from 'react';
  import Button from 'material-ui/Button';

  const App = () => (
    <Button variant="raised" color="primary">
      Hello World
    </Button>
  );
  \`\`\`
                `}
          />
        </div>
        <Divider className={classes.divider} />
        <Button
          component={buttonProps => (
            <Link variant="button" prefetch href="/getting-started/usage" {...buttonProps} />
          )}
        >
          Explore the docs
        </Button>
      </Grid>
      <Grid item xs={12} md={4} className={classes.step}>
        <div className={classes.stepTitle}>
          <WhatshotIcon className={classes.stepIcon} />
          <Typography variant="title">Premium Themes</Typography>
        </div>
        <div className={classes.stepBody}>
          <Typography variant="subheading" gutterBottom>
            {`Take Material-UI to the next level with premium themes from
              our official marketplace—all built on Material-UI.`}
          </Typography>
          <Link prefetch href="/premium-themes/list">
            <img className={classes.img} alt="themes" src="/static/images/themes.png" />
          </Link>
        </div>
        <Divider className={classes.divider} />
        <Button
          component={buttonProps => (
            <Link variant="button" prefetch href="/premium-themes/list" {...buttonProps} />
          )}
        >
          Browse themes
        </Button>
      </Grid>
    </Grid>
  );
}

HomeSteps.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeSteps);
