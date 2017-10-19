# Frequently asked questions

Stuck on a particular problem?
Check some of these common gotchas first.

If you still cannot find what you are looking for, you can ask the community in [gitter](https://gitter.im/callemall/material-ui).
For how-to questions and other non-issues, please use [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) instead of Github issues. There is a StackOverflow tag called `material-ui` that you can use to tag your questions.

## Why are the fixed positioned elements move when a modal is opened?

We block the scroll as soon as a modal is opened.
It prevents interacting with the background when the modal should be the only interactive content.
However, removing the scrollbar can make your **fixed positioned elements** move.
In this situation, you can apply a global `.mui-fixed` class name to tell Material-UI to handle those elements.

## How can I disable the ripple effect on the whole app?

The best solution to date is to write wrapping components for all the Material-UI components showing a ripple.
The ripple effect is exclusively coming from the `BaseButton` component.
[You can find the components using the BaseButton following this link](https://github.com/callemall/material-ui/search?utf8=%E2%9C%93&q=%22%2F%2F+%40inheritedComponent+ButtonBase%22).
Then, all you have to do is to provide the `disableRipple` property.

## When should I use inline-style vs `withStyles()`?

As a rule of thumb, only use inline-style for dynamic style properties. The CSS alternative provides more advantages. To name some of those pros:
- auto-prefixing
- better debugging
- allow media queries
- allow keyframes
