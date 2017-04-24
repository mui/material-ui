// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import {
  Card,
  CardContent,
} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import albumCover from 'docs/src/assets/images/live-from-space.jpg';

const styleSheet = createStyleSheet('NowPlayingCard', () => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 8,
    paddingBottom: 8,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function NowPlayingCard(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography type="headline">Live From Space</Typography>
            <Typography type="subheading" secondary>
              Mac Miller
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton>
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton>
              <SkipNextIcon />
            </IconButton>
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
  styleManager: customPropTypes.muiRequired,
};
