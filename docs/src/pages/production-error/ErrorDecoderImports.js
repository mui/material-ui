import * as React from 'react';
import { useRouter } from 'next/router';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { renderInline as renderInlineMarkdown } from 'docs/src/modules/utils/parseMarkdown';

export default {
  react: React,
  'next/router': { useRouter },
  '@material-ui/core/Link': Link,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/styles': { styled },
  'docs/src/modules/components/MarkdownElement': MarkdownElement,
  'docs/src/modules/utils/parseMarkdown': { renderInlineMarkdown },
};
