import React from 'react';
import appBarSource from '!raw!material-ui/app-bar';
import CodeExample from '../../code-example/code-example';
import Description from '../../Description';
import AppBarExampleIcon from '../../AppBar/ExampleIcon';
import appBarExampleIconSource from '!raw!../../AppBar/ExampleIcon';
import AppBarExampleIconButton from '../../AppBar/ExampleIconButton';
import appBarExampleIconButtonSource from '!raw!../../AppBar/ExampleIconButton';
import AppBarExampleIconMenu from '../../AppBar/ExampleIconMenu';
import appBarExampleIconMenuSource from '!raw!../../AppBar/ExampleIconMenu';

export default class AppBarPage extends React.Component {

  constructor(props) {
    super(props);

    this.desc = 'App bars are a collection of components placed as a static ' +
                'header for an application. It is used for navigation, search ' +
                'branding, and actions. An app bar is also referred to as the ' +
                'primary toolbar or action bar for Android.';
  }

  render() {
    return (
      <div
        name="AppBar"
        desc={this.desc}
      >
        <CodeExample code={appBarExampleIconSource}>
          <AppBarExampleIcon />
        </CodeExample>
        <CodeExample code={appBarExampleIconButtonSource}>
          <AppBarExampleIconButton />
        </CodeExample>
        <CodeExample code={appBarExampleIconMenuSource}>
          <AppBarExampleIconMenu />
        </CodeExample>
        <Description source={appBarSource}/>
      </div>
    );
  }
}
