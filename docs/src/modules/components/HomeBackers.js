import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import mapTranslations from '../utils/mapTranslations';
import MarkdownElement from '@material-ui/docs/MarkdownElement';

const req = require.context('docs/src/modules/components', false, /\.md$/);
const backers = mapTranslations(req, 'md');

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: 600,
  },
  markdownElement: {
    maxWidth: theme.spacing.unit * 110,
    margin: 'auto',
    padding: theme.spacing.unit * 2,
  },
});

function HomeBackers(props) {
  const { classes, userLanguage } = props;

  return (
    <div className={classes.root}>
      <NoSsr>
        <MarkdownElement className={classes.markdownElement} text={backers[userLanguage]} />
      </NoSsr>
    </div>
  );
}

HomeBackers.propTypes = {
  classes: PropTypes.object.isRequired,
  userLanguage: PropTypes.string.isRequired,
};

export default compose(
  connect(state => ({ userLanguage: state.options.userLanguage })),
  withStyles(styles),
)(HomeBackers);
