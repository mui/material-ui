---
title: The Journey of Developing MUI Masonry Component
description: The development process of MUI Masonry Component
date: 2021-09-17T00:00:00.000Z
authors: ['bennyjoo"]
card: true
---

# The Journey of Developing MUI Masonry Component

## Request from the community

On August 14th, 2019, a [request](https://github.com/mui-org/material-ui/issues/17000) for a masonry component was opened. Upvoted by around 200 MUI users, this is one of the most popular component requests.

![Screenshot 2021-09-15 at 09 13 33](https://user-images.githubusercontent.com/32841130/133396518-74c7792e-e4bc-403d-aad4-2585a7876206.png)

According to the 70 responses from our survey, we learned that MUI users want to

- display less than 50 items in a masonry
- span multiple columns in a masonry
- insert each item in the shortest column in a masonry

![Screenshot 2021-09-15 at 09 29 54](https://user-images.githubusercontent.com/32841130/133398931-a9ee1aa8-11ca-47e7-a356-d051dab30435.png)
![Screenshot 2021-09-15 at 09 29 59](https://user-images.githubusercontent.com/32841130/133398945-0e3ea284-8d67-47a3-afad-36a95a6f6925.png)
![Screenshot 2021-09-15 at 09 30 06](https://user-images.githubusercontent.com/32841130/133398964-059e0faf-d624-472d-8fbb-9b1ede41cce6.png)

With the help of these survey results, we came up with the following requirements:

**Must-have**:

- Items can have arbitrary heights.
- Items should flow horizontally.
- Each item is pushed to the shortest column.

**Should-have**:

- The number of columns, `columns`, and the spacing between items, `spacing`, can be passed into the component.
- Responsive number of columns (breakpoints)
- Responsive spacing (breakpoints)

**Nice-to-have**:

- Server side rendering
- Span multiple columns in a masonry
- Performance
- Logical tab order
- Support for lazy loading/virtualisation

In short, we wanted to build a masonry component that is light-weight enough to be performant and easy-to-use but solid enough to do its job.

## Two possible solutions: CSS Grid or CSS Flexbox?

Since our goal was to develop a light-weight masonry component, an absolute positioning implementation, of which most existing masonry libraries make use, was not our option. It requires too much JavaScript, and therefore it is likely to be heavy-weight.

Hence, we could go with either CSS Grid or CSS Flexbox. Each came with its own advantages and disadvantages.

**1. CSS Grid + Configuring `grid-row-start` or `grid-row-end`of items**

The idea is to create a grid container, `<Masonry />`, that contains grid items, `<MasonryItem />`s, each of which contains a child. Then, we compute the height of each child and set the height of its wrapper, `<MasonryItem />`, to this value. This allows every `<MasonryItem />` to be able to have a different height and to be large enough to display its child.

One important thing to note is that simply setting a fixed height to `<MasonryItem />` will not do anything. Because it is a CSS grid item, it is constrained to the row height configured in its grid container, `<Masonry />`. So, we should use a property called `grid-row-start` or `grid-row-end`. Both properties span the height of a grid item to a specific number of rows. For example, applying `grid-row-end: span 10` to a `<MasonryItem />` spans its height to amount to 10 rows.

This means that a `<MasonryItem />`'s height is always a multitude of the row height configured in `<Masonry />`. If the row height is `10px`, the height of `<MasonryItem />` is a multitude of `10px`, such as `100px`, `110px`, ... and so on. This limitation gives rise to a serious problem. However, there is always a solution. Both the problem and the solution are introduced in the next section.

On the other hand, there is an amazing benefit of this implementation: it places a grid item to the shortest column by default. (Spoiler: this isn't the case in the other option). Also, this implementation makes it extremely handy to support the column spanning feature. We can use `grid-column-start` or `grid-column-end` to span the width of a grid item. Both of these advantages lead to less dependence on JavaScript, which meets our goal of making a light-weight component.

Overall, this approach satisfies all the requirements discussed earlier except the server-side rendering. Still, this implementation seems like a fairly sufficient candidate to me. What do you think? Let's have a look at the other option, and it might be easier to decide.

**2. CSS Flexbox + Configuring `order` of items**

The idea of this implementation is to create a flexbox container, `<Masonry />`, that renders its children by column. However, this means that one of our must-have requirements, **"items should flow horizontally"**, is not satisfied, doesn't it? This is where the property `order` plays its role. It is possible to configure the `order` of each child so that children flow horizontally. For example, if `order: 1` is assigned to the first child of `<Masonry />` and `order: 2` to the second child, the first child will be inserted into the first column and the second into the second column. Without the use of `order`, both items will end up in the first column.

`nth-child()` and `order` can be used together to place every child in the right place. For instance, in order to maintain a masonry with three columns, `order: 1` should be assigned to `nth-child(3n+1)`, `order: 2` to `nth-child(3n+2)` and `order: 3` to `nth-child(3n)`. As you may have already realised, the vaues of `nth-child()` and `order` should be tweaked depending on the number of columns. Therefore, again, the server-side rendering is not possible in this implementation.

Furthermore, the column spanning option is not feasible because CSS Flexbox doesn't provide spanning properties like CSS Grid does. Lastly, in this implementation, one of our must-have requirements, **"each item is pushed to the shortest column"**, does not come for free as opposed to the first approach. In order to achieve this requirement, it is necessary to iterate through every child and find the shortest column at each time to configure `order` accordingly. Still, even if it is not free, it is absolutely possible.

Overall, this approach satisfies all the requirements except the server-side rendering and the column spanning option.

We have looked at both our options for building a masonry component. What would you go with?

## We chose CSS Grid over CSS Flexbox

On one hand, the first apporach, **CSS Grid + Configuring `grid-row-start` or `grid-row-end` of items**, supports the column spanning feature with no extra effort.

On the other hand, it has one serious limitation as mentioned earlier.

> If the row height is `10px`, the height of `<MasonryItem />` is a multitude of `10px`, such as `100px`, `110px`, ... and so on.

As a result, the heights of items are likely to be tweaked. Because we can't span a part of a row, `span` in `grid-row-end` should always be followed by a whole number. For instance, `grid-row-end: span 10.5` is not possible. Rather, it should be either `span 10` or `span 11`. Let's say that the row height of a masonry is `10px` and the rendered height of an item is `105px`. We can either make it `100px` or `110px`, but not exactly `105px`. This can disturb the experience of our MUI users.

The second approach, **CSS Flexbox + Configuring `order` of items**, has no such limitation, but it does not support the column spanning option.

So, we have some trade-offs here. You can't go wrong with either approach. However, what if this _"item's height should be in multitude of row height"_ limitation of the first approach goes away? The decision making would be much easier then, right? So, we have found a workaround to this.

In order to retain the rendered heights of children as much as possible, we can set the height of each row to `1px`. Even if an item has a rendered height of `105px`, we have no problem! We will assign `span 105` to its `grid-row-end` property. Technically, this item is composed of 105 rows. (Spoiler: this leads to another serious problem later...) To go a little deeper on the technical side, setting the height of row to `1px` can be done by setting the height of implicit grid rows to `0px` and the default grid-gap to `1px`: `grid-auto-rows: 0; grid-gap: 1`.

In conclusion, we decided to go with the first implementation: **CSS Grid + Configuring `grid-row-start` or `grid-row-end` of items**.

## Chrome is giving us a hard time

After finishing up the implementation, we found that Chrome limits the number of rows of each CSS grid to 1,000 at the maximum. Overflowing items beyond the 1,000th row are simply squashed. You can find a thread with regard to this [here](https://bugs.chromium.org/p/chromium/issues/detail?id=688640).

This is a serious problem for us because our implementation has the row height of `1px` and it is not that difficult for a masonry to go beyond a height of `1,000px`. As a hot fix, we set the row height to `2px`. So, your MUI Masonry will fail to be larger than `2,000px` on Chrome. It has no problem on Firefox or Safari, but since Chrome has the biggest market share of browsers, this definitely needs to be fixed.

## Conclusion

The only way to resolve this issue is either for Chrome to remove such limitation or for us to move on to the second implementation: **CSS Flexbox + Configuring `order` of items**. However, before doing any of these, we wanted to gather feedback from our users first.

You can find more about our new MUI Masonry component [here](https://next.material-ui.com/components/masonry/). Also, here is an open [issue](https://github.com/mui-org/material-ui/issues/27934) with regard to this specific limitation of this masonry implementation. In fact, we already have prepared the second implementation [here](https://github.com/mui-org/material-ui/pull/28059). Please let us know your opinions and we will deliver for your best experience. I hope you enjoyed the article!
