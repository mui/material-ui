import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
};

function Types(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h1" gutterBottom>
        H1
      </Typography>
      <Typography variant="h2" gutterBottom>
        H2
      </Typography>
      <Typography variant="h3" gutterBottom>
        H3
      </Typography>
      <Typography variant="h4" gutterBottom>
        H4
      </Typography>
      <Typography variant="h5" gutterBottom>
        H5
      </Typography>
      <Typography variant="h6" gutterBottom>
        H6
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        subtitle 1
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        subtitle 2
      </Typography>
      <Typography variant="body1" gutterBottom>
        Body 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Body 2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="button" gutterBottom>
        button text
      </Typography>
      <Typography variant="caption" gutterBottom>
        caption text
      </Typography>
      <Typography variant="overline" gutterBottom>
        overline text
      </Typography>
    </div>
  );
}

Types.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Types);
