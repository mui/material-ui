## Using Context

The `MuiThemeProvider` component simply adds the `muiTheme` object and `uniqueIdGen` function to context.
If you prefer using context directly instead, you can follow this pattern:

### Pass Theme

Pass theme down the context:

```js
import React, {Component} from 'react';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

class Main extends Component {
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  render () {
    return <AppBar title="My AppBar" />;
  }
}

Main.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default Main;
```

Get theme whenever you need to use it in your own components:

```js
import React, {Component} from 'react';

class DeepDownTheTree extends Component {
  render () {
    return (
      <span style={{color: this.context.muiTheme.palette.textColor}}>
        Hello World!
      </span>
    );
  }
}

DeepDownTheTree.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default DeepDownTheTree;
```

### Pass UniqueId Generator

It should be noted that if you are using components based on `TextField`, `uniqueIdGen` **must** be provided in its context.
This property is a function of type `() => String` to generate uniqueId for input to make the floating label focusing the input.

```js
import React, {Component, PropTypes} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import getUniqueIdGenerator from 'material-ui/utils/getUniqueIdGenerator';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';

class Main extends Component {
  state = {uniqueIdGen: this.props.uniqueIdGen || getUniqueIdGenerator()}
  
  getChildContext() {
    return {
      muiTheme: getMuiTheme(),
      uniqueIdGen: this.state.uniqueIdGen,
    };
  }

  render () {
    return (
      <div>
        <TextField />
        <AutoComplete />
      </div>
    );
  }
}

Main.propTypes = {
  uniqueIdGen: PropTypes.func.isRequired,
};

Main.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
  uniqueIdGen: PropTypes.func.isRequired,
};

export default Main;
```

If you want to use multiple contexts, you should ensure their `uniqueIdGen` do not generate same ids.

```js
import React from 'react';
import getUniqueIdGenerator from 'material-ui/utils/getUniqueIdGenerator';

const MultipleMain = () => {
  return (
    <div>
      <Main uniqueIdGen={getUniqueIdGenerator('main-one')} />
      <Main uniqueIdGen={getUniqueIdGenerator('main-two')} />
    </div>
  );
}

export default MultipleMain;
```

### APIs

The items listed below are everything related to using context.

#### `getUniqueIdGenerator(prefix = 'mui') => () => String`

This function takes one optional argument `prefix` and returns a function for components to generate unique ids.

```js
const gen = getUniqueIdGenerator();
const anotherGen = getUniqueIdGenerator('another');

gen(); // 'mui-id-0'
gen(); // 'mui-id-1';
anotherGen(); // 'another-id-0'
anotherGen(); // 'another-id-1'
```

You should not use `getUniqueIdGenerator` inside `getChildContext` because it will create a new generator per request for context.
