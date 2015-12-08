import React from 'react';
import toolbarCode from '!raw!material-ui/toolbar/toolbar';
import toolbarGroupCode from '!raw!material-ui/toolbar/toolbar-group';
import toolbarSeparatorCode from '!raw!material-ui/toolbar/toolbar-separator';
import toolbarTitleCode from '!raw!material-ui/toolbar/toolbar-title';
import CodeExample from '../../code-example/code-example';
import PropTypeDescription from '../../PropTypeDescription';
import ToolbarsExampleSimple from '../../Toolbars/ExampleSimple';
import toolbarsExampleSimpleCode from '!raw!../../Toolbars/ExampleSimple';
import MarkdownElement from '../../MarkdownElement';
import toolbarsReadmeText from '../../Toolbars/README';
import toolbarReadmeText from '../../Toolbars/Toolbar';
import toolbarGroupReadmeText from '../../Toolbars/ToolbarGroup';
import toolbarSeparatorReadmeText from '../../Toolbars/ToolbarSeparator';
import toolbarTitleReadmeText from '../../Toolbars/ToolbarTitle';

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
