---
title: Material UI v6 and beyond
description: What are the most exciting changes coming in Material UI v6? Read all about it here!
date: 2023-12-19T00:00:00.000Z
authors: ['mnajdova']
tags: ['MUI Core', 'News']
---

## Material UI v6 and beyond

As we approach the end of 2023, we are busy with planning our main focus areas for the upcoming year.
We're currently engaged in various exciting projects, and this blog post will be your go-to source for the key updates set to enhance the Material UI library.

One of the significant changes on our agenda for the upcoming year involves transitioning to our zero-runtime CSS-in-JS library.
The decision to move away from Emotion primarily stems from two factors: ensuring compatibility with React Server Components and enhancing runtime performance.
Another noteworthy change on the horizon is design-related, as we are set to upgrade our components to use Material You, the latest iteration of Google's Material Design system.

Taking into consideration the lessons learned from the v4 to v5 migration, during which numerous unrelated breaking changes were introduced, making the migration process complex, we have chosen a different approach this time.
We have opted for a more gradual update strategy by dividing the upcoming year's changes into two separate releases:

- v6, which is planned to go stable in Q2 2024, with primary focus on implementing changes to the styling engine.
  The plan is to transition all components to utilize the new zero-runtime CSS-in-JS library.
  Simultaneously, we aim to provide flexibility for a more gradual upgrade by allowing users to incrementally remove Emotion from their projects.
  Althoug we kept the smooth tranisition in mind when designing the API, we anticipate some adjustments in style definitions.
  This is the key reason behind our decision to enable both styling engines to coexist.
  Initial performance tests conducted on a few components indicate promising improvements ranging from 15 to 20%.
- v7 on the other hand, will have a focus centered around enhancing the design of the library.
  The pivotal change entails updating the design systems accompanied by several other design improvements that we have grouped together for a more streamlined upgrade experience centered on design improvements.
  The groundwork for this initiative has already commenced, and you can track the progress on this [issue](https://github.com/mui/material-ui/issues/29345).
  The tentative release date for this version is set for Q4 2024.

We trust that you share in our enthusiasm for the forthcoming changes.
Wishing you a wonderful holiday season and a Happy New Year!
