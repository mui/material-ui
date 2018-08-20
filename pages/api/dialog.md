---
filename: /packages/material-ui/src/Dialog/Dialog.js
title: Dialog API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Dialog

<p class="description">The API documentation of the Dialog React component.</p>

Dialogs are overlaid modal paper based components with a backdrop.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node |   | Dialog children, usually the included sub-components. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">disableBackdropClick</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, clicking the backdrop will not fire the `onClose` callback. |
| <span class="prop-name">disableEscapeKeyDown</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, hitting escape will not fire the `onClose` callback. |
| <span class="prop-name">fullScreen</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the dialog will be full-screen |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | If `true`, the dialog stretches to `maxWidth`. |
| <span class="prop-name">maxWidth</span> | <span class="prop-type">enum:&nbsp;'xs'&nbsp;&#124;<br>&nbsp;'sm'&nbsp;&#124;<br>&nbsp;'md'&nbsp;&#124;<br>&nbsp;false<br> | <span class="prop-default">'sm'</span> | Determine the max width of the dialog. The dialog width grows with the size of the screen, this property is useful on the desktop where you might need some coherent different width size across your application. Set to `false` to disable `maxWidth`. |
| <span class="prop-name">onBackdropClick</span> | <span class="prop-type">func |   | Callback fired when the backdrop is clicked. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func |   | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name">onEnter</span> | <span class="prop-type">func |   | Callback fired before the dialog enters. |
| <span class="prop-name">onEntered</span> | <span class="prop-type">func |   | Callback fired when the dialog has entered. |
| <span class="prop-name">onEntering</span> | <span class="prop-type">func |   | Callback fired when the dialog is entering. |
| <span class="prop-name">onEscapeKeyDown</span> | <span class="prop-type">func |   | Callback fired when the escape key is pressed, `disableKeyboard` is false and the modal is in focus. |
| <span class="prop-name">onExit</span> | <span class="prop-type">func |   | Callback fired before the dialog exits. |
| <span class="prop-name">onExited</span> | <span class="prop-type">func |   | Callback fired when the dialog has exited. |
| <span class="prop-name">onExiting</span> | <span class="prop-type">func |   | Callback fired when the dialog is exiting. |
| <span class="prop-name required">open *</span> | <span class="prop-type">bool |   | If `true`, the Dialog is open. |
| <span class="prop-name">PaperProps</span> | <span class="prop-type">object |   | Properties applied to the [`Paper`](/api/paper) element. |
| <span class="prop-name">scroll</span> | <span class="prop-type">enum:&nbsp;'body'&nbsp;&#124;<br>&nbsp;'paper'<br> | <span class="prop-default">'paper'</span> | Determine the container for scrolling the dialog. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">Fade</span> | Transition component. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }<br> | <span class="prop-default">{ enter: duration.enteringScreen, exit: duration.leavingScreen }</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object |   | Properties applied to the `Transition` element. |

Any other properties supplied will be spread to the root element ([Modal](/api/modal)).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">scrollPaper</span> | Styles applied to the root element if `scroll="paper"`.
| <span class="prop-name">scrollBody</span> | Styles applied to the root element if `scroll="bodyr"`.
| <span class="prop-name">paper</span> | Styles applied to the `Paper` component.
| <span class="prop-name">paperScrollPaper</span> | Styles applied to the `Paper` component if `scroll="paper"`.
| <span class="prop-name">paperScrollBody</span> | Styles applied to the `Paper` component if `scroll="body"`.
| <span class="prop-name">paperWidthXs</span> | Styles applied to the `Paper` component if `maxWidth="xs"`.
| <span class="prop-name">paperWidthSm</span> | Styles applied to the `Paper` component if `maxWidth="sm"`.
| <span class="prop-name">paperWidthMd</span> | Styles applied to the `Paper` component if `maxWidth="md"`.
| <span class="prop-name">paperFullWidth</span> | Styles applied to the `Paper` component if `fullWidth={true}`.
| <span class="prop-name">paperFullScreen</span> | Styles applied to the `Paper` component if `fullScreen={true}`.

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Dialog/Dialog.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiDialog`.

## Inheritance

The properties of the [Modal](/api/modal) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api#spread).

## Demos

- [Dialogs](/demos/dialogs)

