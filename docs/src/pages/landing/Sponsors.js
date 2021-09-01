import * as React from 'react';
import { makeStyles } from '@mui/styles';
import NoSsr from '@mui/core/NoSsr';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';
import { docs } from './backers.md?@mui/markdown';

const useStyles = makeStyles(
  (theme) => ({
    '@global': {
      '.anchor-link-style': {
        position: 'absolute',
        top: -9999,
        left: -9999,
      },
    },
    root: {
      minHeight: 600,
      textAlign: 'center',
    },
    markdownElement: {
      padding: theme.spacing(4, 0),
    },
  }),
  { name: 'Sponsors' },
);

export default function Sponsors() {
  const classes = useStyles();
  const userLanguage = useUserLanguage();
  const { rendered } = docs[userLanguage];

  return (
    <div className={classes.root}>
      <NoSsr defer>
        <Container maxWidth="md">
          <Divider />
          {rendered.map((renderedMarkdown, index) => {
            return (
              <MarkdownElement
                key={index}
                className={classes.markdownElement}
                renderedMarkdown={renderedMarkdown}
              />
            );
          })}
        </Container>
      </NoSsr>
    </div>
  );
}
