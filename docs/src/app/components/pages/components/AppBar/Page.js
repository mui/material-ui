import React from 'react';
import Title from 'react-title-component';

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
import appBarCode from '!raw!material-ui/AppBar/AppBar';

const descriptions = {
  icon: 'A simple example of `AppBar` with an icon on the right. ' +
  'By default, the left icon is a navigation-menu.',
  iconButton: 'This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title` ' +
  'through the `onTouchTap` property, and a [FlatButton](/#/components/flat-button) on the right.',
  iconMenu: 'This example uses an [IconMenu](/#/components/icon-menu) for `iconElementRight`.',
};

const AppBarPage = () => (
  <div>
    <Title render={(previousTitle) => `App Bar - ${previousTitle}`} />
    <MarkdownElement text={appBarReadmeText} />
    <CodeExample
      code={appBarExampleIconCode}
      title="Simple example"
      description={descriptions.icon}
    >
      <AppBarExampleIcon />
    </CodeExample>
    <CodeExample
      code={appBarExampleIconButtonCode}
      title="Buttons"
      description={descriptions.iconButton}
    >
      <AppBarExampleIconButton />
    </CodeExample>
    <CodeExample
      code={appBarExampleIconMenuCode}
      title="Icon Menu"
      description={descriptions.iconMenu}
    >
      <AppBarExampleIconMenu />
    </CodeExample>
    <PropTypeDescription code={appBarCode} />
  </div>
);

export default AppBarPage;
