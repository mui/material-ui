# Styled engine

<p class="description">Configure your preferred styling engine.</p>

The default engine used for generating styles for Material-UI components is [`@emotion`](https://github.com/emotion-js/emotion),
but it is possible to [`styled-components`](https://github.com/styled-components/styled-components) instead.
In order to support both packages as style engines, there are two packages exported:

- `@material-ui/styled-engine` - a thin wrapper around emotion's `styled()` API, with the addition of few other required utilities, such as the `<GLobalStyles />` component, the `css` and `keyframe` helpers, etc.
- `@material-ui/styled-engine-sc` - similar wrapper but around the `styled-components`

These two packages export identical APIs, which makes it possible to replace one for the other.
By default, `@material-ui/core` has the `@material-ui/styled-engine` as a dependency, but you can configure your bundler to replace it for `@material-ui/styled-engine-sc`.
For example, if you are using `webpack`, you can configure this by adding a resolver.

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    alias: {
      '@material-ui/styled-engine': '@material-ui/styled-engine-sc',
    },
  },
};
```

If you are using `create-react-app`, we offer a ready to use template in our examples project.
You can use the [create-react-app-with-styled-components example](https://github.com/mui-org/material-ui/tree/next/examples/create-react-app-with-styled-components), or its [TypeScript version](https://github.com/mui-org/material-ui/tree/next/examples/create-react-app-with-styled-components-typescript).

> **Note** that `@emotion` and `styled-components` are peer dependencies of `@material-ui/core`, so you need to install them yourself. See the [Installation guide](/getting-started/installation/) for more info.
