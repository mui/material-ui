import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/badge/badge.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import BadgeUnstyledApiJsonPageContent from '../../api/badge-unstyled.json';
import useBadgeApiJsonPageContent from '../../api/use-badge.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

export const getStaticPaths = () => {
  return {
    paths: [{ params: { docsTab: 'component-api' } }, { params: { docsTab: 'hook-api' } }],
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps = () => {
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
    props: {
      componentsApiDescriptions: { BadgeUnstyled: BadgeUnstyledApiDescriptions },
      componentsApiPageContents: { BadgeUnstyled: BadgeUnstyledApiJsonPageContent },
      hooksApiDescriptions: { useBadge: useBadgeApiDescriptions },
      hooksApiPageContents: { useBadge: useBadgeApiJsonPageContent },
    },
  };
};
