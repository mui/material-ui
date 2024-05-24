---
title: 'Introducing Pigment CSS: the next generation of CSS-in-JS'
description: 'Pigment CSS offers significant performance gains along with RSC and App Router support.'
date: 2024-05-16T00:00:00.000Z
authors:
  [
    'samuelsycamore',
    'brijeshb42',
    'siriwatknp',
    'mnajdova',
    'danilo-leal',
    'oliviertassinari',
  ]
tags: ['Pigment CSS', 'Product']
manualCard: true
---

In the era of React Server Components and the Next.js App Router, component libraries like Material UI must make some paradigm-shifting changes to reap the potential performance gains by moving more of the work of rendering UIs from client to server.

Trouble is, the "traditional" CSS-in-JS solutions we rely on aren't able to come along with us because the [React context API](https://react.dev/learn/passing-data-deeply-with-context) only works on the client.
And with nearly 70% of respondents in the [State of CSS 2023 survey](https://2023.stateofcss.com/en-US/css-in-js/) indicating they use styled-components and Emotion, we're looking at a whole lot of React developers with no clear path forward from here.

For a library as widely used as Material UI, the biggest challenge is to stay up-to-date while introducing as few breaking changes as humanly possible, to maintain a consistent and reliable developer experience without asking users to completely change the way they build UI components.

That's where Pigment CSS comes in.

<img src="/static/blog/introducing-pigment-css/card.png" alt="Introducing Pigment CSS: the next generation of CSS-in-JS" width="1280" height="640" />

Pigment CSS is MUI's new in-house styling solution: a zero-runtime CSS-in-JS package that generates colocated styles to their own CSS files at build-time.
With Pigment CSS you get RSC compatibility, _plus_ significant performance improvements when compared with Emotion, the styling engine used in Material UI v5.
And though we're prioritizing the needs of Material UI users in early development and focusing on a smooth migration, Pigment CSS can be used with _any_ React component library you prefer.

## Why Pigment CSS?

### Traditional CSS-in-JS is not enough

Emotion made a lot of sense for Material UI v5 in late 2021, but so much has changed in the React ecosystem since then.
After Next.js offered the first implementation of the React Server Components spec with [the App Router](https://nextjs.org/blog/next-13) towards the end of 2022, it became clear that there was a monumental shift on the horizon.

RSCs unlock a whole new realm of possibilities for React; for us as UI developers, it means we can create components that are fully renderable at build-time so we don't have to pass that burden on to the client at run-time.
But working with RSCs requires us to let go of familiar APIs like `React.useContext`, which in turn becomes a major blocker for using the last generation's style engines like Emotion that rely heavily on this hook for theming.

:::info
To learn more about RSCs, we highly recommend reading [Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/) by Josh Comeau.
:::

### Material UI is a unique use case

Material UI is downloaded millions of times per month and is one of the most rigorously battle-tested UI libraries on the internet, with a GitHub history spanning all the way back to 2014.
It's had to make some massive changes along the way to keep up with the times; most recently, moving from JSS to Emotion from v4 to v5.
While those breaking changes did bring many benefits overall, they unfortunately came with a notoriously painful migration experience.

We learned our lesson!
We can't do that to our users again.

So when it came time to seek out a new way to generate styles, we knew we needed to keep the syntax and authoring experience as similar as possible to Emotion and styled-components—and provide codemods for most of the breaking changes—in order to minimize friction when migrating.

### Other options don't meet our needs

For those of us who are perfectly happy with the patterns we know and love from CSS-in-JS, it feels frustrating to consider abandoning all that muscle memory just to reinvent the wheel yet again.
We like the DX of colocated styles, and we'd rather not bloat the DOM with atomic class names—so Tailwind CSS, StyleX, Panda CSS, and other solutions that have cropped up in recent months just don't match up with our preferences.
Pigment CSS started as a [Linaria](https://linaria.dev/) fork, but we found more of the tools we needed to achieve our goals with [WyW-in-JS](https://wyw-in-js.dev/), the open-source library that also powers Linaria.

## How Pigment CSS works

Pigment CSS is a zero-runtime CSS-in-JS library: This means it doesn't have access to the end user's browser runtime, which would be necessary to generate and insert authored CSS at run-time.
Instead, it does all its processing at build-time to pre-generate the CSS which then becomes part of the output bundle.

It uses WyW-in-JS processor feature which makes it possible to create custom logic that's triggered by the presence of different imports from the library.
The processor looks through the source code for `styled()`, `css()`, and other function calls and extracts the arguments to be evaluated.
These values are then handed back to Pigment CSS for additional parsing and evaluation.

:::info
Check out [How Pigment CSS works](https://github.com/mui/pigment-css/blob/master/HOW_PIGMENT_CSS_WORKS.md) for complete details.
:::

## Benefits of using Pigment CSS

For users of Emotion and styled-components, the benefits of adopting Pigment CSS are clear: your end users get better performance, and you get RSC and App Router compatibility without having to significantly change how you author component styles.

### Better performance

When comparing the same Material UI app built with Next.js and either Emotion or Pigment CSS, we've observed the following page load performance gains:

| Metrics                | Emotion | Pigment CSS | Reduction |
| :--------------------- | ------: | ----------: | --------: |
| First load JavaScript  |   131kB |       104kB |       20% |
| First Contentful Paint |   503ms |       455ms |        9% |
| Time To First Byte     | 447.5ms |     381.5ms |       15% |
| Total Page HTML        |  15.9kB |      14.7kB |      7.5% |

:::info
To learn more about runtime performance improvements, [check out this app](https://pigment-css-demo.vercel.app/perf) that compares Pigment CSS, Emotion, and styled-components across a variety of tests.
:::

### Familiar developer experience

For developers migrating from Emotion or styled-components, you're probably already familiar with the most common patterns employed by Pigment CSS.
`styled()` and `css()` are the two main functions used to define styles, and they mostly work the same as you'd expect them to (with some notable differences due to the nature of build-time CSS-in-JS—see [Coming from Emotion or styled-components](https://github.com/mui/pigment-css/tree/master?tab=readme-ov-file#coming-from-emotion-or-styled-components) for details).

```jsx
import { styled, css } from '@pigment-css/react';

const Title = styled('h1') ({
  fontSize: '2rem';
});

const Container = styled.div`
  border: 1px solid red;

  &:hover {
    border-color: blue;
  }

  ${Title} {
    margin-bottom: 2.5rem;
  }
`;

export default function Modal() {
  return (
    <Container>
      <Title>Hello</Title>
      <p className={css({ color: 'pink' })}>World</p>
    </Container>
  );
}
```

We've also ported over [the `sx` prop](/system/getting-started/the-sx-prop/) from MUI System, so you can still define styles directly in a given component, but now it's much more performant than before.
And in Pigment CSS, we've extended support for `sx` to include _all_ DOM nodes—not just Material UI components—so you don't need to wrap a simple `<div>` or `<span>` with a Box component to apply theme styles to it.

```jsx
<section sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
  <h1 sx={{ fontSize: '2rem', fontWeight: 700, mb: 1 }}>
    Introducing Pigment CSS: the next generation of CSS-in-JS
  </h1>
  <p sx={{ color: 'text.primary', fontWeight: 500 }}>
    Pigment CSS offers significant performance gains along with RSC
  </p>
</section>
```

### Future-proof solution

Though we're still quite early in the RSC era, it seems inevitable that the React ecosystem as a whole will converge on this new paradigm over time.
Next.js gave us our first glimpse with the App Router; RedwoodJS [recently released their own implementation](https://redwoodjs.com/blog/rsc-now-in-redwoodjs); and many other frameworks and meta-frameworks (like Remix) are currently working out [POCs and RFCs](https://github.com/remix-run/remix/discussions/8048) to catch up.
Regardless of how quickly Server Components catch on among developers, it's clear that library maintainers must now support [the two Reacts](https://overreacted.io/the-two-reacts/) (client-side and server-side) to stay relevant into the future.

Pigment CSS, then, is yet another bet from MUI on the longevity and sustainability of the React ecosystem—and a promise that we'll continue to innovate in this space for years to come.

And perhaps most importantly: because Pigment CSS is maintained by the same folks behind Material UI, we'll have a lot more control over how the tool evolves over time to continue to meet our users' needs.
In a perfect world, this would be the last time you'd ever have to migrate your Material UI app to a new style engine.
We'll do our best to make that a reality. 🤞

## What's next

Pigment CSS is currently in the early alpha stage of development—the plan is to have a fully featured version ready to release alongside Material UI v6 later this year.
When that happens, you'll have the choice to opt in to Pigment CSS incrementally after upgrading to v6, giving you all the time you need to migrate on your own terms.

That said, Pigment CSS is available now for experimentation, and we'd love for you to give it a try and let us know what you think—your feedback at this stage could have a major impact on the final product.

## Get started with Pigment CSS

Head to the [Pigment CSS repository](https://github.com/mui/pigment-css/) to learn how to set it up and start tinkering.
Please feel free to [open a new issue](https://github.com/mui/pigment-css/issues) if you encounter any bugs or frustrations along the way.
And while you're there, why not ⭐️ star the repository ⭐️ to let us know you're excited and help spread the word to others? 😁
