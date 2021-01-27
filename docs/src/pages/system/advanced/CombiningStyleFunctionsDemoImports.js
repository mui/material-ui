import * as React from 'react';
import styled from 'styled-components';
import { palette, spacing } from '@material-ui/system';
import NoSsr from '@material-ui/core/NoSsr';

export default {
  react: React,
  'styled-components': styled,
  '@material-ui/system': { palette, spacing },
  '@material-ui/core/NoSsr': NoSsr,
};
