<!--- This documentation is automatically generated, do not try to edit it. -->

# Collapse



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Node |  | The content node to be collapsed. |
| classes | Object |  | Useful to extend the style applied to components. |
| in | boolean | false | If `true`, the component will transition in. |
| onEnter | TransitionCallback |  | Callback fired before the component is entering. |
| onEntered | TransitionCallback |  | Callback fired when the component has entered. |
| onEntering | TransitionCallback |  | Callback fired when the component is entering. |
| onExit | TransitionCallback |  | Callback fired before the component is exiting. |
| onExited | TransitionCallback |  | Callback fired when the component has exited. |
| onExiting | TransitionCallback |  | Callback fired when the component is exiting. |
| transitionDuration | union:&nbsp;number<br>&nbsp;{ enter?: number, exit?: number }<br>&nbsp;'auto'<br> | duration.standard | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.<br>Set to 'auto' to automatically calculate transition time based on height. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `container`
- `entered`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiCollapse`.

## Demos

- [Cards](/demos/cards)

