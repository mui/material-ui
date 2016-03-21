import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import iconReadmeText from './README';
import IconExampleSimple from './ExampleSimple';
import iconExampleSimpleCode from '!raw!./ExampleSimple';
import IconExampleIcons from './ExampleIcons';
import iconExampleIconsCode from '!raw!./ExampleIcons';
import iconCode from '!raw!material-ui/lib/SvgIcon/SvgIcon';

const descriptions = {
  custom: 'This example uses a custom svg icon. The third example has a `hoverColor` defined.',
  material: 'This examples demonstrates how to use the included _Material icon_ components.',
};

const SvgIconPage = () => (
  <div>
    <Title render={(previousTitle) => `Svg Icon - ${previousTitle}`} />
    <MarkdownElement text={iconReadmeText} />
    <CodeExample
      title="Custom SVG icon"
      description={descriptions.custom}
      code={iconExampleSimpleCode}
    >
      <IconExampleSimple />
    </CodeExample>
    <CodeExample
      title="Material icons"
      description={descriptions.material}
      code={iconExampleIconsCode}
    >
      <IconExampleIcons />
    </CodeExample>
    <PropTypeDescription code={iconCode} />
  </div>
);

export default SvgIconPage;
