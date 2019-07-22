---
title: Rating React component
components: Rating
---

# Rating

<p class="description">Ratings provide insight regarding others’ opinions and experiences with a product. Users can also rate products they’ve purchased.</p>

- 📦 [20 kB gzipped](/size-snapshot) (but only 6 kB without @material-ui/styles).

## Simple ratings

{{"demo": "pages/components/rating/SimpleRating.js"}}

## Half ratings

The rating can display any float number with the `value` prop. Use the `precision` prop to define the minimum increment value change allowed.

{{"demo": "pages/components/rating/HalfRating.js"}}

## Customized ratings

Here are some examples of customizing the component. 詳細については、 [オーバーライドのドキュメントページ](/customization/components/)を参照してください。

{{"demo": "pages/components/rating/CustomizedRatings.js"}}

## サイズ

Fancy larger or smaller ratings? Use the `size` property.

{{"demo": "pages/components/rating/RatingSize.js"}}

## Hover feedback

You can display a label on hover to help users pick the correct rating value. The first demo uses the `onChangeActive` prop while the last one uses the `IconContainerComponent` prop.

{{"demo": "pages/components/rating/HoverRating.js"}}

## アクセシビリティ

このコンポーネントのアクセシビリティは、

- A radio group is used with its fields visually hidden. It contains six radio buttons, one for each star and another for 0 stars, which is checked by default. Make sure you are providing a `name` prop that is unique to the parent form.
- The labels for the radio buttons contain actual text (“1 Star”, “2 Stars”, …), make sure you provide a `getLabelText` prop when the page language is not English.