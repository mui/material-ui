import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import MarkdownElement from '@material-ui/docs/MarkdownElement';
import backers from './backers.md';

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
  const { classes } = props;

  return (
    <div className={classes.root}>
      <NoSsr>
        <MarkdownElement className={classes.markdownElement} text={backers} />
      </NoSsr>
    </div>
  );
}

HomeBackers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeBackers);
