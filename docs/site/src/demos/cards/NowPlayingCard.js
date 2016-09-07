// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import {
  Card,
  CardContent,
} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Text from 'material-ui/Text';
import albumCover from 'docs/site/assets/images/live-from-space.jpg';

const styleSheet = createStyleSheet('NowPlayingCard', (theme) => ({
  card: {
    display: 'flex',
  },
  artist: {
    color: theme.palette.text.secondary,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
    height: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 8,
    paddingBottom: 8,
  },
  play: {
    '& .material-icons': {
      fontSize: 38,
    },
  },
}));

export default function NowPlayingCard(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Text type="headline">Live From Space</Text>
            <Text type="subheading" className={classes.artist}>Mac Miller</Text>
          </CardContent>
          <div className={classes.controls}>
            <IconButton>skip_previous</IconButton>
            <IconButton className={classes.play}>play_arrow</IconButton>
            <IconButton>skip_next</IconButton>
          </div>
        </div>
        <div className={classes.cover}>
          <img src={albumCover} alt="Live from space album cover" />
        </div>
      </Card>
    </div>
  );
}

NowPlayingCard.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
