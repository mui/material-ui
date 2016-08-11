# Roadmap

The roadmap is a living document, and it is likely that priorities will change, but the list below should give some indication of our plans for the next major release, and for the future.

## v0.16.0

We are mainly focusing on
 - **bug fixes** :boom:.
 - Providing a smoother update path to `next`

:warning: New features have low priority and might not be reviewed nor merged.

We have **shifted goals** for `v0.16.0`.
Across a number of issues over the last ~5 months we have been telling people that certain improvements are coming in `v0.16.0` ranging from performance to component API issues and more.
Those improvement are comming with the `next` branch.
We are switching in goal so we can release changes more **often**.

## [next](https://github.com/callemall/material-ui/milestone/14) (expected in the next couple months)


The `next` release is going to be huge :sparkles:

Material-UI was started [2 years ago](https://github.com/callemall/material-ui/commit/28b768913b75752ecf9b6bb32766e27c241dbc46).
The ecosystem has evolved a lot since then, we have also learned a lot.
[@nathanmarks](https://github.com/nathanmarks/) started an ambitious task, rebuilding Material-UI from the **ground-up**
taking advantage of this knowledge to address long-standing issues.
Expect various breaking changes.

The core team is now helping him in the [`next`](https://github.com/callemall/material-ui/tree/next) branch.
Here are some issues that we plan to fix along the way.

For more details, you can have a look a the [v0.16.0 milestone](https://github.com/callemall/material-ui/milestone/14).
- [[#4066](https://github.com/callemall/material-ui/issues/4066)] There should be a more sophisticated styling solution.
- Drastically improving performance by removing inefficient computations (styles).
- Remove all imperative methods.
- [[#2957](https://github.com/callemall/material-ui/issues/2957)] Standardize callback signatures.
- [[#2880](https://github.com/callemall/material-ui/issues/2880)] Remove valueLink.
- [[#1321](https://github.com/callemall/material-ui/pull/1321#issuecomment-174108805)] Composable AppBar component.
- [[#3191](https://github.com/callemall/material-ui/issues/3191)] Improve component property documentation.
- Make extensive use of `popover` and `render-to-layer`.
- Full Featured Tabs (close, [disable](https://github.com/callemall/material-ui/issues/1613), move, sizing, [scrolling](https://github.com/callemall/material-ui/pull/2861)).
- Responsive components to better support MD spec for mobile component sizes, and in preparation for react-native support.
- [[#2416](https://github.com/callemall/material-ui/issues/2416)] TextField as a composable component for various field types.
- Better keyboard navigation support.
- Standardize API naming and available `prop` convention across the library.
- Better accessibility support.
- [[#2251](https://github.com/callemall/material-ui/issues/2251)] Full featured Table.

## Future

- [[#2863](https://github.com/callemall/material-ui/issues/2863)] Add missing components, and missing features from current ones.
- [[#593](https://github.com/callemall/material-ui/issues/593)] Full support for react-native.
- Add example on how to use [react-virtualized](https://github.com/bvaughn/react-virtualized) / [react-list](https://github.com/orgsync/react-list) for lists, menu items and table.
- [[#2493](https://github.com/callemall/material-ui/pull/2493)] Use higher order components across the library to abstract themes passed down from context.
- [[#2784](https://github.com/callemall/material-ui/issues/2784)] Stateless components.
- [[#1673](https://github.com/callemall/material-ui/issues/1673)] I18n for the doc-site.
