// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Text from 'material-ui/Text';
import reptileImage from 'docs/site/assets/images/contemplative-reptile@2x.jpg';

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
          <Text type="headline" component="h2">Lizard</Text>
          <Text component="p">
            Lizards are a widespread group of squamate reptiles, with over
            6,000 species, ranging across all continents except Antarctica
          </Text>
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
  styleManager: PropTypes.object.isRequired,
};
