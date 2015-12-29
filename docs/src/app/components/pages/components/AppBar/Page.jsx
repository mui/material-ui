import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import appBarReadmeText from './README';
import AppBarExampleIcon from './ExampleIcon';
import appBarExampleIconCode from '!raw!./ExampleIcon';
import AppBarExampleIconButton from './ExampleIconButton';
import appBarExampleIconButtonCode from '!raw!./ExampleIconButton';
import AppBarExampleIconMenu from './ExampleIconMenu';
import appBarExampleIconMenuCode from '!raw!./ExampleIconMenu';
import appBarCode from '!raw!material-ui/lib/app-bar';

const AppBarPage = () => (
  <div>
    <MarkdownElement text={appBarReadmeText} />
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

export default AppBarPage;
