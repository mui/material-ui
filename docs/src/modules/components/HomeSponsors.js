import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import mapTranslations from 'docs/src/modules/utils/mapTranslations';

const req = require.context('docs/src/modules/components', false, /\.md$/);
const backers = mapTranslations(req, 'md');

const styles = theme => ({
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
});

function HomeSponsors(props) {
  const { classes } = props;
  const userLanguage = useSelector(state => state.options.userLanguage);

  return (
    <div className={classes.root}>
      <NoSsr>
        <Container maxWidth="md">
          <Divider />
          <MarkdownElement className={classes.markdownElement} text={backers[userLanguage]} />
        </Container>
      </NoSsr>
    </div>
  );
}

HomeSponsors.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeSponsors);
