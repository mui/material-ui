import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/NoSsr': NoSsr,
  'docs/src/modules/components/Link': Link,
  'docs/src/modules/utils/i18n': { useTranslate },
};
