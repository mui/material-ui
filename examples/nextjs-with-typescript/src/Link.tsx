/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink from '@material-ui/core/Link';
import { TypographyProps } from '@material-ui/core/Typography';

interface NextLinkExtendedProps extends Omit<NextLinkProps, 'href' | 'onError'> {
  className?: string;
  href: string;
}

const NextComposed = React.forwardRef<HTMLAnchorElement, NextLinkExtendedProps>((props, ref) => {
  const { as, href, replace, scroll, passHref, shallow, prefetch, ...other } = props;

  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
    >
      <a ref={ref} {...other} />
    </NextLink>
  );
});

type LinkProps = LinkPropsBase &
  Pick<
    TypographyProps,
    | 'align'
    | 'color'
    | 'display'
    | 'gutterBottom'
    | 'noWrap'
    | 'paragraph'
    | 'variant'
    | 'variantMapping'
  >;

interface LinkPropsBase extends NextLinkExtendedProps {
  activeClassName?: string;
  innerRef?: React.Ref<HTMLAnchorElement>;
  naked?: boolean;
  children?: React.ReactNode;
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

export default React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <RouterLink {...props} innerRef={ref} />
));
