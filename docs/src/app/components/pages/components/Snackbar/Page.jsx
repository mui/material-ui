import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';
import SnackbarReadmeText from './README';
import SnackbarExampleSimple from './ExampleSimple';
import SnackbarExampleSimpleCode from '!raw!./ExampleSimple';
import SnackbarExampleTwice from './ExampleTwice';
import SnackbarExampleTwiceCode from '!raw!./ExampleTwice';
import SnackbarCode from '!raw!material-ui/lib/snackbar';

const SnackbarPage = () => {
  return (
    <div>
      <MarkdownElement text={SnackbarReadmeText} />
      <CodeExample code={SnackbarExampleSimpleCode}>
        <SnackbarExampleSimple />
      </CodeExample>
      <CodeExample code={SnackbarExampleTwiceCode}>
        <SnackbarExampleTwice />
      </CodeExample>
      <PropTypeDescription code={SnackbarCode} />
    </div>
  );
};

export default SnackbarPage;
