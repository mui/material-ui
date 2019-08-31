import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { FileDownload as FileDownloadIcon } from '@material-ui/docs';
import BuildIcon from '@material-ui/icons/Build';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import NoSsr from '@material-ui/core/NoSsr';
import Link from 'docs/src/modules/components/Link';

const InstallationLink = React.forwardRef((buttonProps, ref) => (
  <Link naked prefetch href="/getting-started/installation" ref={ref} {...buttonProps} />
));

const UsageLink = React.forwardRef((buttonProps, ref) => (
  <Link naked prefetch href="/getting-started/usage" ref={ref} {...buttonProps} />
));

const styles = theme => ({
  step: {
    border: `12px solid ${theme.palette.background.level1}`,
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.background.level2,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 4),
    },
    [theme.breakpoints.up('md')]: {
      borderRightWidth: 12,
      borderLeftWidth: 12,
    },
  },
  leftStep: {
    borderBottomWidth: 0,
    [theme.breakpoints.up('md')]: {
      borderBottomWidth: 12,
      borderRightWidth: 0,
    },
  },
  rightStep: {
    borderTopWidth: 0,
    [theme.breakpoints.up('md')]: {
      borderTopWidth: 12,
      borderLeftWidth: 0,
    },
  },
  stepTitle: {
    display: 'flex',
    marginBottom: theme.spacing(3),
    alignItems: 'center',
  },
  stepIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
    fontSize: 30,
  },
  stepBody: {
    minHeight: 290,
  },
  markdownElement: {
    maxWidth: `calc(100vw - ${(theme.spacing(5) + 1) * 2}px)`,
    '& pre, & pre[class*="language-"], & code': {
      // backgroundColor: 'transparent',
    },
    '& pre, & pre[class*="language-"]': {
      padding: theme.spacing(1, 0),
      margin: theme.spacing(1, 0),
    },
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  link: {
    marginTop: theme.spacing(1),
    display: 'block',
  },
  img: {
    maxWidth: 500,
    width: '100%',
    height: 'auto',
  },
});

const PremiumThemesLink = React.forwardRef((props, ref) => {
  return (
    <Link
      data-ga-event-category="premium-themes"
      data-ga-event-action="click"
      data-ga-event-label="home-link"
      href="https://themes.material-ui.com/"
      naked
      ref={ref}
      {...props}
    />
  );
});

function HomeSteps(props) {
  const { classes } = props;
  const t = useSelector(state => state.options.t);
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={12} md={4} className={clsx(classes.step, classes.leftStep)}>
        <div className={classes.stepTitle}>
          <FileDownloadIcon className={classes.stepIcon} />
          <Typography variant="h6" component="h3">
            {t('installation')}
          </Typography>
        </div>
        <div className={classes.stepBody}>
          <Typography variant="subtitle1" component="div" gutterBottom>
            {t('installDescr')}
          </Typography>
          <MarkdownElement
            className={classes.markdownElement}
            text={`
  \`\`\`sh
  $ npm install @material-ui/core
  \`\`\`
                `}
          />
          <Link
            variant="subtitle1"
            color="inherit"
            href="https://github.com/mui-org/material-ui/tree/master/examples/cdn"
            gutterBottom
          >
            {t('cdn')}
          </Link>
          <Typography variant="subtitle1" component="div" gutterBottom>
            {t('loadFont')}
          </Typography>
          <MarkdownElement
            className={classes.markdownElement}
            text={`
  \`\`\`html
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  \`\`\`
                `}
          />
        </div>
        <Divider className={classes.divider} />
        <Button component={InstallationLink}>{t('installButton')}</Button>
      </Grid>
      <Grid item xs={12} md={4} className={classes.step}>
        <div className={classes.stepTitle}>
          <BuildIcon className={classes.stepIcon} />
          <Typography variant="h6" component="h3">
            {t('usage')}
          </Typography>
        </div>
        <div className={classes.stepBody}>
          <Typography variant="subtitle1" component="div" gutterBottom>
            {t('usageDescr')}
          </Typography>
          <MarkdownElement
            className={classes.markdownElement}
            text={`
  \`\`\`jsx
  import React from 'react';
  import Button from '@material-ui/core/Button';

  const App = () => (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
  \`\`\`
                `}
          />
        </div>
        <Divider className={classes.divider} />
        <Button component={UsageLink}>{t('usageButton')}</Button>
      </Grid>
      <Grid item xs={12} md={4} className={clsx(classes.step, classes.rightStep)}>
        <div className={classes.stepTitle}>
          <WhatshotIcon className={classes.stepIcon} />
          <Typography variant="h6" component="h3">
            {t('themes')}
          </Typography>
        </div>
        <div className={classes.stepBody}>
          <Typography variant="subtitle1" component="div" gutterBottom>
            {t('themesDescr')}
          </Typography>
          <Link
            href="https://themes.material-ui.com/"
            data-ga-event-category="premium-themes"
            data-ga-event-action="click"
            data-ga-event-label="home-image"
            className={classes.link}
          >
            <NoSsr>
              <img
                className={classes.img}
                alt="themes"
                src={`/static/images/themes-${theme.palette.type}.jpg`}
              />
            </NoSsr>
          </Link>
        </div>
        <Divider className={classes.divider} />
        <Button component={PremiumThemesLink}>{t('themesButton')}</Button>
      </Grid>
    </Grid>
  );
}

HomeSteps.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeSteps);
