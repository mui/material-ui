import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { FileDownload as FileDownloadIcon } from '@material-ui/docs';
import BuildIcon from '@material-ui/icons/Build';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import * as React from 'react';
import { Button } from '@material-ui/core';

export default {
  react: React,
  clsx,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Container': Container,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Divider': Divider,
  '@material-ui/docs': { FileDownloadIcon },
  '@material-ui/icons/Build': BuildIcon,
  'docs/src/modules/components/HighlightedCode': HighlightedCode,
  'docs/src/modules/components/Link': Link,
  'docs/src/modules/utils/i18n': { useTranslate },
  react: React,
  '@material-ui/core': { Button },
};
