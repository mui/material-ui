'use client';
import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkOwnProps as MuiLinkProps } from '@mui/material/Link';
import linkClasses from './linkClasses';

export interface LinkProps
  extends Omit<NextLinkProps, 'passHref' | 'legacyBehavior'>,
    MuiLinkProps {
  /**
   * Extra class name to apply to the link.
   */
  className?: string;
  /**
   * The active class name to apply when the current page is the same as the link's href.
   * @default 'Mui-active'
   */
  activeClassName?: string;
}

const Link = React.forwardRef(function Link({
  href,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  as,
  className: classNameProp,
  activeClassName = linkClasses.active,
  ...muiLinkProps
}: LinkProps) {
  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProp, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });
  return (
    <NextLink
      {...{
        href,
        replace,
        scroll,
        shallow,
        prefetch,
        locale,
        as,
      }}
      // below props are required for NextLink to work with MUI Link
      passHref
      legacyBehavior
    >
      <MuiLink className={className} {...muiLinkProps} />
    </NextLink>
  );
});

export default Link;
