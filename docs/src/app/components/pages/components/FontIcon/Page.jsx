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

const descriptions = {
  custom: 'These examples use a custom font. The `className` defines the specific icon. ' +
  'The third example has a `hoverColor` defined.',
  public: 'These examples use the Material Design icon font, referenced in the `<head>` of the docs site index page.',
};

const FontIconPage = () => (
  <div>
    <MarkdownElement text={iconReadmeText} />
    <CodeExample
      title="Custom icon-font"
      description={descriptions.custom}
      code={iconExampleSimpleCode}
    >
      <IconExampleSimple />
    </CodeExample>
    <CodeExample
      title="Public icon-font"
      description={descriptions.public}
      code={iconExampleIconsCode}
    >
      <IconExampleIcons />
    </CodeExample>
    <PropTypeDescription code={iconCode} />
  </div>
);

export default FontIconPage;
