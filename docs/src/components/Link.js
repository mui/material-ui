// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as LinkRouter } from 'react-router';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('Link', (theme) => ({
  root: {
    color: 'inherit',
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  primary: {
    color: theme.palette.primary[500],
  },
}));

function Link(props) {
  const {
    component: ComponentProp,
    classes,
    className,
    variant,
    to,
    ...other
  } = props;

  let Component;

  if (ComponentProp) {
    Component = ComponentProp;
  } else if (to) {
    Component = LinkRouter;
  } else {
    Component = 'a';
  }

  return (
    <Component
      to={to}
      className={classNames(classes.root, {
        [classes.primary]: variant === 'primary',
      }, className)}
      {...other}
    />
  );
}

Link.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  to: PropTypes.string,
  variant: PropTypes.oneOf(['primary']),
};

export default withStyles(styleSheet)(Link);
