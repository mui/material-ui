import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import * as pageProps from 'docs/data/base/components/form-control/form-control.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import FormControlUnstyledApiJsonPageContent from './api/form-control-unstyled.json';
import useFormControlUnstyledContextApiJsonPageContent from './api/use-form-control-unstyled-context.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getInitialProps = () => {
  const FormControlUnstyledApiReq = require.context(
    'docs/translations/api-docs/form-control-unstyled',
    false,
    /form-control-unstyled.*.json$/,
  );
  const FormControlUnstyledApiDescriptions = mapApiPageTranslations(FormControlUnstyledApiReq);

  const useFormControlUnstyledContextApiReq = require.context(
    'docs/translations/api-docs/use-form-control-unstyled-context',
    false,
    /use-form-control-unstyled-context.*.json$/,
  );
  const useFormControlUnstyledContextApiDescriptions = mapApiPageTranslations(
    useFormControlUnstyledContextApiReq,
  );

  return {
    componentsApiDescriptions: { FormControlUnstyled: FormControlUnstyledApiDescriptions },
    componentsApiPageContents: { FormControlUnstyled: FormControlUnstyledApiJsonPageContent },
    hooksApiDescriptions: {
      useFormControlUnstyledContext: useFormControlUnstyledContextApiDescriptions,
    },
    hooksApiPageContents: {
      useFormControlUnstyledContext: useFormControlUnstyledContextApiJsonPageContent,
    },
  };
};
