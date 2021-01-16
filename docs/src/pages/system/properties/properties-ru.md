# Свойства

<p class="description">This page lists all of the custom system properties, how are they linked with the theme, and which CSS properties they compute. All other regular CSS properties and selectors are supported too.</p>

## Legend

Let's take the following row from [the table below](#properties-reference-table), for example:

| System style function         | System key(s)        | CSS property/properties | Theme mapping                                                                 |
|:----------------------------- |:-------------------- |:----------------------- |:----------------------------------------------------------------------------- |
| [`spacing`](/system/spacing/) | `mb`, `marginBottom` | `margin-bottom`         | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing) |

### System style function

The <b>System style function</b> column lists the function which generates the properties shown in the other columns, as a reference in case you want to add this functionality to your custom components. The functions can be imported from `@material-ui/system`. You can see an example of using the style functions on the [advanced page](/system/advanced/#using-standalone-system-utilities). The content links to the documentation page where this properties are described; in this example, the [spacing](/system/spacing/) page.

### System keys

The <b>System keys</b> column lists the key(s) by which you can use this property with the `sx` prop (or as a system function).

### CSS properties

The <b>CSS property</b> column describes which CSS property will be generated when this system property is used.

### Theme mapping

Lastly, the <b>Theme key</b> column tells you how this property is wired with the theme – with this example, whatever value you provide will be used as input to the `theme.spacing` helper.

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

Note that this table only lists custom properties, all other regular CSS properties and selectors are supported.

| System style function                                        | System key(s)         | CSS property/properties                                                                      | Theme mapping                                                                           |
|:------------------------------------------------------------ |:--------------------- |:-------------------------------------------------------------------------------------------- |:--------------------------------------------------------------------------------------- |
| [`border`](/system/borders/#border)                          | `border`              | `border`                                                                                     | `${value}px solid`                                                                      |
| [`borderBottom`](/system/borders/#border)                    | `borderBottom`        | `border-bottom`                                                                              | `${value}px solid`                                                                      |
| [`borderColor`](/system/borders/#border-color)               | `borderColor`         | `border-color`                                                                               | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)           |
| [`borderLeft`](/system/borders/#border)                      | `borderLeft`          | `border-left`                                                                                | `${value}px solid`                                                                      |
| [`borderRadius`](system/borders/#border-radius)              | `borderRadius`        | `border-radius`                                                                              | [`theme.shape.borderRadius * value`](/customization/default-theme/?expand-path=$.shape) |
| [`borderRight`](/system/borders/#border)                     | `borderRight`         | `border-right`                                                                               | `${value}px solid`                                                                      |
| [`borderTop`]((/system/borders/#border)                      | `borderTop`           | `border-top`                                                                                 | `${value}px solid`                                                                      |
| [`boxShadow`](/system/shadows/)                              | `boxShadow`           | `box-shadow`                                                                                 | `theme.shadows[value]`                                                                  |
| [`displayPrint`](/system/display/#display-in-print)          | `displayPrint`        | `display`                                                                                    | none                                                                                    |
| [`displayRaw`](/system/display/)                             | `display`             | `display`                                                                                    | none                                                                                    |
| [`alignContent`](/system/flexbox/#align-content)             | `alignContent`        | `align-content`                                                                              | none                                                                                    |
| [`alignItems`](/system/flexbox/#align-items)                 | `alignItems`          | `align-items`                                                                                | none                                                                                    |
| [`alignSelf`](/system/flexbox/#align-self)                   | `alignSelf`           | `align-self`                                                                                 | none                                                                                    |
| [`flex`](/system/flexbox/)                                   | `flex`                | `flex`                                                                                       | none                                                                                    |
| [`flexDirection`](/system/flexbox/#flex-direction)           | `flexDirection`       | `flex-direction`                                                                             | none                                                                                    |
| [`flexGrow`](/system/flexbox/#flex-grow)                     | `flexGrow`            | `flex-grow`                                                                                  | none                                                                                    |
| [`flexShrink`](/system/flexbox/#flex-shrink)                 | `flexShrink`          | `flex-shrink`                                                                                | none                                                                                    |
| [`flexWrap`](/system/flexbox/#flex-wrap)                     | `flexWrap`            | `flex-wrap`                                                                                  | none                                                                                    |
| [`justifyContent`](/system/flexbox/#justify-content)         | `justifyContent`      | `justify-content`                                                                            | none                                                                                    |
| [`order`](/system/flexbox/#order)                            | `order`               | `order`                                                                                      | none                                                                                    |
| [`gap`](/system/grid/#gap)                                   | `gap`                 | `gap`                                                                                        | none                                                                                    |
| [`columnGap`](/system/grid/#row-gap-amp-column-gap)          | `columnGap`           | `column-gap`                                                                                 | none                                                                                    |
| [`rowGap`](/system/grid/#row-gap-amp-column-gap)             | `rowGap`              | `row-gap`                                                                                    | none                                                                                    |
| [`gridColumn`](/system/grid/#grid-column)                    | `gridColumn`          | `grid-column`                                                                                | none                                                                                    |
| [`gridRow`](/system/grid/#grid-row)                          | `gridRow`             | `grid-row`                                                                                   | none                                                                                    |
| [`gridAutoFlow`](/system/grid/#grid-auto-flow)               | `gridAutoFlow`        | `grid-auto-flow`                                                                             | none                                                                                    |
| [`gridAutoColumns`](/system/grid/#grid-auto-columns)         | `gridAutoColumns`     | `grid-auto-columns`                                                                          | none                                                                                    |
| [`gridAutoRows`](/system/grid/#grid-auto-rows)               | `gridAutoRows`        | `grid-auto-rows`                                                                             | none                                                                                    |
| [`gridTemplateColumns`](/system/grid/#grid-template-columns) | `gridTemplateColumns` | `grid-template-columns`                                                                      | none                                                                                    |
| [`gridTemplateRows`](/system/grid/#grid-template-rows)       | `gridTemplateRows`    | `grid-template-rows`                                                                         | none                                                                                    |
| [`gridTemplateAreas`](/system/grid/#grid-template-areas)     | `gridTemplateAreas`   | `grid-template-areas`                                                                        | none                                                                                    |
| [`gridArea`](/system/grid/#grid-area)                        | `gridArea`            | `grid-area`                                                                                  | none                                                                                    |
| [`bgcolor`](/system/palette/#background-color)               | `bgcolor`             | `backgroundColor`                                                                            | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)           |
| [`color`](/system/palette/#color)                            | `color`               | `color`                                                                                      | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)           |
| [`bottom`](/system/positions/)                               | `bottom`              | `bottom`                                                                                     | none                                                                                    |
| [`left`](/system/positions/)                                 | `left`                | `left`                                                                                       | none                                                                                    |
| [`position`](/system/positions/)                             | `position`            | `position`                                                                                   | none                                                                                    |
| [`right`](/system/positions/)                                | `right`               | `right`                                                                                      | none                                                                                    |
| [`top`](/system/positions/)                                  | `top`                 | `top`                                                                                        | none                                                                                    |
| [`zIndex`](/system/positions/#z-index)                       | `zIndex`              | `z-index`                                                                                    | [`theme.zIndex[value]`](/customization/default-theme/?expand-path=$.zIndex)             |
| [`height`](/system/sizing/#height)                           | `height`              | `height`                                                                                     | none                                                                                    |
| [`maxHeight`](/system/sizing/)                               | `maxHeight`           | `max-height`                                                                                 | none                                                                                    |
| [`maxWidth`](/system/sizing/)                                | `maxWidth`            | `max-width`                                                                                  | none                                                                                    |
| [`minHeight`](/system/sizing/)                               | `minHeight`           | `min-height`                                                                                 | none                                                                                    |
| [`minWidth`](/system/sizing/)                                | `minWidth`            | `min-width`                                                                                  | none                                                                                    |
| [`width`](/system/sizing/#width)                             | `width`               | `width`                                                                                      | none                                                                                    |
| [`boxSizing`](/system/sizing/)                               | `boxSizing`           | `box-sizing`                                                                                 | none                                                                                    |
| [`spacing`](/system/spacing/)                                | `m`, `margin`         | `margin`                                                                                     | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                                | `mb`, `marginBottom`  | `margin-bottom`                                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                                | `ml`, `marginLeft`    | `margin-left`                                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                                | `mr`, `marginRight`   | `margin-right`                                                                               | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                                | `mt`, `marginTop`     | `margin-top`                                                                                 | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                                | `mx`, `marginX`       | `margin-left`, `margin-right`                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                                | `my`, `marginY`       | `margin-top`, `margin-bottom`                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                                | `p`, `padding`        | `padding`                                                                                    | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                                | `pb`, `paddingBottom` | `padding-bottom`                                                                             | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                                | `pl`, `paddingLeft`   | `padding-left`                                                                               | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                                | `pr`, `paddingRight`  | `padding-right`                                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                                | `pt`, `paddingTop`    | `padding-top`                                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                                | `px`, `paddingX`      | `padding-left`, `padding-right`                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`spacing`](/system/spacing/)                                | `py`, `paddingY`      | `padding-top`, `padding-bottom`                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)           |
| [`typography`](/system/typography/#variant)                  | `typography`          | `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-transform` | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`fontFamily`](/system/typography/#font-family)              | `fontFamily`          | `font-family`                                                                                | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`fontSize`](/system/typography/#font-size)                  | `fontSize`            | `font-size`                                                                                  | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`fontStyle`](/system/typography/#font-style)                | `fontStyle`           | `font-style`                                                                                 | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`fontWeight`](/system/typography/#font-weight)              | `fontWeight`          | `font-weight`                                                                                | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`letterSpacing`](/system/typography/#letter-spacing)        | `letterSpacing`       | `letter-spacing`                                                                             | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`lineHeight`](/system/typography/#line-height)              | `lineHeight`          | `line-height`                                                                                | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography)     |
| [`textAlign`](/system/typography/#text-alignment)            | `textAlign`           | `text-align`                                                                                 | none                                                                                    |
