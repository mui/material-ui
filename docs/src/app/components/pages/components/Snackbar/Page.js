import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import SnackbarReadmeText from './README';
import SnackbarExampleSimple from './ExampleSimple';
import SnackbarExampleSimpleCode from '!raw!./ExampleSimple';
import SnackbarExampleAction from './ExampleAction';
import SnackbarExampleActionCode from '!raw!./ExampleAction';
import SnackbarExampleTwice from './ExampleTwice';
import SnackbarExampleTwiceCode from '!raw!./ExampleTwice';
import SnackbarCode from '!raw!material-ui/Snackbar/Snackbar';

const descriptions = {
  simple: '`Snackbar` is a controlled component, and is displayed when `open` is `true`. Click away from the ' +
  'Snackbar to close it, or wait for `autoHideDuration` to expire.',
  action: 'A single `action` can be added to the Snackbar, and triggers `onActionTouchTap`. Edit the textfield to ' +
  'change `autoHideDuration`',
  consecutive: 'Changing `message` causes the Snackbar to animate - it isn\'t necessary to close and reopen the ' +
  'Snackbar with the open prop.',

};

const SnackbarPage = () => {
  return (
    <div>
      <Title render={(previousTitle) => `Snackbar - ${previousTitle}`} />
      <MarkdownElement text={SnackbarReadmeText} />
      <CodeExample
        title="Simple example"
        description={descriptions.simple}
        code={SnackbarExampleSimpleCode}
      >
        <SnackbarExampleSimple />
      </CodeExample>
      <CodeExample
        title="Example action"
        description={descriptions.action}
        code={SnackbarExampleActionCode}
      >
        <SnackbarExampleAction />
      </CodeExample>
      <CodeExample
        title="Consecutive Snackbars"
        description={descriptions.consecutive}
        code={SnackbarExampleTwiceCode}
      >
        <SnackbarExampleTwice />
      </CodeExample>
      <PropTypeDescription code={SnackbarCode} />
    </div>
  );
};

export default SnackbarPage;
