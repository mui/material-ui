import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import refreshIndicatorReadmeText from './README';
import RefreshIndicatorExampleReady from './ExampleReady';
import refreshIndicatorExampleReadyCode from '!raw!./ExampleReady';
import RefreshIndicatorExampleLoading from './ExampleLoading';
import refreshIndicatorExampleLoadingCode from '!raw!./ExampleLoading';
import refreshIndicatorCode from '!raw!material-ui/RefreshIndicator/RefreshIndicator';

const descriptions = {
  ready: 'The `ready` status can be used in response to a pull-to-refresh action, with the `percentage` tracking ' +
  'the depth of the "pull". The `size` property determines the icon size in pixels, and the `color` property its ' +
  'color, except at `percentage` 100, when the colour switches to the secondary color.',
  loading: 'The `loading` status displays an indeterminate indicator, intended to to be used while content is ' +
  'loading. The `loadingColor` prop can be used to set the indicator color, which defaults to the secondary color.',
};

const RefreshIndicatorPage = () => (
  <div>
    <Title render={(previousTitle) => `Refresh Indicator - ${previousTitle}`} />
    <MarkdownElement text={refreshIndicatorReadmeText} />
    <CodeExample
      title="Ready"
      description={descriptions.ready}
      code={refreshIndicatorExampleReadyCode}
    >
      <RefreshIndicatorExampleReady />
    </CodeExample>

    <CodeExample
      title="Loading"
      description={descriptions.loading}
      code={refreshIndicatorExampleLoadingCode}
    >
      <RefreshIndicatorExampleLoading />
    </CodeExample>
    <PropTypeDescription code={refreshIndicatorCode} />
  </div>
);

export default RefreshIndicatorPage;
