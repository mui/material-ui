import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import linearProgressReadmeText from './README';
import LinearProgressExampleSimple from './ExampleSimple';
import linearProgressExampleSimpleCode from '!raw!./ExampleSimple';
import LinearProgressExampleDeterminate from './ExampleDeterminate';
import linearProgressExampleDeterminateCode from '!raw!./ExampleDeterminate';
import linearProgressCode from '!raw!material-ui/LinearProgress/LinearProgress';

const descriptions = {
  indeterminate: 'By default, the indicator animates continuously.',
  determinate: 'In `determinate` mode, the indicator adjusts to show the percentage complete, ' +
  'as a ratio of `value`: `max-min`.',
};

const LinearProgressPage = () => (
  <div>
    <Title render={(previousTitle) => `Linear Progress - ${previousTitle}`} />
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
    <PropTypeDescription code={linearProgressCode} />
  </div>
);

export default LinearProgressPage;
