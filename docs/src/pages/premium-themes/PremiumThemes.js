import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

const themes = [
  {
    name: 'Material Dashboard Pro',
    description: 'Material Dashboard Pro React is a Premium Material-UI Admin.',
    src: '/static/themes/creative-tim-dashboard.jpg',
    price: '$59',
    category: 'Admin & Dashboard',
    href: 'https://www.creative-tim.com/product/material-dashboard-pro-react?partner=104080',
  },
  {
    name: 'Material Kit Pro',
    description: 'A Badass Material-UI Kit based on Material Design.',
    src: '/static/themes/creative-tim-kit.jpg',
    price: '$89',
    category: 'Components',
    href: 'https://www.creative-tim.com/product/material-kit-pro-react?partner=104080',
  },
  {
    name: 'Material Dashboard',
    description: 'Material Dashboard React is a Free Material-UI Admin.',
    src: '/static/themes/creative-tim-dashboard.jpg',
    price: 'FREE',
    category: 'Admin & Dashboard',
    href: 'https://www.creative-tim.com/product/material-dashboard-react?partner=104080',
  },
  {
    name: 'Material Kit',
    description: 'A Badass Material-UI Kit based on Material Design.',
    src: '/static/themes/creative-tim-kit.jpg',
    price: 'FREE',
    category: 'Components',
    href: 'https://www.creative-tim.com/product/material-kit-react?partner=104080',
  },
  {
    name: 'Paperbase',
    description:
      'A page that mimics Firebase. ' +
      'This item includes theming using the theme provider component.',
    src: '/static/themes/paperbase.png',
    price: 'FREE',
    category: 'Admin & Dashboard',
    href: '/premium-themes/paperbase',
    source:
      'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/premium-themes/paperbase',
  },
  {
    name: 'Onepirate',
    description: 'An example landing and sign-up page.',
    src: '/static/themes/onepirate.jpg',
    price: 'FREE',
    category: 'Landing page',
    href: '/premium-themes/onepirate',
    source:
      'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/premium-themes/onepirate',
  },
  {
    name: 'Instapaper',
    description: "Instagram's profile page by customizing Material-UI theme.",
    src: '/static/themes/instapaper.png',
    price: 'FREE',
    category: 'Profile page',
    href: '/premium-themes/instapaper',
    source:
      'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/premium-themes/instapaper',
  },
  {
    name: 'Tweeper',
    description: "Twitter's profile page by customizing Material-UI theme.",
    src: '/static/themes/tweeper.png',
    price: 'FREE',
    category: 'Profile page',
    href: '/premium-themes/tweeper',
    source:
      'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/premium-themes/tweeper',
  },
];

function PremiumThemes(props) {
  const { classes } = props;
  return (
    <Grid container spacing={16}>
      {themes.map(theme => (
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
                Learn More
              </Button>
              {theme.source ? (
                <Button component="a" href={theme.source} size="small" color="primary">
                  Source code
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
};

export default withStyles(styles)(PremiumThemes);
