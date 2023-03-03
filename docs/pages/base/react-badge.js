import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import * as pageProps from 'docs/data/base/components/badge/badge.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import BadgeUnstyledApiJsonPageContent from './api/badge-unstyled.json';
import useBadgeApiJsonPageContent from './api/use-badge.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getInitialProps = () => {
  const BadgeUnstyledApiReq = require.context(
    'docs/translations/api-docs/badge-unstyled',
    false,
    /badge-unstyled.*.json$/,
  );
  const BadgeUnstyledApiDescriptions = mapApiPageTranslations(BadgeUnstyledApiReq);

  const useBadgeApiReq = require.context(
    'docs/translations/api-docs/use-badge',
    false,
    /use-badge.*.json$/,
  );
  const useBadgeApiDescriptions = mapApiPageTranslations(useBadgeApiReq);

  return {
    componentsApiDescriptions: { BadgeUnstyled: BadgeUnstyledApiDescriptions },
    componentsApiPageContents: { BadgeUnstyled: BadgeUnstyledApiJsonPageContent },
    hooksApiDescriptions: { useBadge: useBadgeApiDescriptions },
    hooksApiPageContents: { useBadge: useBadgeApiJsonPageContent },
  };
};
