import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import popoverReadmeText from './README';
import popoverCode from '!raw!material-ui/lib/popover/popover';
import PopoverExampleSimple from './ExampleSimple';
import popoverExampleSimpleCode from '!raw!./ExampleSimple';

const PopoverPage = () => (
  <div>
    <MarkdownElement text={popoverReadmeText} />
    <CodeExample code={popoverExampleSimpleCode}>
      <PopoverExampleSimple />
    </CodeExample>
    <PropTypeDescription code={popoverCode}/>
  </div>
);
export default PopoverPage;
