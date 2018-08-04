import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import StarIcon from '@material-ui/icons/StarBorder';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  appBarSpacer: {
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    minWidth: 0, // So that Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  toolbarTitle: {
    flex: 1,
  },
  heroUnit: {
    padding: `${theme.spacing.unit * 8}px 0`,
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 2}px 0`,
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 24}px ${theme.spacing.unit * 8}px`,
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing.unit * 14,
      paddingRight: theme.spacing.unit * 14,
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing.unit * 14,
      paddingRight: theme.spacing.unit * 14,
      paddingBottom: theme.spacing.unit * 4,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 4}px`,
    },
  },
  card: {},
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    margin: `0 auto ${theme.spacing.unit * 2}px`,
  },
  cardActions: {
    paddingBottom: theme.spacing.unit * 2,
  },
  footer: {
    minHeight: 200,
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 24}px`,
    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 14}px`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 8}px`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 4}px`,
    },
  },
  footerGrid: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  footerGridItem: {
    marginTop: theme.spacing.unit * 2,
  },
});

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Loctions'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

function Pricing(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap className={classes.toolbarTitle}>
            Company name
          </Typography>
          <Button>Features</Button>
          <Button>Enterprise</Button>
          <Button>Support</Button>
          <Button color="primary" variant="outlined">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
            Pricing layout
          </Typography>
          <Typography variant="title" align="center" color="textSecondary" paragraph>
            Quickly build an effective pricing table for your potential customers with this layout.
            It&apos;s built with default Material-UI components with little customization.
          </Typography>
        </div>
        {/* End hero unit */}

        <Grid container spacing={40} alignItems="flex-end" className={classes.cardGrid}>
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card className={classes.card}>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : undefined}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography variant="display2" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="title" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  {tier.description.map(line => (
                    <Typography variant="subheading" align="center">
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button fullWidth variant={tier.buttonVariant} color="primary">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>

      {/* <hr /> */}

      {/* Footer */}
      <div className={classes.footer}>
        <Grid container spacing={32} justify="space-evenly" className={classes.footerGrid}>
          {footers.map(footer => (
            <Grid item xs key={footer.title} className={classes.footerGridItem}>
              <Typography variant="title" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              {footer.description.map(item => (
                <Typography variant="subheading" color="textSecondary">
                  {item}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </div>
      {/* End footer */}
    </div>
  );
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pricing);
