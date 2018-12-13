import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import NextLink from 'next/link';
import { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  default: {
    color: 'inherit',
  },
  underline: {
    color: 'inherit',
    textDecoration: 'underline',
  },
  primary: {
    color: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
  button: {
    '&:hover': {
      textDecoration: 'inherit',
    },
  },
  active: {},
});

function Link(props) {
  const {
    children: childrenProp,
    classes,
    className: classNameProp,
    component: ComponentProp,
    href,
    params,
    prefetch,
    router,
    variant,
    ...other
  } = props;

  let Component;
  const className = classNames(
    classes.root,
    {
      [classes[variant]]: variant !== 'inherit',
    },
    classNameProp,
  );
  let more;
  let children = childrenProp;

  if (ComponentProp) {
    Component = ComponentProp;
    more = {
      className,
      ...other,
    };
  } else if (href) {
    Component = NextLink;
    more = {
      href,
      ...params,
      prefetch,
    };
    children = (
      <a
        className={classNames(className, {
          [classes.active]: href === router.pathname,
        })}
        {...other}
      >
        {children}
      </a>
    );
  } else {
    Component = 'a';
    more = {
      ...other,
      className,
    };
  }

  return <Component {...more}>{children}</Component>;
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  href: PropTypes.string,
  params: PropTypes.object,
  prefetch: PropTypes.bool,
  router: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['default', 'underline', 'primary', 'secondary', 'button', 'inherit']),
};

Link.defaultProps = {
  variant: 'primary',
};

export default compose(
  withStyles(styles),
  withRouter,
)(Link);
