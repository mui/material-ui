---
title: Meet Joy UI－a new starting point to your design system
description: Wip description.
date: 2022-05-12T00:00:00.000Z
authors: ['danilo-leal', 'siriwatknp']
tags: ['News']
card: true
---

**work in progress**

If you're a close follower of everything MUI, you might be aware that we've been working on a new design system product. If not, we're writing this piece to give you a first look at Joy－MUI's new starting point for your design system!

## How this is relevant to you?

You might intuitively associate MUI with Material UI, which despite the indeed potentially confusing names, are separate entities. Material UI is MUI's React implementation of Google's Material Design and over the years has established itself as a go-to library for quickly breathing life into products, mostly due to the number of components you get out of the box. However, the components do come with that default 2014 Google look and feel that a good portion of you grew to dislike. And, as we've reconfirmed with our latest developer survey, the design aspect of UI libraries is one of the most important ones whenever evaluating which to go for.

So, if you ever considered going with Material UI because of the thought through developer experience, reliability, and completeness but ended up hesitating because of the design, this is great news for you. Joy is meant to offer you all of that with a simpler and more modern look and feel.

## Why not just build a different theme?

One of the things we're optimizing for with this new product is to break away from Material Design. A different theme would still require you and your team to have at least some sense of how Material Design is structured and how that is expressed into Material UI in order to reach a fresher look. We wanted to provide an alternative to that. With Joy, we want you to be able to start, by default, with a fresher design.

Additionally, we had many ideas for improving the experience of developing design systems and a separate package is an opportunity to prototype and test some of these new features without running the risk of potentially making any mistakes and causing inconveniences to hundreds of teams that use Material UI today.

Material UI and Joy UI will definitely share most of the conventions, features, and overall philosophy. This will not only decrease the learning curve for any of you who are willing to try but also because we think of the two containing our take on the ideal developer experience for developing design systems. So, if at any time, Joy UI has something that Material UI doesn't, the catch-up will at some point happen, and the same goes for the other way around.

## What are the new things we're introducing in Joy UI?

Aside from a fresher look and feel for your upcoming project, here are a few features we're planning for the alpha version of Joy UI:

### Global variants

Instead of defining variants at the component level, Joy defines variants at the global level. This sounds bold at first, but the more we experiment the more it starts to make sense. Global variants mostly affect three CSS properties: color, background, and border. What this means is that you'll be able to toggle between the same set of variants in any component, allowing for easier consistency across your app. The four variants are text, outlined, soft, and solid.

### Component integration

tbw

### Perfect dark mode for server-side rendering

tbw

### Unlimited color schemes

Joy will not only allow for simple toggling between dark and light mode but also provide the right tooling so you can provide your users with multiple color scheme
options. Within each mode, you'll be able to have as many as you want－powered by CSS variables.

## When will I be able to use it?

A significant part of the core infrastructure for Joy has been made and we've been working in these last couple of months on adding more and more structural components. Once we get to a reasonable amount, and with considerable documentation in place, we plan to release an alpha version, which most likely will happen somewhere around the second semester of 2022.

However! We have developed a couple of mock UIs that showcase what Joy looks like by default. These are meant not only for that but to allow you to play around with it a little bit. Get access to them by visiting their CodeSandbox link and just experiment with Joy UI for yourself.
