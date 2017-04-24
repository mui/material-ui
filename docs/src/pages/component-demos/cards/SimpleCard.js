// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import {
  Card,
  CardContent,
  CardActions,
} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('SimpleCard', (theme) => ({
  card: {
    minWidth: 275,
  },
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
          <Typography type="body1" className={classes.title}>Word of the Day</Typography>
          <Typography type="headline" component="h2">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography type="body1" className={classes.pos}>adjective</Typography>
          <Typography component="p">
            well meaning and kindly.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button compact>Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
