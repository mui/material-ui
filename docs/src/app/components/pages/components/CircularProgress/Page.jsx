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

const CircleProgressPage = () => (
  <div>
    <MarkdownElement text={circleProgressReadmeText} />
    <CodeExample code={circleProgressExampleSimpleCode}>
      <CircleProgressExampleSimple />
    </CodeExample>
    <CodeExample code={circleProgressExampleDeterminateCode}>
      <CircleProgressExampleDeterminate />
    </CodeExample>
    <PropTypeDescription code={circleProgressCode}/>
  </div>
);

export default CircleProgressPage;
