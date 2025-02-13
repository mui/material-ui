import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';

export const NextLinkComposed = React.forwardRef(function NextLinkComposed(props, ref) {
  const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
      ref={ref}
      {...other}
    />
  );
});

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/pages/api-reference/components/link
const Link = React.forwardRef(function Link(props, ref) {
  const {
    activeClassName = 'active',
    as,
    className: classNameProps,
    href,
    linkAs: linkAsProp,
    locale,
    noLinkStyle,
    prefetch,
    replace,
    role, // Link don't have roles.
    scroll,
    shallow,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const linkAs = linkAsProp || as;
  const nextjsProps = {
    to: href,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
  };

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref} {...nextjsProps} {...other} />;
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      className={className}
      ref={ref}
      {...nextjsProps}
      {...other}
    />
  );
});

export default Link;
