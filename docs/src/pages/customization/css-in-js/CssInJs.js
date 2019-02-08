import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// 1. We define the styles.
const styles = theme => ({
  root: {
    color: 'inherit',
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  primary: {
    color: theme.palette.primary.main,
  },
});

function MyLink(props) {
  const { children, classes, className, variant, ...other } = props;

  return (
    <a
      className={clsx(
        classes.root,
        {
          [classes.primary]: variant === 'primary',
        },
        className,
      )}
      {...other}
    >
      {children}
    </a>
  );
}

MyLink.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary']),
};

// 2. We inject the styles.
const MyLinkStyled = withStyles(styles)(MyLink);

export default function CssInJs() {
  return (
    <Typography variant="subtitle1">
      <MyLinkStyled href="#">MyLink</MyLinkStyled>
      {' - '}
      <MyLinkStyled href="#" variant="primary">
        {'primary'}
      </MyLinkStyled>
    </Typography>
  );
}
