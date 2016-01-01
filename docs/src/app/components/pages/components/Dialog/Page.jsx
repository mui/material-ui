import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import dialogReadmeText from './README';
import DialogExampleSimple from './ExampleSimple';
import dialogExampleSimpleCode from '!raw!./ExampleSimple';
import DialogExampleModal from './ExampleModal';
import dialogExampleModalCode from '!raw!./ExampleModal';
import DialogExampleCustomWidth from './ExampleCustomWidth';
import dialogExampleCustomWidthCode from '!raw!./ExampleCustomWidth';
import dialogCode from '!raw!material-ui/lib/dialog';

const DialogPage = () => (
  <div>
    <MarkdownElement text={dialogReadmeText} />
    <CodeExample code={dialogExampleSimpleCode}>
      <DialogExampleSimple />
    </CodeExample>
    <CodeExample code={dialogExampleModalCode}>
      <DialogExampleModal />
    </CodeExample>
    <CodeExample code={dialogExampleCustomWidthCode}>
      <DialogExampleCustomWidth />
    </CodeExample>
    <PropTypeDescription code={dialogCode}/>
  </div>
);

export default DialogPage;
