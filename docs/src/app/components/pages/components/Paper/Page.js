import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import paperReadmeText from './README';
import PaperExampleSimple from './ExampleSimple';
import paperExampleSimpleCode from '!raw!./ExampleSimple';
import PaperExampleRounded from './ExampleRounded';
import paperExampleRoundedCode from '!raw!./ExampleRounded';
import PaperExampleCircle from './ExampleCircle';
import paperExampleCircleCode from '!raw!./ExampleCircle';
import paperCode from '!raw!material-ui/Paper/Paper';

const descriptions = {
  simple: 'Paper examples showing the range of `zDepth`.',
  rounded: 'Corners are rounded by default. Set the `rounded` property to `false` for square corners.',
  circle: 'Set the `circle` property for circular Paper.',
};

const PaperPage = () => (
  <div>
    <Title render={(previousTitle) => `Paper - ${previousTitle}`} />
    <MarkdownElement text={paperReadmeText} />
    <CodeExample
      title="Simple example"
      description={descriptions.simple}
      code={paperExampleSimpleCode}
    >
      <PaperExampleSimple />
    </CodeExample>
    <CodeExample
      title="Non-rounded corners"
      description={descriptions.rounded}
      code={paperExampleRoundedCode}
    >
      <PaperExampleRounded />
    </CodeExample>
    <CodeExample
      title="Circular Paper"
      description={descriptions.circle}
      code={paperExampleCircleCode}
    >
      <PaperExampleCircle />
    </CodeExample>
    <PropTypeDescription code={paperCode} />
  </div>
);

export default PaperPage;
