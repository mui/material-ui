import * as React from 'react';
import { jssPreset, StylesProvider, makeStyles } from '@material-ui/core/styles';
import { create } from 'jss';
import jssTemplate from 'jss-plugin-template';

export default {
  react: React,
  '@material-ui/core/styles': { jssPreset, StylesProvider, makeStyles },
  jss: { create },
  'jss-plugin-template': jssTemplate,
};
