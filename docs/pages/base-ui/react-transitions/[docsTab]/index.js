import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/transitions/transitions.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import CssAnimationApiJsonPageContent from '../../api/css-animation.json';
import CssTransitionApiJsonPageContent from '../../api/css-transition.json';
import useTransitionStateManagerApiJsonPageContent from '../../api/use-transition-state-manager.json';
import useTransitionTriggerApiJsonPageContent from '../../api/use-transition-trigger.json';

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
  const CssAnimationApiReq = require.context(
    'docs/translations/api-docs-base/css-animation',
    false,
    /css-animation.*.json$/,
  );
  const CssAnimationApiDescriptions = mapApiPageTranslations(CssAnimationApiReq);

  const CssTransitionApiReq = require.context(
    'docs/translations/api-docs-base/css-transition',
    false,
    /css-transition.*.json$/,
  );
  const CssTransitionApiDescriptions = mapApiPageTranslations(CssTransitionApiReq);

  const useTransitionStateManagerApiReq = require.context(
    'docs/translations/api-docs/use-transition-state-manager',
    false,
    /use-transition-state-manager.*.json$/,
  );
  const useTransitionStateManagerApiDescriptions = mapApiPageTranslations(
    useTransitionStateManagerApiReq,
  );

  const useTransitionTriggerApiReq = require.context(
    'docs/translations/api-docs/use-transition-trigger',
    false,
    /use-transition-trigger.*.json$/,
  );
  const useTransitionTriggerApiDescriptions = mapApiPageTranslations(useTransitionTriggerApiReq);

  return {
    props: {
      componentsApiDescriptions: {
        CssAnimation: CssAnimationApiDescriptions,
        CssTransition: CssTransitionApiDescriptions,
      },
      componentsApiPageContents: {
        CssAnimation: CssAnimationApiJsonPageContent,
        CssTransition: CssTransitionApiJsonPageContent,
      },
      hooksApiDescriptions: {
        useTransitionStateManager: useTransitionStateManagerApiDescriptions,
        useTransitionTrigger: useTransitionTriggerApiDescriptions,
      },
      hooksApiPageContents: {
        useTransitionStateManager: useTransitionStateManagerApiJsonPageContent,
        useTransitionTrigger: useTransitionTriggerApiJsonPageContent,
      },
    },
  };
};
