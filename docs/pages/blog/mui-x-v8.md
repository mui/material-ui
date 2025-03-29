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

We are excited to announce the stable release of [MUI X v8.0.0](https://github.com/mui/mui-x/releases/tag/v8.0.0)—packed with many new features, native ESM support alongside Material UI v7, and an improved license management experience.

:::warning
**MUI X v8 natively supports ESM** along Material UI v7. But because of that, the support for Material UI v5 and v6 don't come out-of-the-box.

Read more on: [Support for Material UI](#support-for-material-ui)
:::

## Table of Contents

- [Data Grid](#data-grid)
  - [Pivoting](#pivoting)
  - [AI Assistant – Featuring LLMs on the Data Grid](#ai-assistant-featuring-llms-on-the-data-grid)
  - [New Toolbar](#new-toolbar)
  - [Design Agnostic Core](#design-agnostic-core)
  - [New No Columns Overlay](#new-no-columns-overlay)
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
  - [Automatic selection propagation](#automatic-selection-propagation)
  - [Lazy loading child nodes](#lazy-loading-child-nodes)
  - [New Customization Hook](#new-customization-hook)
- [Charts](#charts)
  - [Refined Design and Interaction](#refined-design-and-interaction)
  - [Funnel Charts](#funnel-charts)
  - [Radar Charts](#radar-charts)
  - [Server-Side Rendering for Charts](#server-side-rendering-for-charts)
- [Enhanced License Management and Telemetry](#enhanced-license-management-and-telemetry)
- [Priority Support – A New Support Service](#priority-support-a-new-support-service)
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

### Ask Your Table - Featuring AI Assistance on the Data Grid

After a period of test with users and pilot customers, we're excited to introduce our new AI Assistant for the Data Grid: [Ask Your Table](/x/react-data-grid/ask-your-table/).

Now your users can interact with data using natural language queries and extract data insights quickly as ever.

For example, if you’re working with an Olympics medal dataset, you can simply ask, “Who won the most gold medals this century?” and the Data Grid will automatically apply the right filters, groupings, and aggregations to display your answer—all that while keeping your dataset private.

<figure>
  <img width="2084" height="928" alt="An example use case showcasing the answer to the question with the correct sorting, filters and grouping" src="/static/blog/mui-x-v8/ask-your-table.png" loading="lazy">
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
  <img width="100%" alt="The new toolbar's design" src="/static/blog/mui-x-v8/new-toolbar.png" loading="lazy">
  <figcaption>The new toolbar's design</figcaption>
</figure>

This new developer experience, based on composition, may feel different from our previous approach—but it sets a new standard. We’ll soon extend this enhanced experience to other key subcomponents, such as the filter panel and columns management panel, ensuring a cohesive and powerful toolkit for advanced customization.

Dive into our new docs section: [Sub-Components Composition](/x/react-data-grid/components/usage/)

### Design Agnostic Core

We understand how customization is important to you. So with the ultimate goal to be absolutely customizable, we're taking the first step to decouple Material UI from the Data Grid Core, opening the possibility to use the Data Grid with any design system—and it’s just the beginning. On the next steps, we'll work to provide the best experience for you to build a full featured data grid that fits all your design requirements.

### No-Columns Overlay

We’ve added a no-columns overlay to serve as a clear fallback when the Data Grid has no columns to show.

Learn more about overlays on [overlay's docs](/x/react-data-grid/overlays/).

### Data Source on the Community Plan

Great news—the Data Source is now part of the community plan!

We're unifying our approach to handling server-side data across all plans, creating a single, cohesive framework.

Explore your options in our [Data Source Docs](/x/react-data-grid/data-source/).

### Server-Side Aggregation and Lazy Loading

The Data Source now supports advanced features such as server-side aggregation, and on-demand data fetching for infinite scrolling, and lazy loading.

Explore all your options when handling [Server-Side Data](/x/react-data-grid/server-side-data/).

### List View

We’ve promoted List View to stable, and over this major we’re committed to enhancing this feature even further—making it easier to deliver a robust Data Grid experience on small screens.

<figure>
  <video autoplay muted loop playsinline width="690" height="417" controls>
    <source src="/static/blog/mui-x-v8/list-view.mp4" type="video/mp4">
  </video>
  <figcaption>Two different views to match the capabilities of multiple displays</figcaption>
</figure>

Learn more about [List View](/x/react-data-grid/list-view/).

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

You can learn about it on [docs](/x/react-date-pickers/time-range-picker/).

### Clear `ownerState` for slots

We've refined our slot system by clearing the `ownerState` before passing props to slot components. This ensures that only the necessary properties are forwarded—resulting in a cleaner API, reduced prop clutter, and enhanced performance. By isolating internal state from presentation layers, you gain more predictable styling and greater control when customizing components.

### Accessible DOM Structure

The Accessible DOM Structure is now the default for our field components. The new structure ensures screen readers can correctly work with the fields

### Keyboard Editing on Mobile Pickers

We’ve introduced keyboard editing support for mobile pickers. Users can now seamlessly input and adjust date and time values directly via on-screen keyboards, providing a more accessible and efficient experience.

<figure>
  <img width="606" height="300" alt="Mobile picker with keyboard input" src="/static/blog/mui-x-v8/mobile-picker-keyboard.png" loading="lazy">
  <figcaption>Mobile picker with keyboard input</figcaption>
</figure>

## Tree View

### Automatic selection propagation

The Rich Tree View now supports parent/child selection propagation. This means you can select a parent and automatically select all your children, and vice-versa depending on your requirements and configuration.

```js
type TreeViewSelectionPropagation = {
  descendants?: boolean; // default: false
  parents?: boolean; // default: false
};
```

You can learn about this and other selection features on [Selection docs](/x/react-tree-view/rich-tree-view/selection/).

### Lazy loading child nodes

We’ve enhanced the Rich Tree View with a robust lazy loading mechanism for children. Now, child nodes are loaded on demand—reducing initial load times and improving performance when working with extensive hierarchical data. This approach ensures a smoother user experience and also minimizes unnecessary network overhead.

<figure>
  <video autoplay muted loop playsinline width="690" height="417" controls>
    <source src="/static/blog/mui-x-v8/tree-view-lazy-loading.mp4" type="video/mp4">
  </video>
  <figcaption>lazy loading of children on selection</figcaption>
</figure>

Learn how to add [lazy loading](/x/react-tree-view/rich-tree-view/lazy-loading/) to your application's Tree View.

### New Customization Hook

We’ve officially transitioned to a new developer experience for customizing TreeItems for the Rich Tree View. With our new customization hook, you can freely compose your TreeItem while still leveraging all the out-of-the-box features of the RichTreeView. This provides unparalleled flexibility to tailor your tree components to your project’s unique requirements.

```js
const CustomTreeItemComponent = React.forwardRef(function CustomTreeItemComponent(
  { id, itemId, label, disabled, children }: TreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const treeItemData = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  return (
    <TreeItemProvider {...treeItemData.getContextProviderProps()}>
      <TreeItemRoot {...treeItemData.getRootProps()}>
        <TreeItemContent {...treeItemData.getContentProps()}>
          <TreeItemLabel {...treeItemData.getLabelProps()} />
        </TreeItemContent>
        {children && <TreeItemGroupTransition {...treeItemData.getGroupTransitionProps()} />}
      </TreeItemRoot>
    </TreeItemProvider>
  );
}
```

Learn more this and other options on [Tree Item Customization docs](/x/react-tree-view/tree-item-customization/).

## Charts

### Funnel Charts

We have expanded our chart portfolio with the addition of Funnel Charts, providing a new way to visualize data conversions and drop-offs.

<figure>
  <img width="606" height="300" alt="Funnel charts examples" src="/static/blog/mui-x-v8/funnel-charts.png" loading="lazy">
  <figcaption>Funnel charts examples</figcaption>
</figure>

### Radar Charts

Similarly, our Radar Charts offer a dynamic way to display multivariate data, enhancing your users data analysis capabilities.

<figure>
  <img width="606" height="300" alt="Radar charts examples" src="/static/blog/mui-x-v8/radar-charts.png" loading="lazy">
  <figcaption>Radar charts examples</figcaption>
</figure>

### Server-Side Rendering for Charts

You can now leverage server-side rendering (SSR) for charts to improve initial load performance and SEO.
SSR is supported under two conditions:

- **Dimensions:** You must provide explicit `width` and `height` props, as the SVG dimensions cannot be computed on the server.
- **Animations:** Animations must be disabled using the `skipAnimation` prop; otherwise, the chart may render in an empty state on the initial render.

### Refined Design and Interaction

Charts in MUI X v8 have been improved with a focus on clarity and interactivity.

<figure>
  <img width="606" height="300" alt="Charts redesigned - before/after" src="/static/blog/mui-x-v8/charts-before-after.png" loading="lazy">
  <figcaption>Charts redesigned before/after</figcaption>
</figure>

### HTML Legend for Charts

We’ve re-engineered the charts legend so that it’s now rendered as a native HTML element. This change gives you more control over its styling and behavior, making it easier to integrate with your design system.

### Charts Composition

We've restructured our charts composition by dividing responsibilities between two dedicated components: `<ChartDataProvider />` and `<ChartsSurface />`. The `<ChartDataProvider />` now focuses solely on managing and processing your chart data, while `<ChartsSurface />` is dedicated to rendering the visual aspects. This clear separation enhances customization, improves performance, and offers a more flexible integration with your application.

Learn more in our [Charts Composition Documentation](/x/react-charts/composition/).

## Enhanced License Management and Telemetry

Managing your license has never been easier. Our redesigned [account page](https://mui.com/store/account/) on the store allows you to view your license keys, update number of seats, renew, upgrade and more, with minimal effort.

<figure>
  <img width="606" height="300" alt="Radar charts examples" src="/static/blog/mui-x-v8/accounts-page.png" loading="lazy">
  <figcaption>Accounts Page</figcaption>
</figure>

In addition, we’ve integrated telemetry into our system to continuously enhance your experience with our products. Using this same infrastructure, you'll soon be able to manage your license without changing your key—thanks to server-side license validation.

Telemetry is released as an opt-in feature. We recommend enabling it by adding the following code to your project, close to your license validation:

```js
import { muiXTelemetrySettings } from '@mui/x-license';

muiXTelemetrySettings.enableTelemetry();
```

You can find more details in our [telemetry guide](/x/guides/telemetry/).

## Priority Support – A New Support Service

A few months ago, we launched Priority Support with a few customers, and now we’re excited to invite more users to take advantage of this service.

Priority Support offers fast, dedicated assistance with guaranteed response times, ensuring that technical issues on both MUI X and MUI Core are addressed swiftly and efficiently.

For full details on the benefits and service levels of Priority Support, please see our [Support SLA](https://mui.com/legal/technical-support-sla/).

If you’re interested in upgrading to Priority Support, don’t hesitate to [contact our sales team](mailto:sales@mui.com) for more information or purchase it directly through your account page.

## Support for Material UI

When planning this major release, our goal was to support the last two major versions of Material UI. However, we faced a tough choice: continue supporting older versions (v5 and v6) or fully embrace the innovations of **Material UI v7**. With native ESM support, improved package management, and seamless integration with modern bundlers like Vite and webpack, v7 represents the future of Material UI. Supporting both wasn’t feasible, so we chose to move forward.

As a result, **MUI X v8 now supports Material UI v7 natively**, ensuring your applications benefit from the latest improvements. We understand that change can be challenging, but migrating to v7 has been designed to be as smooth as possible—with comprehensive migration guides and GitHub support to assist you every step of the way.

## Migration Guide

We have built a migration guide for Material UI and one for each of the advanced components. They detail every breaking change from previous versions with the recommended approach to fix them, ensuring that you can transition smoothly without the least amount of hassle. We care about an smooth migration, and that's been a priority for us when planning our new major versions.

Please follow the instructions in our [migration guide](/x/migration/).

## Long-Term Support

We're now moving **MUI X v7 to Long-Term support**, while support for **MUI X v6 is discountinued**. In addition to critical bug fixes and security updates, v7 will continue to receive some bug fixes as a safe net for your your transition for Material UI v7.

You can check our [supported versions in our docs](/x/introduction/support/#supported-versions).

Once you’ve migrated to MUI X v8, you’ll benefit from the latest features and performance enhancements, with no disruptive breaking changes until the next major release.

## What’s Next

Our roadmap for MUI X remains ambitious. In the coming months, we’ll continue delivering significant improvements and feature enhancements, including:

- **Charts and Data Grid integration**: Deeper interoperability for cohesive data visualization.
- **Further improvements in the DX of the new Design Agnostic Data Grid**: We’ll continue iterating on the unstyled core to deliver a seamless and customizable experience across diverse design ecosystems.
- **Further customization based on Composition**: Expanding our composable architecture for even more flexible customization.
- **Increased leverage of AI**: Harnessing advanced AI to unlock new insights and streamline data analysis.
- **Design and usability improvements**: Continuous refinements to enhance the overall user experience.
- **Continue improvements on Server-Side integration**: Ongoing improvements for robust performance and scalability.

## How to Get Involved

Your input is vital to our continuous improvement. We invite you to:

- **Share Your Feedback:** Let us know how these new features work for you and what you’d like to see next.
- **Report Issues & Suggest Features:** Our [GitHub repository](https://github.com/mui/mui-x) is the perfect place to contribute.
- **Join Our Community:** Participate in user interviews and help steer the roadmap for future releases.
