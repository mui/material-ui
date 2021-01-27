import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslate } from 'docs/src/modules/utils/i18n';

export default {
  react: React,
  clsx,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/NoSsr': NoSsr,
  '@material-ui/core/Divider': Divider,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Container': Container,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Typography': Typography,
  'docs/src/modules/utils/i18n': { useTranslate },
};
