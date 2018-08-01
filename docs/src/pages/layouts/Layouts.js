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
    height: 0,
    paddingTop: '65%',
  },
};

const themes = [
  {
    name: 'Dashboard',
    description:
      'A minimal dasboard with taskbar and mini variant draw. ' +
      'The chart is courtesy of Recharts, but it is simple to substitute an alternative.',
    src: '/static/images/layouts/dashboard.jpg',
    href: '/layouts/dashboard',
    source: 'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/layouts/dashboard',
  },
  {
    name: 'Albumn',
    description: 'A reponsive albumn / gallery layout with a hero unit and footer.',
    src: '/static/images/layouts/albumn.jpg',
    href: '/layouts/albumn',
    source:
      'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/layouts/albumn/Albumn.js',
  },
  {
    name: 'Pricing',
    description:
      'Quickly build an effective pricing table for your potential customers with this layout.',
    src: '/static/images/layouts/pricing.png',
    href: '/layouts/pricing',
    source:
      'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/layouts/pricing/Pricing.js',
  },
];

function Layouts(props) {
  const { classes } = props;
  return (
    <Grid container spacing={16}>
      {themes.map(theme => (
        <Grid item xs={12} sm={6} md={4}>
          <Card key={theme.name} className={classes.card}>
            <CardMedia
              component="a"
              href={theme.href}
              className={classes.media}
              image={theme.src}
              title={theme.name}
              target="_blank"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="headline" align="left" component="h2">
                {theme.name}
              </Typography>
              <Typography component="p">{theme.description}</Typography>
            </CardContent>
            <CardActions>
              <Button component="a" href={theme.source} size="small" color="primary">
                Source code
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

Layouts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layouts);
