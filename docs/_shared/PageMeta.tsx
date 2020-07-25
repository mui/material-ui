import * as React from 'react';
import Head from 'next/head';
import { LOGO_URL, HOST_URL } from '_constants';
import { withRouter, WithRouterProps } from 'next/router';

interface PageMetaProps extends WithRouterProps {
  title?: string;
  component?: string;
  description?: string;
}

export function PageMeta({ title, component, router, description }: PageMetaProps) {
  if (component) {
    title = `${component} - @material-ui/pickers component`;
    description = `${component} usage examples and API of @material-ui/pickers`;
  }

  if (!description) {
    description = title;
  }

  return (
    <Head>
      <title>{title}</title>

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={LOGO_URL} />
      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={LOGO_URL} />
      <meta property="og:type" content="website" />
      {router && <meta property="og:url" content={HOST_URL + router.pathname} />}
    </Head>
  );
}

export default withRouter(PageMeta);
