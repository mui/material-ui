---
title: First look at Joy UI 🥳
description: A sneak peek at MUI's new starting point for your design system.
date: 2022-06-01T00:00:00.000Z
authors: ['danilo-leal', 'siriwatknp']
tags: ['News', 'MUI Core']
card: true
---

<img src="/static/blog/first-look-at-joy/card.png" style="width: 796px; margin-bottom: 24px;" alt="First look at Joy UI: a new starting point for your design system." />

If you're a close follower of everything MUI, you might be aware that we've been working on a new design system product.
If not, we're writing this piece to give you a first look at Joy－MUI's new starting point for your design system!

If you ever considered going with Material UI because of the thought through developer experience, reliability, and completeness but ended up hesitating because of the design, this is great news for you. Joy UI is meant to offer you all of that with a modern look and feel, ease of customization, and lower overhead by not carrying unused Material Design specific code and styling.

## Why work on it?

You might intuitively associate MUI with Material UI, which despite the indeed potentially confusing names, are separate things.
Material UI is MUI's React implementation of Google's Material Design.

Over the years Material UI has established itself as the go-to library for quickly breathing life into products, mostly thanks to its design, customizability, and documentation.
However, the components do come with the default 2018 Google look and feel that is no longer as popular as it was.
And, as we've reconfirmed with [our latest developer survey](/blog/2021-developer-survey-results/#what-are-your-most-important-criteria-for-choosing-a-ui-library/), the design aspect of UI libraries is one of the most important ones whenever evaluating which to choose.

## Why not just build a different theme?

One of the main objectives with this new product is to break away from Material Design.
A different theme would still require you and your team to have at least some sense of how Material Design is structured, and how that is expressed in Material UI. We wanted to provide an alternative to that. With Joy, we want you to be able to start with a fresh design by default.

We also had many ideas for improving the experience of developing design systems, so a separate package is an opportunity to prototype and test some of these new features without running the risk of compromising the experience of the thousands of teams that use Material UI today.

Material UI and Joy UI will still share many conventions and features.
This will not only decrease the learning curve for adopting Joy, but also because we think of them both representing the ideal developer experience for developing design systems.
So if at any time Joy UI has a feature that Material UI doesn't, it will catch-up at some point, and vice versa.

## What are the new things we're introducing in Joy UI?

Aside from a fresher look and feel for your upcoming project, here are a few features we're planning for the alpha version of Joy UI:

### Global variants

Instead of defining variants at the component level, Joy UI defines variants at the global level.
This sounds bold at first, but the more we experiment the more it starts to make sense.
[Global variants](/joy-ui/core-features/global-variant/) mostly affect three CSS properties: color, background, and border.

What this means is that you'll be able to switch between the same set of variants in any component, more easily maintaining consistency across your app.
The four variants available in the components are `plain`, `outlined`, `soft`, and `solid`.

<img src="/static/blog/first-look-at-joy/global-variants.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Screenshot of button component using all available variants." />

```jsx
<Button variant="solid">
<Button variant="soft">
<Button variant="outlined">
<Button variant="plain">
```

### Component integration

We put considerable effort into constructing the CSS variables for each component such that they can be seamlessly composed with the least customization.
One good example is the input component, where the border radius of the input's children automatically adapts to that of the input.
These small details mean the components adapt to different scenarios, which saves considerable time by avoiding manual adjustments.

<!-- Add an image that represent the UI of the code -->

```jsx
<Input
  placeholder="password"
  endDecorator={<IconButton size="sm"><Visibility /></IconButton>}
/>

<Input
  size="lg"
  placeholder="password"
  endDecorator={<IconButton><Visibility /></IconButton>}
  sx={{ '--Input-radius': '24px' }}
/>
```

Joy UI doesn't sacrifice the customization experience in order to have these automatic adjustments.
You're still able to override the style completely via the usual CSS overrides, or even adjust the predefined CSS variables with the `sx` prop.

### Perfect dark mode, for server-side rendering

Joy UI provides a simple and effective way to prevent UI flicker when users refresh or re-enter the page when dark mode is enabled.
What's more, it takes care of the synchronization between browser tabs with a single line of code, which allows developers to configure attributes and settings as required.

### Unlimited color schemes

Joy UI not only allows for simple toggling between dark and light mode but also provide the right tooling so you can provide your users with multiple color schemes.
Within each mode, you'll be able to have as many as you want－powered by CSS variables.

## When will I be able to use it?

A significant part of the core infrastructure for Joy UI has already been developed, and we've been working for the last couple of months on adding more and more components.
The package is already [available at npm](https://www.npmjs.com/package/@mui/joy) but until we get to a reasonable number of components, and with sufficient documentation, it remains as _initial_ work in progress.

It should, though, be ready for more mature experimentation and testing most likely dureing the second half of 2022.
Meanwhile, we've developed a couple of templates that showcase what Joy looks like out of the box, and to allow you to explore it further.
Follow the templates' CodeSandbox or live demo links to experiment with Joy UI for yourself.

:::info
👉 They are also available on the docs [Templates page](/joy-ui/getting-started/templates/).
:::

### Email

<img src="/static/blog/first-look-at-joy/email.png" style="width: 796px; margin-top: 8px; margin-bottom: 16px;" alt="Screenshot of an email mock up application built with Joy UI" />

- [Live demo](/joy-ui/getting-started/templates/email/)
- [CodeSandbox](https://codesandbox.io/s/8gtttr?file=/App.tsx)

### File management

<img src="/static/blog/first-look-at-joy/files.png" style="width: 796px; margin-top: 8px; margin-bottom: 16px;" alt="Screenshot of file management mock up application built with Joy UI" />

- [Live demo](/joy-ui/getting-started/templates/files/)
- [CodeSandbox](https://codesandbox.io/s/ro2b1t?file=/App.tsx)

### Team management

<img src="/static/blog/first-look-at-joy/people.png" style="width: 796px; margin-top: 8px; margin-bottom: 16px;" alt="Screenshot of a team management mock up application built with Joy UI" />

- [Live demo](/joy-ui/getting-started/templates/team/)
- [CodeSandbox](https://codesandbox.io/s/dclgbp?file=/App.tsx)

We hope you'll get as excited as we are.
Joy UI is just getting started－stay tuned for more news about it in the near future!

Happy developing! 👩‍💻
