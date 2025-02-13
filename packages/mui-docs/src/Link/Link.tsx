import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { useUserLanguage } from '../i18n';
import { useDocsConfig } from '../DocsProvider';

/**
 * File to keep in sync with:
 *
 * - /examples/material-ui-nextjs-pages-router/src/Link.js
 * - /examples/material-ui-nextjs-pages-router-ts/src/Link.tsx
 */

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as' | 'passHref' | 'onMouseEnter' | 'onClick' | 'onTouchStart'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
}

const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, ref) {
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
        data-no-markdown-link="true"
        ref={ref}
        {...other}
      />
    );
  },
);

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  linkAs?: NextLinkProps['as']; // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Pages Router Link component:
// https://nextjs.org/docs/pages/api-reference/components/link
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
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
    scroll,
    shallow,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href?.pathname;
  const routerPathname = router.pathname.replace('/[docsTab]', '');

  const shouldBeActive = routerPathname === pathname;

  const className = clsx(classNameProps, {
    [activeClassName]: shouldBeActive && activeClassName,
  });

  const userLanguage = useUserLanguage();

  const { LANGUAGES_IGNORE_PAGES } = useDocsConfig();

  let linkAs = linkAsProp || as || (href as string);
  if (
    userLanguage !== 'en' &&
    pathname &&
    pathname.startsWith('/') &&
    !LANGUAGES_IGNORE_PAGES(pathname) &&
    !pathname.startsWith(`/${userLanguage}/`)
  ) {
    linkAs = `/${userLanguage}${linkAs}`;
  }

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
