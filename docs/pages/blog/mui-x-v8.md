---
title: Introducing MUI X v8
description: Read all about the new release of the advanced components and other important steps forward with this new major.
date: 2025-03-31T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: false
---

<div style="max-width: 692px; width: 100%; height: 230px; overflow: hidden; margin-bottom: 16px;">
  <a href="https://github.com/mui/mui-x/releases/tag/v8.0.0">
    <img src="/static/blog/mui-x-v8/intro.jpg" alt="MUI X v8 - major stable release" width="2400" height="800" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" />
  </a>
</div>

We are excited to announce the stable release of **MUI X v8.0.0**—packed with many new features, native ESM support alongside Material UI v7, and an improved license management experience.

:::warning
MUI X v8 no longer supports Material UI v5 and v6 out of the box. Instead, we’ve chosen to fully embrace the future by supporting **Material UI v7 natively**.  
Read more on: [Support for Material UI](#support-for-material-ui)
:::

## Table of Contents

- [Data Grid](#data-grid)
  - [Pivoting](#pivoting)
  - [New Toolbar](#new-toolbar)
  - [Ask Your Table – Featuring AI on the Data Grid](#ask-your-table--featuring-ai-on-the-data-grid)
  - [New Columns Overlay](#new-columns-overlay)
  - [Data Source on the Community Plan](#data-source-on-the-community-plan)
  - [Server-Side Aggregation and Lazy Loading](#server-side-aggregation-and-lazy-loading)
  - [List View](#list-view)
  - [Performance Improvements](#performance-improvements)
- [Date and Time Pickers](#date-and-time-pickers)
  - [Time Range Picker](#time-range-picker)
  - [Auto Switch Strategy](#auto-switch-strategy)
  - [Clear `ownerState` for slots](#clear-ownerstate-for-slots)
  - [Accessible DOM Structure](#accessible-dom-structure)
  - [Keyboard Editing on Mobile Pickers](#keyboard-editing-on-mobile-pickers)
- [Tree View](#tree-view)
  - [Enhanced Selection & Lazy Loading](#enhanced-selection--lazy-loading)
  - [New Customization Hook](#new-customization-hook)
- [Charts](#charts)
  - [Refined Design and Interaction](#refined-design-and-interaction)
  - [Funnel Charts](#funnel-charts)
  - [Radar Charts](#radar-charts)
  - [Server-Side Rendering for Charts](#server-side-rendering-for-charts)
- [New Account Page & License Management](#new-account-page--license-management)
- [Support for Material UI](#support-for-material-ui)
- [Migration](#migration)
- [Long-Term Support](#long-term-support)
- [What's next](#whats-next)
- [How to Get Involved](#how-to-get-involved)

## Data Grid

### Pivoting

The wait is over! With pivoting, your users can easily restructure and summarize large datasets: group related data, calculate aggregates (such as sums, averages, and counts), and compare different data categories side by side. This flexibility enables faster insight discovery and more efficient data analysis.

The feature is available out-of-the-box, but you can also create a pre-configured setup depending on your user requirements.

<figure>
  <video autoplay muted loop playsinline width="690" height="417" controls>
    <source src="/static/blog/mui-x-v8/pivoting.mp4" type="video/mp4">
  </video>
  <figcaption>A common pivoting use case</figcaption>
</figure>

Learn how to use pivoting [now](/x/react-data-grid/pivoting/).

### AI Assistant - Featuring LLMs on the Data Grid

After extensive period of test with users and pilot customers, we're excited to introduce the new AI Assistant for the Data Grid. Now your users can interact with data using natural language queries and extract data insights quickly as ever.

For example, if you’re working with an Olympics medal dataset, you can simply ask, “Who won the most gold medals this century?” and the Data Grid will automatically apply the right filters, groupings, and aggregations to display your answer—all that while keeping your dataset private.

<figure>
  <img style="width: 303px;" width="606" height="900" alt="An example use case showcasing the answer to the question with the correct sorting, filters and grouping" src="/static/blog/mui-x-v8/ask-your-table.png" loading="lazy">
  <figcaption>An answer from the Data Grid</figcaption>
</figure>

**Feature's key Benefits:**

- **Enhanced usability**: Simplify interactions with data by asking questions in plain language.
- **Unlock the full potential of the Data Grid**: Explore, combine, and discover powerful data analysis features often hidden behind menus, without the tedious hopping from one menu to another.
- **Data privacy:** No need to share your dataset—the service model only requires your column definitions and a few data samples.

Interested in bringing this feature to your users? [Contact us](mailto:sales@mui.com) to get access to your API Key!

### New Toolbar

The [redesigned toolbar](/x/react-data-grid/components/toolbar/) not only looks fantastic but also empowers developers one step further through an open composition of sub-components, allowing you to tailor the toolbar's layout precisely to your application's needs.

<figure>
  <img style="width: 303px;" width="606" height="900" alt="The new toolbar's design" src="/static/blog/mui-x-v8/new-toolbar.png" loading="lazy">
  <figcaption>The new toolbar's design</figcaption>
</figure>

This new developer experience, based on composition, may feel different from our previous approach—but it sets a new standard. We’ll soon extend this enhanced experience to other key subcomponents, such as the filter panel and columns management panel, ensuring a cohesive and powerful toolkit for advanced customization.

Dive into our new docs section: [Sub-Components Composition](/x/react-data-grid/components/usage/)

### Design Agnostic Core

We understand how customization is important to you. So with the ultimate goal to be absolutely customizable, we're taking the first step to decouple Material UI from the Data Grid Core, opening the possibility to use the Data Grid with any design system—and it’s just the beginning. On the next steps, we'll work to provide the best experience for you to build a full featured data grid that fits all your design requirements.

Try now the [design agnostic data grid package](/x/react-data-grid/components/usage/)!

### New No-Columns Overlay

We’ve redesigned the no-columns overlay to provide a cleaner, more intuitive interface. 

Learn more about the new columns overlay in the [overlay's docs](/x/react-data-grid/overlays/#no-columns-overlay).

### Data Source on the Community Plan

Great news—the Data Source is now part of the community plan! This means you can start leveraging its capabilities from day one without any additional cost.

Explore your options with our [Data Source Docs](/x/react-data-grid/data-source/).

### Server-Side Aggregation and Lazy Loading

Our new Data Source allows you to fetch rows on demand and seamlessly update them using infinite scrolling and lazy loading, all while supporting robust server-side aggregation. This approach lets you process vast datasets efficiently and display real-time aggregated results.

Checkout all your options with [Server-Side Data and Our Data Source](/x/react-data-grid/server-side-data/).

### List View

We’ve promoted List View to stable, and we’ll continue to add features to enhance its experience—making it easier to bring the Data Grid to small screens.

<figure>
  <video autoplay muted loop playsinline width="690" height="417" controls>
    <source src="/static/blog/mui-x-v8/list-view.mp4" type="video/mp4">
  </video>
  <figcaption>Two different views to match the capabilities of multiple displays</figcaption>
</figure>

Learn more about List View in our [List View Docs](/x/react-data-grid/list-view/).

### Performance Improvements

We’ve made significant performance enhancements across the board—from smoother scrolling and faster Excel export to improved mount/resize and aggregation performance.

## Date and Time Pickers

### Time Range Picker

It's finally here! The highly anticipated Time Range Picker component is designed for a straightforward and efficient experience, perfect for scheduling applications and detailed period inputs.

<figure>
  <video autoplay muted loop playsinline width="690" height="417" controls>
    <source src="/static/blog/mui-x-v8/time-range-picker.mp4" type="video/mp4">
  </video>
  <figcaption>Time Range Picker example</figcaption>
</figure>

Get started with the [Time Range Picker](/x/react-date-pickers/time-range-picker/).

### New view-switching Strategy

We’ve removed the automatic view-switching in the date time and time range pickers to deliver a more consistent and user-friendly experience. Now, you can easily customize the input flow behavior to better suit your application's needs.

You can know more on how to leverage the new actions on [docs](/x/react-date-pickers/time-range-picker/).

### Clear `ownerState` for slots

We've refined our slot system by clearing the `ownerState` before passing props to slot components. This ensures that only the necessary properties are forwarded—resulting in a cleaner API, reduced prop clutter, and enhanced performance. By isolating internal state from presentation layers, you gain more predictable styling and greater control when customizing components.

### Accessible DOM Structure

The Accessible DOM Structure is now the default for our field components. With this updated structure, screen readers benefit from a more intuitive interface, enhancing usability for all users.

### Keyboard Editing on Mobile Pickers

We’ve introduced keyboard editing support for mobile pickers. Users can now seamlessly input and adjust date and time values directly via on-screen keyboards, providing a more accessible and efficient experience.

<figure>
  <img style="width: 303px;" width="606" height="900" alt="Mobile picker with keyboard input" src="/static/blog/mui-x-v8/mobile-picker-keyboard.png" loading="lazy">
  <figcaption>Mobile picker with keyboard input</figcaption>
</figure>

## Tree View

### Automatic selection propagation
The Tree View component now supports improved parent/child selection propagation. This means you can select a parent and automatically select all your children, and vice-versa depending on your requirements.

### Children Lazy Loading
We’ve enhanced the Tree View with a robust lazy loading mechanism for child nodes. Now, child nodes are loaded on demand—only when needed—reducing initial load times and improving performance when working with extensive hierarchical data. This approach not only ensures a smoother user experience but also minimizes unnecessary network and rendering overhead.

### New Customization Hook
We’ve officially transitioned to a new developer experience for customizing TreeItems. With our new customization hook, you can freely compose your TreeItem while still leveraging all the out-of-the-box features of the RichTreeView. This provides unparalleled flexibility to tailor your tree components to your project’s unique requirements.

```js
example here
```

## Charts

### Funnel Charts

We have expanded our chart portfolio with the addition of Funnel Charts, providing a new way to visualize data conversions and drop-offs.

<figure>
  <img style="width: 303px;" width="606" height="900" alt="Funnel charts examples" src="/static/blog/mui-x-v8/funnel-charts.png" loading="lazy">
  <figcaption>Funnel charts examples</figcaption>
</figure>

### Radar Charts

Similarly, our Radar Charts offer a dynamic way to display multivariate data, enhancing your data analysis capabilities.

<figure>
  <img style="width: 303px;" width="606" height="900" alt="Radar charts examples" src="/static/blog/mui-x-v8/radar-charts.png" loading="lazy">
  <figcaption>Radar charts examples</figcaption>
</figure>

### Server-Side Rendering for Charts

In certain scenarios, you can now leverage server-side rendering for charts to improve initial load performance and SEO.

### Refined Design and Interaction

Charts in MUI X v8 have been improved with a focus on clarity and interactivity. Refined pallete and improved responsiveness make it easier than ever to bring your data stories to life.

### HTML Legend for Charts

We’ve re-engineered the charts legend so that it’s now rendered as a native HTML element. This change gives you more control over its styling and behavior, making it easier to integrate with your design system.

### Charts Composition

We've restructured our charts composition by dividing responsibilities between two dedicated components: `<ChartDataProvider />` and `<ChartsSurface />`. The `<ChartDataProvider />` now focuses solely on managing and processing your chart data, while `<ChartsSurface />` is dedicated to rendering the visual aspects. This clear separation enhances customization, improves performance, and offers a more flexible integration with your application.

Learn more in our [Charts Composition Documentation](/x/react-charts/composition/).

## New Account Page & License Management

Managing your license has never been easier. Our redesigned account page on mui.com/store streamlines the entire process, allowing you to view, update, and manage your licenses with minimal effort. In addition, we’ve integrated telemetry to continuously enhance your experience—and soon, you’ll be able to manage your license without changing the key by leveraging server-side authentication.

Telemetry is released as an opt-in feature. We recommend enabling it by adding the following code to your project:

```js
enable like this
```

## Support for Material UI

In making the leap to MUI X v8, we faced a critical choice: continue supporting older Material UI versions (v5 and v6) or fully embrace the enhancements offered by **Material UI v7**.  
Material UI v7 brings native support for ESM imports, improved package management, and better integration with modern bundlers like Vite and webpack. As a result, **MUI X v8 now supports Material UI v7 natively**, ensuring that your applications benefit from these modern improvements.  
We understand that change can be challenging, but migrating to Material UI v7 is designed to be as painless as possible in modern environments. Our migration guides and support channels are here to help you transition smoothly.

## Migration Guide

Upgrading to v8 is simple with our comprehensive migration guides. They detail every change from previous versions, ensuring that you can transition smoothly without any hassle.  
*For detailed instructions, please refer to our [migration guide](https://next.mui.com/x/introduction/).*

## Long-Term Support

MUI X v7 is now officially moved to Long-Term support, while support for MUI X v6 is discountinued. v7 will continue to receive critical bug fixes and security updates as safe net for your your transition for Material UI v7. Once you’ve migrated to v8, you’ll benefit from the latest features and performance enhancements, with no disruptive breaking changes until the next major release.

## What’s Next

Our roadmap for MUI X remains ambitious. In the coming months, we’ll continue delivering significant improvements and feature enhancements, including:
- **Charts and Data Grid integration**: Deeper interoperability for cohesive data visualization.
- **Further customization based on Composition**: Expanding our composable architecture for even more flexible customization.
- **Increased leverage of AI**: Harnessing advanced AI to unlock new insights and streamline data analysis.
- **Design and usability improvements**: Continuous refinements to enhance the overall user experience.
- **Continue improvements on Server-Side integration**: Ongoing improvements for robust performance and scalability.

## How to Get Involved

Your input is vital to our continuous improvement. We invite you to:

- **Share Your Feedback:** Let us know how these new features work for you and what you’d like to see next.
- **Report Issues & Suggest Features:** Our [GitHub repository](https://github.com/mui/mui-x) is the perfect place to contribute.
- **Join Our Community:** Participate in user interviews and help steer the roadmap for future releases.

