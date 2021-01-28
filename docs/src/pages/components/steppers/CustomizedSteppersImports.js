import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles, createStyles, withStyles },
  clsx,
  '@material-ui/core/Stepper': Stepper,
  '@material-ui/core/Step': Step,
  '@material-ui/core/StepLabel': StepLabel,
  '@material-ui/icons/Check': Check,
  '@material-ui/icons/Settings': SettingsIcon,
  '@material-ui/icons/GroupAdd': GroupAddIcon,
  '@material-ui/icons/VideoLabel': VideoLabelIcon,
  '@material-ui/core/StepConnector': StepConnector,
};
