import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocsV2';
import AppFrame from 'docs/src/modules/components/AppFrame';
import * as pageProps from 'docs/data/base/components/slider/slider.md?@mui/markdown';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import SliderUnstyledApiJsonPageContent from '../api/slider-unstyled.json';
import useSliderApiJsonPageContent from '../api/use-slider.json';

export default function Page(props) {
  const { userLanguage, ...other } = props;
  return <MarkdownDocs {...pageProps} {...other} />;
}

Page.getLayout = (page) => {
  return <AppFrame>{page}</AppFrame>;
};

Page.getInitialProps = () => {
  const SliderUnstyledApiReq = require.context(
    'docs/translations/api-docs/slider-unstyled',
    false,
    /slider-unstyled.*.json$/,
  );
  const SliderUnstyledApiDescriptions = mapApiPageTranslations(SliderUnstyledApiReq);

  const useSliderApiReq = require.context(
    'docs/translations/api-docs/use-slider',
    false,
    /use-slider.*.json$/,
  );
  const useSliderApiDescriptions = mapApiPageTranslations(useSliderApiReq);

  return {
    componentsApiDescriptions: { SliderUnstyled: SliderUnstyledApiDescriptions },
    componentsApiPageContents: { SliderUnstyled: SliderUnstyledApiJsonPageContent },
    hooksApiDescriptions: { useSlider: useSliderApiDescriptions },
    hooksApiPageContents: { useSlider: useSliderApiJsonPageContent },
  };
};
