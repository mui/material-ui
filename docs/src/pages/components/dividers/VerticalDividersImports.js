import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/icons/FormatAlignLeft': FormatAlignLeftIcon,
  '@material-ui/icons/FormatAlignCenter': FormatAlignCenterIcon,
  '@material-ui/icons/FormatAlignRight': FormatAlignRightIcon,
  '@material-ui/icons/FormatBold': FormatBoldIcon,
  '@material-ui/icons/FormatItalic': FormatItalicIcon,
  '@material-ui/icons/FormatUnderlined': FormatUnderlinedIcon,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Divider': Divider,
};
