# Frequently Asked Questions

Stuck on a particular problem? Check some of these common gotchas first.

If you still can't find what you're looking for, you can ask the community in [gitter](https://gitter.im/mui-org/material-ui).
For how-to questions and other non-issues, please use [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) instead of Github issues. There is a StackOverflow tag called `material-ui` that you can use to tag your questions.

## How to fix a class names production build conflict?

This is probably the n°1 issue people are facing starting with Material-UI.
The class names value relies on the concept of [class name generator](/customization/css-in-js#creategenerateclassname-options-class-name-generator).
The whole page needs to be rendered with **one generator**.

## Why do the fixed positioned elements move when a modal is opened?

We block the scroll as soon as a modal is opened.
This prevents interacting with the background when the modal should be the only interactive content, however, removing the scrollbar can make your **fixed positioned elements** move.
In this situation, you can apply a global `.mui-fixed` class name to tell Material-UI to handle those elements.

## How can I disable the ripple effect on the whole app?

The best solution at present is to write wrapping components for all the Material-UI components showing a ripple.
The ripple effect is exclusively coming from the `BaseButton` component.
You can find the components using the ButtonBase [here](https://github.com/mui-org/material-ui/search?utf8=%E2%9C%93&q=%22%2F%2F+%40inheritedComponent+ButtonBase%22).
Then, all you have to do is to provide the `disableRipple` property.

## Do I have to use JSS to style my app?

It's highly recommended:

- It comes built in, so carries no additional bundle size overhead.
- It's fast & memory efficient.
- It has a clean, consistent [API](http://cssinjs.org/json-api/).
- It supports a number of advanced features, either natively, or through [plugins](http://cssinjs.org/plugins/).

However perhaps you're adding some Material-UI components to an app that already uses another styling solution,
or are already familiar with a different API, and don't want to learn a new one? In that case, head over to the
[Style Library Interoperability](/guides/interoperability) section,
where we show how simple it is to restyle Material-UI components with alternative style libraries.

## When should I use inline-style vs `withStyles()`?

As a rule of thumb, only use inline-style for dynamic style properties. The CSS alternative provides more advantages, such as:

- auto-prefixing
- better debugging
- media queries
- keyframes

## How do I use react-router?

We have documented how to use a [third-party routing library](/demos/buttons#third-party-routing-library) with the `ButtonBase` component.
A lot of our interactive components use it internally:
`Button`, `MenuItem`, `<ListItem button />`, `Tab`, etc.
You can use the same solution with them.

## How do I combine the `withStyles()` and `withTheme()` HOCs?

There are a number of different options:

### `withTheme` option:

```js
export default withStyles(styles, { withTheme: true })(Modal);
```

### `compose()` helper function:

```js
import { compose } from 'recompose';

export default compose(
  withTheme(),
  withStyles(styles)
)(Modal);
```

### raw function chaining:

```js
export default withTheme()(withStyles(styles)(Modal));
```

## How can I access the DOM element?

You can use the `ref` property in conjunction with the [`findDOMNode()`](https://reactjs.org/docs/react-dom.html#finddomnode) React API. Or you can [use an abstraction](https://github.com/facebook/react/issues/11401#issuecomment-340543801):

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class RootRef extends React.Component {
  componentDidMount() {
    this.props.rootRef(ReactDOM.findDOMNode(this))
  }

  componentWillUnmount() {
    this.props.rootRef(null)
  }

  render() {
    return this.props.children
  }
}

RootRef.propTypes = {
  children: PropTypes.element.isRequired,
  rootRef: PropTypes.func.isRequired,
};

export default RootRef;
```

Usage:
```jsx
<RootRef rootRef={node => { console.log(node) }}>
  <Paper />
</RootRef>
```

## Why are the colors I am seeing different from what I see here?

The documentation site is using a custom theme. Hence, the color palette is
different from the default theme that Material-UI ships. Please refer to [this
page](/customization/themes) to learn about theme customization.

## Material-UI is awesome. How can I support the project?

There are many ways to support Material-UI:
- Improve [the documentation](https://github.com/mui-org/material-ui/tree/master/docs).
- Help others to get started.
- [Spread the word](https://twitter.com/MaterialUI).
- Answer [StackOverflow questions](https://stackoverflow.com/questions/tagged/material-ui) or [issues marked as question](https://github.com/mui-org/material-ui/issues?q=is%3Aopen+is%3Aissue+label%3Aquestion) in the repository.

If you use Material-UI in a commercial project and would like to support its continued development by becoming a **Sponsor**,
or in a side or hobby project and would like to become a backer, you can do so through [OpenCollective](https://opencollective.com/material-ui).

All funds raised are managed transparently, and Sponsors receive recognition in the README and on the Material-UI home page.
