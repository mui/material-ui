import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Accordion': Accordion,
  '@material-ui/core/AccordionSummary': AccordionSummary,
  '@material-ui/core/AccordionDetails': AccordionDetails,
  '@material-ui/core/Typography': Typography,
  '@material-ui/icons/ExpandMore': ExpandMoreIcon,
};
