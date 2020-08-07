import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
  item: {
    flexGrow: 1,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  cardContent: {
    flexGrow: 1,
  },
  cardMedia: {
    height: 0,
    paddingTop: '65%',
  },
};

function layouts(t) {
  return [
    {
      title: t('dashboardTitle'),
      description: t('dashboardDescr'),
      src: '/static/images/templates/dashboard.png',
      href: '/getting-started/templates/dashboard/',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard',
    },
    {
      title: t('signInTitle'),
      description: t('signInDescr'),
      src: '/static/images/templates/sign-in.png',
      href: '/getting-started/templates/sign-in/',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in',
    },
    {
      title: t('signInSideTitle'),
      description: t('signInSideDescr'),
      src: '/static/images/templates/sign-in-side.png',
      href: '/getting-started/templates/sign-in-side/',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in-side',
    },
    {
      title: t('signUpTitle'),
      description: t('signUpDescr'),
      src: '/static/images/templates/sign-up.png',
      href: '/getting-started/templates/sign-up/',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-up',
    },
    {
      title: t('blogTitle'),
      description: t('blogDescr'),
      src: '/static/images/templates/blog.png',
      href: '/getting-started/templates/blog/',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/blog',
    },
    {
      title: t('checkoutTitle'),
      description: t('checkoutDescr'),
      src: '/static/images/templates/checkout.png',
      href: '/getting-started/templates/checkout/',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/checkout',
    },
    {
      title: t('albumTitle'),
      description: t('albumDescr'),
      src: '/static/images/templates/album.png',
      href: '/getting-started/templates/album/',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/album',
    },
    {
      title: t('pricingTitle'),
      description: t('pricingDescr'),
      src: '/static/images/templates/pricing.png',
      href: '/getting-started/templates/pricing/',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/pricing',
    },
    {
      title: t('stickyFooterTitle'),
      description: t('stickyFooterDescr'),
      src: '/static/images/templates/sticky-footer.png',
      href: '/getting-started/templates/sticky-footer/',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sticky-footer',
    },
  ];
}

function Templates(props) {
  const { classes } = props;
  const t = useSelector((state) => state.options.t);

  return (
    <Grid container spacing={2}>
      {layouts(t).map((layout) => (
        <Grid item sm={6} md={4} className={classes.item} key={layout.title}>
          <Card className={classes.card}>
            <CardMedia
              component="a"
              href={layout.href}
              className={classes.cardMedia}
              image={layout.src}
              title={layout.title}
              rel="nofollow"
              target="_blank"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" align="left" component="h2">
                {layout.title}
              </Typography>
              <Typography component="p">{layout.description}</Typography>
            </CardContent>
            <CardActions>
              <Button component="a" href={layout.source} size="small" color="primary">
                {t('sourceCode')}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

Templates.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Templates);
