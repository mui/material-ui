import React from 'react';
import dialogCode from '!raw!material-ui/lib/dialog';
import CodeExample from '../../code-example/code-example';
import PropTypeDescription from '../../PropTypeDescription';
import MarkdownElement from '../../MarkdownElement';
import DialogExampleSimple from '../../Dialog/ExampleSimple';
import DialogExampleSimpleCode from '!raw!../../Dialog/ExampleSimple';
import DialogExampleModal from '../../Dialog/ExampleModal';
import DialogExampleModalCode from '!raw!../../Dialog/ExampleModal';
import dialogReadmeText from '../../Dialog/README';

export default class DialogPage extends React.Component {
  render() {
    return (
      <div>
        <MarkdownElement text={dialogReadmeText} />
        <CodeExample code={DialogExampleSimpleCode}>
          <DialogExampleSimple />
        </CodeExample>
        <CodeExample code={DialogExampleModalCode}>
          <DialogExampleModal />
        </CodeExample>
        <PropTypeDescription code={dialogCode}/>
      </div>
    );
  }
}
