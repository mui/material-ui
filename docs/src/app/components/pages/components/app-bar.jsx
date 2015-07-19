import React from 'react';
import appBarCode from '!raw!material-ui/lib/app-bar';
import CodeExample from '../../code-example/code-example';
import PropTypeDescription from '../../PropTypeDescription';
import AppBarExampleIcon from '../../AppBar/ExampleIcon';
import appBarExampleIconCode from '!raw!../../AppBar/ExampleIcon';
import AppBarExampleIconButton from '../../AppBar/ExampleIconButton';
import appBarExampleIconButtonCode from '!raw!../../AppBar/ExampleIconButton';
import AppBarExampleIconMenu from '../../AppBar/ExampleIconMenu';
import appBarExampleIconMenuCode from '!raw!../../AppBar/ExampleIconMenu';
import MarkdownElement from '../../MarkdownElement';
import appBarReadmeText from '../../AppBar/README';
import RaisedButton from 'raised-button';

export default class AppBarPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MarkdownElement text={appBarReadmeText} />
        <RaisedButton
          label="View Waterfall example"
          linkButton={true}
          href="/#/examples/app-bar-waterfall"
          primary={true} />
        <CodeExample code={appBarExampleIconCode}>
          <AppBarExampleIcon />
        </CodeExample>
        <CodeExample code={appBarExampleIconButtonCode}>
          <AppBarExampleIconButton />
        </CodeExample>
        <CodeExample code={appBarExampleIconMenuCode}>
          <AppBarExampleIconMenu />
        </CodeExample>
        <PropTypeDescription code={appBarCode}/>
      </div>
    );
  }
}
