/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Ref, FunctionComponent, ReactNode } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
import { TypographyProps } from '@material-ui/core/Typography';

interface NextLinkProps {
  as?: string;
  href?: string;
  prefetch?: boolean;
  className?: string;
}

const NextComposed = React.forwardRef<HTMLAnchorElement, NextLinkProps>((props, ref) => {
  const { as, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

type LinkProps = LinkPropsBase & Pick<TypographyProps, 'align' | 'color' | 'display' | 'variant'>;

interface LinkPropsBase extends NextLinkProps {
  activeClassName?: string;
  innerRef?: Ref<HTMLAnchorElement>;
  naked?: boolean;
  children?: ReactNode;
}
// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const RouterLink: FunctionComponent<LinkProps> = props => {
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
};

export default React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <RouterLink {...props} innerRef={ref} />
));
