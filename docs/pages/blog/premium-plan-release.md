---
title: Premium passengers, please proceed to the boarding gate 🚀
description: Introducing the MUI X Premium plan, and a new licensing model.
date: 2022-05-12T00:00:00.000Z
authors: ['josefreitas', 'alexfauquette']
tags: ['MUI X', 'Product']
manualCard: true
---

We're happy to announce that the Premium plan is [finally out](https://mui.com/pricing/)!
With it, MUI X officially steps up to the next level, supporting more advanced data grid use cases.

<img src="/static/blog/premium-plan-release/card.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Promotional image of MUI X Premium plan release showcasing Data Grid's new features (such as Download data as an Excel file) and Date Range Picker" />

You can use the new Premium features to provide your end users with the most sophisticated tools necessary to navigate and interpret massive amounts of data.

## The new features

### Row grouping

[Row grouping](https://mui.com/x/react-data-grid/row-grouping/) lets users group data based on repeating values in the grid.
For example, users can now group orders by buyers, movies by directors, or cities by the governing parties.

These kinds of use cases would usually be dealt with using a new query on the database—which might require a new service end-point, and maybe even a new front-end, along with all the UX challenges this would entail.
Now this functionality is available to your users with a single click.

<video autoplay muted loop playsinline controls>
  <source src="/static/blog/premium-plan-release/row-grouping-example.mp4" type="video/mp4" />
</video>

<p class="blog-description">The feature in action, from the docs page.</p>

Users are encouraged to explore the data and create combinations with multiple grouping criteria,
and are then able to export these new views to Excel, with the next Premium feature: Excel export.

:::info
With the Premium release, we have made Row grouping available for production use in the `@mui/x-data-grid-premium` package.

This feature was previously available [as a preview](https://mui.com/blog/introducing-the-row-grouping-feature/#how-to-unlock-this-feature) for Pro users intending to migrate to the new plan.

:::

### Excel export

[Excel export](https://mui.com/x/react-data-grid/export/#excel-export) enables users to save the data from the grid as an Excel spreadsheet that mirrors the existing visualization in the data grid based on filters, sorting, and row grouping.

This is one of the most requested features to date, so we're excited to finally deliver.

In the future we intend to support all of the features impacting visualization of the data grid, but we'd love to hear from you if there's anything in particular you'd like to see in future releases.

<video autoplay muted loop playsinline>
  <source src="/static/blog/premium-plan-release/excel-export-example.mp4" type="video/mp4" />
</video>

<p class="blog-description">The feature in action, from the docs page.</p>

### Aggregation (coming in late Q2)

Speaking of future releases: [aggregation functions](https://mui.com/x/react-data-grid/aggregation/) are coming next, as part of our ongoing efforts to build better tools for analyzing data.
Combined with row grouping, aggregation functions help users dive even deeper into their data for more granular insight.

Expanding on the use cases in the previous examples, users will be able to dynamically get the sum of orders for each customer, the minimum rating of each director, or the average crime rate for each governing party.

Aggregation functions open up an exponential number of new possibilities for organizing data—all with just a few clicks.

<video autoplay muted loop playsinline controls>
  <source src="/static/blog/premium-plan-release/aggregation-example.mp4" type="video/mp4" />
</video>

<p class="blog-description">The feature in action, from the docs page.</p>

## The new licensing model

With the release of the Premium plan, we're also announcing a revised pricing and licensing model for MUI X Premium and Pro.

We're aiming for simplicity, restructuring the model to be as clear as possible, based on the recurrent questions we've had in our sales and other channels.
We'd also like to keep it within reach of individuals and small teams, while still capturing more of the value we generate for larger companies.

Here is a list of everything that has changed:

:::warning
The following **pricing** changes apply only to **new customers**.
Existing customers are grandfathered, they can renew their license under the [previous terms](https://mui.com/legal/mui-x-eula-2022-05-08/) once.
Their last renewal can have a support duration of up to 5 years.
:::

- **Cost per developer seat**

  We're lowering our base price points, particularly for Pro users. Fees are billed annually.

  - Pro: $249 → $180/year or $15/month
  - Premium: $599 → $588/year or $49/month **($444/year - early bird)**

- **Removing volume and renewal discounts**

  We aim to give a more transparent price based on the number of developer licenses while providing more predictable revenue for MUI X in the long term.
  We believe that's best for both our long-standing customers and us as a company.

- **Perpetual in production**

  Customers can use any licensed version perpetually in a production environment (deployed/published applications), but an active license will always be required during development.
  We roll bug fixes, performance enhancements, and other improvements into new releases, so we want to encourage projects in active development to use the latest version.

- **Price cap for Premium plan**

  Pro is still capped at 10 seats, but Premium doesn't have a license cap. We kindly ask you to [contact sales](mailto:sales@mui.com) if you wish to purchase a license for more than 50 developers.

Please feel free to read the [license agreement](https://mui.com/legal/mui-x-eula/) in detail.

## What can you expect next?

We mentioned the aggregation functions already,
but there's a [lot more coming](https://github.com/orgs/mui/projects/35), and certainly not only for Premium users.
We're making continuous improvements to all X components, placing more emphasis on the overall experience for both the developer and the user.
A product designer is soon joining the team, and we aim to keep exploring the most advanced use cases for data-rich applications,
while working on bringing the best UX and DX in the market.

We're very excited about the possibilities the new Premium features will enable, and we hope you're excited too!

## FAQ 🔧

### How do I migrate?

To migrate to the premium version in your codebase, install the dedicated package `@mui/x-data-grid-premium` as follows:

With npm:

```js
npm install @mui/x-data-grid-premium
```

With yarn:

```js
yarn add @mui/x-data-grid-premium
```

All the features from Community and Pro plan are available in the Premium package. You can remove your previous data grid package without any concern.

The new package exports the component `<DataGridPremium />` which has basically the same API as `<DataGridPro />`. To use this package for development of a production product, and to remove the watermark, you must acquire a Premium license. If you wish to upgrade your existing Pro license, please [contact sales](mailto:sales@mui.com).

### Should I update my code?

You don't have to take any action here as a Community or Pro user, unless you're already using row grouping in your project.

Row grouping is now officially deprecated in the Pro package and will be removed from the experimental features [as planned](https://mui.com/blog/introducing-the-row-grouping-feature/#how-to-unlock-this-feature).

You must upgrade to the Premium plan to continue to use the row grouping feature.

### What can I do with the Excel export feature?

The free version of the data grid features a print export to give users a printable visualization, as well as a CSV export for migrating data to another application.
But CSV exports are basic and limited when the exported file is consumed by users instead of other applications. The Excel format provides more room for flexibility and customization.

#### Cell constraints

By setting a column type you prevent users from making errors, such as entering an invalid date, or using letters in a number column. The exported file will reflect those type constraints.

A special case is the `singleSelect` column type which provides an array of options. This constraint is also reflected in the exported file, meaning the singleSelect options will be available as field value options in the Excel spreadsheet.

#### Hierarchical structure

With tree data and row grouping, users can create a hierarchical structure between rows. This structure is also available in the exported file, and in Excel you can toggle the visibility of a row's children.

#### Brand customization

If you plan to generate spreadsheets to share, you may want to add headers, apply brand colors, or add extra details to the document.
To fully customize your Excel files, you can access their content before _and_ after the data is inserted.

## Share your feedback 🗣

We hope you find these new features useful and enjoyable to work with, both as a developer and a user.
Please don't hesitate to [open an issue](https://github.com/mui/mui-x/issues/new/choose) to share feedback, report bugs, or propose enhancements.
