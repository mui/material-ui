import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import iconButtonCode from '!raw!material-ui/lib/IconButton/IconButton';
import iconButtonReadmeText from 'material-ui/IconButton/examples/README';
import iconButtonExampleSimpleCode from '!raw!material-ui/IconButton/examples/ExampleSimple';
import IconButtonExampleSimple from 'material-ui/IconButton/examples/ExampleSimple';
import iconButtonExampleComplexCode from '!raw!material-ui/IconButton/examples/ExampleComplex';
import IconButtonExampleComplex from 'material-ui/IconButton/examples/ExampleComplex';
import iconButtonExampleSizeCode from '!raw!material-ui/IconButton/examples/ExampleSize';
import IconButtonExampleSize from 'material-ui/IconButton/examples/ExampleSize';
import iconButtonExampleTooltipCode from '!raw!material-ui/IconButton/examples/ExampleTooltip';
import IconButtonExampleTooltip from 'material-ui/IconButton/examples/ExampleTooltip';
import iconButtonExampleTouchCode from '!raw!material-ui/IconButton/examples/ExampleTouch';
import IconButtonExampleTouch from 'material-ui/IconButton/examples/ExampleTouch';

const descriptions = {
  simple: 'An Icon Button using an icon specified with the `iconClassName` property, and a `disabled` example.',
  tooltip: 'Icon Buttons showing the available `tooltip` positions.',
  touch: 'The `touch` property adjusts the tooltip size for better visibility on mobile devices.',
  size: 'Examples of Icon Button in different sizes.',
  other: 'An Icon Button using a nested [Font Icon](/#/components/font-icon), ' +
  'a nested [SVG Icon](/#/components/svg-icon) and an icon font ligature.',
};

const IconButtonPage = () => (
  <div>
    <Title render={(previousTitle) => `Icon Button - ${previousTitle}`} />
    <MarkdownElement text={iconButtonReadmeText} />
    <CodeExample
      title="Simple example"
      description={descriptions.simple}
      code={iconButtonExampleSimpleCode}
    >
      <IconButtonExampleSimple />
    </CodeExample>
    <CodeExample
      title="Further examples"
      description={descriptions.other}
      code={iconButtonExampleComplexCode}
    >
      <IconButtonExampleComplex />
    </CodeExample>
    <CodeExample
      title="Size examples"
      description={descriptions.size}
      code={iconButtonExampleSizeCode}
    >
      <IconButtonExampleSize />
    </CodeExample>
    <CodeExample
      title="Tooltip examples"
      description={descriptions.tooltip}
      code={iconButtonExampleTooltipCode}
    >
      <IconButtonExampleTooltip />
    </CodeExample>
    <CodeExample
      title="Touch example"
      description={descriptions.touch}
      code={iconButtonExampleTouchCode}
    >
      <IconButtonExampleTouch />
    </CodeExample>
    <PropTypeDescription code={iconButtonCode} />
  </div>
);

export default IconButtonPage;
