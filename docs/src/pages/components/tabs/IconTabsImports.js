import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/Tabs': Tabs,
  '@material-ui/core/Tab': Tab,
  '@material-ui/icons/Phone': PhoneIcon,
  '@material-ui/icons/Favorite': FavoriteIcon,
  '@material-ui/icons/PersonPin': PersonPinIcon,
};
