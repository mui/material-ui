import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/modal/modal.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import ModalApiJsonPageContent from '../../api/modal.json';
import useModalApiJsonPageContent from '../../api/use-modal.json';

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
  const ModalApiReq = require.context(
    'docs/translations/api-docs-base/modal',
    false,
    /modal.*.json$/,
  );
  const ModalApiDescriptions = mapApiPageTranslations(ModalApiReq);

  const useModalApiReq = require.context(
    'docs/translations/api-docs/use-modal',
    false,
    /use-modal.*.json$/,
  );
  const useModalApiDescriptions = mapApiPageTranslations(useModalApiReq);

  return {
    props: {
      componentsApiDescriptions: { Modal: ModalApiDescriptions },
      componentsApiPageContents: { Modal: ModalApiJsonPageContent },
      hooksApiDescriptions: { useModal: useModalApiDescriptions },
      hooksApiPageContents: { useModal: useModalApiJsonPageContent },
    },
  };
};
