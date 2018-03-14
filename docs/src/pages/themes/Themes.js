import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 430,
  },
  media: {
    height: 230,
  },
};

const themes = [
  {
    name: 'Material Dashboard React',
    description: 'Material Dashboard React is a free Material-UI Admin.',
    src: '/static/images/themes/creative-tim.png',
    price: 'FREE',
    category: 'Admin & Dashboard',
    href: 'https://www.creative-tim.com/product/material-dashboard-react?partner=104080',
  },
];

function Themes(props) {
  const { classes } = props;
  return (
    <div>
      {themes.map(theme => (
        <Card key={theme.name} className={classes.card}>
          <CardMedia
            component="a"
            href={theme.href}
            className={classes.media}
            image={theme.src}
            title={theme.name}
          />
          <CardContent>
            <Grid container spacing={0} alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="headline" align="left" component="h2">
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
            <Button component="a" href={theme.href} size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

Themes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Themes);
