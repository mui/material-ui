// @flow weak

import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: theme.typography.button,
});

function TypograpghyTheme(props) {
  return (
    <div className={props.classes.root}>
      {'This div looks like a button.'}
    </div>
  );
}

TypograpghyTheme.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TypograpghyTheme);
