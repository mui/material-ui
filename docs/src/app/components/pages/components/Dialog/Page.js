import React from 'react';
import Title from 'react-title-component';

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
import DialogExampleDialogDatePicker from './ExampleDialogDatePicker';
import dialogExampleDialogDatePickerCode from '!raw!./ExampleDialogDatePicker';
import DialogExampleScrollable from './ExampleScrollable';
import DialogExampleScrollableCode from '!raw!./ExampleScrollable';
import DialogExampleAlert from './ExampleAlert';
import DialogExampleAlertCode from '!raw!./ExampleAlert';
import dialogCode from '!raw!material-ui/Dialog/Dialog';

const DialogPage = () => (
  <div>
    <Title render={(previousTitle) => `Dialog - ${previousTitle}`} />
    <MarkdownElement text={dialogReadmeText} />
    <CodeExample
      title="Simple dialog"
      code={dialogExampleSimpleCode}
    >
      <DialogExampleSimple />
    </CodeExample>
    <CodeExample
      title="Modal dialog"
      code={dialogExampleModalCode}
    >
      <DialogExampleModal />
    </CodeExample>
    <CodeExample
      title="Styled dialog"
      code={dialogExampleCustomWidthCode}
    >
      <DialogExampleCustomWidth />
    </CodeExample>
    <CodeExample
      title="Nested dialogs"
      code={dialogExampleDialogDatePickerCode}
    >
      <DialogExampleDialogDatePicker />
    </CodeExample>
    <CodeExample
      title="Scrollable dialog"
      code={DialogExampleScrollableCode}
    >
      <DialogExampleScrollable />
    </CodeExample>
    <CodeExample
      title="Alert dialog"
      code={DialogExampleAlertCode}
    >
      <DialogExampleAlert />
    </CodeExample>
    <PropTypeDescription code={dialogCode} />
  </div>
);

export default DialogPage;
