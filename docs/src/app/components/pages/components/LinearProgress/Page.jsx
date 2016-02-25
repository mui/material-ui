import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import linearProgressReadmeText from './README';
import linearProgressCode from '!raw!material-ui/lib/linear-progress';
import LinearProgressExampleSimple from './ExampleSimple';
import linearProgressExampleSimpleCode from '!raw!./ExampleSimple';
import LinearProgressExampleDeterminate from './ExampleDeterminate';
import linearProgressExampleDeterminateCode from '!raw!./ExampleDeterminate';
import LinearProgressExampleDelayed from './ExampleDelayed';
import linearProgressExampleDelayedCode from '!raw!./ExampleDelayed';

const descriptions = {
  indeterminate: 'By default, the indicator animates continuously.',
  determinate: 'In `determinate` mode, the indicator adjusts to show the percentage complete, ' +
  'as a ratio of `value`: `max-min`.',
  delayed: 'You can also have the indicator wait a specified time before ' +
           'displaying, to avoid showing it for very brief operations.',
};

const LinearProgressPage = () => (
  <div>
    <MarkdownElement text={linearProgressReadmeText} />
    <CodeExample
      title="Indeterminate progress"
      description={descriptions.indeterminate}
      code={linearProgressExampleSimpleCode}
    >
      <LinearProgressExampleSimple />
    </CodeExample>
    <CodeExample
      title="Determinate progress"
      description={descriptions.determinate}
      code={linearProgressExampleDeterminateCode}
    >
      <LinearProgressExampleDeterminate />
    </CodeExample>
    <CodeExample
      title="Delayed progress"
      description={descriptions.delayed}
      code={linearProgressExampleDelayedCode}
    >
      <LinearProgressExampleDelayed />
    </CodeExample>
    <PropTypeDescription code={linearProgressCode}/>
  </div>
);

export default LinearProgressPage;
