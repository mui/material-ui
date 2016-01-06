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

const LinearProgressPage = () => (
  <div>
    <MarkdownElement text={linearProgressReadmeText} />
    <CodeExample code={linearProgressExampleSimpleCode}>
      <LinearProgressExampleSimple />
    </CodeExample>
    <CodeExample code={linearProgressExampleDeterminateCode}>
      <LinearProgressExampleDeterminate />
    </CodeExample>
    <PropTypeDescription code={linearProgressCode}/>
  </div>
);

export default LinearProgressPage;
