---
title: 'Introducing Pigment CSS: the next generaton of CSS-in-JS'
description: 'TK'
date: 2024-05-14T00:00:00.000Z
authors: ['samuelsycamore']
tags: ['Pigment CSS']
card: false
---

In the era of React Server Components and the Next.js App Router, component libraries like Material UI must make some paradigm-shifting changes to the way they operate to support the latest patterns and reap the potential gains in performance.

And thanks to recent advancements in CSS (like CSS variables and `color-mix()`), "traditional" CSS-in-JS solutions that process styles at runtime are no longer required for unlocking features like color transformations and theme variables which are necessary for maintaining a sophisticated design system.

For a library as widely used as Material UI, the biggest challenge to keeping up with the times is to do so while introducing as few breaking changes as humanly possible, to maintain a consistent and reliable developer experience without asking users to completely change the way they build components.

That's where Pigment CSS comes in.

Pigment CSS is MUI's new in-house styling solution: a zero-runtime CSS-in-JS package that generates colocated styles to their own CSS files at build time.
With Pigment CSS you get the latest and greatest advancements in CSS along with RSC compatibility, _plus_ significant performance improvements when compared with Emotion in Material UI v5.
And though it's specially tailored to meet the needs of Material UI users, it's important to note that Pigment CSS can be used with _any_ React component library you prefer.

## What are React Server Components?

Briefly explain what RSCs are and why old CSS-in-JS solutions don't work with them.

## Why Pigment CSS?

Explain the shortcomings of Emotion/styled-components

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
