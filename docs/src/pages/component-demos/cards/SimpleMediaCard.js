// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import reptileImage from 'docs/src/assets/images/contemplative-reptile.jpg';

const styleSheet = createStyleSheet('SimpleMediaCard', () => ({
  card: { maxWidth: 345 },
}));

export default function SimpleMediaCard(props, context) {
  const classes = context.styleManager.render(styleSheet);
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
            Lizards are a widespread group of squamate reptiles, with over
            6,000 species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button compact primary>Share</Button>
          <Button compact primary>Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleMediaCard.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
