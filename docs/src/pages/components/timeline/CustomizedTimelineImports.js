import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/lab/Timeline': Timeline,
  '@material-ui/lab/TimelineItem': TimelineItem,
  '@material-ui/lab/TimelineSeparator': TimelineSeparator,
  '@material-ui/lab/TimelineConnector': TimelineConnector,
  '@material-ui/lab/TimelineContent': TimelineContent,
  '@material-ui/lab/TimelineOppositeContent': TimelineOppositeContent,
  '@material-ui/lab/TimelineDot': TimelineDot,
  '@material-ui/icons/Fastfood': FastfoodIcon,
  '@material-ui/icons/LaptopMac': LaptopMacIcon,
  '@material-ui/icons/Hotel': HotelIcon,
  '@material-ui/icons/Repeat': RepeatIcon,
  '@material-ui/core/Typography': Typography,
};
