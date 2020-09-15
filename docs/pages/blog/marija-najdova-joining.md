---
title: Marija Najdova joins Material-UI
description: We are excited to share that Marija Najdova has joined Material-UI. She has started this week full-time and is now part of the community team.
date: 2020-09-15T00:00:00.000Z
authors: ['oliviertassinari']
---

We are excited to share that [Marija Najdova](https://twitter.com/marijanajdova) has joined Material-UI. She has started this week full-time and is now part of the community team.

Before joining, Marija was working on the React implementation of [Fluent UI](https://www.microsoft.com/design/fluent/) at Microsoft since 2018. She's passionate about React, design systems, and Component driven development. At Microsoft, as part of the Fluent UI core team, she was responsible for the icons, animations and various theme related features.

I have been impressed by the dedication Marija puts into her work. She has made important changes happened even before starting, during her free time! For instance, she has recently introduced a new structure of the theme object to [add custom variants](https://next.material-ui.com/customization/components/#adding-new-component-variants) for v5:

```jsx
const theme = createMuiTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed grey${blue[500]}`,
          },
        },
      ],
    },
  },
});
```

She is now actively working on the unstyled components and [the update of the style engine](https://github.com/mui-org/material-ui/issues/22342). These are two items I have been eager to push forward since the release of v1 but that requires so much focused time that I could never do it while handling the hundreds of GitHub notifications the project receives every week.

We couldn’t be more excited to have her on the team!

You can follow Marija on [Twitter](https://twitter.com/marijanajdova) to see her progress. The community team will continue developing the foundations to build great design systems on top of, like Material Design. A quick view at [the community roadmap](https://github.com/mui-org/material-ui/projects/25).
