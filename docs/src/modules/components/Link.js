/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
import { connect } from 'react-redux';
import compose from 'docs/src/modules/utils/compose';

const NextComposed = React.forwardRef(function NextComposed(props, ref) {
  const { as, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

NextComposed.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  prefetch: PropTypes.bool,
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = React.forwardRef(function Link(props, ref) {
  const {
    activeClassName,
    className: classNameProps,
    dispatch,
    naked,
    router,
    userLanguage,
    ...other
  } = props;

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName,
  });

  if (userLanguage !== 'en' && other.href.indexOf('/') === 0) {
    other.as = `/${userLanguage}${other.href}`;
  }

  if (naked) {
    return <NextComposed className={className} ref={ref} {...other} />;
  }

  return <MuiLink component={NextComposed} className={className} ref={ref} {...other} />;
});

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  dispatch: PropTypes.func,
  href: PropTypes.string,
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  userLanguage: PropTypes.string.isRequired,
};

Link.defaultProps = {
  activeClassName: 'active',
};

export default compose(
  withRouter,
  connect(state => ({
    userLanguage: state.options.userLanguage,
  })),
)(Link);
