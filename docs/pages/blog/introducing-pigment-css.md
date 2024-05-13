---
title: 'Introducing Pigment CSS: the next generaton of CSS-in-JS for Material UI'
description: 'TK'
date: 2024-05-14T00:00:00.000Z
authors: ['samuelsycamore']
tags: ['Pigment CSS']
card: false
---

In the era of React Server Components and the Next.js App Router, component libraries like Material UI must make some paradigm-shifting changes to the way they operate to support the latest patterns and reap the potential gains in performance.
Trouble is, the "traditional" CSS-in-JS solutions we rely on, like Emotion and styled-components—collectively favored by nearly half of the React ecosystem—aren't able to come along with us.

For a library as widely used as Material UI, the biggest challenge to keeping up with the times is to do so while introducing as few breaking changes as humanly possible, to maintain a consistent and reliable developer experience without asking users to completely change the way they build UI components.

That's where Pigment CSS comes in.

Pigment CSS is MUI's new in-house styling solution: a zero-runtime CSS-in-JS package that generates colocated styles to their own CSS files at build time.
With Pigment CSS you get the latest and greatest advancements in CSS along with RSC compatibility, _plus_ significant performance improvements when compared with Emotion in Material UI v5.
And though it's specially tailored to meet the needs of Material UI users, Pigment CSS can be used with _any_ React component library you prefer.

## Why Pigment CSS?

### Traditional CSS-in-JS is not enough

Emotion made a lot of sense for Material UI v5 in late 2021, but so much has changed in the React ecosystem since then.
In early 2023 React introduced Server Components, and Next.js offered the first implementation of the new spec with the App Router shortly thereafter.

RSCs unlock a whole new realm of possibilities for React; for us as UI developers, it means we can create components that are fully rendered at build time so we don't have to pass that burden on to the client at runtime.
But working with RSCs requires us to let go of familiar APIs like `useContext`, which in turn becomes a major blocker for using the last generation's style engines like Emotion that rely heavily on this hook for theming.

:::info
To learn more about RSCs, we highly recommend reading [Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/) by Josh Comeau.
:::

### Material UI is a unique use case

Material UI is downloaded millions of times per month and is one of the most rigorously battle-tested UI libraries on the internet, with a GitHub history spanning all the way back to 2014.
It's had to make some massive changes along the way to keep up with the times; most recently, migrating from JSS to Emotion from v4 to v5.
While those breaking changes did bring many benefits overall, they unfortunately came with a notoriously painful migration experience.

We learned our lesson!
We can't do that to our users again.

So when it came time to seek out a new way to generate styles, we knew we needed to keep the composition and syntax as similar as possible to Emotion and styled-components, to minimize friction when migrating.

### Other options don't meet our needs

For those of us who are perfectly happy with the patterns we know and love in CSS-in-JS, it feels frustrating to consider abandoning all that muscle memory just to reinvent the wheel yet again.
We like the DX of colocated styles, and we'd rather not bloat the DOM with atomic class names—so Tailwind CSS, StyleX, Panda CSS, and other solutions that have cropped up in recent months just don't match up with our preferences.

## How Pigment CSS works

Pigment CSS is a zero-runtime CSS-in-JS library: This means it doesn't have access to the end user's browser runtime, which would be necessary to generate and insert authored CSS at runtime.
Instead, it does all its processing at build time to pre-generate the CSS which then becomes part of the output bundle.

Pigment CSS is built on top of the [WyW-in-JS](https://wyw-in-js.dev/) library that also powers [Linaria](https://linaria.dev/).
It features a [processor](https://wyw-in-js.dev/how-to/custom-tagged-template#creating-a-processor) which makes it possible to create custom logic that's triggered by the presence of different imports from the library.
The processor looks through the source code for `styled()`, `css()`, and other function calls and extracts the arguments to be evaluated.
These values are then handed back to Pigment CSS for additional parsing and evaluation.

:::info
Check out [How Pigment CSS works](https://github.com/mui/pigment-css/blob/master/HOW_PIGMENT_CSS_WORKS.md) for complete details.
:::

## Benefits of using Pigment CSS

For Material UI users, the benefits of adopting Pigment CSS\* are clear: your users get better performance, and you get RSC and App Router compatibility without having to significantly change how you author component styles.

_\*These benefits extend to other component libraries beyond Material UI as well, but that's our focus for the sections that follow._
_We intend for Pigment CSS to be a viable solution for the React ecosystem as a whole, but you can understand why we're prioritizing Material UI during early development._

### Better performance

Benchmarks - compare Pigment to Emotion and others

### Familiar developer experience

Use code snippets to show how similar it is to Emotion in terms of DX

### Future-proof solution

Elaborate on the idea that Material UI is keeping up with the latest and greatest React features, AND that Pigment is not exclusively for use with Material UI.

## Get started with Pigment CSS

Conclude by telling users where to go and what to do to get started. Link to Next.js and Vite starters. Invite users to star the repo and open issues.
