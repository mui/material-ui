---
title: 'Introducing the Row Grouping feature'
description: After more than a year of development on the DataGrid, the first premium feature is live.
date: 2022-01-20T00:00:00.000Z
authors: ['alexfauquette']
tags: ['News', 'MUI X']
---

A lot of you were asking about it, and we are pleased to announce that the Premium plan is on the road.
After an incredible year fully focused on improving the DataGrid, we are moving forward by launching the first feature of the Premium plan: the [row grouping](/components/data-grid/group-pivot/#row-grouping) which is released in [v5.3.0](https://github.com/mui-org/material-ui-x/releases/tag/v5.3.0).

Let me introduce this new feature.

## Start navigating the data 🚢

If you already use the pro plan, you may be familiar with the [tree data](/components/data-grid/group-pivot/#tree-data) which allows your users to navigate in the hierarchy by opening/closing children of a row.
However, everything does not have a natural hierarchy, and users might like to modify it.
Good news!
It is now possible with row grouping.

Let's play with the top 250 movies according to IMDb.
There is not a clear hierarchy to organize movies.
Should you group them by director, box office results, or year of release?
The answer depends on what the user wants to do.
So let them be free to choose their own organization.
With the row grouping, they can go to the column menu of the “director” column and click on “Group by director” to group all the rows with the same director.
If they are not interested anymore in the director, they can simply click on “Stop grouping by director”.

<img src="/static/blog/introducing-the-row-grouping-feature/blog1.gif" alt="grouping and un-grouping by director" style="width: 100%; margin-bottom: 16px;" />

## Unlock the feature 🔓🎁

This feature will be part of the Premium plan when we will launch it. For now, you can access it on the Pro plan by enabling an experimental feature.
The row grouping is stable in its current form.
The experimental flag is here to make sure that the Pro plan will not have any regression when the feature will be moved to the Premium plan.

```js
<DataGridPro experimentalFeatures={{ rowGrouping: true }} {...otherProps} />
```

Congratulation! Your users are now able to use the row grouping 🎉.

## Provide nice default grouping

Save your user time by defining initial grouping. To do so, specify the row grouping model in the `initialState` prop. For a page about director's results, we could group by director, and box office as follows.

```js
<DataGridPro
  experimentalFeatures={{ rowGrouping: true }}
  initialState={{
    rowGrouping: {
      model: ['Director', 'BoxOffice'],
    },
  }}
  {...otherProps}
/>
```

Users are still free to modify this grouping configuration by going into the column menu.
But in a few clicks, you can see that Hitchcock's box office results vary a lot.

<img src="/static/blog/introducing-the-row-grouping-feature/defaultSettings.png" alt="remove groupable option" style="width: 100%; margin-bottom: 16px;" />

## Cherry-pick the groupable columns 🍒

Before letting your users enjoy this new feature, let's adapt it to your use case.
All the columns are not good candidates for grouping.
In our movies example, grouping by title does not make sense since each movie has a different name.
You can remove the ability to group this specific column by setting the property `groupable` to `false` in the column definition.

<img src="/static/blog/introducing-the-row-grouping-feature/groupable1.png" alt="remove groupable option" style="width: 100%; margin-bottom: 16px;" />

## Customize the grouping behavior 🔧

Some columns are interesting, but not that easy to group by.
For example, the release date of a movie is interesting, but grouping by the exact date leads to one group per movie (except for “The Thing” and “Blade Runner” both released on June 25, 1982).
It is more interesting to group them by decade.
For this purpose, the column definitions accept the property [`groupingValueGetter`](/components/data-grid/group-pivot/#using-groupingvaluegetter-for-complex-grouping-value).
Its signature is similar to `valueGetter` and it returns the grouping value associated to the column. To group movies by decade, you can use for example

```js
groupingValueGetter: ({ value }) => `${Math.floor(value.getFullYear() / 10)}0's`;
```

<img src="/static/blog/introducing-the-row-grouping-feature/blog2.gif" alt="grouping by release decade" style="width: 100%; margin-bottom: 16px;" />

## Thank you

More details about customization can be found in the [documentation](/components/data-grid/group-pivot/#disable-the-row-grouping)

Thanks for reading. To get more information about the v5.3.0 release, visit the [changelog](https://github.com/mui-org/material-ui-x/releases/tag/v5.3.0).
We hope you will enjoy this new feature. Do not hesitate to open [issues](https://github.com/mui-org/material-ui-x/issues/new/choose) to share feedback, report bugs, or propose enhancements.
