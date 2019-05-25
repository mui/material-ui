import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import compose from 'docs/src/modules/utils/compose';

const styles = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  media: {
    paddingTop: '55.55%',
  },
};

function themes(t) {
  return [
    {
      name: 'Material Dashboard Pro',
      description: t('mdbProDescr'),
      src: '/static/themes/creative-tim-dashboard.jpg',
      price: '$59',
      category: t('admin'),
      href: 'https://www.creative-tim.com/product/material-dashboard-pro-react?partner=104080',
    },
    {
      name: 'Material Kit Pro',
      description: t('mkProDescr'),
      src: '/static/themes/creative-tim-kit.jpg',
      price: '$89',
      category: t('component'),
      href: 'https://www.creative-tim.com/product/material-kit-pro-react?partner=104080',
    },
    {
      name: 'Material Dashboard',
      description: t('mdbDescr'),
      src: '/static/themes/creative-tim-dashboard.jpg',
      price: t('free'),
      category: t('admin'),
      href: 'https://www.creative-tim.com/product/material-dashboard-react?partner=104080',
    },
    {
      name: 'Material Kit',
      description: t('mkDescr'),
      src: '/static/themes/creative-tim-kit.jpg',
      price: t('free'),
      category: t('component'),
      href: 'https://www.creative-tim.com/product/material-kit-react?partner=104080',
    },
    {
      name: 'Paperbase',
      description: t('pbDescr'),
      src: '/static/themes/paperbase.png',
      price: t('free'),
      category: t('admin'),
      href: '/premium-themes/paperbase/',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/premium-themes/paperbase',
    },
    {
      name: 'Onepirate',
      description: t('opDescr'),
      src: '/static/themes/onepirate.jpg',
      price: t('free'),
      category: t('landing'),
      href: '/premium-themes/onepirate/',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/premium-themes/onepirate',
    },
    {
      name: 'Instapaper',
      description: t('instaDescr'),
      src: '/static/themes/instapaper.png',
      price: t('free'),
      category: t('profile'),
      href: '/premium-themes/instapaper/',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/premium-themes/instapaper',
    },
    {
      name: 'Tweeper',
      description: t('tweeperDescr'),
      src: '/static/themes/tweeper.png',
      price: t('free'),
      category: t('profile'),
      href: '/premium-themes/tweeper/',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/premium-themes/tweeper',
    },
  ];
}

function PremiumThemes(props) {
  const { classes, t } = props;
  return (
    <Grid container spacing={2}>
      {themes(t).map(theme => (
        <Grid key={theme.name} item xs={12} md={6}>
          <Card className={classes.card}>
            <CardMedia
              component="a"
              href={theme.href}
              rel="noopener nofollow"
              target="_blank"
              className={classes.media}
              image={theme.src}
              title={theme.name}
              data-ga-event-category="premium-themes"
              data-ga-event-action="click"
              data-ga-event-label={theme.name}
            />
            <CardContent className={classes.cardContent}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h5" align="left" component="h2">
                    {theme.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom>{theme.price}</Typography>
                </Grid>
              </Grid>
              <Typography gutterBottom color="textSecondary">
                {theme.category}
              </Typography>
              <Typography component="p">{theme.description}</Typography>
            </CardContent>
            <CardActions>
              <Button
                component="a"
                rel="noopener nofollow"
                href={theme.href}
                size="small"
                color="primary"
                data-ga-event-category="premium-themes"
                data-ga-event-action="click"
                data-ga-event-label={theme.name}
              >
                {theme.source ? t('preview') : t('learnMore')}
              </Button>
              {theme.source ? (
                <Button component="a" href={theme.source} size="small" color="primary">
                  {t('sourceCode')}
                </Button>
              ) : null}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

PremiumThemes.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({ t: state.options.t })),
  withStyles(styles),
)(PremiumThemes);
