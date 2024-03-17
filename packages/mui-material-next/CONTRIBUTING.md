# Contributing

The Material Design 3 components are targeted for v7, so they will be developed on the `material-next` package.

The progress for each component will be tracked in a separate GitHub issue. If you wish to contribute to the migration go to a component's linked issue to see what tasks are missing (see progress tracker [here](https://github.com/mui/material-ui/issues/29345)).

If the issue doesn't exist, create it, name it `[<ComponentName>][material-next] Add <ComponentName> component`, and assign @DiegoAndai. The issue has to contain (at least) a task for each of the steps below (use the [Slider issue](https://github.com/mui/material-ui/issues/37527) as a template).

## Steps

1. Copy component files from `material` to `material-next`, including tests, types, and utils. Keep in mind to:
   - Add component export to `packages/mui-material-next/src/index.ts`
   - Change imports from `@mui/material` to `@mui/material-next`
   - If there are utils that don't exist in `material-next`, add them by copying from `material`
   - Some utils imported from `../utils` might already exist in `@mui/utils`, if so, use the latter
2. Migrate component to TypeScript. The extension `.d.ts` should be replaced with `.types.ts` (except for `index.d.ts` which won't be necessary)
3. Remove deprecated `components` (note the plural `s`, it's not the same as the `component` prop) and `componentsProps` props, replacing them with `slots` and `slotProps`
4. Drop support for `ThemeProvider` in favor of `CssVarsProvider`. In practice, this means:
   - Consuming tokens from `theme.vars` instead of `theme`
   - In tests, using `CssVarsProvider` and `extendTheme` (both imported from `@mui/material-next/styles`) instead of `ThemeProvider` and `createTheme`, as well as providing the same `CssVarsProvier` and `extendTheme` to `describeConformance`'s `ThemeProvider` and `createTheme` options.
5. Implement M3 design specs. Add missing tokens if necessary. Use [material-web tokens](https://github.com/material-components/material-web/tree/main/tokens) as a reference for token values
6. Add component playground to the docs, take the [Slider playground](https://mui.com/material-ui/react-slider/#material-3-slider) as an example
7. Refactor styles to use component CSS Variables, following [material-web tokens](https://github.com/material-components/material-web/tree/main/tokens) and Joy UI's equivalent component (if it exists) as guides.

## Other things to keep in mind

- Except for the first step, there's no particular order to follow, but the proposed order has provided the best experience so far
- For every step, checking the components that are already in `material-next` will be really helpful
- Try to avoid breaking changes, keeping the component's API the same:
  - An exception to this is to use M3 nomenclature and naming conventions, even if it would be a breaking change.
  - If breaking changes are inevitable, then document them right away in `/packages/mui-material-next/migration.md` and add the `breaking change` label to your PR.
- Divide the work in whatever way makes more sense. One PR for a few steps or one PR for each step, however keep in mind that smaller pull requests will be reviewed and merged faster
- Let everyone know what you're working on so we can keep the work coordinated and avoid overlap
- Keep [running tests](https://github.com/mui/material-ui/blob/master/test/README.md) every step of the way, this will help to identify changes as soon as possible and avoid hard debugging sessions at the end
