import * as React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default {
  react: React,
  'react-router': { MemoryRouter: Router },
  'react-router-dom': { Link: RouterLink },
  '@material-ui/core/Button': Button,
};
