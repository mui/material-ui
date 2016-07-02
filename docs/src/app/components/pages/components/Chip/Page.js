import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import chipReadmeText from './README';
import ChipExampleSimple from './ExampleSimple';
import chipExampleSimpleCode from '!raw!./ExampleSimple';
import ChipExampleArray from './ExampleArray';
import chipExampleArrayCode from '!raw!./ExampleArray';
import chipCode from '!raw!material-ui/Chip/Chip';

const ChipPage = () => (
  <div>
    <Title render={(previousTitle) => `Chip - ${previousTitle}`} />
    <MarkdownElement text={chipReadmeText} />
    <CodeExample
      code={chipExampleSimpleCode}
      title="Example Chips"
    >
      <ChipExampleSimple />
    </CodeExample>
    <CodeExample
      code={chipExampleArrayCode}
      title="Example array"
    >
      <ChipExampleArray />
    </CodeExample>
    <PropTypeDescription code={chipCode} />
  </div>
);

export default ChipPage;
