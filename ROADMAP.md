## Future

1. Full Featured Tabs (close, disable, move, sizing).
1. Generate import statement for the svg-icons in the docs.
1. NavBar component (To address the hamburger anti-pattern).
1. Make extensive use of `popover` and `render-to-layer`.
1. Remove mixins. ([2437](https://github.com/callemall/material-ui/issues/2437))
1. Migrate component to  [ES6 Classes](https://github.com/callemall/material-ui/tree/es6-classes). ([#458](https://github.com/callemall/material-ui/issues/458)).
1. Full featured Table. ([#2251](https://github.com/callemall/material-ui/issues/2251))
1. Comprehensive contribution guide for the docs and changelogs.
1. I18n for the doc-site. ([#1673]{https://github.com/callemall/material-ui/issues/1673))
1. Better accessibility support.
1. Improve performance with `shouldComponentUpdate` and removed inefficient computations.
1. Standardize API naming and available `prop` convention across the library.
1. Standardize API callback signature ([#2957](https://github.com/callemall/material-ui/issues/2957)) and provide formal documentation. ([#3096](https://github.com/callemall/material-ui/issues/3096))
1. Stateless components. ([#2784](https://github.com/callemall/material-ui/issues/2784))
1. TextField as a composable component for various field types. ([#2416](https://github.com/callemall/material-ui/issues/2416))
1. Responsive components to better support MD spec for mobile component sizes, and in preparation for react-native support.
2. 1. Full support for react-native.

## 0.15.0

- [ ] Documentation versioning.
- [ ] Enforce eslint rules. ([#2903](https://github.com/callemall/material-ui/issues/2903))
- [ ] Use higher order components across the library to abstract themes passed down from context. ([#2493](https://github.com/callemall/material-ui/pull/2493))
- [ ] Add example on how to use [react-list](https://github.com/orgsync/react-list) for lists, menu items and table.
- [ ] Document the new theme calculation, and it's usage. ([#2635](https://github.com/callemall/material-ui/pull/2635))
- [ ] Deprecate valueLink ([#2880](https://github.com/callemall/material-ui/issues/2880))

##### Breaking Changes

* Remove usage of JSON to generate children across the components.
* Remove the old menu folder. ([#3108](https://github.com/callemall/material-ui/pull/3108))
* Remove old component file naming.
* Remove deprecated properties. ([#3108](https://github.com/callemall/material-ui/pull/3108))
