---
title: 'Introducing Row Grouping Feature'
description: After more than a year of development on the DataGrid, the first premium feature is live.
date: 2022-01-15T00:00:00.000Z
authors:
  ['oliviertassinari', 'm4theushw', 'flaviendelangle', 'DanailH', 'alexfauquette']
card: true
---

<!-- <img src="/static/blog/2021/card.png" alt="" style="width: 100%; margin-bottom: 16px;" /> -->

# A step to premium plan: Row Grouping

A lot of you were asking about it, and we are pleased to announce that the premium plan is on the road.
After an incredible year fully focused on improving the DataGrid, we are moving forward by releasing a first feature of the premium plan: the row grouping which is released in v5.3.0.
Let me introduce this new feature.

## Start navigating the data 🚢

If you already use the pro plan, you probably know the tree data that allows your users to navigate in the hierarchy by opening/closing children of a row.
However, everything does not have a natural hierarchy, and users might like to modify it.
Good news!
It is now possible with row grouping.

Let's play with the top 250 movies according to IMDb.
There is not a clear hierarchy to organize movies.
Should you group them by director, box office results or year of release?
The answer depends on what the user wants to do.
So let them be free to choose their own organization.
With the row grouping, they can go in the option menu of the “director” column and click on “Group by director” to group all the rows with the same director.
If they are not interested anymore by the director, they can simply click on “Stop groping by director”.

<img src="/static/blog/mui-x-v5.3.0/blog1.gif" alt="grouping and un-grouping by director" style="width: 100%; margin-bottom: 16px;" />

## Unlock the feature 🔓🎁

Since the Premium plan is not available yet, you can access it under experimental status in the DataGridPro.
Don’t worry about the `experimentalFeatures` name.
The feature is stable in its current form.
The experimental flag is here to prevent regression in the pro plan.

```js
<DataGridPro experimentalFeatures={{ rowGrouping: true }} {...otherProps} />
```

Congratulation! Your users are now able to use the row grouping 🎉.

## Cherry pick the groupable columns 🍒

Before letting your users enjoy this new feature, let adapt it to you use case.
All the columns are not interesting to perform grouping.
In our example of movies, grouping by title does not make sense since each movie has a different name.
You can remove the option for this specific column by setting the property `groupable` to `false` in the column definition.

<img src="/static/blog/mui-x-v5.3.0/groupable1.png" alt="remove groupable option" style="width: 100%; margin-bottom: 16px;" />

## Customize the grouping behavior 🔧

Some columns are interesting, but not that easy to group by.
For example, the release date of a movie is interesting, but grouping by the exact date leads to one group per movie (except for “The Thing” and “Blade Runner” both released on June 25, 1982).
It is more interesting to group them by decade.
For this purpose, column definition accept the property `keyGetter`.
Its signature is similar to `valueGetter` and it returns the grouping key associated to the column. To group movies by decade, you can use for example

```js
keyGetter: ({ value }) => `${Math.floor(value.getFullYear() / 10)}0's`;
```

<img src="/static/blog/mui-x-v5.3.0/blog2.gif" alt="grouping by release decade" style="width: 100%; margin-bottom: 16px;" />

More details about customization can be found in the [documentation](/components/data-grid/group-pivot/#disable-the-row-grouping)

Thanks for reading. We hope you will enjoy this new feature. Do not hesitate to open issues to share feedbacks, report bugs, or propose enhancement.
