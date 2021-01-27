import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'docs/src/modules/components/Link';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TwitterIcon from '@material-ui/icons/Twitter';
import NoSsr from '@material-ui/core/NoSsr';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { useTranslate } from 'docs/src/modules/utils/i18n';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles },
  'docs/src/modules/components/Link': Link,
  '@material-ui/core/Card': Card,
  '@material-ui/core/CardActionArea': CardActionArea,
  '@material-ui/core/CardContent': CardContent,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Avatar': Avatar,
  '@material-ui/icons/Twitter': TwitterIcon,
  '@material-ui/core/NoSsr': NoSsr,
  '@material-ui/core/Container': Container,
  '@material-ui/core/Divider': Divider,
  'docs/src/modules/utils/i18n': { useTranslate },
};
