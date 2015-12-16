import React from 'react';
import SnackbarCode from '!raw!material-ui/lib/snackbar';
import CodeExample from '../../code-example/code-example';
import PropTypeDescription from '../../PropTypeDescription';
import SnackbarExampleSimple from '../../Snackbar/ExampleSimple';
import SnackbarExampleSimpleCode from '!raw!../../Snackbar/ExampleSimple';
import SnackbarExampleTwice from '../../Snackbar/ExampleTwice';
import SnackbarExampleTwiceCode from '!raw!../../Snackbar/ExampleTwice';
import MarkdownElement from '../../MarkdownElement';
import SnackbarReadmeText from '../../Snackbar/README';

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
