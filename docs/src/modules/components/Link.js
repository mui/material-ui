/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
import { useSelector } from 'react-redux';

const NextComposed = React.forwardRef(function NextComposed(props, ref) {
  const { as, href, ...other } = props;

  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

NextComposed.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
  const {
    activeClassName = 'active',
    className: classNameProps,
    href: routerHref,
    innerRef,
    naked,
    role: roleProp,
    ...other
  } = props;

  // apply nextjs rewrites
  const href = routerHref.replace(/\/api-docs\/(.*)/, '/api/$1');

  const router = useRouter();

  const userLanguage = useSelector((state) => state.options.userLanguage);
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === routerHref && activeClassName,
  });

  if (userLanguage !== 'en' && href.indexOf('/') === 0 && href.indexOf('/blog') !== 0) {
    other.as = `/${userLanguage}${href}`;
  }

  // catch role passed from ButtonBase. This is definitely a link
  const role = roleProp === 'button' ? undefined : roleProp;

  const isExternal = href.indexOf('https:') === 0 || href.indexOf('mailto:') === 0;

  if (isExternal) {
    return <MuiLink className={className} href={href} ref={innerRef} role={role} {...other} />;
  }

  if (naked) {
    return <NextComposed className={className} href={href} ref={innerRef} role={role} {...other} />;
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      href={href}
      ref={innerRef}
      role={role}
      {...other}
    />
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
  role: PropTypes.string,
};

export default React.forwardRef((props, ref) => <Link {...props} innerRef={ref} />);
