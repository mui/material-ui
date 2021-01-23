import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

export default {
  react: React,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/colors': { green },
  '@material-ui/core/FormGroup': FormGroup,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/Checkbox': Checkbox,
  '@material-ui/icons/CheckBoxOutlineBlank': CheckBoxOutlineBlankIcon,
  '@material-ui/icons/CheckBox': CheckBoxIcon,
  '@material-ui/icons/Favorite': Favorite,
  '@material-ui/icons/FavoriteBorder': FavoriteBorder,
};
