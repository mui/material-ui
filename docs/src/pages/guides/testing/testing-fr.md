# Test

<p class="description">Write tests to prevent regressions and write better code.</p>

Examples in this guide use [global methods from Mocha](https://mochajs.org/api/global.html), not [Jest](https://jestjs.io/docs/en/api).

## Internal

We take tests seriously. We have written and maintain **a wide range** of tests so we can iterate with confidence on the components, for instance, the visual regression tests provided by [Argos-CI](https://www.argos-ci.com/mui-org/material-ui) have proven to be really helpful. To learn more about our internal tests, you can have a look at the [README](https://github.com/mui-org/material-ui/blob/master/test/README.md).

While we have reached the 100% test coverage achievement, we don't encourage our users to do the same. [![Coverage Status](https://img.shields.io/codecov/c/github/mui-org/material-ui/master.svg)](https://codecov.io/gh/mui-org/material-ui/branch/master)

## Userspace

What about writing tests in userspace? The Material-UI styling infrastructure uses some helper functions built on top of [enzyme](https://github.com/airbnb/enzyme) to make the process easier, which we are exposing. You can take advantage of them if you so choose.

### Shallow rendering

Shallow rendering is useful to constrain your testing to a component as a unit. This also ensures that your tests aren't indirectly asserting behavior of child components. Shallow rendering was created to test components in isolation. This means without leaking child implementation details such as the context.

The `createShallow()` function can be used for this situation. Aside from wrapping the enzyme API, it provides a `dive` and `untilSelector` option.

### Full DOM rendering

Full DOM rendering is ideal for use cases where you have components that may interact with DOM APIs or may require the full lifecycle in order to fully test the component (e.g., `componentDidMount` etc.).

The `createMount()` function is provided for this situation. Aside from wrapping the enzyme API, it provides a `cleanUp` function.

### Render to string

Rendering to a string is useful to test the behavior of the components that are used on the server. You can take advantage of this to assert the generated HTML string.

The `createRender()` function is ideal for this. This is just an alias for the enzyme API, which is only exposed for consistency.

## API

### `createShallow([options]) => shallow`

Generate an enhanced shallow function with the needed context. Please refer to the [enzyme API documentation](https://airbnb.io/enzyme/docs/api/shallow.html) for further details on the `shallow` function.

#### Paramètres

1. `options` (*Object* [optional]) 
    - `options.shallow` (*Function* [optional]): The shallow function to enhance, it uses **enzyme by default**.
    - `options.untilSelector` (*String* [optional]): Recursively shallow renders the children until it can find the provided selector. It's useful to drill down higher-order components.
    - `options.dive` (*Boolean* [optional]): Shallow function renders the one non-DOM child of the current wrapper, and returns a wrapper around the result.
    - The other keys are forwarded to the options argument of `enzyme.shallow()`.

#### Valeur de retour

`shallow` (*shallow*): A shallow function.

#### Exemples

```jsx
import { createShallow } from '@material-ui/core/test-utils';

describe('<MyComponent />', () => {
  let shallow;

  before(() => {  // This is Mocha; in Jest, use beforeAll
    shallow = createShallow();
  });

  it('should work', () => {
    const wrapper = shallow(<MyComponent />);
  });
});
```

### `createMount([options]) => mount`

Generate an enhanced mount function with the needed context. Please refer to the [enzyme API documentation](https://airbnb.io/enzyme/docs/api/mount.html) for further details on the `mount` function.

#### Paramètres

1. `options` (*Object* [optional]) 
    - `options.mount` (*Function* [optional]): The mount function to enhance, it uses **enzyme by default**.
    - The other keys are forwarded to the options argument of `enzyme.mount()`.

#### Valeur de retour

`mount` (*mount*): A mount function.

#### Exemples

```jsx
import { createMount } from '@material-ui/core/test-utils';

describe('<MyComponent />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should work', () => {
    const wrapper = mount(<MyComponent />);
  });
});
```

### `createRender([options]) => render`

Generate a render to string function with the needed context. Please refer to the [enzyme API documentation](https://airbnb.io/enzyme/docs/api/render.html) for further details on the `render` function.

#### Paramètres

1. `options` (*Object* [optional]) 
    - `options.render` (*Function* [optional]): The render function to enhance, it uses **enzyme by default**.
    - The other keys are forwarded to the options argument of `enzyme.render()`.

#### Valeur de retour

`render` (*Function*): A render to string function.

#### Exemples

```jsx
import { createRender } from '@material-ui/core/test-utils';

describe('<MyComponent />', () => {
  let render;

  before(() => {
    render = createRender();
  });

  it('should work', () => {
    const wrapper = render(<MyComponent />);
  });
});
```