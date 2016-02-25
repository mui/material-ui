import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import circleProgressReadmeText from './README';
import circleProgressCode from '!raw!material-ui/lib/circular-progress';
import CircleProgressExampleSimple from './ExampleSimple';
import circleProgressExampleSimpleCode from '!raw!./ExampleSimple';
import CircleProgressExampleDeterminate from './ExampleDeterminate';
import circleProgressExampleDeterminateCode from '!raw!./ExampleDeterminate';
import CircleProgressExampleDelayed from './ExampleDelayed';
import circleProgressExampleDelayedCode from '!raw!./ExampleDelayed';

const descriptions = {
  indeterminate: 'By default, the indicator animates continuously.',
  determinate: 'In determinate mode, the indicator adjusts to show the percentage complete, ' +
  'as a ratio of `value`: `max-min`.',
  delayed: 'You can also have the indicator wait a specified time before ' +
           'displaying, to avoid showing it for very brief operations.',
};

const CircleProgressPage = () => (
  <div>
    <MarkdownElement text={circleProgressReadmeText} />
    <CodeExample
      title="Indeterminate progress"
      description={descriptions.indeterminate}
      code={circleProgressExampleSimpleCode}
    >
      <CircleProgressExampleSimple />
    </CodeExample>
    <CodeExample
      title="Determinate progress"
      description={descriptions.determinate}
      code={circleProgressExampleDeterminateCode}
    >
      <CircleProgressExampleDeterminate />
    </CodeExample>
    <CodeExample
      title="Delayed progress"
      description={descriptions.delayed}
      code={circleProgressExampleDelayedCode}
    >
      <CircleProgressExampleDelayed />
    </CodeExample>
    <PropTypeDescription code={circleProgressCode}/>
  </div>
);

export default CircleProgressPage;
