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
function Link(props) {
  const {
    activeClassName,
    className: classNameProps,
    innerRef,
    naked,
    role: roleProp,
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

  // catch role passed from ButtonBase. This is definitely a link
  const role = roleProp === 'button' ? undefined : roleProp;

  if (naked) {
    return <NextComposed className={className} ref={innerRef} role={role} {...other} />;
  }

  return (
    <MuiLink component={NextComposed} className={className} ref={innerRef} role={role} {...other} />
  );
}

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
  role: PropTypes.string,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  userLanguage: PropTypes.string.isRequired,
};

Link.defaultProps = {
  activeClassName: 'active',
};

const RouterLink = compose(
  withRouter,
  connect(
    state => ({
      userLanguage: state.options.userLanguage,
    }),
    {},
  ),
)(Link);

export default React.forwardRef((props, ref) => <RouterLink {...props} innerRef={ref} />);
