# Eigenschaften

<p class="description">This page lists all of the custom system properties, how are they linked with the theme, and which CSS properties they compute.</p>

Let's take the following row from [the table below](#properties-reference-table), for example:

| Gruppe                      | System style function | System key(s)        | CSS property/properties | Theme mapping                                                                 |
|:--------------------------- |:--------------------- |:-------------------- |:----------------------- |:----------------------------------------------------------------------------- |
| [spacing](/system/spacing/) | `spacing`             | `mb`, `marginBottom` | `margin-bottom`         | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing) |

1. The <b>Group</b> column links to the documentation page where this group of properties is described; in this example, the [spacing](/system/spacing/) page.
2. The <b>System style function</b> column lists the function which generates the properties shown in the other columns, as a reference in case you want to add this functionality to your custom components. The functions can be imported from `@material-ui/system`. You can see an example of using the style functions on the [advanced page](/system/advanced/#using-standalone-system-utilities).

3. The <b>System keys</b> column lists the key(s) by which you can use this property with the `sx` prop (or as a system function).
4. The <b>CSS property</b> column describes which CSS property will be generated when this system property is used.
5. And lastly, the <b>Theme key</b> column tells you how this property is wired with the theme – with this example, whatever value you might use will be used as input to the `theme.spacing` helper.

Let's take a look at an example:

```jsx
<Box sx={{ mb: 3 }} />

// is equivalent to
<Box sx={{ marginBottom: theme => theme.spacing(3)}} />
```

As the default theme spacing is 8px, this will result in the following CSS class:

```css
.hash-MuiBox {
  margin-bottom: 24px;
}
```

## Properties reference table

| Gruppe                            | System style function | System key(s)         | CSS property/properties                                                                      | Theme mapping                                                                       |
|:--------------------------------- |:--------------------- |:--------------------- |:-------------------------------------------------------------------------------------------- |:----------------------------------------------------------------------------------- |
| [borders](/system/borders/)       | `border`              | `border`              | `border`                                                                                     | `${value}px solid`                                                                  |
| [borders](/system/borders/)       | `borderBottom`        | `borderBottom`        | `border-bottom`                                                                              | `${value}px solid`                                                                  |
| [borders](/system/borders/)       | `borderColor`         | `borderColor`         | `border-color`                                                                               | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)       |
| [borders](/system/borders/)       | `borderLeft`          | `borderLeft`          | `border-left`                                                                                | `${value}px solid`                                                                  |
| [borders](/system/borders/)       | `borderRadius`        | `borderRadius`        | `border-radius`                                                                              | [`theme.shape[value]`](/customization/default-theme/?expand-path=$.shape)           |
| [borders](/system/borders/)       | `borderRight`         | `borderRight`         | `border-right`                                                                               | `${value}px solid`                                                                  |
| [borders](/system/borders/)       | `borderTop`           | `borderTop`           | `border-top`                                                                                 | `${value}px solid`                                                                  |
| [shadows](/system/shadows/)       | `boxShadow`           | `boxShadow`           | `box-shadow`                                                                                 | `theme.shadows[value]`                                                              |
| [display](/system/display/)       | `displayPrint`        | `displayPrint`        | `display`                                                                                    | none                                                                                |
| [display](/system/display/)       | `displayRaw`          | `display`             | `display`                                                                                    | none                                                                                |
| [flexbox](/system/flexbox/)       | `alignContent`        | `alignContent`        | `align-content`                                                                              | none                                                                                |
| [flexbox](/system/flexbox/)       | `alignItems`          | `alignItems`          | `align-items`                                                                                | none                                                                                |
| [flexbox](/system/flexbox/)       | `alignSelf`           | `alignSelf`           | `align-self`                                                                                 | none                                                                                |
| [flexbox](/system/flexbox/)       | `flex`                | `flex`                | `flex`                                                                                       | none                                                                                |
| [flexbox](/system/flexbox/)       | `flexDirection`       | `flexDirection`       | `flex-direction`                                                                             | none                                                                                |
| [flexbox](/system/flexbox/)       | `flexGrow`            | `flexGrow`            | `flex-grow`                                                                                  | none                                                                                |
| [flexbox](/system/flexbox/)       | `flexShrink`          | `flexShrink`          | `flex-shrink`                                                                                | none                                                                                |
| [flexbox](/system/flexbox/)       | `flexWrap`            | `flexWrap`            | `flex-wrap`                                                                                  | none                                                                                |
| [flexbox](/system/flexbox/)       | `justifyContent`      | `justifyContent`      | `justify-content`                                                                            | none                                                                                |
| [flexbox](/system/flexbox/)       | `order`               | `order`               | `order`                                                                                      | none                                                                                |
| [palette](/system/palette/)       | `bgcolor`             | `bgcolor`             | `backgroundColor`                                                                            | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)       |
| [palette](/system/palette/)       | `color`               | `color`               | `color`                                                                                      | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)       |
| [positions](/system/positions/)   | `bottom`              | `bottom`              | `bottom`                                                                                     | none                                                                                |
| [positions](/system/positions/)   | `left`                | `left`                | `left`                                                                                       | none                                                                                |
| [positions](/system/positions/)   | `position`            | `position`            | `position`                                                                                   | none                                                                                |
| [positions](/system/positions/)   | `right`               | `right`               | `right`                                                                                      | none                                                                                |
| [positions](/system/positions/)   | `top`                 | `top`                 | `top`                                                                                        | none                                                                                |
| [positions](/system/positions/)   | `zIndex`              | `zIndex`              | `z-index`                                                                                    | [`theme.zIndex[value]`](/customization/default-theme/?expand-path=$.zIndex)         |
| [sizing](/system/sizing/)         | `height`              | `height`              | `height`                                                                                     | none                                                                                |
| [sizing](/system/sizing/)         | `maxHeight`           | `maxHeight`           | `max-height`                                                                                 | none                                                                                |
| [sizing](/system/sizing/)         | `maxWidth`            | `maxWidth`            | `max-width`                                                                                  | none                                                                                |
| [sizing](/system/sizing/)         | `minHeight`           | `minHeight`           | `min-height`                                                                                 | none                                                                                |
| [sizing](/system/sizing/)         | `minWidth`            | `minWidth`            | `min-width`                                                                                  | none                                                                                |
| [sizing](/system/sizing/)         | `width`               | `width`               | `width`                                                                                      | none                                                                                |
| [sizing](/system/sizing/)         | `boxSizing`           | `boxSizing`           | `box-sizing`                                                                                 | none                                                                                |
| [spacing](/system/spacing/)       | `spacing`             | `m`, `margin`         | `margin`                                                                                     | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`             | `mb`, `marginBottom`  | `margin-bottom`                                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`             | `ml`, `marginLeft`    | `margin-left`                                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`             | `mr`, `marginRight`   | `margin-right`                                                                               | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`             | `mt`, `marginTop`     | `margin-top`                                                                                 | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`             | `mx`, `marginX`       | `margin-left`, `margin-right`                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`             | `my`, `marginY`       | `margin-top`, `margin-bottom`                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`             | `p`, `padding`        | `padding`                                                                                    | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`             | `pb`, `paddingBottom` | `padding-bottom`                                                                             | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`             | `pl`, `paddingLeft`   | `padding-left`                                                                               | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`             | `pr`, `paddingRight`  | `padding-right`                                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`             | `pt`, `paddingTop`    | `padding-top`                                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`             | `px`, `paddingX`      | `padding-left`, `padding-right`                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`             | `py`, `paddingY`      | `padding-top`, `padding-bottom`                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [typography](/system/typography/) | `typography`          | `typography`          | `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-transform` | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography) |
| [typography](/system/typography/) | `fontFamily`          | `fontFamily`          | `font-family`                                                                                | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography) |
| [typography](/system/typography/) | `fontSize`            | `fontSize`            | `font-size`                                                                                  | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography) |
| [typography](/system/typography/) | `fontWeight`          | `fontWeight`          | `font-weight`                                                                                | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography) |
| [typography](/system/typography/) | `textAlign`           | `textAlign`           | `text-align`                                                                                 | none                                                                                |
