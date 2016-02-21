## Roadmap

The roadmap is a living document, and it is likely that priorities will change, but the list below should give some indication of our plans for the next major release, and for the future.

### 0.15.0

#### Breaking Changes

- [x] Remove deprecated usage of JSON to generate children across the components.
- [x] [[#3108](https://github.com/callemall/material-ui/pull/3108)] Remove deprecated components, methods & props.
- [ ] [[#2957](https://github.com/callemall/material-ui/issues/2957)] Standardize callback signatures.
- [x] [[#2980](https://github.com/callemall/material-ui/issues/2980)] [[#1839](https://github.com/callemall/material-ui/issues/1839)] Standardise Datepicker for ISO8601.

#### Deprecations

- [ ] [[#2880](https://github.com/callemall/material-ui/issues/2880)] Deprecate valueLink.
- [ ] [[#1793](https://github.com/callemall/material-ui/issues/1793)][[#2679](https://github.com/callemall/material-ui/issues/2679)] PascalCase component names and reorganise directory structure. Deprecate old names.
- [ ] [[#2697](https://github.com/callemall/material-ui/issues/2697)] Rename LeftNav and deprecate old name.

#### Core

- [ ] [[#2903](https://github.com/callemall/material-ui/issues/2903)] Enforce eslint rules.
- [ ] [[#2493](https://github.com/callemall/material-ui/pull/2493)] Use higher order components across the library to abstract themes passed down from context.
- [ ] [[#2852](https://github.com/callemall/material-ui/issues/2852)] Remove style-propable mixin from components.
- [ ] [[#2627](https://github.com/callemall/material-ui/issues/2627)] Improve overall theme handling.
- [ ] [[#2573](https://github.com/callemall/material-ui/issues/2573)] Remove the usage of isMounted().
- [ ] [[#2555](https://github.com/callemall/material-ui/issues/2555)] [TextField] General improvements.

#### Major features

- [ ] [[1321](https://github.com/callemall/material-ui/pull/1321#issuecomment-174108805)] Composable AppBar component.
- [ ] [[#2493](https://github.com/callemall/material-ui/pull/2493)] New Stepper component.
- [ ] [[#3132](https://github.com/callemall/material-ui/pull/3132)] Scrollable Tabs.
- [X] [[#3033](https://github.com/callemall/material-ui/pull/3132)] New Subheader component.

#### Documentation

- [ ] Documentation versioning.
- [ ] Add example on how to use [react-list](https://github.com/orgsync/react-list) for lists, menu items and table.
- [x] [[#2635](https://github.com/callemall/material-ui/pull/2635)] Document the new theme calculation, and it's usage.
- [ ] [[#3191](https://github.com/callemall/material-ui/issues/3191)] Improve component property documentation.

### Future

#### Deprecations

1. Deprecate & eventually remove all imperative methods.

#### Core

1. [[2437](https://github.com/callemall/material-ui/issues/2437)] Remove mixins.
1. Make extensive use of `popover` and `render-to-layer`.
1. [[#458](https://github.com/callemall/material-ui/issues/458)] Migrate components to [ES6 Classes](https://github.com/callemall/material-ui/tree/es6-classes).
1. [[#2784](https://github.com/callemall/material-ui/issues/2784)] Stateless components.
1. Improve performance with `shouldComponentUpdate` and removed inefficient computations.
1. Standardize API naming and available `prop` convention across the library.
1. Better accessibility support.
1. Better keyboard navigation support.

#### Features

1. [[#2416](https://github.com/callemall/material-ui/issues/2416)] TextField as a composable component for various field types.
1. Responsive components to better support MD spec for mobile component sizes, and in preparation for react-native support.
1. [[#2863](https://github.com/callemall/material-ui/issues/2863)] Add missing components, and missing features from current ones.
1. [[#2251](https://github.com/callemall/material-ui/issues/2251)] Full featured Table.
1. Full Featured Tabs (close, [disable](https://github.com/callemall/material-ui/issues/1613), move, sizing, [scrolling](https://github.com/callemall/material-ui/pull/2861)).
1. Full support for react-native
1. [[#1673](https://github.com/callemall/material-ui/issues/1673)] I18n for the doc-site.
