import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/slider/slider.md?muiMarkdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import SliderApiJsonPageContent from '../../api/slider.json';
import useSliderApiJsonPageContent from '../../api/use-slider.json';

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
  const SliderApiReq = require.context(
    'docs/translations/api-docs-base/slider',
    false,
    /slider.*.json$/,
  );
  const SliderApiDescriptions = mapApiPageTranslations(SliderApiReq);

  const useSliderApiReq = require.context(
    'docs/translations/api-docs/use-slider',
    false,
    /use-slider.*.json$/,
  );
  const useSliderApiDescriptions = mapApiPageTranslations(useSliderApiReq);

  return {
    props: {
      componentsApiDescriptions: { Slider: SliderApiDescriptions },
      componentsApiPageContents: { Slider: SliderApiJsonPageContent },
      hooksApiDescriptions: { useSlider: useSliderApiDescriptions },
      hooksApiPageContents: { useSlider: useSliderApiJsonPageContent },
    },
  };
};
