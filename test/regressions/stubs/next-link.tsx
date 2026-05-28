import * as React from 'react';

// Stub for `next/link`. Renders a plain anchor — visually equivalent to the
// Next.js Link for Argos purposes (link text + styling captured).
interface NextLinkStubProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string | { pathname?: string };
  as?: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  locale?: string | false;
  legacyBehavior?: boolean;
}

const NextLink = React.forwardRef<HTMLAnchorElement, NextLinkStubProps>(function NextLink(
  {
    href,
    as: _as,
    prefetch: _prefetch,
    replace: _replace,
    scroll: _scroll,
    shallow: _shallow,
    passHref: _passHref,
    locale: _locale,
    legacyBehavior: _legacyBehavior,
    children,
    ...rest
  },
  ref,
) {
  const url = typeof href === 'string' ? href : (href?.pathname ?? '');
  return (
    <a href={url} ref={ref} {...rest}>
      {children}
    </a>
  );
});

export default NextLink;
