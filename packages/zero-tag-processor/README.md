# @mui/zero-tag-processor

`styled` processor for Linaria to support CSSObject syntax with theme support. Exploratory package not meant for production as of yet.

## TODOs

### `styled` call features

- [x] Replacing usage of theme tokens (`primary.main`) inside the dynamic functions with equivalent css variables at build time.
- [x] Restricting usage of `theme` object inside above functions.
- [x] Generating theme classes with all the theme tokens.
- [x] Optional processing of shorthands.
- [ ] Copying over some of the logic from `@mui/system` to the package (mainly `styleFunctionSx` and it's dependencies.)
- [ ] Typescript typings for `styled`
- [ ] Tagged template support. This version only supports css objects and strings. You can interpolate theme and return tagged string. _We'll probably revisit at the end as right now we are focussed on style objects_.
