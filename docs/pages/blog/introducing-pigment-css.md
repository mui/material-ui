---
title: 'Introducing Pigment CSS: the next generaton of CSS-in-JS'
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

### Other options don't meet our needs

For those of us who are perfectly happy with the patterns we know and love in CSS-in-JS, it feels frustrating to consider abandoning all that muscle memory just to reinvent the wheel yet again.
We like the DX of colocated styles, and we'd rather not bloat the DOM with atomic class names—so Tailwind CSS, StyleX, Panda CSS, and other solutions that have cropped up in recent months just don't match up with our preferences.

### Material UI is a unique use case

Material UI is downloaded millions of times per month and is one of the most rigorously battle-tested UI libraries on the internet, with a GitHub history spanning all the way back to 2014.
It's had to make some massive changes along the way to keep up with the times; most recently, migrating from JSS to Emotion from v4 to v5.
While those breaking changes did bring many benefits overall, they unfortunately came with a notoriously painful migration experience.

We learned our lesson!
We can't do that to our users again.

So when it came time to seek out a new way to generate styles, we knew we needed to keep the composition and syntax as similar as possible to Emotion and styled-components, to minimize friction when migrating.

## How Pigment CSS works

Show how Pigment CSS solves the problem outlined above. Explain how it works in 2-3 paragraphs with a few code snippets. Can derive this text from the doc on this topic.

## Benefits of using Pigment CSS

### Better performance

Benchmarks - compare Pigment to Emotion and others

### Familiar developer experience

Use code snippets to show how similar it is to Emotion in terms of DX

### Future-proof solution

Elaborate on the idea that Material UI is keeping up with the latest and greatest React features, AND that Pigment is not exclusively for use with Material UI.

## Get started with Pigment CSS

Conclude by telling users where to go and what to do to get started. Link to Next.js and Vite starters. Invite users to star the repo and open issues.
