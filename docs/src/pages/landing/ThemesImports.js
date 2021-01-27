import * as React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NoSsr from '@material-ui/core/NoSsr';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, useTheme },
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Container': Container,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Button': Button,
  '@material-ui/core/NoSsr': NoSsr,
  'docs/src/modules/components/Link': Link,
  'docs/src/modules/utils/i18n': { useTranslate },
};
