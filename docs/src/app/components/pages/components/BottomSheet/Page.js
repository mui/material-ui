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
import BottomSheetCode from '!raw!material-ui/BottomSheet/BottomSheet';

const descriptions = {
  simple: '`BottomSheet` is a controlled component, and is displayed when `open` is `true`. Click away from the ' +
  'BottomSheet to close it.',
  action: 'A single `action` can be added to the BottomSheet, and triggers `onActionTouchTap`.'
};

const BottomSheetPage = () => {
  return (
    <div>
      <Title render={(previousTitle) => `BottomSheet - ${previousTitle}`} />
      <MarkdownElement text={BottomSheetReadmeText} />
      <CodeExample
        title="Simple example"
        description={descriptions.simple}
        code={BottomSheetExampleSimpleCode}
      >
        <BottomSheetExampleSimple />
      </CodeExample>
      <CodeExample
        title="Example action"
        description={descriptions.action}
        code={BottomSheetExampleActionCode}
      >
        <BottomSheetExampleAction />
      </CodeExample>
      <PropTypeDescription code={BottomSheetCode} />
    </div>
  );
};

export default BottomSheetPage;
