import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import circleProgressReadmeText from 'material-ui/CircularProgress/examples/README';
import circleProgressCode from '!raw!material-ui/lib/CircularProgress/CircularProgress';
import CircleProgressExampleSimple from 'material-ui/CircularProgress/examples/ExampleSimple';
import circleProgressExampleSimpleCode from '!raw!material-ui/CircularProgress/examples/ExampleSimple';
import CircleProgressExampleDeterminate from 'material-ui/CircularProgress/examples/ExampleDeterminate';
import circleProgressExampleDeterminateCode from '!raw!material-ui/CircularProgress/examples/ExampleDeterminate';

const descriptions = {
  indeterminate: 'By default, the indicator animates continuously.',
  determinate: 'In determinate mode, the indicator adjusts to show the percentage complete, ' +
  'as a ratio of `value`: `max-min`.',
};

const CircleProgressPage = () => (
  <div>
    <Title render={(previousTitle) => `Circular Progress - ${previousTitle}`} />
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
    <PropTypeDescription code={circleProgressCode} />
  </div>
);

export default CircleProgressPage;
