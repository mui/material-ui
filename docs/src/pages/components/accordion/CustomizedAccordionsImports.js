import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { styled },
  '@material-ui/icons/ArrowForwardIosSharp': ArrowForwardIosSharpIcon,
  '@material-ui/core/Accordion': MuiAccordion,
  '@material-ui/core/AccordionSummary': MuiAccordionSummary,
  '@material-ui/core/AccordionDetails': MuiAccordionDetails,
  '@material-ui/core/Typography': Typography,
};
