import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';

export default {
  react: React,
  clsx,
  '@material-ui/core/styles': { makeStyles, createStyles },
  'docs/src/modules/components/Link': Link,
  'docs/src/modules/utils/i18n': { useTranslate },
};
