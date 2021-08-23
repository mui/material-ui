---
title: MUI v5.0
description: MUI v5.0 is out 🎉
date: 2021-09-15T00:00:00.000Z
authors: ['mbrookes', 'eps1lon', 'mnajdova', 'michaldudak', 'siriwatknp']
card: true
---

After over 400 days of development and over 40 canary releases, we are excited to introduce MUI v5.0.0!
This release features:

- ? depending on timing and strategy [A new branding](#a-new-branding)
- [High-level goals for v5](#high-level-goals-for-v5)
- [Improved customizability](#improved-customizability)
- [New components](#new-components)
- [A new product line: X](#a-new-product-line-x)
- [Improved DX](#improved-dx)
- [v4 migration](#v4-migration)
- [Design kits](#design-kits)
- [What's next?](#whats-next)

## A new branding

- I wonder if we shouldn't have a second blog post for this 🤔
- v5 is the biggest major we have released to date, e.g. more work went into it than v1.
- A new branding to shift developers's perception on the library, encourage them to update their previous perception on it. makeStyles -> styled + sx + dynamic theme is meant to be **major** a DX improvement.
- e.g. https://blog.getbootstrap.com/2021/05/05/bootstrap-5/#new-logo

## High-level goals for v5

Give the backstory to the developers, make us accountable for spending 1 year+ on a major + breaking changes and not on improving the v4 they already use.

- Link the RFC with the initial plan https://github.com/mui-org/material-ui/issues/20012
- What v5 is mostly about: solve the pain reported in https://material-ui.com/blog/2020-developer-survey-results/. in the end, it was mostly about customizability.

## Improved customizability

### Migration from JSS to emotion

- Settle on the name, emotion vs. Emotion
- Explain the problem, the solution
- Like the extensive research that Marija did https://github.com/mui-org/material-ui/issues/22342
- Thanks community members that helped to make the migration of the codebase happen, it was long and fastidous
- Explain what's the migration path for JSS: `@material-ui/styles`
- We have started sponsoring emotion $1,000/month

### The `sx` prop

- Explain the problem, the solution
- Also available as flatten props https://material-ui.com/blog/2021-q1-update/.
- Explain why no support of flatten on all the components (a popular request)
- The community seems to love it https://twitter.com/AnsonLowZF/status/1397034690771443715

### Dynamic props

- Explain the problem, the solution
- Covered a bit in https://material-ui.com/blog/2020-q3-update/, https://material-ui.com/blog/2021-q1-update/

```jsx
const theme = createMuiTheme({
  components: {
    MuiButton: {
      variants: [
```

```jsx
import { createMuiTheme, Button } from '@material-ui/core';

// 1. Extend the theme.
const theme = createMuiTheme({
  palette: {
    neutral: {
      main: '#5c6ac4',
    },
  },
});

// 2. Notify TypeScript about the new color in the palette
declare module '@material-ui/core/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

// 3. Profit
<Button color="neutral"  />
```

### Global class names

- Explain the problem, the solution

### Hook only components

- Explain the problem, the solution: isolate the logics of the existing components into standalone hooks).

## Support of multiple adapters

- styled-components
- ask for help on goober https://github.com/mui-org/material-ui/pull/27776

## New components

### Improved Grid

- Covered a bit in https://material-ui.com/blog/2021-q2-update/

### Promotion of components from the Lab to the Core

- Covered a bit in https://material-ui.com/blog/2020/

### Stack

- Covered a bit in https://material-ui.com/blog/2021-q1-update/

### LoadingButton

- Covered a bit in https://material-ui.com/blog/2020-q2-update/

### TrapFocus

- Covered a bit in https://material-ui.com/blog/2020-q3-update/.

### Date pickers

- Transfer of ownership from third-party to mui-org.

### More Material Design icons

- Covered a bit in https://material-ui.com/blog/2020-q2-update/, https://material-ui.com/blog/2021-q1-update/

### Data Grid

- See next section
- Covered a bit in https://material-ui.com/blog/2020-q3-update/

## A new product line: X

- What are the new product separation
- What this product line is about
- Why does it even exist
- Present the new Data Grid component, hopefully, released as v5.0.0 at the same time.

## Change on the supported platforms

- Updated TypeScript version
- Updated node.js version
- Updated React's version
- Updated browsers support. Stop all work on IE 11, but specific IE 11 will only be removed in v6.
  Moving IE 11 to a different bundle has allowed saving [-6kB](https://github.com/mui-org/material-ui/pull/22814#issuecomment-700995216) overall.

## Improved DX

### Smaller demos in the docs

- Covered a bit in https://material-ui.com/blog/2021-q1-update/

### Props descriptions in IntelliSense

- Already a bit covered in https://material-ui.com/blog/2020-q2-update/

### Migration from Enzyme to Testing Library

- The value? Makes it easier for developers to copy the source, and maintainers to make sure the components are easy to test

### TypeScript migration

- Share our progress https://github.com/mui-org/material-ui/issues/15984
- Covered a bit in https://material-ui.com/blog/2020-q3-update/
- The value? Helps keeping the types as accurate as possible

### Strict Mode support

- Docs, test, etc. now runs in StrictMode
- Warn that `@material-ui/styles` is not compatible

## v4 migration

- The high-level changes required
- Installation
- ⚓️ We have introduced a new release line: v4.x.x-deprecations.x. This release line is kept in sync with the latest version of v4 and includes actionable deprecations to ease the migration to v5.
- The codemod, covered a bit in https://material-ui.com/blog/2021-q2-update/
- The migration guide

## Design kits

## What's next?

- Start covering the growth of v4, and its inertia, https://material-ui.com/blog/2020-q3-update/
- These efforts are sustainable, echos back to https://material-ui.com/blog/material-ui-v4-is-out/#premium-themes-store-%E2%9C%A8

### A public roadmap

It's new, link core and x roadmaps.

### Core

- Unstyled
- Joy

### X

- Data grid

## Thank you

Finally, one last thank you to everyone who's contributed to MUI v5.
The whole team is very excited about this release! It's just the beginning.
We will keep working hard on delivering the best possible React UI components while making it accessible to the many.
