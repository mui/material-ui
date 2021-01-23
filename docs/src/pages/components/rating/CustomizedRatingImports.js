import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/core/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles, withStyles },
  '@material-ui/core/Rating': Rating,
  '@material-ui/icons/Favorite': FavoriteIcon,
  '@material-ui/icons/FavoriteBorder': FavoriteBorderIcon,
  '@material-ui/icons/SentimentVeryDissatisfied': SentimentVeryDissatisfiedIcon,
  '@material-ui/icons/SentimentDissatisfied': SentimentDissatisfiedIcon,
  '@material-ui/icons/SentimentSatisfied': SentimentSatisfiedIcon,
  '@material-ui/icons/SentimentSatisfiedAltOutlined': SentimentSatisfiedAltIcon,
  '@material-ui/icons/SentimentVerySatisfied': SentimentVerySatisfiedIcon,
  '@material-ui/core/Typography': Typography,
};
