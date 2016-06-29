import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import popoverReadmeText from './README';
import PopoverExampleSimple from './ExampleSimple';
import popoverExampleSimpleCode from '!raw!./ExampleSimple';
import PopoverExampleAnimation from './ExampleAnimation';
import popoverExampleAnimationCode from '!raw!./ExampleAnimation';
import PopoverExampleConfigurable from './ExampleConfigurable';
import popoverExampleConfigurableCode from '!raw!./ExampleConfigurable';
import popoverNoteText from './NOTE';
import popoverCode from '!raw!material-ui/Popover/Popover';

const descriptions = {
  simple: 'A simple example showing a Popover containing a [Menu](/#/components/menu). ' +
  'It can be also closed by clicking away from the Popover.',
  animation: 'The default animation style is to animate around the origin. ' +
  'An alternative animation can be applied using the `animation` property. ' +
  'Currently one alternative animation is available, `popover-animation-from-top`, which animates vertically.',
  configurable: 'Use the radio buttons to adjust the `anchorOrigin` and `targetOrigin` positions.',
};

const PopoverPage = () => (
  <div>
    <Title render={(previousTitle) => `Popover - ${previousTitle}`} />
    <MarkdownElement text={popoverReadmeText} />
    <CodeExample
      title="Simple example"
      description={descriptions.simple}
      code={popoverExampleSimpleCode}
    >
      <PopoverExampleSimple />
    </CodeExample>
    <CodeExample
      title="Animation"
      description={descriptions.animation}
      code={popoverExampleAnimationCode}
    >
      <PopoverExampleAnimation />
    </CodeExample>
    <CodeExample
      title="Anchor playground"
      description={descriptions.configurable}
      code={popoverExampleConfigurableCode}
    >
      <PopoverExampleConfigurable />
    </CodeExample>
    <MarkdownElement text={popoverNoteText} />
    <PropTypeDescription code={popoverCode} />
  </div>
);
export default PopoverPage;
