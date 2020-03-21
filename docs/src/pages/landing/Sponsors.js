import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import mapTranslations from 'docs/src/modules/utils/mapTranslations';

const req = require.context('./', false, /\.md$/);
const backers = mapTranslations(req, 'md');

const useStyles = makeStyles(
  theme => ({
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
  const userLanguage = useSelector(state => state.options.userLanguage);

  return (
    <div className={classes.root}>
      <NoSsr defer>
        <Container maxWidth="md">
          <Divider />
          <MarkdownElement className={classes.markdownElement} text={backers[userLanguage]} />
        </Container>
      </NoSsr>
    </div>
  );
}
