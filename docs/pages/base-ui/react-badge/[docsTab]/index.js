import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/badge/badge.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import BadgeApiJsonPageContent from '../../api/badge.json';
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
    paths: [{ params: { docsTab: 'components-api' } }, { params: { docsTab: 'hooks-api' } }],
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps = () => {
  const BadgeApiReq = require.context(
    'docs/translations/api-docs-base/badge',
    false,
    /badge.*.json$/,
  );
  const BadgeApiDescriptions = mapApiPageTranslations(BadgeApiReq);

  const useBadgeApiReq = require.context(
    'docs/translations/api-docs/use-badge',
    false,
    /use-badge.*.json$/,
  );
  const useBadgeApiDescriptions = mapApiPageTranslations(useBadgeApiReq);

  return {
    props: {
      componentsApiDescriptions: { Badge: BadgeApiDescriptions },
      componentsApiPageContents: { Badge: BadgeApiJsonPageContent },
      hooksApiDescriptions: { useBadge: useBadgeApiDescriptions },
      hooksApiPageContents: { useBadge: useBadgeApiJsonPageContent },
    },
  };
};
