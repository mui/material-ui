---
title: Introducing MUI X v8
description: Read all about the new release of the advanced components and other important steps forward with this new major.
date: 2025-03-31T08:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: true
---

<div style="max-width: 692px; width: 100%; height: 230px; overflow: hidden; margin-bottom: 16px;">
  <a href="https://github.com/mui/mui-x/releases/tag/v8.0.0">
    <img src="/static/blog/mui-x-v8/intro.png" alt="MUI X v8 - major stable release" width="2400" height="800" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" />
  </a>
</div>

We are excited to announce the stable release of [MUI X v8.0.0](https://github.com/mui/mui-x/releases/tag/v8.0.0)—packed with many new features, native ESM support alongside Material UI v7, and an improved license management experience.

:::warning
MUI X v8 features native ESM support for a seamless integration with Material UI v7.
As a result, extra configuration is necessary to continue working with Material UI v5 and v6, which use CJS.

Learn more in the [support for Material UI](#support-for-material-ui) section below.
:::

## Table of contents

- [Data Grid](#data-grid)
  - [Pivoting](#pivoting)[<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
  - [AI Assistant – Featuring LLMs on the Data Grid](#ai-assistant-featuring-llms-on-the-data-grid)[<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')
  - [List View](#list-view)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Server-Side Aggregation and Lazy Loading](#server-side-aggregation-and-lazy-loading)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Data Source on the Community Plan](#data-source-on-the-community-plan)
  - [New Toolbar](#new-toolbar)
  - [Design Agnostic Core](#design-agnostic-core)
  - [New No Columns Overlay](#new-no-columns-overlay)
  - [Performance Improvements](#performance-improvements)
- [Date and Time Pickers](#date-and-time-pickers)
  - [Time Range Picker](#time-range-picker)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Auto Switch Strategy](#auto-switch-strategy)
  - [Clear `ownerState` for slots](#clear-ownerstate-for-slots)
  - [Accessible DOM Structure](#accessible-dom-structure)
  - [Keyboard Editing on Mobile Pickers](#keyboard-editing-on-mobile-pickers)
- [Tree View](#tree-view)
  - [Lazy loading child nodes](#lazy-loading-child-nodes) [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Automatic selection propagation](#automatic-selection-propagation)
  - [New Customization Hook](#new-customization-hook)
- [Charts](#charts)
  - [Funnel Charts](#funnel-charts)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [Radar Charts](#radar-charts)
  - [Server-Side Rendering for Charts](#server-side-rendering-for-charts)
  - [Refined Design and Interaction](#refined-design-and-interaction)
  - [HTML Legend for Charts](#html-legend-for-charts)
  - [Charts Composition](#charts-composition)
- [Enhanced License Management and Telemetry](#enhanced-license-management-and-telemetry)
- [Priority Support – A New Support Service](#priority-support-a-new-support-service)
- [Support for Material UI](#support-for-material-ui)
- [Migration](#migration)
- [Long-Term Support](#long-term-support)
- [What's next](#whats-next)
- [How to Get Involved](#how-to-get-involved)

## Data Grid

### Pivoting [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

The wait is over! With pivoting, your users can easily restructure and summarize large datasets: group related data, calculate aggregates (such as sums, averages, and counts), and compare different data categories side by side. This flexibility enables faster insight discovery and more efficient data analysis.

This feature is available right out of the box, but you can also create a preconfigured setup to tailor it to your user requirements.

<figure>
  <video autoplay muted loop playsinline width="1046" height="720" controls>
    <source src="/static/blog/mui-x-v8/pivoting.mp4" type="video/mp4">
  </video>
  <figcaption>A common pivoting use case</figcaption>
</figure>

Check out the [Data Grid pivoting](/x/react-data-grid/pivoting/) documentation to learn more.

### Ask Your Table - AI assistance in the Data Grid [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

After a testing period with users and pilot customers, we're excited to introduce our new AI Assistant for the Data Grid: [Ask Your Table](/x/react-data-grid/ai-assistant/).

Now your users can interact with data using natural language queries and extract data insights faster than ever.

For example, if you’re working with an Olympics medal dataset, you can simply ask, “Who won the most gold medals this century?” and the Data Grid will automatically apply the right filters, groupings, and aggregations to display your answer—all while keeping your dataset private.

<figure>
  <img width="2084" height="928" alt="An example use case showcasing the answer to the question with the correct sorting, filters and grouping" src="/static/blog/mui-x-v8/ask-your-table.png" loading="lazy">
  <figcaption>An answer from the Data Grid</figcaption>
</figure>

**Key benefits:**

- **Enhanced usability**: Simplify interactions with data by asking questions in plain language.
- **Unlock the full potential of the Data Grid**: Explore, combine, and discover powerful data analysis features often hidden behind menus, without having to hop from one menu to another.
- **Data privacy:** No need to share your dataset—the service model only requires your column definitions and a few data samples.

Interested in bringing this feature to your users? [Contact us](mailto:sales@mui.com) to get your API Key!

### List View [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

We’ve promoted List View to stable, and over this major we’re committed to enhancing this feature even further—making it easier to deliver a robust Data Grid experience on small screens.

<figure>
  <img width="512" height="768" alt="An example of a Data Grid's list view on a phone" src="/static/blog/mui-x-v8/list-view.png" loading="lazy">
  <figcaption>An example of a Data Grid's list view on a phone</figcaption>
</figure>

Learn more about [List View](/x/react-data-grid/list-view/).

### Row Spanning

Row spanning has also been promoted to stable, providing a reliable and flexible solution for merging cells across multiple rows. This enhancement makes it easier to create complex, multi-row layouts within your Data Grid, allowing you to present your data more effectively.

Learn how to set up and use [row spanning](/x/react-data-grid/row-spanning/).

### Server-Side Aggregation and Lazy Loading [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

The Data Source now supports advanced features such as server-side aggregation, on-demand data fetching for infinite scrolling, and lazy loading.

Explore all your options when handling [server-side data](/x/react-data-grid/server-side-data/).

### Data Source on the Community Plan

Great news—the Data Source is now part of the community plan!

We're unifying our approach to handling server-side data across all plans, creating a single, cohesive framework.

Explore your options in our [data source docs](/x/react-data-grid/data-source/).

### New Toolbar

The [redesigned toolbar](/x/react-data-grid/components/toolbar/) not only looks fantastic but also empowers developers one step further through an open composition of sub-components, allowing you to tailor the toolbar's layout precisely to your application's needs.

<figure>
  <img width="100%" alt="The new toolbar's design" src="/static/blog/mui-x-v8/new-toolbar.png" loading="lazy">
  <figcaption>The new toolbar's design</figcaption>
</figure>

This new developer experience, based on composition, may feel different from our previous approach—but it sets a new standard. We’ll soon extend this enhanced experience to other key subcomponents, such as the filter panel and columns management panel, ensuring a cohesive and powerful toolkit for advanced customization.

Dive into our new docs section on [component usage](/x/react-data-grid/components/usage/).

### Design Agnostic Core

We understand customization is important to you. So with the ultimate goal of being fully customizable, we're taking the first step to decouple Material UI from the Data Grid Core, opening the possibility to use the Data Grid with any design system—and this is just the beginning. 

Next up, we'll work to provide the best experience for you to build a full-feature Data Grid that fits all your design requirements.

### No-Columns Overlay

We’ve added a no-columns overlay to serve as a clear fallback when the Data Grid has no columns to show.

Learn more in the [overlay documentation](/x/react-data-grid/overlays/).

### Performance Improvements

We’ve made significant performance enhancements across the board—from smoother scrolling and faster Excel export to improved mount/resize and aggregation performance.

## Date and Time Pickers

### Time Range Picker [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

It's finally here! The highly anticipated Time Range Picker component is designed for a straightforward and efficient experience, perfect for scheduling applications and detailed period inputs.

<figure>
  <video autoplay muted loop playsinline width="477" height="538" controls>
    <source src="/static/blog/mui-x-v8/time-range-picker.mp4" type="video/mp4">
  </video>
  <figcaption>Time Range Picker example</figcaption>
</figure>

Get started with the [Time Range Picker](/x/react-date-pickers/time-range-picker/).

### New view-switching Strategy

We’ve removed the automatic view-switching in the Date Time and Time Range Pickers to deliver a more consistent and user-friendly experience. 

Now, you can easily customize the input flow behavior to better suit your application's needs.

Learn more in the [Time Range Picker docs](/x/react-date-pickers/time-range-picker/).

### Clear `ownerState` for slots

We've refined our slot system by clearing the `ownerState` before passing props to slot components. This ensures that only the necessary properties are forwarded—resulting in a cleaner API, reduced prop clutter, and enhanced performance. By isolating internal state from presentation layers, you gain more predictable styling and greater control when customizing components.

### Accessible DOM Structure

The Accessible DOM Structure is now the default for our field components. The new structure ensures screen readers can correctly work with the fields.

### Keyboard Editing on Mobile Pickers

We’ve introduced keyboard editing support for mobile pickers. Users can now seamlessly input and adjust date and time values directly via on-screen keyboards, providing a more accessible and efficient experience.

<figure>
  <img width="375" alt="Mobile picker with keyboard input" src="/static/blog/mui-x-v8/mobile-picker-keyboard.jpg" loading="lazy">
  <figcaption>Mobile picker with keyboard input</figcaption>
</figure>

## Tree View

### Lazy loading child nodes [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

We’ve enhanced the Rich Tree View with a robust lazy loading mechanism for children. Now, child nodes are loaded on demand—reducing initial load times and improving performance when working with extensive hierarchical data. This approach ensures a smoother user experience and also minimizes unnecessary network overhead.

<figure>
  <video autoplay muted loop playsinline width="360" controls>
    <source src="/static/blog/mui-x-v8/tree-view-lazy-loading.mp4" type="video/mp4">
  </video>
  <figcaption>Lazy loading of children on selection</figcaption>
</figure>

Learn how to add [lazy loading](/x/react-tree-view/rich-tree-view/lazy-loading/) to your application's Tree View.

### Performance improvements in re-rendering

We’ve optimized the Tree View to update only the components that need changes, rather than re-rendering all child nodes.
With the use of selectors to precisely target nodes for re-rendering, we’ve achieved a significant performance boost.
In upcoming releases, we’ll make another big step with the introduction of virtualization.

### Automatic selection propagation

The Rich Tree View now supports parent/child selection propagation. This means you can select a parent and automatically select all of its children, and vice versa—depending on your requirements and configuration.

<figure>
  <video autoplay muted loop playsinline width="250" controls>
    <source alt="Automatic selection of children"  src="/static/blog/mui-x-v8/tree-view-automatic-selection.mp4" type="video/mp4">
  </video>
  <figcaption>Automatic selection of children</figcaption>
</figure>

```js
type TreeViewSelectionPropagation = {
  descendants?: boolean; // default: false
  parents?: boolean; // default: false
};
```

You can learn more in the [selection docs](/x/react-tree-view/rich-tree-view/selection/).

### New Customization Hook

We’ve officially transitioned to a new developer experience for customizing Tree Items for the Rich Tree View. With our new customization hook, you can freely compose your Tree Item while still leveraging all the out-of-the-box features of the Rich Tree View. This provides unparalleled flexibility to tailor your tree components to your project’s unique requirements.

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

### Funnel Charts [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

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

Learn more in our [Charts composition documentation](/x/react-charts/composition/).

## Enhanced License Management and Telemetry

Managing your license has never been easier. Our redesigned [account page](https://mui.com/store/account/) in the store allows you to view your license keys, update number of seats, renew, upgrade, and more.

<figure>
  <img width="606" height="434" alt="One of the new screens in your accounts site" src="/static/blog/mui-x-v8/accounts-page.png" loading="lazy">
  <figcaption>One of the new screens in your accounts site</figcaption>
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

Priority Support offers fast, dedicated assistance with guaranteed response times, ensuring that technical issues across MUI's full product suite are addressed swiftly and efficiently.

For full details on the benefits and service levels of Priority Support, please see our [Support SLA](https://mui.com/legal/technical-support-sla/).

If you’re interested in upgrading to Priority Support, don’t hesitate to [contact our sales team](mailto:sales@mui.com) for more information or purchase it directly through your account page.

## Support for Material UI

When planning this major release, our goal was to support the last two major versions of Material UI. However, we faced a tough choice: continue supporting older versions (v5 and v6) out of the box, or fully embrace the step forward with Material UI v7. With improved ESM support and seamless integration with modern bundlers like Vite and webpack, v7 represents the future of Material UI. Supporting both simultaneously wasn’t feasible, so we chose to move forward.

As a result, MUI X v8 now supports Material UI v7 by default. We understand this change could present a challenge, but migrating to v7 has been designed to be as smooth as possible, with comprehensive migration guides and GitHub support to assist you every step of the way.

For users who want to upgrade to MUI X v8 while remaining on an earlier version of Material UI, we've prepared a [guide on usage with Material UI v5 and v6](/x/migration/usage-with-material-ui-v5-v6/).

## Migration Guide

We've published migration guides for Material UI and each of the advanced components. These guides detail every breaking change from previous versions with the recommended approach to fix them. We care deeply about providing a smooth migration, so it's been a top priority for us when planning our new major versions.

Please follow the instructions in our [migration guide](/x/migration/).

## Long-Term Support

We're now moving **MUI X v7 to long-term support**, while support for **MUI X v6 is discontinued**.
In addition to critical bug fixes and security updates, v7 will continue to receive occasional necessary updates as a safety net while you transition to v8.

You can check the [supported versions in our docs](/x/introduction/support/#supported-versions) for more information.

Once you’ve migrated to MUI X v8, you’ll benefit from the latest features and performance enhancements, with no disruptive breaking changes until the next major release.

## What’s Next

Our roadmap for MUI X remains ambitious. In the coming months, we’ll continue delivering significant improvements and feature enhancements, including:

- **Charts and Data Grid integration**: Deeper interoperability for cohesive data visualization.
- **Further improvements in the DX of the new design-agnostic Data Grid**: We’ll continue iterating on the unstyled core to deliver a seamless and customizable experience across diverse design ecosystems.
- **Further customization based on composition**: Expanding our composable architecture for even more flexible customization.
- **Increased leverage of AI**: Harnessing advanced AI to unlock new insights and streamline data analysis.
- **Design and usability improvements**: Continuous refinements to enhance the overall user experience.
- **More improvements to server-side integration**: Ongoing improvements for robust performance and scalability.

## How to Get Involved

Your input is vital to our continuous improvement. We invite you to:

- **Share your feedback:** Let us know how these new features work for you and what you’d like to see next.
- **Report issues and suggest features:** Our [GitHub repository](https://github.com/mui/mui-x) is the perfect place to contribute.
- **Join our community:** Participate in user interviews and help steer the roadmap for future releases.
