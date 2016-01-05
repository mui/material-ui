import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import iconCode from '!raw!material-ui/lib/font-icon';
import iconReadmeText from './README';
import IconExampleSimple from './ExampleSimple';
import iconExampleSimpleCode from '!raw!./ExampleSimple';
import IconExampleIcons from './ExampleIcons';
import iconExampleIconsCode from '!raw!./ExampleIcons';

const FontIconPage = () => (
  <div>
    <MarkdownElement text={iconReadmeText} />
    <CodeExample code={iconExampleSimpleCode}>
      <IconExampleSimple />
    </CodeExample>
    <CodeExample code={iconExampleIconsCode}>
      <IconExampleIcons />
    </CodeExample>
    <PropTypeDescription code={iconCode} />
  </div>
);

export default FontIconPage;
