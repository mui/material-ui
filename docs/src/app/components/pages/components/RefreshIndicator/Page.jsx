import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import refreshIndicatorReadmeText from './README';
import refreshIndicatorCode from '!raw!material-ui/lib/refresh-indicator';
import RefreshIndicatorExampleSimple from './ExampleSimple';
import refreshIndicatorExampleSimpleCode from '!raw!./ExampleSimple';
import RefreshIndicatorExampleLoading from './ExampleLoading';
import refreshIndicatorExampleLoadingCode from '!raw!./ExampleLoading';

const RefreshIndicatorPage = () => (
  <div>
    <MarkdownElement text={refreshIndicatorReadmeText} />
    <CodeExample code={refreshIndicatorExampleSimpleCode}>
      <RefreshIndicatorExampleSimple />
    </CodeExample>
    <CodeExample code={refreshIndicatorExampleLoadingCode}>
      <RefreshIndicatorExampleLoading />
    </CodeExample>
    <PropTypeDescription code={refreshIndicatorCode}/>
  </div>
);

export default RefreshIndicatorPage;
