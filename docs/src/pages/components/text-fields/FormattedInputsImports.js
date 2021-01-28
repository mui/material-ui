import * as React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

export default {
  react: React,
  'prop-types': PropTypes,
  'react-text-mask': MaskedInput,
  'react-number-format': NumberFormat,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Input': Input,
  '@material-ui/core/InputLabel': InputLabel,
  '@material-ui/core/TextField': TextField,
  '@material-ui/core/FormControl': FormControl,
};
