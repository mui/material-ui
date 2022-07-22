---
title: Aggregate data like in Excel, but easier!
description: Introducing aggregation functions and summary rows in Data grid Premium.
date: 2022-07-31T00:00:00.000Z
authors: ['josefreitas', 'flaviendelangle', 'cherniavskii']
tags: ['MUI X', 'News']
card: true
---

If you ever had a lot of data on a grid, you probably know that the ability to set different perspectives on data is essential to help users extract information. Typically, one would use at least filtering or sorting, but that barely scratches the surface of what one could do.

The Data grid Premium is all about enabling and empowering advanced use cases for data analysis. And in that spirit, we’re overjoyed to announce that starting from [v5.15.0](changelog-link), you can now use [aggregation functions](/x/react-data-grid/aggregation/), and with a couple of clicks, extract information like **sum**, **average**, **count**, and others.

## Wait, what is an aggregation function?

In a nutshell, those are functions used to return a computed result based on the values of a given column. For example, you have a list of financial transactions, and you want to get the Sum of all transactions and display it in a summary row.

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/aggregation-functions/summary-row.mp4" type="video/mp4" />
</video>

## High end-user experience

The **Sum** function showing a `Total` in summary rows is probably one of the most common use cases. But users can employ multiple aggregation functions in different columns simultaneously, and even combine with row grouping to aggregate children’s data on each group.

To make all that work well together, we took to the heart that we’d need to bring and focus on the best end-user experience possible, enabling the majority of use cases out of the box to the end-user, without any significant need for customization.

How easy can it be to get the average of transactions per user?

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/aggregation-functions/with-row-grouping.mp4" type="video/mp4" />
</video>

## Customize everything

The out-of-the-box experience is very important to us, but as is the ability to customize and extend the feature to your own use case.

You can change the styles of every element involved, set automatic aggregations, choose which columns can be aggregated by which functions, and even create your own custom function, like in the example below, where we created a function to get the first value in alphabetical order.

```tsx
const firstAlphabeticalAggregation: GridAggregationFunction<string, string | null> =
  {
    apply: (params) => {
      if (params.values.length === 0) {
        return null;
      }
      const sortedValue = params.values.sort((a = '', b = '') => a.localeCompare(b));
      return sortedValue[0];
    },
    // The `label` defines what's displayed in the column header when this aggregation is active.
    label: 'First Alphabetical',
    // The `types` property defines which type of columns can use this aggregation function.
    // Here, we only want to propose this aggregation function for `string` columns.
    // If not defined, aggregation will be available for all column types.
    columnTypes: ['string'],
  };
```

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/aggregation-functions/with-custom-functions.mp4" type="video/mp4" />
</video>

## Okay, I’m in! How can I get started?

:::info
First make sure that you're using `@mui/x-data-grid-premium` and version `5.15.0` or later.

:::

During the initial version of Aggregation functions, we’re publishing the feature as experimental, so we have some room to validate its API and the overall direction we’re taking with it.
But the feature is stable, and the API will likely not change significantly.

To activate the feature, please enabled it with the experimentalFeatures prop.

```tsx
<DataGridPremium experimentalFeatures={{ aggregation: true }} {...otherProps} />
```

And that's it! That enables the aggregation option on the column menu (available by default on columns of type number and string).

## Use with tree data and more

We already mentioned that you could customize functions and use aggregation with row grouping. But there are a lot of other possibilities to explore!

Please check out the feature’s [full documentation](/x/react-data-grid/aggregation/) to get a better overview of everything it has to offer.

## Row pinning

Aggregation footer row is empowered by another new feature called [Row pinning](/x/react-data-grid/rows/#row-pinning).
It enables you to pin rows at the bottom or at the top of your data grid.
Pinned rows are visible at all times while user scrolls the grid vertically.

> TODO: add video

Row pinning is available in Data grid Pro and Premium.

Check out more details on its [documentation page](/x/react-data-grid/rows/#row-pinning).

## Share your feedback 🗣

**And if you’re feeling generous, we’re recruiting users to interview!**

We hope you’re excited about the new features as we are!

As usual, we’re glad to listen to any feedback. Please feel free to open new issues to report bugs or suggest improvements.

Moreover, we’re planning the MUI X v6 release, and we’d love to hear more about your pain points and use cases.
If you want to help us steer our product, please consider [contacting us](https://forms.gle/vsBv6CLPz9h57xg8A) to schedule a 30 minutes user interview session.
