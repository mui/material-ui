import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/table-pagination/table-pagination.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import TablePaginationUnstyledApiJsonPageContent from '../../api/table-pagination-unstyled.json';

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
  const TablePaginationUnstyledApiReq = require.context(
    'docs/translations/api-docs/table-pagination-unstyled',
    false,
    /table-pagination-unstyled.*.json$/,
  );
  const TablePaginationUnstyledApiDescriptions = mapApiPageTranslations(
    TablePaginationUnstyledApiReq,
  );

  return {
    props: {
      componentsApiDescriptions: {
        TablePaginationUnstyled: TablePaginationUnstyledApiDescriptions,
      },
      componentsApiPageContents: {
        TablePaginationUnstyled: TablePaginationUnstyledApiJsonPageContent,
      },
      hooksApiDescriptions: {},
      hooksApiPageContents: {},
    },
  };
};
