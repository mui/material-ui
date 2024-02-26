import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/select/select.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import OptionApiJsonPageContent from '../../api/option.json';
import OptionGroupApiJsonPageContent from '../../api/option-group.json';
import SelectApiJsonPageContent from '../../api/select.json';
import useOptionApiJsonPageContent from '../../api/use-option.json';
import useOptionContextStabilizerApiJsonPageContent from '../../api/use-option-context-stabilizer.json';
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
  const OptionApiReq = require.context(
    'docs/translations/api-docs-base/option',
    false,
    /option.*.json$/,
  );
  const OptionApiDescriptions = mapApiPageTranslations(OptionApiReq);

  const OptionGroupApiReq = require.context(
    'docs/translations/api-docs-base/option-group',
    false,
    /option-group.*.json$/,
  );
  const OptionGroupApiDescriptions = mapApiPageTranslations(OptionGroupApiReq);

  const SelectApiReq = require.context(
    'docs/translations/api-docs-base/select',
    false,
    /select.*.json$/,
  );
  const SelectApiDescriptions = mapApiPageTranslations(SelectApiReq);

  const useOptionApiReq = require.context(
    'docs/translations/api-docs/use-option',
    false,
    /use-option.*.json$/,
  );
  const useOptionApiDescriptions = mapApiPageTranslations(useOptionApiReq);

  const useOptionContextStabilizerApiReq = require.context(
    'docs/translations/api-docs/use-option-context-stabilizer',
    false,
    /use-option-context-stabilizer.*.json$/,
  );
  const useOptionContextStabilizerApiDescriptions = mapApiPageTranslations(
    useOptionContextStabilizerApiReq,
  );

  const useSelectApiReq = require.context(
    'docs/translations/api-docs/use-select',
    false,
    /use-select.*.json$/,
  );
  const useSelectApiDescriptions = mapApiPageTranslations(useSelectApiReq);

  return {
    props: {
      componentsApiDescriptions: {
        Option: OptionApiDescriptions,
        OptionGroup: OptionGroupApiDescriptions,
        Select: SelectApiDescriptions,
      },
      componentsApiPageContents: {
        Option: OptionApiJsonPageContent,
        OptionGroup: OptionGroupApiJsonPageContent,
        Select: SelectApiJsonPageContent,
      },
      hooksApiDescriptions: {
        useOption: useOptionApiDescriptions,
        useOptionContextStabilizer: useOptionContextStabilizerApiDescriptions,
        useSelect: useSelectApiDescriptions,
      },
      hooksApiPageContents: {
        useOption: useOptionApiJsonPageContent,
        useOptionContextStabilizer: useOptionContextStabilizerApiJsonPageContent,
        useSelect: useSelectApiJsonPageContent,
      },
    },
  };
};
