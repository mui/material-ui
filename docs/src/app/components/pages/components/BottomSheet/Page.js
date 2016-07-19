import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import bottomSheetReadmeText from './README';
import BottomSheetExampleSimple from './ExampleSimple';
import bottomSheetExampleSimpleCode from '!raw!./ExampleSimple';
import BottomSheetExampleCloseable from './ExampleCloseable';
import bottomSheetExampleCloseableCode from '!raw!./ExampleCloseable';
import BottomSheetExampleInset from './ExampleInset';
import bottomSheetExampleInsetCode from '!raw!./ExampleInset';
import BottomSheetExampleModal from './ExampleModal';
import bottomSheetExampleModalCode from '!raw!./ExampleModal';
import bottomSheetCode from '!raw!material-ui/BottomSheet/BottomSheet';

const BottomSheetPage = () => (
  <div>
    <Title render={(previousTitle) => `Bottom Sheet - ${previousTitle}`} />
    <MarkdownElement text={bottomSheetReadmeText} />
    <CodeExample
      title="Simple example"
      code={bottomSheetExampleSimpleCode}
    >
      <BottomSheetExampleSimple />
    </CodeExample>
    <CodeExample
      title="Closeable example"
      code={bottomSheetExampleCloseableCode}
    >
      <BottomSheetExampleCloseable />
    </CodeExample>
    <CodeExample
      title="Inset example"
      code={bottomSheetExampleInsetCode}
    >
      <BottomSheetExampleInset />
    </CodeExample>
    <CodeExample
      title="Modal example"
      code={bottomSheetExampleModalCode}
    >
      <BottomSheetExampleModal />
    </CodeExample>
    <PropTypeDescription code={bottomSheetCode} />
  </div>
);

export default BottomSheetPage;
