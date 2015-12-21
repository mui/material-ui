import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';
import toolbarsReadmeText from './README';
import toolbarsExampleSimpleCode from '!raw!./ExampleSimple';
import ToolbarsExampleSimple from './ExampleSimple';
import toolbarCode from '!raw!material-ui/toolbar/toolbar';
import toolbarReadmeText from './Toolbar';
import toolbarGroupCode from '!raw!material-ui/toolbar/toolbar-group';
import toolbarGroupReadmeText from './ToolbarGroup';
import toolbarSeparatorCode from '!raw!material-ui/toolbar/toolbar-separator';
import toolbarSeparatorReadmeText from './ToolbarSeparator';
import toolbarTitleCode from '!raw!material-ui/toolbar/toolbar-title';
import toolbarTitleReadmeText from './ToolbarTitle';

export default class ToolbarPage extends React.Component {
  render() {
    return (
      <div>
        <MarkdownElement text={toolbarsReadmeText} />
        <CodeExample code={toolbarsExampleSimpleCode}>
          <ToolbarsExampleSimple />
        </CodeExample>
        <PropTypeDescription
          code={toolbarCode}
          header={toolbarReadmeText} />
        <PropTypeDescription
          code={toolbarGroupCode}
          header={toolbarGroupReadmeText} />
        <PropTypeDescription
          code={toolbarSeparatorCode}
          header={toolbarSeparatorReadmeText} />
        <PropTypeDescription
          code={toolbarTitleCode}
          header={toolbarTitleReadmeText} />
      </div>
    );
  }
}
