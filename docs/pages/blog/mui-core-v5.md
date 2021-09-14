---
title: Introducing MUI Core v5.0
description: After over 400 days of development and over 40 canary releases, we are excited to introduce MUI Core v5.0.0!
date: 2021-09-15T00:00:00.000Z
authors: ['oliviertassinari', 'eps1lon', 'mnajdova', 'michaldudak', 'siriwatknp']
card: true
---

After over 400 days of development and over 40 canary releases, we are excited to introduce MUI Core v5.0.0!
This release features some major highlights:

- [High-level goals for v5](#high-level-goals-for-v5)
- [A new brand](#a-new-brand)
- [Improved customizability](#improved-customizability)
  - [Migration from JSS to emotion](#migration-from-jss-to-emotion)
  - [The sx prop](#the-sx-prop)
  - [Dynamic props](#dynamic-props)
  - [Global class names](#global-class-names)
  - [Base components (alpha)](#base-components-alpha)
- [Improved DX](#improved-dx)
  - [Smaller demos in the docs](#smaller-demos-in-the-docs)
  - [Props descriptions in IntelliSense](#props-descriptions-in-intellisense)
- [A new product line: X](#a-new-product-line-x)
- [New components](#new-components)
  - [Improved Grid](#improved-grid)
  - [More Material Design icons](#more-material-design-icons)
  - [Stack](#stack)
  - [Promotion from the lab](#promotion-from-the-lab)
  - [New in the lab](#new-in-the-lab)
- [v4 migration](#v4-migration)
  - [Change of the package names](#change-of-the-package-names)
  - [Change of the styling engine](#change-of-the-styling-engine)
  - [Installation](#installation)
  - [Change of the React & TypeScript supported versions](#change-of-the-react-amp-typescript-supported-versions)
  - [Change on the supported platforms](#change-on-the-supported-platforms)
- [Design kits](#design-kits)
- [What's next?](#whats-next)

## High-level goals for v5

In our last survey, the number of developers that commented about improving the Material Design implementation was down by [60%](/blog/2020-developer-survey-results/#comparison-with-last-year) compared to the year before.
At the same time, 5X more developers were struggling to customize the components.

It is based on this context that we started to work on v5 in 2019.
Our primary focus was to revamp the **customization Developer Experience (DX)**.
It had become clear that design (aesthetic, UX) and DX were key to unlocking the next stage of growth.

The last major iteration on the library was completed with MUI v4, released [two-and-a-half years ago](/blog/material-ui-v4-is-out/),
meaning over a year without innovation.
So, we have approached v5 with a focus on delivering **long-term value**.
For instance, we stopped all development on v4 as soon as we started to work on v5,
and have taken the liberty of introducing breaking changes anytime we have identified a long-term potential.

You can find the initial RFC plan for v5 in [issue #20012](https://github.com/mui-org/material-ui/issues/20012).

## A new brand

Material-UI **is now MUI**! Head to the [dedicated blog post](/blog/material-ui-is-now-mui/) to learn more.

## Improved customizability

### Migration from JSS to emotion

The first step we took to improve the customization experience was to rethink the styling solution from a blank page.

If you have been following MUI for a long time, you have probably noticed that we have iterated (a lot!) on the styling solution over the last seven years.
We started with Less, then inline-styles, then JSS, and now emotion. Why change it again? We wanted to solve the following **problems**:

1. The React community is settling on `styled` as the **most popular** CSS-in-JS API. We have used popularity as a proxy for "best".

```jsx
const StyledDiv = styled('div')({
  color: 'red',
});

// or
const StyledDiv = styled.div`
  color: red;
`;
```

<p class="blog-description"><a href="https://codesandbox.io/s/elastic-yonath-uedfv?file=/src/App.js">Codesandbox</a></p>

You can find it in [styled-components](https://styled-components.com/), [emotion](https://emotion.sh/docs/styled), [goober](https://goober.js.org/), [stitches](https://stitches.dev/docs/api#styled), or [linaria](https://linaria.dev/).
While MUI is compatible with any styling solution (as long as the styles have more specificity, for example, Tailwind CSS), many developers still felt the need to learn something new: the [`makeStyles`](/styles/basics/#hook-api) API.

2. Our React integration with JSS (`@mui/styles`) is **too slow** to unlock the next layer of customization DX we aim for.
   The static CSS generation using v4 was fast enough, even [faster](https://codesandbox.io/s/nb05w?file=/src/App.js) than emotion,
   however, the dynamic style generation was too slow to be used in production. We would have needed to reimplement it.
3. Many developers were advocating for MUI to [migrate to styled-components](https://github.com/mui-org/material-ui/issues/6115),
   which would allow us to drop the custom React JSS wrapper we maintain.
   From our experience, maintaining a custom styling solution takes a considerable amount of time.

After [exploring](https://github.com/mui-org/material-ui/issues/22342) many different options, we settled on what we believe is a great tradeoff to **solve** the above issues:

1. We have made `styled` the lowest level primitive to add styles.
   This API is already known by many.
2. We have defined a common interface with concrete implementations:

   - `@mui/styled-engine`: implemented with emotion (default).
   - `@mui/styled-engine-sc`: implemented with styled-components
   - If you are using a different styling library, feel free to contribute a wrapper. For instance, there is [one attempt with goober](https://github.com/mui-org/material-ui/pull/27776), a library obsessing on bundle size (3kB gzipped).

   This allows developers to swap between different style engines. For example, styled-components users no longer need to bundle emotion **and** styled-component, nor do they need to configure the server-side rendering for each.
   How does the [swap work](/guides/styled-engine/#how-to-switch-to-styled-components)? The same way it does from React to Preact.

3. For the last couple of months, we have been [sponsoring](https://opencollective.com/emotion) emotion with a $100/month grant. We are now increasing this amount to $1,000/month. It's in our best interest to help ensure the library keeps pushing the envelope, leading the state of the art in a competitive space.

The first immediate benefit of the move to emotion was **performance**. The `<Box>` component is [x5-x10 more performant](https://codesandbox.io/s/zlh5w?file=/src/App.js) in v5, compared to v4.

We would like to thank all the community contributors that made the migration of the components and documentation possible in [#24405](https://github.com/mui-org/material-ui/issues/24405) and [#16947](https://github.com/mui-org/material-ui/issues/16947): [@natac13](https://github.com/natac13), [@vicasas](https://github.com/vicasas), [@mngu](https://github.com/mngu), [@kodai3](https://github.com/kodai3), [@xs9627](https://github.com/xs9627), [@povilass](https://github.com/povilass), [@duganbrett](https://github.com/duganbrett), [@vinyldarkscratch](https://github.com/vinyldarkscratch), and more.
It was a major undertaking!

Going forward, developers can either keep using JSS with the legacy `@mui/styles` package [or migrate from JSS](/guides/migration-v4/#migrate-from-jss).
We recommend the latter to match the core components.

### The `sx` prop

While the `styled` API is great to style complex components or to create highly reused components, there are cases where it's overkill.
We started to [explore](https://medium.com/material-ui/introducing-material-ui-design-system-93e921beb8df) this **problem** three years ago with the introduction of the `<Box>` component to solve the following concerns:

1. **Switching context** wastes time.
   The styled API forces you to constantly jump between the use of the styled components and where they are defined.
   Could we move the style descriptions right where we need them?
2. **Naming things** is hard.
   Have you ever found yourself struggling to find a good name for a styled component?
   Could we remove the need to create and name yet another component?
3. **Enforcing consistency** in UIs is hard.
   This is especially true when more than one person is building the application, as there has to be some coordination amongst members of the team regarding the choice of design tokens and how they are used, what parts of the theme structure should be used with what CSS properties, and so on.

In v5, we have pushed the solution one step further with the `sx` prop.
The prop is now available on **all** the components (made possible by emotion).
It exposes a superset of the CSS API: the normal CSS properties, shorthands, and media query helpers.

For instance, you can add two units of vertical margin with:

```jsx
// add margin: 16px 0px;
<Slider sx={{ my: 2 }} />
```

<p class="blog-description"><a href="https://codesandbox.io/s/nostalgic-williams-zmo5r?file=/src/App.js">Codesandbox</a></p>

Developers already seem to [love it](https://twitter.com/AnsonLowZF/status/1397034690771443715).
You can find a [side-by-side comparison](/system/basics/#why-use-the-system) of `styled` vs. `sx` in the documentation to determine when you should use the prop.
Find where your cursor is. Some developers use it for everything, others with parsimony.

The four components categorized as CSS utilities: Box, Grid, Typography, and Stack also expose a subset of the `sx` prop as flat props, for instance:

```jsx
<Typography color="grey.600">

// is equivalent to
<Typography sx={{ color: "grey.600" }}>
```

<p class="blog-description"><a href="https://codesandbox.io/s/keen-worker-zo2r3?file=/src/App.tsx">Codesandbox</a></p>

See the [API tradeoff](/system/basics/#api-tradeoff) section of the documentation for why not all the components accept these flat props.

### Dynamic props

React is about composition. Developers can import one component, extend it, and re-export the wrapper.
It's how developers have extended the core components up until v4. However:

1. Each time you create a new component, it's another import option for your team.
   Now, you have to ensure that the right component is imported.
2. Adding a new `color="success"` prop to a Button component requires non-trivial CSS customizations.
   How do you ensure that all the styles (hover, focus, focus-visible) are consistent with the other built-in colors?
3. It adds a boilerplate.

For this reason, v5 comes with the capability to extend the built-in behavior of the components, right from the theme.
This was one of the most upvoted GitHub issues: [#13875](https://github.com/mui-org/material-ui/issues/13875).
In practice, this change makes the MUI Core components extendable placeholders.

**First**, you can use the [existing style mapping](/customization/palette/#adding-new-colors) of the components.
For example, you can add a new `neutral` color to the palette, and the Button computes the right derivative colors.

```jsx
import { createTheme, Button } from '@mui/material';

// 1. Extend the theme.
const theme = createTheme({
  palette: {
    neutral: {
      main: '#d79b4a',
    },
  },
});

// 2. Notify TypeScript about the new color in the palette
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

// 3. Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

// 4. Profit
<Button color="neutral"  />
```

<p class="blog-description"><a href="https://codesandbox.io/s/stupefied-mclaren-ho4zs?file=/src/App.tsx">Codesandbox</a></p>

**Second**, you can add [custom variants](/customization/theme-components/#adding-new-component-variants) to the theme, overriding the CSS for specific component prop combinations.

```jsx
import { createTheme, Button } from '@mui/material';

// 1. Extend the theme.
const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed', color: 'error' },
          style: {
            border: '1px dashed red',
            color: 'red',
          }
        }
      ]
    }
  }
});

// 2. Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

// 3. Profit
<Button variant="dashed" color="error">
  dashed
</Button>
```

<p class="blog-description"><a href="https://codesandbox.io/s/sharp-sky-xwz3d?file=/src/App.tsx">Codesandbox</a></p>

### Global class names

In v3, we heard how frustrating using the `classes` prop API correctly can sometimes be.
In v4, we made [a step](/blog/material-ui-v4-is-out/#customization) towards adding global class names.
They are present, as long as no more than one ThemeProvider is used.

v5 doubles down on this direction by always adding global class names on the host DOM nodes.
These class names are available for customizing the child elements,
which can simplify the customization of complex components.

For example, compare these three options to turn the outlined input's border color red:

```tsx
import TextField from '@mui/material/TextField';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

// Option 1: global class
const CustomizedTextField1 = styled(TextField)({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'red',
  },
});

// Option 2: global class + const
const CustomizedTextField2 = styled(TextField)({
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: 'red',
  },
});

// Option 3: classes prop (before)
const CustomizedTextField3 = styled((props) => (
  <TextField
    {...props}
    variant="outlined"
    InputProps={{ classes: { notchedOutline: 'foo' } }}
  />
))({
  '& .foo': {
    borderColor: 'red',
  },
}) as typeof TextField;
```

<p class="blog-description"><a href="https://codesandbox.io/s/zealous-dawn-0yr4g?file=/src/App.tsx">Codesandbox</a></p>

Option 1 is the simplest but if you want more type safety and do not use a magic string (`MuiOutlinedInput-notchedOutline`), you can use Option 2.

### Base components (alpha)

While hooks were high-risk experimentation when React released them in 2018, they are now ubiquitous.
This is a great opportunity for MUI to expose more flexibility: headless components.

A key reason why developers pick MUI is to be able to build UIs faster.
When they depend on us, they make a tradeoff.
They estimate that applying new styles on top of the Material Design components will be faster than creating components from scratch or picking another library.
They estimate that it will be performant enough, and they won't miss too much freedom.

This tradeoff works **really well** when having a small, constrained engineering team or a large team building internal (/secondary) tools.
But what about the medium/large size engineering team that works on ambitious projects? Shouldn't they have a better option for not including Material Design and maximizing freedom than building the components from scratch?

We have started working on this exact problem,
isolating the logic of the Material Design components into hooks and unstyled components.
While the effort is still in alpha, you can already find the first building blocks in the `@mui/base` package.

So far it features:

- [Autocomplete](/components/autocomplete/#useautocomplete)
- [Button](/components/buttons/#unstyled)
- [Modal](/components/modal/#unstyled)
- [Pagination](/components/pagination/#usepagination)
- [Slider](/components/slider/#unstyled)
- [Switch](/components/switches/#unstyled-switches)

```jsx
const CustomButton = React.forwardRef(function CustomButton(
  props: ButtonUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  const { children } = props;
  const { active, disabled, focusVisible, getRootProps } = useButton({
    ...props,
    ref,
    component: CustomButtonRoot,
  });

  const classes = {
    active,
    disabled,
    focusVisible,
  };

  return (
    <CustomButtonRoot {...getRootProps()} className={clsx(classes)}>
      {children}
    </CustomButtonRoot>
  );
});
```

<p class="blog-description"><a href="https://codesandbox.io/s/7lc1r?file=/demo.tsx">Codesandbox</a></p>

We discuss the effort in [#6218](https://github.com/mui-org/material-ui/issues/6218).
You can use [#27170](https://github.com/mui-org/material-ui/issues/27170) to follow our progress.

## Improved DX

### Smaller demos in the docs

We have used the migration of the demos from JSS to emotion as an opportunity to rework them.
Many of the demos were originally added taking into account how they would help maintainers work on the components.
Instead, we have reversed the priority, putting the developers using them [first](https://github.com/mui-org/material-ui/issues/22484).

In practice, this means breaking down complex demos into smaller ones.
We aim to have as many "inline previews" as possible. It saves one click to expand the demo, and the mental overhead of figuring out what part of the code maps with what of interest you saw on the screen.

<a href="/components/buttons/#basic-button"><img src="/static/blog/mui-core-v5/inline-preview.png" alt="" style="width: 649px; margin-bottom: 16px;" /></a>

### Props descriptions in IntelliSense

The best documentation is the one you don't need to open.
We have moved all the prop descriptions to TypeScript, so IntelliSense in your editor can show you more context.

<img src="/static/blog/mui-core-v5/prop-descriptions.png" alt="" style="width: 649px; margin-bottom: 16px;" />

<p class="blog-description">The popup explains what the <code>forcePopupIcon</code> prop is for.</p>

These TypeScript prop descriptions are also used to generate the [API pages](/api/autocomplete/#props) of the documentation, so there is a single source of truth.

### Migration from Enzyme to Testing Library

- The value? Makes it easier for developers to copy the source, and maintainers to make sure the components are easy to test

### TypeScript migration

- Share our progress https://github.com/mui-org/material-ui/issues/15984
- Covered a bit in https://material-ui.com/blog/2020-q3-update/
- The value? Helps keeping the types as accurate as possible

### Strict Mode support

- Docs, test, etc. now runs in StrictMode
- Warn that `@material-ui/styles` is not compatible

## A new product line: X

- What are the new product separation
- What this product line is about
- Why does it even exist
- Present the new Data Grid component, hopefully, released as v5.0.0 at the same time.

## New components

This release comes with eight new components!

### Improved Grid

The development of the Grid was mostly put on hold for the last three years, blocked by the size of the statically generated CSS with JSS.
The [migration to emotion](#migration-from-jss-to-emotion) has unlocked the following frequently requested changes:

Support for [row & column](/components/grid/#row-amp-column-spacing) spacing:

```jsx
<Grid container rowSpacing={1} columnSpacing={2} />
```

Support for [responsive values](/components/grid/#responsive-values) on all the props:

```jsx
<Grid container spacing={{ xs: 2, md: 3 }} />
```

Support for a different [number of columns](/components/grid/#columns) than 12:

```jsx
<Grid container columns={16}>
```

An alternative implementation that uses [CSS grid](/components/grid/#css-grid-layout):

```jsx
<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
  <Box gridColumn="span 8">
    <Item>xs=8</Item>
  </Box>
  <Box gridColumn="span 4">
    <Item>xs=4</Item>
  </Box>
  <Box gridColumn="span 4">
    <Item>xs=4</Item>
  </Box>
  <Box gridColumn="span 8">
    <Item>xs=8</Item>
  </Box>
</Box>
```

### More Material Design icons

The Material Design team at Google has released 600 new icons in five different themes since we released v4.
We have made them [available](/components/material-icons/) in the `@mui/icons-material` package.

### Stack

We have introduced a new `<Stack>` component
to handle one-dimensional layouts. It's's similar to how Figma handles auto-layout.

<a href="/components/stack/"><img src="/static/blog/mui-core-v5/stack.png" alt="" style="width: 532px; margin-bottom: 16px;" /></a>

> Note that you might already be using `<Box display="flex" gap={1}>` to solve the same problem,
> however, [browser support](https://caniuse.com/flexbox-gap) for the flexbox `gap` CSS property is lacking in Safari.

You can find [more details](/components/stack/) in the documentation.

### Promotion from the lab

We have moved six components from the lab to the main component package, after over two years iterating on feedback:

- [Autocomplete](/components/autocomplete/)
- [Pagination](/components/pagination/)
- [Rating](/components/rating/)
- [Skeleton](/components/skeleton/)
- [Speed Dial](/components/speed-dial/)
- [Toggle Buttons](/components/toggle-button/)

### New in the lab

The lab hosts the incubator components that are not yet ready to move to the core.
The main difference between the lab and the core is how the components are versioned.
Having a separate lab package allows us to release breaking changes when necessary while the core package follows a [slower cadence](/versions/#release-frequency).

The following components are now available in the lab:

- [LoadingButton](/components/buttons/#loading-buttons). It does what you would expect. It renders the `Button` with a configurable loading/pending state.
- [TrapFocus](/components/trap-focus/). This component traps the keyboard focus within a DOM node. For example, it's used by the Modal to prevent tabbing out of the component for accessibility reasons.
- [Masonry](/components/masonry/). One great use case for this component is when using the `Grid` component leads to wasted space. It's frequently used in dashboards.

  <a href="/components/masonry/"><img src="/static/blog/mui-core-v5/masonry.png" alt="" style="width: 505px; margin-bottom: 16px;" /></a>

### Date pickers

- Transfer of ownership from third-party to mui-org.

### Data Grid

- See next section
- Covered a bit in https://material-ui.com/blog/2020-q3-update/

## v4 migration

We put a lot of work in order to make the migration from v4 to v5 as easier as possible. If you are starting your upgrade, these are the three things you should look into:

- ⚓ We have introduced actionable deprecations in v4. You can upgrade to v4.12.0 and start preparing your codebase to be compatible with v5.
- ⚒️ We have prepared a [codemod](/guides/migration-v4/#preset-safe) that does most of the transformations you will need for the migration. If you are not familiar with what a codemod is, check out [Effective Refactoring with Codemods by Edd Yerburgh](https://www.youtube.com/watch?v=H9qtLutnT_g&ab_channel=Pusher).
- 📄 Lastly, we have prepared a step-by-step [guide](/guides/migration-v4/) about how you can upgrade to v5, using the codemod above. This guide is the one place where you can find all information required for upgrading to v5.

In the following sections, we will cover some high-level changes required for a successful upgrade.

### Change of the package names

In order to support the new branding and the long-term direction we have, we made a change in the terminology used in the project.
To support this, we needed to change the names of the packages that we provide. For more details on this check the [the migration guide](/guides/migration-v4/#update-mui-version).

### Change of the styling engine

The change of the styling engine, allowed us to unlock the improvement of the DX for the customization of the components, and the performance of the dynamic styles.
We replaced [JSS](https://cssinjs.org/) with [emotion](https://emotion.sh/) as a default styled engine.
If you prefer [styled-components](https://styled-components.com/), see the next version of how you can use it instead of emotion.

We recommend migration your `makeStyles` customization by using the new customization APIs: `styled` or the `sx` prop.
However, if you still wish to use the `makeStyles` API, you can:

- add `@mui/styles` as a dependency and change the imports of the `makeStyles`/`withStyles` utilities
- use [`tss-react`](https://github.com/garronej/tss-react) - it has API is similar to JSS makeStyles but works with emotion

You can find more information for this on the [Migrate from JSS](/guides/migration-v4/#migrate-from-jss) section of the migration guide.

### Installation

To use the `v5` version of MUI.

> 💡 If you want to use MUI v5 with **styled-components** instead of emotion, check out [the installation guide](/getting-started/installation/#npm)

```sh
npm install @mui/material @emotion/react @emotion/styled

// or with `yarn`
yarn add @mui/material @emotion/react @emotion/styled
```

**Optional** if your project includes `@mui/icons-material` and/or `@mui/lab`, use the `v5` version of them.

```sh
npm install @mui/icons-material @mui/lab

// or with `yarn`
yarn add @mui/icons-material @mui/lab
```

### Changes to the supported platforms

This breaking change is an opportunity to drop the support of legacy upstream dependencies.

- We have updated the minimum supported TypeScript version from 3.2 to **3.5**.
  This aims to match the policy of [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), with versions of TypeScript that are less than two years old.
- We have updated the minimum supported node.js version from 8.0 to **12.17**.
  This aims to match the [LTS versions that are in maintenance](https://github.com/nodejs/Release#release-schedule) mode.
- We have updated the minimum supported React version from 16.8 to **17.0**.
  The breaking changes released between the two versions are [very limited](https://reactjs.org/blog/2020/10/20/react-v17.html).
- We have updated the supported browsers.
  - IE: **partial**. We have kept the logic added in the past to support IE 11,
    however, we have stopped actively working on it. We can't guarantee that it works correctly. It's discontinued.
  - Edge: from 14 to **91**. The minimum version based on Chromium.
  - Firefox: from 52 to **78**.
  - Chrome: from 49 to **90**. We have [assumed](https://developers.google.com/search/blog/2019/05/the-new-evergreen-googlebot) that Googlebot is always using the latest version of Chrome.
  - Safari: from 10 to **12.5**

These changes have allowed us to save [6 kB gzipped](https://github.com/mui-org/material-ui/pull/22814#issuecomment-700995216) on the `@mui/material` package.

## Design kits

## What's next?

- Start covering the growth of v4, and its inertia, https://material-ui.com/blog/2020-q3-update/
- These efforts are sustainable, echos back to https://material-ui.com/blog/material-ui-v4-is-out/#premium-themes-store-%E2%9C%A8

### A public roadmap

It's new, link core and x roadmaps.

### Core

#### Unstyled components and hooks

We still have a lot of work to do to have a great set of unstyled components.
You can keep track of our progress in [#27170](https://github.com/mui-org/material-ui/issues/27170).

Our high-level plan is to use the unstyled components and hooks as the basis of the Material components and second design system.
We are aiming to complete this work with the next major release (v6).
As of now, you can evaluate the unstyled primitives in the `@mui/base` package, or check out the next implementation of the Material Design components in the `@mui/material-next` package (targeted at v6).
Please note that both packages are in an alpha state so that we can release breaking changes –
we want to take the opportunity to create the best APIs we possibly can.

You can help us shape these new packages by taking part in discussions.
There are [RFCs](https://github.com/mui-org/material-ui/issues?q=is%3Aopen+label%3Adiscussion+%5BRFC%5D) waiting for responses.
Don't hesitate to let us know what you think!

#### Joy

### Second design system

We have started the [discussion](https://github.com/mui-org/material-ui/discussions/27803) about the direction of this product which we aim to grow beyond material design.

This new design system, codename `Joy`, will be built on top of our strong foundation packages (`unstyled` and `system`) to provide better DX eg. built-in CSS variables generated from theme, perfect dark mode API, etc.

The plan is to release a set of components in each milestone (ordered by most browse) until it has the same amount of components as `@mui/material`, so that the developers only have to pick a package between material-design and Joy based on the design they want to get started with. Most functionalities and APIs of components will be the same because both design systems are built on top of `@mui/core`. The differences will be the theme structure that we want to achieve the right amount of flexibility and great design out of the box.

We will keep you posted about the progress, stay tuned.

### X

- Data grid

## Thank you

Finally, one last thank you to everyone who's contributed to MUI v5.
The whole team is very excited about this release! It's just the beginning.
We will keep working hard to deliver the best possible React UI components while making it accessible to the many.
