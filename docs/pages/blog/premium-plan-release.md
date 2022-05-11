---
title: Premium passengers, please proceed to the boarding gate 🚀
description: Introducing the MUI X Premium plan, and a new licensing model.
date: 2022-05-12T00:00:00.000Z
authors: ['josefreitas', 'alexfauquette']
tags: ['MUI X', 'News']
card: true
---

We’re happy to announce that the Premium plan is [finally out](https://mui.com/pricing/)!
With it, MUI X officially steps up to the next level, supporting the most advanced use cases for UI components.

<img src="/static/blog/premium-plan-release/card.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Promotional image of MUI X Premium plan release showcasing Data Grid's new features (such as Download data as an Excel file) and Date Range Picker" />

The new Premium features are intended to support end-users with the most sophisticated tools to navigate and draw insights from vast amounts of data.

## Row grouping

We started development with [row grouping](https://mui.com/x/react-data-grid/row-grouping/), which enables users to group data based on repeating values in the grid.
For example, users can now group orders by buyers, movies by directors, or cities by the governing parties.

These kinds of use cases would usually be dealt with using a different query on the database, perhaps requiring a new service end-point, maybe even a new front-end, with all the UX challenges this would entail.

Now it’s available at the end-user's fingertip, directly in the data grid.
Users are encouraged to explore the data and create combinations with multiple grouping criteria,
and are then able to export these new views to Excel, with the latest Premium feature: Excel export.

## Excel export

One of the most requested features,
the [“Excel export”](https://mui.com/x/react-data-grid/export/#excel-export) enables users to bring the data from the grid into Excel, while mirroring the existing visualization in the data grid based on filters, sorting, and row grouping.

In the future we intend to support all of the features impacting visualization of the data grid, but we’d love to hear from you if there’s anything in particular you’d like to see in future releases.

## Aggregation (Coming in late Q2)

Speaking of future releases, [aggregation functions](https://mui.com/x/react-data-grid/aggregation/#) are coming next, in a further step to improving tools to analyze data.
Combined with row grouping, the aggregation functions help users dive deeper to get data insights.

Expanding on the use cases for the previous examples, users will be able to dynamically get the sum of orders for each user, the minimum rating of each director, or the average crime rate for each governing party.

That and much more just a few clicks away.

# The new licensing model

As we release the Premium plan, we’d also like to announce its new price and MUI X licensing model.

We’re going for simplicity, restructuring our model to be as clear as possible, based on the recurrent questions we have had on our sales and other channels.
We’d also like to keep it viable for individual and small teams, while still capturing more of the value we generate for larger companies.

Here is a list of everything that has changed:

> ⚠️ Please note: The following changes apply only to **new customers**. Existing customers are not impacted, and their license agreement remains valid.

- **Price points**

  Balancing our goals and pricing structural changes, we’re lowering our base price points.

  - Pro: $249 → $180 / year
  - Premium: $599 → $588 / year ($444 - early bird)

- **Removing volume and renewal discounts**

  We aim to give a more transparent price based on the number of developer seats while providing more predictable revenue for MUI X in the long term.
  We believe that’s meaningful for both our long-standing customers, and MUI as a company.

- **Perpetual in production**

  Customers can use any licensed version perpetually in a production environment (deployed/published applications).
  But an active license will always be required during development.
  We roll bug fixes, performance enhancements and other improvements into new releases, so we want to encourage projects in active development to use current versions.

- **Price cap for Premium plan**

  The price for Pro is still capped at 10 seats, but we’re removing the concept of price cap for Premium. We kindly ask you to [contact sales](mailto:sales@mui.com) if you wish to license more than 50 developers.

Please, feel free to read the new [license agreement](https://mui.com/store/legal/mui-x-eula/) in detail.

# What can you expect next?

We mentioned the aggregation functions already,
but there’s a [lot more coming](https://github.com/mui/mui-x/projects/1), and certainly not only for Premium users.
We’ll continually enhance all of the components and are increasingly
putting more effort into usability and overall user and developer experience.
A product designer is soon joining the team, and we aim to keep exploring the most advanced use cases for data-rich applications,
while working on bringing the best UX and DX in the market.

We’re very excited about the possibilities the new Premium features will enable, and we hope you’re excited too!

# FAQ 🔧

## How to migrate

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

The new package exports the component `<DataGridPremium />` which has basically the same API as `<DataGridPro />`. To use this package in a production environment and remove the watermark, you must acquire a Premium license. If you wish to upgrade your existing Pro license, please [contact sales](mailto:sales@mui.com).

## Should I update my code?

Unless you want to migrate to Premium, or if you’re already using row-grouping in your project, you don’t have to do anything.

If you're using the row-grouping, it has been removed from the experimental features of the Pro Plan to be a Premium feature, as [previously announced](https://mui.com/blog/introducing-the-row-grouping-feature/#how-to-unlock-this-feature). To continue using it, please migrate to the Premium plan.

## Excel export features

To export data, the free version of the data grid implements both a print export which provides a printable visualization for users, and a CSV export allowing data migration to another application. However CSV exports are basic and limited when the exported file is consumed by users instead of other applications. The Excel format provides more room for flexibility and customization.

### Cell constraints

By setting a column type you prevent users from making errors, such as entering an invalid date, or using letters in a number column. The exported file will reflect those type constraints.

A special case is the ‘singleSelect’ column type which provides an array of options. This constraint is also reflected in the exported file, meaning the singleSelect options will be available as field value options in the excel file.

### Hierarchical structure

With tree data and row grouping, users can create a hierarchical structure between rows. This structure is also available in the exported file, and in Excel you can toggle a row’s children visibility.

### Brand customization

If you want to generate spreadsheets to share, you may be interested in adding some headers, using brand colors, or adding instructions to the document. For this purpose, we allow developers to access the excel file content before and after the data is added. This allows you to fully customize the content of the file.

### Ongoing development

This feature will continue to be enhanced. We would love to hear your feedback, and to learn what you would like to see in future releases.

# Share your feedback 🗣

We hope you find the new features useful and pleasant to use, both as a developer and user.
Please don't hesitate to open [issues](https://github.com/mui/mui-x/issues/new/choose) to share feedback, report bugs, or propose enhancements.
