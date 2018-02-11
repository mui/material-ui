---
filename: /src/Dialog/Dialog.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Dialog

Dialogs are overlaid modal paper based components with a backdrop.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | node |  | Dialog children, usually the included sub-components. |
| classes | object |  | Useful to extend the style applied to components. |
| disableBackdropClick | bool | false | If `true`, clicking the backdrop will not fire the `onClose` callback. |
| disableEscapeKeyDown | bool | false | If `true`, hitting escape will not fire the `onClose` callback. |
| fullScreen | bool | false | If `true`, it will be full-screen |
| fullWidth | bool | false | If specified, stretches dialog to max width. |
| maxWidth | enum:&nbsp;'xs'&nbsp;&#124;<br>&nbsp;'sm'&nbsp;&#124;<br>&nbsp;'md'&nbsp;&#124;<br>&nbsp;false<br> | 'sm' | Determine the max width of the dialog. The dialog width grows with the size of the screen, this property is useful on the desktop where you might need some coherent different width size across your application. Set to `false` to disable `maxWidth`. |
| onBackdropClick | func |  | Callback fired when the backdrop is clicked. |
| onClose | func |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| onEnter | func |  | Callback fired before the dialog enters. |
| onEntered | func |  | Callback fired when the dialog has entered. |
| onEntering | func |  | Callback fired when the dialog is entering. |
| onEscapeKeyDown | func |  | Callback fired when the escape key is pressed, `disableKeyboard` is false and the modal is in focus. |
| onExit | func |  | Callback fired before the dialog exits. |
| onExited | func |  | Callback fired when the dialog has exited. |
| onExiting | func |  | Callback fired when the dialog is exiting. |
| <span style="color: #31a148">open *</span> | bool |  | If `true`, the Dialog is open. |
| PaperProps | object |  | Properties applied to the `Paper` element. |
| transition | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | Fade | Transition component. |
| transitionDuration | union:&nbsp;number&nbsp;&#124;<br>&nbsp;{enter?: number, exit?: number}<br> | { enter: duration.enteringScreen, exit: duration.leavingScreen } | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `paper`
- `paperWidthXs`
- `paperWidthSm`
- `paperWidthMd`
- `fullWidth`
- `fullScreen`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Dialog/Dialog.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiDialog`.

## Inheritance

The properties of the [Modal](/api/modal) component are also available.

## Demos

- [Dialogs](/demos/dialogs)

