import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import iconCode from '!raw!material-ui/lib/FontIcon/FontIcon';
import iconReadmeText from './README';
import IconExampleSimple from './ExampleSimple';
import iconExampleSimpleCode from '!raw!./ExampleSimple';
import IconExampleIcons from './ExampleIcons';
import iconExampleIconsCode from '!raw!./ExampleIcons';

const descriptions = {
  custom: 'This example uses a custom font (not part of Material-UI). The `className` defines the specific ' +
  'icon. The third example has a `hoverColor` defined.',
  public: 'This example uses the [Material icons font]' +
  '(http://google.github.io/material-design-icons/#icon-font-for-the-web), referenced in the `<head>` of the docs ' +
  'site index page. The `className` defines the font, and the `IconFont` tag content defines the specific icon.',
};

const FontIconPage = () => (
  <div>
    <Title render={(previousTitle) => `Font Icon - ${previousTitle}`} />
    <MarkdownElement text={iconReadmeText} />
    <CodeExample
      title="Custom icon font"
      description={descriptions.custom}
      code={iconExampleSimpleCode}
    >
      <IconExampleSimple />
    </CodeExample>
    <CodeExample
      title="Public icon font"
      description={descriptions.public}
      code={iconExampleIconsCode}
    >
      <IconExampleIcons />
    </CodeExample>
    <PropTypeDescription code={iconCode} />
  </div>
);

export default FontIconPage;
