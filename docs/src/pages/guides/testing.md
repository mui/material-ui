# Testing

## Internal

We take tests seriously, we have written and we maintain **a wide range** of tests so we can
iterate with confidence on the components. For instance, the visual regression tests provided by [Argos-CI](https://www.argos-ci.com/callemall/material-ui) have proven to be really helpful.
To learn more about our internal tests, you can have a look at the [README](https://github.com/callemall/material-ui/blob/next/test/README.md).

[![Coverage Status](https://img.shields.io/codecov/c/github/callemall/material-ui/next.svg)](https://codecov.io/gh/callemall/material-ui/branch/next)

## Userspace

But what about writing tests in userspace? Material-UI styling infrastructure relies on the context feature of React to work correctly. You are going to need that context when testing your react components with ours.

### Shallow rendering

Shallow rendering is useful to constrain yourself to testing a component as a unit, and to ensure that your tests aren't indirectly asserting on behavior of child components.
We expose a `createShallow()` function for this situation. However, you will most likely not need it most of the time as shallow rendering was created to test components in isolation, without leaking children implementation details, like the context.

### Full DOM rendering

Full DOM rendering is ideal for use cases where you have components that may interact with DOM APIs, or may require the full lifecycle in order to fully test the component (i.e., `componentDidMount` etc.).
We expose a `createMount()` function for this situation.

### Render to string

Rendering to string is useful to test the behavior of the components that are used on the server.
You can take advantage of it to assert the generated HTML string.
We expose a `createRender()` function for this sitation.

## API

### `createShallow([options]) => shallow`

Generate an enhanced shallow function with the needed context.
Please refer to the [API documentation of enzyme](http://airbnb.io/enzyme/docs/api/shallow.html) for further details of the `shallow` function.


#### Arguments

1. `options` (*Object* [optional])
  - `options.shallow` (*Function* [optional]): The shallow function to enhance, it's using **enzyme by default**.
  - `options.otherContext` (*Object* [optional]): Context to be passed into the component.
  - `options.dive` (*Boolean* [optional]): Shallow render the one non-DOM child of the current wrapper, and return a wrapper around the result.

#### Returns

`shallow` (*shallow*): A shallow function.

#### Examples

```js
import { createShallow } from 'material-ui/test-utils';

describe('<MyComponent />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  it('should work', () => {
    const wrapper = shallow(<MyComponent />);
  });
});
```

### `createMount([options]) => mount`

Generate an enhanced mount function with the needed context.
Please refer to the [API documentation of enzyme](http://airbnb.io/enzyme/docs/api/mount.html) for further details of the `mount` function.

#### Arguments

1. `options` (*Object* [optional])
  - `options.mount` (*Function* [optional]): The mount function to enhance, it's using **enzyme by default**.

#### Returns

`mount` (*mount*): A mount function.

#### Examples

```js
import { createMount } from 'material-ui/test-utils';

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

Generate a render to string function with the needed context.
Please refer to the [API documentation of enzyme](http://airbnb.io/enzyme/docs/api/render.html) for further details of the `render` function.

#### Arguments

1. `options` (*Object* [optional])
  - `options.render` (*Function* [optional]): The render function to enhance, it's using **enzyme by default**.

#### Returns

`render` (*Function*): A render to string function.

#### Examples

```js
import { createRender } from 'material-ui/test-utils';

describe('<MyComponent />', () => {
  let render;

  before(() => {
    render = createRender();
  });

  after(() => {
    render.cleanUp();
  });

  it('should work', () => {
    const wrapper = render(<MyComponent />);
  });
});
```
