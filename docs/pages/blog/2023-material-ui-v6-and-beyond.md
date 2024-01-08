---
title: The road to Material UI v6 and beyond
description: We're tightening up the Material UI release schedule and shipping two major versions in 2024. Here's what to expect.
date: 2023-12-23T00:00:00.000Z
authors: ['mnajdova']
card: true
tags: ['MUI Core', 'News']
---

As we approach the end of 2023, we've had our heads down working on some very exciting projects for the future of Material UI in the next year.
We reevaluated our major versioning strategy and concluded that we need to ship smaller releases more frequently.
Read on to learn why, and find out more about our plans for v6 _and_ v7 of Material UI in 2024.

<img alt="A summary about the major changes coming in Material UI v6 and v7" src="/static/blog/2023-material-ui-v6-and-beyond/post-header.jpg" width="1200" height="600" loading="lazy" />

## Two major releases

One of the biggest lessons we learned during the v4 to v5 cycle is that smaller major releases with fewer breaking changes are the way to go.
Many developers expressed how frustrating it was to migrate to v5 when it shipped in late 2021, and we can definitely empathize!
We want to make sure that never happens again.
That means you can expect more gradual updates spread out across two major releases in 2024.
Here's what we're planning for each:

### Material UI v6

With the stable version planned for Q2 of 2024, the primary focus of Material UI v6 is releasing a new [zero-runtime CSS-in-JS styling engine](https://github.com/mui/material-ui/issues/38137), which will pave the way for compatibility with React Server Components and add significant performance improvements.
We're building it so that the upgrade will be opt-in, which means you won't need to commit to it immediately.

As a taste of the performance upgrade, here are some early Lighthouse metrics with a couple of primary components running on an M1 Max MacBook Pro with 32 GB of RAM:

| Total Blocking Time (TBT)      | Emotion | Zero-runtime |
| :----------------------------- | ------: | -----------: |
| Case #1: 1,000 Buttons         |    10ms |          0ms |
| Case #2: 1,000 Outlined Inputs |   250ms |          0ms |

### Material UI v7

Material UI v7 is where you can expect to see native support for [Material 3](https://m3.material.io/), Google's latest Material Design update, as well as many other design improvements across the component suite.
It's tentatively planned for Q4 of 2024.

<img alt="Side-to-side comparison of a Card component using Material Design 2 and 3, respectively." src="/static/blog/2023-material-ui-v6-and-beyond/m2-m3.jpg" width="1200" height="600" loading="lazy" />

The development for this version is already in progress, though!
See which components already support the Material 3 specs, through the experimental `@mui/material-next` package, by visiting the newly released [All Components page](/material-ui/all-components/).

```diff
-import Button from '@mui/material/Button';
+import Button from '@mui/material-next/Button';
```

## From design to development

In addition to the updates to the React library, we've also been working on a long-requested Figma plug-in to help bridge the gap between designers and developers using Material UI.
We're getting super close to a first release, which is custom-tailored to work nicely with the [Material UI Design Kits](/material-ui/getting-started/design-resources/).

<img alt="A screenshot of Figma together with the MUI Connect plug-in running on the side, doing customziations to the Material UI Switch component." src="/static/blog/2023-material-ui-v6-and-beyond/connect.jpg" width="1200" height="600" loading="lazy" />

We're calling it MUI Connect, and it generates a theme file with all the customizations done on Figma.
You'll be able to export it and paste it into your codebase, as well as visualize it in a Storybook instance.
Stay tuned for a beta version release early next year!

## A sharper focus

To pull these releases off, the Core team's attention will be fully focused on Material UI for most of 2024.
In the meantime we're putting Joy UI development on hold, so don't expect any new features or components.
Nevertheless, we do have some big ideas for Joy UI!
Expect to hear more about that towards the end of Q2 '24.

## Follow along and contribute

We've consolidated the v6 changes in [this GitHub issue](https://github.com/mui/material-ui/issues/30660)—please feel free to chime in and participate in the discussions!
You can also always check the [public Material UI GitHub project](https://github.com/mui/material-ui/projects/26) to see the planned releases and their respective umbrella issues.

We hope you're as excited as we are about these changes!
Have a wonderful holiday season and a Happy New Year! 🎉
