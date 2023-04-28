---
title: 'Our docs just got a major upgrade—here's what that means for you'
description: Each of MUI's products now has its own dedicated documentation, making it easier than ever to find exactly what you need.
date: 2022-04-06T00:00:00.000Z
authors: ['danilo-leal']
tags: ['News', 'Product']
card: true
---

As MUI continues to grow beyond our flagship product, Material UI (we [rebranded the company](/blog/material-ui-is-now-mui/) last year as a first step), it has become clear that the documentation for our products can no longer all live under one roof.

That's why we're excited to announce that we are shipping a major upgrade to our documentation, to make it easier than ever to find exactly what you need—no matter which MUI products you're working with.

## Wait… what MUI products are you talking about?

We currently offer two main product lines:

- **MUI Core**—a collection of foundational component libraries, including:
  - _Material UI_ —components that implement Google's Material Design
  - _Base UI_ —unstyled components for implementing your own design system
  - _MUI System_ —CSS utilities for quickly laying out design systems
- **MUI X**—a collection of advanced components for complex use cases, including:
  - _Data grid_ —fast, feature-rich, extendable React data table
  - _Date and Time pickers_ —interface control components for selecting dates and times

## What has changed?

All MUI products still live under the [mui.com](https://mui.com) domain, but each of them now has its own respective URL and documentation.
We added an identifier and menu to the upper-left corner of the docs for improved navigation:

<img src="/static/blog/docs-restructure-2022/docs-separation.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Screenshot of the product identifier menu" />

As for the URLs, this is how they look now:

- MUI Core:
  - Material UI: [https://mui.com/material-ui/](https://mui.com/material-ui/getting-started/overview/)
  - Base UI: [https://mui.com/base/](https://mui.com/base/getting-started/overview/)
  - MUI System: [https://mui.com/system/](https://mui.com/system/getting-started/overview/)
- MUI X:
  - Data grid: [https://mui.com/x/react-data-grid/](https://mui.com/x/react-data-grid/)
  - Date and Time pickers: [https://mui.com/x/react-date-pickers/](https://mui.com/x/react-date-pickers/getting-started/)

> 📖 The date and time pickers have been promoted from the lab (`@mui/lab`) to MUI X—still available under the MIT license. To learn more, check out the [blog post about the newest MUI X components](/blog/lab-date-pickers-to-mui-x/).

### Improved search experience

The documentation restructuring ranks search results based on the product that you are currently looking at.
For example, if you are looking at Material UI documentation, when you press <kbd><kbd class="key">⌘</kbd>+<kbd class="key">K</kbd></kbd> (or <kbd><kbd class="key">Ctrl</kbd>+<kbd class="key">K</kbd></kbd> on Windows) and type a keyword, you will find that most of the results are related to Material UI.

We have also added product labels for Material UI and Base UI in case it's unclear which library the search results refer to.

<img src="/static/blog/docs-restructure-2022/docs-product-label.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Screenshot of the search results displaying product labels per result" />

As a side benefit of the documentation restructuring, we have seen a huge improvement in the quality of search results related to MUI X. Data Grid users can now see comprehensive results when searching for features. Previously a search for pagination returned results for the Material UI pagination component, followed by those for the data grid:

<img src="/static/blog/docs-restructure-2022/docs-search-before.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Screenshot of search results for pagination before the documentation restructuring, returning at first results for the Material UI pagination component followed by those for the data grid" />

Now when viewing the MUI X section, only results related to the data grid pagination feature are returned:

<img src="/static/blog/docs-restructure-2022/docs-search-after.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Screenshot of search results for pagination after the documentation restructuring. Now when viewing the MUI X section, only results related to the data grid pagination feature are returned." />

## Moving forward

This separation will become increasingly beneficial as each product grows, such as additional components in MUI X and Base UI.

As we move forward working on [our second design system package](https://deploy-preview-30686--material-ui.netlify.app/experiments/), the separation will make it possible for us to build the documentation for each system using its default styles—so the docs themselves will serve as examples of their corresponding component libraries.

If you have any feedback or suggestions, we definitely want to hear from you.
Please open an issue in the [mui/material-ui repository on GitHub](https://github.com/mui/material-ui/issues), and be sure to start the **Title** with [docs].

Happy developing! 👩‍💻
