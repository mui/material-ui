# Ripple



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| pulsate | bool | false | If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element. |
| <span style="color: #31a148">rippleSize *</span> | number |  | Diameter of the ripple. |
| <span style="color: #31a148">rippleX *</span> | number |  | Horizontal position of the ripple center. |
| <span style="color: #31a148">rippleY *</span> | number |  | Vertical position of the ripple center. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `ripple`
- `rippleVisible`
- `rippleFast`
- `container`
- `containerLeaving`
- `containerPulsating`
- `@keyframes mui-ripple-enter`
- `@keyframes mui-ripple-exit`
- `@keyframes mui-ripple-pulsate`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiRipple`.
