import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import BottomSheetReadmeText from './README';
import BottomSheetExampleSimple from './ExampleSimple';
import BottomSheetExampleSimpleCode from '!raw!./ExampleSimple';
import BottomSheetExampleAction from './ExampleAction';
import BottomSheetExampleActionCode from '!raw!./ExampleAction';
import BottomSheetExampleInset from './ExampleInset';
import BottomSheetExampleInsetCode from '!raw!./ExampleInset';
import BottomSheetCode from '!raw!material-ui/BottomSheet/BottomSheet';

const descriptions = {
  simple: '`BottomSheet` is displayed when `open` is `true`. Click away from the ' +
  'BottomSheet to close it.',
  action: 'Persistent bottom sheets have no `onRequestClose`, it has to be manually closed. A single `action` string can be added, and triggers `onActionTouchTap`.',
  inset: 'Inset persistent bottom sheets have no `action` prop.',
};

const BottomSheetPage = () => {
  return (
    <div>
      <Title render={(previousTitle) => `BottomSheet - ${previousTitle}`} />
      <MarkdownElement text={BottomSheetReadmeText} />
      <CodeExample
        title="Modular example"
        description={descriptions.simple}
        code={BottomSheetExampleSimpleCode}
      >
        <BottomSheetExampleSimple />
      </CodeExample>
      <CodeExample
        title="Persistent with action"
        description={descriptions.action}
        code={BottomSheetExampleActionCode}
      >
        <BottomSheetExampleAction />
      </CodeExample>
      <CodeExample
        title="Inset persistent"
        description={descriptions.inset}
        code={BottomSheetExampleInsetCode}
      >
        <BottomSheetExampleInset />
      </CodeExample>
      <PropTypeDescription code={BottomSheetCode} />
    </div>
  );
};

export default BottomSheetPage;
