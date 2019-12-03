---
filename: /packages/material-ui/src/Dialog/Dialog.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Dialog API

<p class="description">The API documentation of the Dialog React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Dialog from '@material-ui/core/Dialog';
// or
import { Dialog } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

Dialogs are overlaid modal paper based components with a backdrop.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--aria-describedby"></a><a href="#props--aria-describedby" class="prop-name">aria-describedby</a> | <span class="prop-type">string</span> |  | The id(s) of the element(s) that describe the dialog. |
| <a class="anchor-link" id="props--aria-labelledby"></a><a href="#props--aria-labelledby" class="prop-name">aria-labelledby</a> | <span class="prop-type">string</span> |  | The id(s) of the element(s) that label the dialog. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node</span> |  | Dialog children, usually the included sub-components. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--disableBackdropClick"></a><a href="#props--disableBackdropClick" class="prop-name">disableBackdropClick</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, clicking the backdrop will not fire the `onClose` callback. |
| <a class="anchor-link" id="props--disableEscapeKeyDown"></a><a href="#props--disableEscapeKeyDown" class="prop-name">disableEscapeKeyDown</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, hitting escape will not fire the `onClose` callback. |
| <a class="anchor-link" id="props--fullScreen"></a><a href="#props--fullScreen" class="prop-name">fullScreen</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the dialog will be full-screen |
| <a class="anchor-link" id="props--fullWidth"></a><a href="#props--fullWidth" class="prop-name">fullWidth</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the dialog stretches to `maxWidth`.<br>Notice that the dialog width grow is limited by the default margin. |
| <a class="anchor-link" id="props--maxWidth"></a><a href="#props--maxWidth" class="prop-name">maxWidth</a> | <span class="prop-type">'xs'<br>&#124;&nbsp;'sm'<br>&#124;&nbsp;'md'<br>&#124;&nbsp;'lg'<br>&#124;&nbsp;'xl'<br>&#124;&nbsp;false</span> | <span class="prop-default">'sm'</span> | Determine the max-width of the dialog. The dialog width grows with the size of the screen. Set to `false` to disable `maxWidth`. |
| <a class="anchor-link" id="props--onBackdropClick"></a><a href="#props--onBackdropClick" class="prop-name">onBackdropClick</a> | <span class="prop-type">func</span> |  | Callback fired when the backdrop is clicked. |
| <a class="anchor-link" id="props--onClose"></a><a href="#props--onClose" class="prop-name">onClose</a> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be:`"escapeKeyDown"`, `"backdropClick"`. |
| <a class="anchor-link" id="props--onEnter"></a><a href="#props--onEnter" class="prop-name">onEnter</a> | <span class="prop-type">func</span> |  | Callback fired before the dialog enters. |
| <a class="anchor-link" id="props--onEntered"></a><a href="#props--onEntered" class="prop-name">onEntered</a> | <span class="prop-type">func</span> |  | Callback fired when the dialog has entered. |
| <a class="anchor-link" id="props--onEntering"></a><a href="#props--onEntering" class="prop-name">onEntering</a> | <span class="prop-type">func</span> |  | Callback fired when the dialog is entering. |
| <a class="anchor-link" id="props--onEscapeKeyDown"></a><a href="#props--onEscapeKeyDown" class="prop-name">onEscapeKeyDown</a> | <span class="prop-type">func</span> |  | Callback fired when the escape key is pressed, `disableKeyboard` is false and the modal is in focus. |
| <a class="anchor-link" id="props--onExit"></a><a href="#props--onExit" class="prop-name">onExit</a> | <span class="prop-type">func</span> |  | Callback fired before the dialog exits. |
| <a class="anchor-link" id="props--onExited"></a><a href="#props--onExited" class="prop-name">onExited</a> | <span class="prop-type">func</span> |  | Callback fired when the dialog has exited. |
| <a class="anchor-link" id="props--onExiting"></a><a href="#props--onExiting" class="prop-name">onExiting</a> | <span class="prop-type">func</span> |  | Callback fired when the dialog is exiting. |
| <a class="anchor-link" id="props--open"></a><a href="#props--open" class="prop-name required">open&nbsp;*</a> | <span class="prop-type">bool</span> |  | If `true`, the Dialog is open. |
| <a class="anchor-link" id="props--PaperComponent"></a><a href="#props--PaperComponent" class="prop-name">PaperComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">Paper</span> | The component used to render the body of the dialog. |
| <a class="anchor-link" id="props--PaperProps"></a><a href="#props--PaperProps" class="prop-name">PaperProps</a> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the [`Paper`](/api/paper/) element. |
| <a class="anchor-link" id="props--scroll"></a><a href="#props--scroll" class="prop-name">scroll</a> | <span class="prop-type">'body'<br>&#124;&nbsp;'paper'</span> | <span class="prop-default">'paper'</span> | Determine the container for scrolling the dialog. |
| <a class="anchor-link" id="props--TransitionComponent"></a><a href="#props--TransitionComponent" class="prop-name">TransitionComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">Fade</span> | The component used for the transition. |
| <a class="anchor-link" id="props--transitionDuration"></a><a href="#props--transitionDuration" class="prop-name">transitionDuration</a> | <span class="prop-type">number<br>&#124;&nbsp;{ enter?: number, exit?: number }</span> | <span class="prop-default">{ enter: duration.enteringScreen, exit: duration.leavingScreen }</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <a class="anchor-link" id="props--TransitionProps"></a><a href="#props--TransitionProps" class="prop-name">TransitionProps</a> | <span class="prop-type">object</span> |  | Props applied to the `Transition` element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Modal](/api/modal/)).

## CSS

- Style sheet name: `MuiDialog`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiDialog-root</span> | Styles applied to the root element.
| <span class="prop-name">scrollPaper</span> | <span class="prop-name">.MuiDialog-scrollPaper</span> | Styles applied to the container element if `scroll="paper"`.
| <span class="prop-name">scrollBody</span> | <span class="prop-name">.MuiDialog-scrollBody</span> | Styles applied to the container element if `scroll="body"`.
| <span class="prop-name">container</span> | <span class="prop-name">.MuiDialog-container</span> | Styles applied to the container element.
| <span class="prop-name">paper</span> | <span class="prop-name">.MuiDialog-paper</span> | Styles applied to the `Paper` component.
| <span class="prop-name">paperScrollPaper</span> | <span class="prop-name">.MuiDialog-paperScrollPaper</span> | Styles applied to the `Paper` component if `scroll="paper"`.
| <span class="prop-name">paperScrollBody</span> | <span class="prop-name">.MuiDialog-paperScrollBody</span> | Styles applied to the `Paper` component if `scroll="body"`.
| <span class="prop-name">paperWidthFalse</span> | <span class="prop-name">.MuiDialog-paperWidthFalse</span> | Styles applied to the `Paper` component if `maxWidth=false`.
| <span class="prop-name">paperWidthXs</span> | <span class="prop-name">.MuiDialog-paperWidthXs</span> | Styles applied to the `Paper` component if `maxWidth="xs"`.
| <span class="prop-name">paperWidthSm</span> | <span class="prop-name">.MuiDialog-paperWidthSm</span> | Styles applied to the `Paper` component if `maxWidth="sm"`.
| <span class="prop-name">paperWidthMd</span> | <span class="prop-name">.MuiDialog-paperWidthMd</span> | Styles applied to the `Paper` component if `maxWidth="md"`.
| <span class="prop-name">paperWidthLg</span> | <span class="prop-name">.MuiDialog-paperWidthLg</span> | Styles applied to the `Paper` component if `maxWidth="lg"`.
| <span class="prop-name">paperWidthXl</span> | <span class="prop-name">.MuiDialog-paperWidthXl</span> | Styles applied to the `Paper` component if `maxWidth="xl"`.
| <span class="prop-name">paperFullWidth</span> | <span class="prop-name">.MuiDialog-paperFullWidth</span> | Styles applied to the `Paper` component if `fullWidth={true}`.
| <span class="prop-name">paperFullScreen</span> | <span class="prop-name">.MuiDialog-paperFullScreen</span> | Styles applied to the `Paper` component if `fullScreen={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Dialog/Dialog.js) for more detail.

## Inheritance

The props of the [Modal](/api/modal/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Dialogs](/components/dialogs/)

