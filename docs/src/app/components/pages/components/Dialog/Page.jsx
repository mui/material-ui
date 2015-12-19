import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';
import dialogReadmeText from './README';
import DialogExampleSimple from './ExampleSimple';
import DialogExampleSimpleCode from '!raw!./ExampleSimple';
import DialogExampleModal from './ExampleModal';
import DialogExampleModalCode from '!raw!./ExampleModal';
import dialogCode from '!raw!material-ui/lib/dialog';

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
