<!--- This documentation is automatically generated, do not try to edit it. -->

# Collapse



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content node to be collapsed. |
| classes | object |  | Useful to extend the style applied to components. |
| in | bool | false | If `true`, the component will transition in. |
| onEnter | function |  | Callback fired before the component is entering. |
| onEntered | function |  | Callback fired when the component has entered. |
| onEntering | function |  | Callback fired when the component is entering. |
| onExit | function |  | Callback fired before the component is exiting. |
| onExited | function |  | Callback fired when the component has exited. |
| onExiting | function |  | Callback fired when the component is exiting. |
| transitionDuration | union:&nbsp;number<br>&nbsp;string<br> | 300 | Set to 'auto' to automatically calculate transition time based on height. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `container`
- `entered`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiCollapse`.
