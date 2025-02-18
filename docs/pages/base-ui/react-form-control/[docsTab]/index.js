import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/form-control/form-control.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import FormControlApiJsonPageContent from '../../api/form-control.json';
import useFormControlContextApiJsonPageContent from '../../api/use-form-control-context.json';

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
  const FormControlApiReq = require.context(
    'docs/translations/api-docs-base/form-control',
    false,
    /form-control.*.json$/,
  );
  const FormControlApiDescriptions = mapApiPageTranslations(FormControlApiReq);

  const useFormControlContextApiReq = require.context(
    'docs/translations/api-docs/use-form-control-context',
    false,
    /use-form-control-context.*.json$/,
  );
  const useFormControlContextApiDescriptions = mapApiPageTranslations(useFormControlContextApiReq);

  return {
    props: {
      componentsApiDescriptions: { FormControl: FormControlApiDescriptions },
      componentsApiPageContents: { FormControl: FormControlApiJsonPageContent },
      hooksApiDescriptions: { useFormControlContext: useFormControlContextApiDescriptions },
      hooksApiPageContents: { useFormControlContext: useFormControlContextApiJsonPageContent },
    },
  };
};
