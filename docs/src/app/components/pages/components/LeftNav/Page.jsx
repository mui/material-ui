import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import leftNavReadmeText from './README';
import LeftNavSimpleExample from './ExampleSimple';
import leftNavSimpleExampleCode from '!raw!./ExampleSimple';
import LeftNavUndockedExample from './ExampleUndocked';
import leftNavUndockedExampleCode from '!raw!./ExampleUndocked';
import LeftNavOpenRightExample from './ExampleOpenRight';
import leftNavOpenRightExampleCode from '!raw!./ExampleOpenRight';
import leftNavCode from '!raw!material-ui/lib/left-nav';

const descriptions = {
  simple: 'A simple controlled `LeftNav`. The Left Nav is `docked` by default, ' +
  'remaining open unless closed through the `open` prop.',
  undocked: 'An undocked controlled `LeftNav` with custom width. ' +
  'The Left Nav can be cancelled by clicking the overlay or pressing the Esc key. ' +
  'It closes when an item is selected, handled by controlling the `open` prop.',
  right: 'The `openRight` prop allows the Left Nav to open on the opposite side.',
};

const LeftNavPage = () => (
  <div>
    <Title render={(previousTitle) => `Left Nav - ${previousTitle}`} />
    <MarkdownElement text={leftNavReadmeText} />
    <CodeExample
      title="Docked example"
      description={descriptions.simple}
      code={leftNavSimpleExampleCode}
    >
      <LeftNavSimpleExample />
    </CodeExample>
    <CodeExample
      title="Undocked example"
      description={descriptions.undocked}
      code={leftNavUndockedExampleCode}
    >
      <LeftNavUndockedExample />
    </CodeExample>
    <CodeExample
      title="Open on right"
      description={descriptions.right}
      code={leftNavOpenRightExampleCode}
    >
      <LeftNavOpenRightExample />
    </CodeExample>
    <PropTypeDescription code={leftNavCode} />
  </div>
);

export default LeftNavPage;
