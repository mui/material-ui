// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import reptileImage from 'docs/src/assets/images/contemplative-reptile.jpg';

const styleSheet = createStyleSheet('SimpleMediaCard', {
  card: {
    maxWidth: 345,
  },
});

function SimpleMediaCard(props) {
  const classes = props.classes;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia>
          <img src={reptileImage} alt="Contemplative Reptile" />
        </CardMedia>
        <CardContent>
          <Typography type="headline" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense color="primary">
            Share
          </Button>
          <Button dense color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SimpleMediaCard);
