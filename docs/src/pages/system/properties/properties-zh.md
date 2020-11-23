# 属性

<p class="description">本页列出了所有的自定义系统属性，解释了它们是如何与主题链接的，以及它们所计算的 CSS 属性。</p>

以 [下面表](#properties-reference-table) 中的一行为例：

| 组                           | 系统样式函数    | 系统键                  | CSS 属性          | 主题映射                                                                          |
|:--------------------------- |:--------- |:-------------------- |:--------------- |:----------------------------------------------------------------------------- |
| [spacing](/system/spacing/) | `spacing` | `mb`, `marginBottom` | `margin-bottom` | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing) |

1. <b>Group</b> 列链接到描述该组属性的文档页面；在本例中，它是链接到 [spacing](/system/spacing/) 页面。
2. The <b>System style function</b> column lists the function which generates the properties shown in the other columns, as a reference in case you want to add this functionality to your custom components. The functions can be imported from `@material-ui/system`. You can see an example of using the style functions on the [advanced page](/system/advanced/#using-standalone-system-utilities).

3. <b>系统键</b>一列列出了你可以通过 `sx` 属性（或作为系统函数）使用此属性的键。
4. <b>CSS 属性</b>列描述了当使用该系统属性时，将生成哪个CSS属性。
5. 最后，<b>主题键</b>列告诉你这个属性如何与主题连接 – 在这个例子中，你使用的任何值都将用作 `theme.spacing` 助手的输入。

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

| 组                                 | 系统样式函数           | 系统键                   | CSS 属性                                                                                       | 主题映射                                                                                |
|:--------------------------------- |:---------------- |:--------------------- |:-------------------------------------------------------------------------------------------- |:----------------------------------------------------------------------------------- |
| [borders](/system/borders/)       | `border`         | `border`              | `border`                                                                                     | `${value}px solid`                                                                  |
| [borders](/system/borders/)       | `borderBottom`   | `borderBottom`        | `border-bottom`                                                                              | `${value}px solid`                                                                  |
| [borders](/system/borders/)       | `borderColor`    | `borderColor`         | `border-color`                                                                               | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)       |
| [borders](/system/borders/)       | `borderLeft`     | `borderLeft`          | `border-left`                                                                                | `${value}px solid`                                                                  |
| [borders](/system/borders/)       | `borderRadius`   | `borderRadius`        | `border-radius`                                                                              | [`theme.shape[value]`](/customization/default-theme/?expand-path=$.shape)           |
| [borders](/system/borders/)       | `borderRight`    | `borderRight`         | `border-right`                                                                               | `${value}px solid`                                                                  |
| [borders](/system/borders/)       | `borderTop`      | `borderTop`           | `border-top`                                                                                 | `${value}px solid`                                                                  |
| [shadows](/system/shadows/)       | `boxShadow`      | `boxShadow`           | `box-shadow`                                                                                 | `theme.shadows[value]`                                                              |
| [display](/system/display/)       | `displayPrint`   | `displayPrint`        | `display`                                                                                    | none                                                                                |
| [display](/system/display/)       | `displayRaw`     | `display`             | `display`                                                                                    | none                                                                                |
| [flexbox](/system/flexbox/)       | `alignContent`   | `alignContent`        | `align-content`                                                                              | none                                                                                |
| [flexbox](/system/flexbox/)       | `alignItems`     | `alignItems`          | `align-items`                                                                                | none                                                                                |
| [flexbox](/system/flexbox/)       | `alignSelf`      | `alignSelf`           | `align-self`                                                                                 | none                                                                                |
| [flexbox](/system/flexbox/)       | `flex`           | `flex`                | `flex`                                                                                       | none                                                                                |
| [flexbox](/system/flexbox/)       | `flexDirection`  | `flexDirection`       | `flex-direction`                                                                             | none                                                                                |
| [flexbox](/system/flexbox/)       | `flexGrow`       | `flexGrow`            | `flex-grow`                                                                                  | none                                                                                |
| [flexbox](/system/flexbox/)       | `flexShrink`     | `flexShrink`          | `flex-shrink`                                                                                | none                                                                                |
| [flexbox](/system/flexbox/)       | `flexWrap`       | `flexWrap`            | `flex-wrap`                                                                                  | none                                                                                |
| [flexbox](/system/flexbox/)       | `justifyContent` | `justifyContent`      | `justify-content`                                                                            | none                                                                                |
| [flexbox](/system/flexbox/)       | `order`          | `order`               | `order`                                                                                      | none                                                                                |
| [palette](/system/palette/)       | `bgcolor`        | `bgcolor`             | `backgroundColor`                                                                            | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)       |
| [palette](/system/palette/)       | `color`          | `color`               | `color`                                                                                      | [`theme.palette[value]`](/customization/default-theme/?expand-path=$.palette)       |
| [positions](/system/positions/)   | `bottom`         | `bottom`              | `bottom`                                                                                     | none                                                                                |
| [positions](/system/positions/)   | `left`           | `left`                | `left`                                                                                       | none                                                                                |
| [positions](/system/positions/)   | `position`       | `position`            | `position`                                                                                   | none                                                                                |
| [positions](/system/positions/)   | `right`          | `right`               | `right`                                                                                      | none                                                                                |
| [positions](/system/positions/)   | `top`            | `top`                 | `top`                                                                                        | none                                                                                |
| [positions](/system/positions/)   | `zIndex`         | `zIndex`              | `z-index`                                                                                    | [`theme.zIndex[value]`](/customization/default-theme/?expand-path=$.zIndex)         |
| [sizing](/system/sizing/)         | `height`         | `height`              | `height`                                                                                     | none                                                                                |
| [sizing](/system/sizing/)         | `maxHeight`      | `maxHeight`           | `max-height`                                                                                 | none                                                                                |
| [sizing](/system/sizing/)         | `maxWidth`       | `maxWidth`            | `max-width`                                                                                  | none                                                                                |
| [sizing](/system/sizing/)         | `minHeight`      | `minHeight`           | `min-height`                                                                                 | none                                                                                |
| [sizing](/system/sizing/)         | `minWidth`       | `minWidth`            | `min-width`                                                                                  | none                                                                                |
| [sizing](/system/sizing/)         | `width`          | `width`               | `width`                                                                                      | none                                                                                |
| [sizing](/system/sizing/)         | `boxSizing`      | `boxSizing`           | `box-sizing`                                                                                 | none                                                                                |
| [spacing](/system/spacing/)       | `spacing`        | `m`, `margin`         | `margin`                                                                                     | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`        | `mb`, `marginBottom`  | `margin-bottom`                                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`        | `ml`, `marginLeft`    | `margin-left`                                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`        | `mr`, `marginRight`   | `margin-right`                                                                               | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`        | `mt`, `marginTop`     | `margin-top`                                                                                 | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`        | `mx`, `marginX`       | `margin-left`, `margin-right`                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`        | `my`, `marginY`       | `margin-top`, `margin-bottom`                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`        | `p`, `padding`        | `padding`                                                                                    | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`        | `pb`, `paddingBottom` | `padding-bottom`                                                                             | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`        | `pl`, `paddingLeft`   | `padding-left`                                                                               | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`        | `pr`, `paddingRight`  | `padding-right`                                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`        | `pt`, `paddingTop`    | `padding-top`                                                                                | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`        | `px`, `paddingX`      | `padding-left`, `padding-right`                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [spacing](/system/spacing/)       | `spacing`        | `py`, `paddingY`      | `padding-top`, `padding-bottom`                                                              | [`theme.spacing(value)`](/customization/default-theme/?expand-path=$.spacing)       |
| [typography](/system/typography/) | `typography`     | `typography`          | `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-transform` | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography) |
| [typography](/system/typography/) | `fontFamily`     | `fontFamily`          | `font-family`                                                                                | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography) |
| [typography](/system/typography/) | `fontSize`       | `fontSize`            | `font-size`                                                                                  | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography) |
| [typography](/system/typography/) | `fontWeight`     | `fontWeight`          | `font-weight`                                                                                | [`theme.typography[value]`](/customization/default-theme/?expand-path=$.typography) |
| [typography](/system/typography/) | `textAlign`      | `textAlign`           | `text-align`                                                                                 | none                                                                                |
