# 属性

<p class="description">本页列出了所有的自定义系统属性，解释了它们是如何与主题链接的，以及它们所计算的 CSS 属性。 所有其他常规的 CSS 属性和选择器也被支持。</p>

## 图例

以 [下面表](#properties-reference-table) 中的一行为例：

| 系统样式函数                        | 系统键                  | CSS 属性          | 主题映射                                                                          |
|:----------------------------- |:-------------------- |:--------------- |:----------------------------------------------------------------------------- |
| [`spacing`](/system/spacing/) | `mb`, `marginBottom` | `margin-bottom` | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing) |

### 系统样式函数

<b>系统样式函数</b>列列出了生成其他列中显示的属性的函数，以作为你要将此功能添加到自定义组件中的参考。 函数可以从 `@material-ui/system` 导入。 你可以在 [进阶页面](/system/advanced/#using-standalone-system-utilities) 上看到使用样式函数的例子。 The content links to the documentation page where this properties are described; in this example, the [spacing](/system/spacing/) page.

### 系统键

<b>系统键</b>一列列出了你可以通过 `sx` 属性（或作为系统函数）使用此属性的键。

### CSS 属性

<b>CSS 属性</b>列描述了当使用该系统属性时，将生成哪个CSS属性。

### 主题映射

Lastly, the <b>Theme key</b> column tells you how this property is wired with the theme – with this example, whatever value you provide will be used as input to the `theme.spacing` helper.

让我们看看一个例子：

```jsx
<Box sx={{ mb: 3 }} />

// 等同于
<Box sx={{ marginBottom: theme => theme.spacing(3)}} />
```

由于默认的主题间距是 8px，这将生成以下 CSS 类：

```css
.hash-MuiBox {
  margin-bottom: 24px;
}
```

## 属性参考表

请注意，此表仅列出自定义属性，支持所有其他常规的 CSS 属性和选择器。

| 系统样式函数                                                       | 系统键                   | CSS 属性                                                                                       | 主题映射                                                                                    |
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
