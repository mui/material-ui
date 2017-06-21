# Typography



## Properties
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| align | union:&nbsp;'inherit', 'left', 'center', 'right', 'justify'<br> | 'inherit' |  |
| children | Element |  |  |
| classes | Object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string<br>&nbsp;Function<br> |  | The component used for the root node. Either a string to use a DOM element or a component. By default we map the type to a good default headline component. |
| color | union:&nbsp;'inherit'<br>&nbsp;'secondary'<br>&nbsp;'accent'<br>&nbsp;'default'<br> | 'default' | The color of the component. It's using the theme palette when that makes sense. |
| gutterBottom | boolean | false | If `true`, the text will have a bottom margin. |
| <span style="color: #31a148">headlineMapping *</span> | signature | {  display4: 'h1',  display3: 'h1',  display2: 'h1',  display1: 'h1',  headline: 'h1',  title: 'h2',  subheading: 'h3',  body2: 'aside',  body1: 'p',} | We are empirically mapping the type property to a range of different DOM element type. For instance, h1 to h6. If you wish to change that mapping, you can provide your own. Alternatively, you can use the `component` property. |
| noWrap | boolean | false | If `true`, the text will not wrap, but instead will truncate with an ellipsis. |
| paragraph | boolean | false | If `true`, the text will have a bottom margin. |
| type | union:&nbsp;, 'display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button'<br> | 'body1' | Applies the theme typography styles. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `display4`
- `display3`
- `display2`
- `display1`
- `headline`
- `title`
- `subheading`
- `body2`
- `body1`
- `caption`
- `button`
- `alignLeft`
- `alignCenter`
- `alignRight`
- `alignJustify`
- `noWrap`
- `gutterBottom`
- `paragraph`
- `colorInherit`
- `colorSecondary`
- `colorAccent`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTypography`.
