import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import paperReadmeText from './README';
import paperCode from '!raw!material-ui/lib/paper';
import PaperExampleSimple from './ExampleSimple';
import paperExampleSimpleCode from '!raw!./ExampleSimple';
import PaperExampleRounded from './ExampleRounded';
import paperExampleRoundedCode from '!raw!./ExampleRounded';
import PaperExampleCircle from './ExampleCircle';
import paperExampleCircleCode from '!raw!./ExampleCircle';

const PaperPage = () => (
  <div>
    <MarkdownElement text={paperReadmeText} />
    <CodeExample code={paperExampleSimpleCode}>
      <PaperExampleSimple />
    </CodeExample>
    <CodeExample code={paperExampleRoundedCode}>
      <PaperExampleRounded />
    </CodeExample>
    <CodeExample code={paperExampleCircleCode}>
      <PaperExampleCircle />
    </CodeExample>
    <PropTypeDescription code={paperCode}/>
  </div>
);

export default PaperPage;
