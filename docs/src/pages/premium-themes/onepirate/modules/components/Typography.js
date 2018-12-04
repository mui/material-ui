import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils/helpers';
import MuiTypography from '@material-ui/core/Typography';

const styles = theme => ({
  markedH2Center: {
    height: 4,
    width: 73,
    display: 'block',
    margin: `${theme.spacing.unit}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  markedH3Center: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing.unit}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  markedH4Center: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing.unit}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  markedH6Left: {
    height: 2,
    width: 28,
    display: 'block',
    marginTop: theme.spacing.unit / 2,
    background: 'currentColor',
  },
});

const headlineMapping = {
  h1: 'h1',
  h2: 'h1',
  h3: 'h1',
  h4: 'h1',
  h5: 'h3',
  h6: 'h2',
  subtitle1: 'h3',
};

function Typography(props) {
  const { children, classes, marked, variant, ...other } = props;

  return (
    <MuiTypography headlineMapping={headlineMapping} variant={variant} {...other}>
      {children}
      {marked ? (
        <span className={classes[`marked${capitalize(variant) + capitalize(marked)}`]} />
      ) : null}
    </MuiTypography>
  );
}

Typography.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  marked: PropTypes.oneOf([false, 'center', 'left']),
  variant: PropTypes.string,
};

Typography.defaultProps = {
  marked: false,
};

export default withStyles(styles)(Typography);
