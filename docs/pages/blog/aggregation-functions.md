---
title: Aggregate data like in Excel, but easier!
description: Aggregation functions and summary rows are now available in the MUI X Premium Data Grid.
date: 2022-08-01T00:00:00.000Z
authors: ['josefreitas', 'flaviendelangle', 'cherniavskii']
tags: ['MUI X', 'Product']
manualCard: true
---

If you've ever worked with a data-heavy grid, then you understand how important it is for the end user to be able to set different perspectives on the data to gather the information they're looking for.
Basic functions like filtering and sorting barely scratch the surface of their needs.

The Premium Data Grid is all about enabling and empowering advanced use cases for data analysis.
And in that spirit, we're overjoyed to announce that starting from [v5.15.0](https://github.com/mui/mui-x/releases/tag/v5.15.0), you can now use [aggregation functions](/x/react-data-grid/aggregation/), and with a couple of clicks, extract information like **sum**, **average**, **count**, and others.

## Wait, what is an aggregation function?

Aggregation functions are used to return a computed result based on the values of a given column.
For example, you might have a list of financial transactions, and you want to get the sum of all transactions and display it in a summary row, as shown in the video below:

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/aggregation-functions/summary-row.mp4" type="video/mp4" />
</video>

## Intuitive end-user experience

The **Sum** function showing a **Total** in summary rows is one of the most common use cases. But users can employ multiple aggregation functions in different columns simultaneously, and even combine with row grouping to aggregate children's data on each group.

To make all that work well together, we knew that the focus had to be on creating the best end-user experience possible. The goal was to enable the majority of use cases right out of the box, without any need for significant customization.

How easy can it be to get the average transaction value per user?
Check out the video below to see it in action:

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/aggregation-functions/with-row-grouping.mp4" type="video/mp4" />
</video>

## Customize everything

The out-of-the-box experience is very important to us, but equally important is the ability to customize and extend the feature to suit your own use case.

You can change the styles of every element involved, set automatic aggregations, choose which columns can be aggregated by which functions, and even create your own custom functions.
In the example below, we created a function to get the first value in alphabetical order:

```ts
const firstAlphabeticalAggregation: GridAggregationFunction<
  string,
  string | null
> = {
  apply: (params) => {
    if (params.values.length === 0) {
      return null;
    }
    const sortedValue = params.values.sort((a = '', b = '') =>
      a.localeCompare(b),
    );
    return sortedValue[0];
  },
  // The `label` defines what's displayed in the column header when this
  // aggregation is active.
  label: 'First Alphabetical',
  // The `types` property defines which type of columns can use this
  // aggregation function. Here, we only want to propose this aggregation
  // function for `string` columns. If not defined, aggregation will be
  // available for all column types.
  columnTypes: ['string'],
};
```

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/aggregation-functions/with-custom-functions.mp4" type="video/mp4" />
</video>

## Okay, I'm in! How can I get started?

Aggregation functions are available in `@mui/x-data-grid-premium`, version `5.15.0` or later.

This feature is currently considered experimental as we continue to validate its API and refine our goals for it.
But it is stable, and the API most likely will not change significantly.

You can activate the feature with the `experimentalFeatures` prop:

```tsx
<DataGridPremium experimentalFeatures={{ aggregation: true }} {...otherProps} />
```

And that's it! That enables the **Aggregation** option on the column menu, which is available by default on columns of type number and string.

## Use with tree data and more

We already mentioned that you could customize functions and use aggregation with row grouping. But there are a lot of other possibilities to explore!

Please check out the feature's [full documentation](/x/react-data-grid/aggregation/) to get a better overview of everything it has to offer.

## Row pinning

The Aggregation footer row is powered by another new feature called [Row pinning](/x/react-data-grid/row-pinning/).
It enables you to pin rows to the top or bottom of your data grid.
Pinned rows are visible at all times while the user scrolls the grid vertically.

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/aggregation-functions/row-pinning.mp4" type="video/mp4" />
</video>

Row pinning is available in the Pro and Premium Data Grids.

Check out more details in the [Row pinning documentation](/x/react-data-grid/row-pinning/).

## Share your feedback 🗣

**And if you're feeling generous, we're recruiting users to interview!**

We hope you're excited about the new features as we are!

As always, we're happy to hear from you.
Please feel free to open new issues to report bugs or suggest improvements.

Moreover, we're planning MUI X v6, and we'd love to hear more about your pain points and use cases.
If you want to help steer the direction of our components, please consider [contacting us](https://forms.gle/vsBv6CLPz9h57xg8A) to schedule a 30-minute user interview session.
