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
      <Typography component="h2" variant="h1" display="block" gutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="h2" display="block" gutterBottom>
        h2. Heading
      </Typography>
      <Typography variant="h3" display="block" gutterBottom>
        h3. Heading
      </Typography>
      <Typography variant="h4" display="block" gutterBottom>
        h4. Heading
      </Typography>
      <Typography variant="h5" display="block" gutterBottom>
        h5. Heading
      </Typography>
      <Typography variant="h6" display="block" gutterBottom>
        h6. Heading
      </Typography>
      <Typography variant="subtitle1" display="block" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Typography>
      <Typography variant="subtitle2" display="block" gutterBottom>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Typography>
      <Typography variant="body1" display="block" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="body2" display="block" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        button text
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        caption text
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        overline text
      </Typography>
    </div>
  );
}

Types.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Types);
