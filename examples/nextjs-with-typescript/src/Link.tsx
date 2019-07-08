/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';

interface NextLinkProps {
  as?: string;
  href?: string;
  prefetch?: boolean;
}

type NextComposedProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & NextLinkProps;

const NextComposed = React.forwardRef(function NextComposed(
  props: NextComposedProps,
  ref: React.Ref<any>,
) {
  const { as, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

interface LinkProps extends MuiLinkProps, NextLinkProps {
  activeClassName?: string;
  naked?: boolean;
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function RouterLink(props: LinkProps) {
  const router = useRouter();
  const {
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName,
  });

  if (naked) {
    return <NextComposed className={className} ref={innerRef} {...other} />;
  }

  return <MuiLink component={NextComposed} className={className} ref={innerRef} {...other} />;
}

export default React.forwardRef((props: LinkProps, ref) => (
  <RouterLink {...props} innerRef={ref} />
));
