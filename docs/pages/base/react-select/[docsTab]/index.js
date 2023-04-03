import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/select/select.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import OptionGroupUnstyledApiJsonPageContent from '../../api/option-group-unstyled.json';
import OptionUnstyledApiJsonPageContent from '../../api/option-unstyled.json';
import SelectUnstyledApiJsonPageContent from '../../api/select-unstyled.json';
import useOptionApiJsonPageContent from '../../api/use-option.json';
import useSelectApiJsonPageContent from '../../api/use-select.json';

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
  const OptionGroupUnstyledApiReq = require.context(
    'docs/translations/api-docs/option-group-unstyled',
    false,
    /option-group-unstyled.*.json$/,
  );
  const OptionGroupUnstyledApiDescriptions = mapApiPageTranslations(OptionGroupUnstyledApiReq);

  const OptionUnstyledApiReq = require.context(
    'docs/translations/api-docs/option-unstyled',
    false,
    /option-unstyled.*.json$/,
  );
  const OptionUnstyledApiDescriptions = mapApiPageTranslations(OptionUnstyledApiReq);

  const SelectUnstyledApiReq = require.context(
    'docs/translations/api-docs/select-unstyled',
    false,
    /select-unstyled.*.json$/,
  );
  const SelectUnstyledApiDescriptions = mapApiPageTranslations(SelectUnstyledApiReq);

  const useOptionApiReq = require.context(
    'docs/translations/api-docs/use-option',
    false,
    /use-option.*.json$/,
  );
  const useOptionApiDescriptions = mapApiPageTranslations(useOptionApiReq);

  const useSelectApiReq = require.context(
    'docs/translations/api-docs/use-select',
    false,
    /use-select.*.json$/,
  );
  const useSelectApiDescriptions = mapApiPageTranslations(useSelectApiReq);

  return {
    props: {
      componentsApiDescriptions: {
        OptionGroupUnstyled: OptionGroupUnstyledApiDescriptions,
        OptionUnstyled: OptionUnstyledApiDescriptions,
        SelectUnstyled: SelectUnstyledApiDescriptions,
      },
      componentsApiPageContents: {
        OptionGroupUnstyled: OptionGroupUnstyledApiJsonPageContent,
        OptionUnstyled: OptionUnstyledApiJsonPageContent,
        SelectUnstyled: SelectUnstyledApiJsonPageContent,
      },
      hooksApiDescriptions: {
        useOption: useOptionApiDescriptions,
        useSelect: useSelectApiDescriptions,
      },
      hooksApiPageContents: {
        useOption: useOptionApiJsonPageContent,
        useSelect: useSelectApiJsonPageContent,
      },
    },
  };
};
