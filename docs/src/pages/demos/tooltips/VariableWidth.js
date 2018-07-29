import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. 
Praesent non nunc mollis, fermentum neque at, semper arcu. 
Nullam eget est sed sem iaculis gravida eget vitae justo. 
`;

function VariableWidth({ classes }) {
  return (
    <div>
      <Tooltip title={longText}>
        <Button className={classes.button}>Default Width</Button>
      </Tooltip>
      <Tooltip title={longText} maxWidth={500}>
        <Button className={classes.button}>Wraps at 500</Button>
      </Tooltip>
      <Tooltip title={longText} maxWidth={0}>
        <Button className={classes.button}>No wrapping</Button>
      </Tooltip>
    </div>
  );
}

VariableWidth.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VariableWidth);
