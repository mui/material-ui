// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import {
  Card,
  CardContent,
  CardActions,
} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Text from 'material-ui/Text';

const styleSheet = createStyleSheet('SimpleCard', (theme) => ({
  card: { minWidth: 275 },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
}));

export default function SimpleCard(props, context) {
  const classes = context.styleManager.render(styleSheet);

  const bull = <span className={classes.bullet}>&bull;</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Text type="body1" className={classes.title}>Word of the Day</Text>
          <Text type="headline" component="h2">
            be{bull}nev{bull}o{bull}lent
          </Text>
          <Text type="body1" className={classes.pos}>adjective</Text>
          <Text component="p">
            well meaning and kindly.<br />
            "a benevolent smile"
          </Text>
        </CardContent>
        <CardActions>
          <Button compact>Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
