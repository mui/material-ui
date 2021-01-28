import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/NoSsr': NoSsr,
  'docs/src/modules/components/MarkdownElement': MarkdownElement,
  '@material-ui/core/Container': Container,
  '@material-ui/core/Divider': Divider,
  'docs/src/modules/utils/parseMarkdown': { prepareMarkdown },
  'docs/src/modules/utils/i18n': { useUserLanguage },
};
