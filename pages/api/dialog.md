---
filename: /packages/material-ui/src/Dialog/Dialog.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Dialog API

<p class="description">The API documentation of the Dialog React component. Learn more about the properties and the CSS customization points.</p>

```js
import Dialog from '@material-ui/core/Dialog';
```

Dialogs are overlaid modal paper based components with a backdrop.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | Dialog children, usually the included sub-components. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disableBackdropClick</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, clicking the backdrop will not fire the `onClose` callback. |
| <span class="prop-name">disableEscapeKeyDown</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, hitting escape will not fire the `onClose` callback. |
| <span class="prop-name">fullScreen</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the dialog will be full-screen |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the dialog stretches to `maxWidth`. |
| <span class="prop-name">maxWidth</span> | <span class="prop-type">enum:&nbsp;'xs', 'sm', 'md', 'lg', 'xl', false<br></span> | <span class="prop-default">'sm'</span> | Determine the max-width of the dialog. The dialog width grows with the size of the screen. Set to `false` to disable `maxWidth`. |
| <span class="prop-name">onBackdropClick</span> | <span class="prop-type">func</span> |  | Callback fired when the backdrop is clicked. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback<br>*reason:* Can be:`"escapeKeyDown"`, `"backdropClick"` |
| <span class="prop-name">onEnter</span> | <span class="prop-type">func</span> |  | Callback fired before the dialog enters. |
| <span class="prop-name">onEntered</span> | <span class="prop-type">func</span> |  | Callback fired when the dialog has entered. |
| <span class="prop-name">onEntering</span> | <span class="prop-type">func</span> |  | Callback fired when the dialog is entering. |
| <span class="prop-name">onEscapeKeyDown</span> | <span class="prop-type">func</span> |  | Callback fired when the escape key is pressed, `disableKeyboard` is false and the modal is in focus. |
| <span class="prop-name">onExit</span> | <span class="prop-type">func</span> |  | Callback fired before the dialog exits. |
| <span class="prop-name">onExited</span> | <span class="prop-type">func</span> |  | Callback fired when the dialog has exited. |
| <span class="prop-name">onExiting</span> | <span class="prop-type">func</span> |  | Callback fired when the dialog is exiting. |
| <span class="prop-name required">open&nbsp;*</span> | <span class="prop-type">bool</span> |  | If `true`, the Dialog is open. |
| <span class="prop-name">PaperComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Paper</span> | The component used to render the body of the dialog. |
| <span class="prop-name">PaperProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Properties applied to the [`Paper`](/api/paper/) element. |
| <span class="prop-name">scroll</span> | <span class="prop-type">enum:&nbsp;'body'&nbsp;&#124;<br>&nbsp;'paper'<br></span> | <span class="prop-default">'paper'</span> | Determine the container for scrolling the dialog. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Fade</span> | The component used for the transition. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;{ enter?: number, exit?: number }<br></span> | <span class="prop-default">{ enter: duration.enteringScreen, exit: duration.leavingScreen }</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object</span> |  | Properties applied to the `Transition` element. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([Modal](/api/modal/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">scrollPaper</span> | Styles applied to the root element if `scroll="paper"`.
| <span class="prop-name">scrollBody</span> | Styles applied to the root element if `scroll="body"`.
| <span class="prop-name">container</span> | Styles applied to the container element.
| <span class="prop-name">paper</span> | Styles applied to the `Paper` component.
| <span class="prop-name">paperScrollPaper</span> | Styles applied to the `Paper` component if `scroll="paper"`.
| <span class="prop-name">paperScrollBody</span> | Styles applied to the `Paper` component if `scroll="body"`.
| <span class="prop-name">paperWidthFalse</span> | Styles applied to the `Paper` component if `maxWidth=false`.
| <span class="prop-name">paperWidthXs</span> | Styles applied to the `Paper` component if `maxWidth="xs"`.
| <span class="prop-name">paperWidthSm</span> | Styles applied to the `Paper` component if `maxWidth="sm"`.
| <span class="prop-name">paperWidthMd</span> | Styles applied to the `Paper` component if `maxWidth="md"`.
| <span class="prop-name">paperWidthLg</span> | Styles applied to the `Paper` component if `maxWidth="lg"`.
| <span class="prop-name">paperWidthXl</span> | Styles applied to the `Paper` component if `maxWidth="xl"`.
| <span class="prop-name">paperFullWidth</span> | Styles applied to the `Paper` component if `fullWidth={true}`.
| <span class="prop-name">paperFullScreen</span> | Styles applied to the `Paper` component if `fullScreen={true}`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Dialog/Dialog.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiDialog`.

## Inheritance

The properties of the [Modal](/api/modal/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Dialogs](/components/dialogs/)

