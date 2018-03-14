import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import BuildIcon from 'material-ui-icons/Build'; // eslint-disable-line import/no-unresolved
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Link from 'docs/src/modules/components/Link';

const styles = theme => ({
  step: {
    border: `1px solid ${theme.palette.common.white}`,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px`,
    },
  },
  stepIcon: {
    marginBottom: theme.spacing.unit,
    color: theme.palette.primary.dark,
    fontSize: 30,
  },
  markdownElement: {
    maxWidth: 'calc(100vw - 32px)',
    '& pre, & pre[class*="language-"], & code': {
      backgroundColor: 'transparent',
    },
    '& pre, & pre[class*="language-"]': {
      padding: theme.spacing.unit,
      margin: 0,
    },
  },
  divider: {
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 2,
  },
  img: {
    marginTop: theme.spacing.unit * 2,
    maxWidth: '100%',
    height: 'auto',
  },
});

function HomeSteps(props) {
  const classes = props.classes;

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={6} className={classes.step}>
        <FileDownloadIcon className={classes.stepIcon} />
        <Typography variant="title" gutterBottom>
          Installation
        </Typography>
        <Typography gutterBottom>{"Install Material-UI's source files via npm."}</Typography>
        <MarkdownElement
          className={classes.markdownElement}
          text={`
\`\`\`sh
$ npm install material-ui@next
\`\`\`
              `}
        />
        <Typography gutterBottom>{'Load the Roboto font.'}</Typography>
        <MarkdownElement
          className={classes.markdownElement}
          text={`
\`\`\`html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
>
\`\`\`
              `}
        />
        <Divider className={classes.divider} />
        <Button
          component={buttonProps => (
            <Link variant="button" prefetch href="/getting-started/installation" {...buttonProps} />
          )}
        >
          Read installation docs
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.step}>
        <BuildIcon className={classes.stepIcon} />
        <Typography variant="title" gutterBottom>
          Usage
        </Typography>
        <Typography gutterBottom>
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
        <Divider className={classes.divider} />
        <Button
          component={buttonProps => (
            <Link variant="button" prefetch href="/getting-started/usage" {...buttonProps} />
          )}
        >
          Explore the docs
        </Button>
      </Grid>
    </Grid>
  );
}

HomeSteps.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeSteps);
