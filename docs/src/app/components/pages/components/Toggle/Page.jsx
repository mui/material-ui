import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import toggleReadmeText from './README';
import toggleCode from '!raw!material-ui/lib/toggle';
import ToggleExampleSimple from './ExampleSimple';
import toggleExampleSimpleCode from '!raw!./ExampleSimple';

const TogglePage = () => (
  <div>
    <MarkdownElement text={toggleReadmeText} />
    <CodeExample code={toggleExampleSimpleCode}>
      <ToggleExampleSimple />
    </CodeExample>
    <PropTypeDescription code={toggleCode}/>
  </div>
);

export default TogglePage;
