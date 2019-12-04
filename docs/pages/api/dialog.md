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
| <a class="anchor-link" id="props--aria-describedby"></a><a href="#props--aria-describedby" title="link to the prop on this page" class="prop-name">aria-describedby</a> | <span class="prop-type">string</span> |  | The id(s) of the element(s) that describe the dialog. |
| <a class="anchor-link" id="props--aria-labelledby"></a><a href="#props--aria-labelledby" title="link to the prop on this page" class="prop-name">aria-labelledby</a> | <span class="prop-type">string</span> |  | The id(s) of the element(s) that label the dialog. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node</span> |  | Dialog children, usually the included sub-components. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--disableBackdropClick"></a><a href="#props--disableBackdropClick" title="link to the prop on this page" class="prop-name">disableBackdropClick</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, clicking the backdrop will not fire the `onClose` callback. |
| <a class="anchor-link" id="props--disableEscapeKeyDown"></a><a href="#props--disableEscapeKeyDown" title="link to the prop on this page" class="prop-name">disableEscapeKeyDown</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, hitting escape will not fire the `onClose` callback. |
| <a class="anchor-link" id="props--fullScreen"></a><a href="#props--fullScreen" title="link to the prop on this page" class="prop-name">fullScreen</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the dialog will be full-screen |
| <a class="anchor-link" id="props--fullWidth"></a><a href="#props--fullWidth" title="link to the prop on this page" class="prop-name">fullWidth</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the dialog stretches to `maxWidth`.<br>Notice that the dialog width grow is limited by the default margin. |
| <a class="anchor-link" id="props--maxWidth"></a><a href="#props--maxWidth" title="link to the prop on this page" class="prop-name">maxWidth</a> | <span class="prop-type">'xs'<br>&#124;&nbsp;'sm'<br>&#124;&nbsp;'md'<br>&#124;&nbsp;'lg'<br>&#124;&nbsp;'xl'<br>&#124;&nbsp;false</span> | <span class="prop-default">'sm'</span> | Determine the max-width of the dialog. The dialog width grows with the size of the screen. Set to `false` to disable `maxWidth`. |
| <a class="anchor-link" id="props--onBackdropClick"></a><a href="#props--onBackdropClick" title="link to the prop on this page" class="prop-name">onBackdropClick</a> | <span class="prop-type">func</span> |  | Callback fired when the backdrop is clicked. |
| <a class="anchor-link" id="props--onClose"></a><a href="#props--onClose" title="link to the prop on this page" class="prop-name">onClose</a> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be:`"escapeKeyDown"`, `"backdropClick"`. |
| <a class="anchor-link" id="props--onEnter"></a><a href="#props--onEnter" title="link to the prop on this page" class="prop-name">onEnter</a> | <span class="prop-type">func</span> |  | Callback fired before the dialog enters. |
| <a class="anchor-link" id="props--onEntered"></a><a href="#props--onEntered" title="link to the prop on this page" class="prop-name">onEntered</a> | <span class="prop-type">func</span> |  | Callback fired when the dialog has entered. |
| <a class="anchor-link" id="props--onEntering"></a><a href="#props--onEntering" title="link to the prop on this page" class="prop-name">onEntering</a> | <span class="prop-type">func</span> |  | Callback fired when the dialog is entering. |
| <a class="anchor-link" id="props--onEscapeKeyDown"></a><a href="#props--onEscapeKeyDown" title="link to the prop on this page" class="prop-name">onEscapeKeyDown</a> | <span class="prop-type">func</span> |  | Callback fired when the escape key is pressed, `disableKeyboard` is false and the modal is in focus. |
| <a class="anchor-link" id="props--onExit"></a><a href="#props--onExit" title="link to the prop on this page" class="prop-name">onExit</a> | <span class="prop-type">func</span> |  | Callback fired before the dialog exits. |
| <a class="anchor-link" id="props--onExited"></a><a href="#props--onExited" title="link to the prop on this page" class="prop-name">onExited</a> | <span class="prop-type">func</span> |  | Callback fired when the dialog has exited. |
| <a class="anchor-link" id="props--onExiting"></a><a href="#props--onExiting" title="link to the prop on this page" class="prop-name">onExiting</a> | <span class="prop-type">func</span> |  | Callback fired when the dialog is exiting. |
| <a class="anchor-link" id="props--open"></a><a href="#props--open" title="link to the prop on this page" class="prop-name required">open&nbsp;*</a> | <span class="prop-type">bool</span> |  | If `true`, the Dialog is open. |
| <a class="anchor-link" id="props--PaperComponent"></a><a href="#props--PaperComponent" title="link to the prop on this page" class="prop-name">PaperComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">Paper</span> | The component used to render the body of the dialog. |
| <a class="anchor-link" id="props--PaperProps"></a><a href="#props--PaperProps" title="link to the prop on this page" class="prop-name">PaperProps</a> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the [`Paper`](/api/paper/) element. |
| <a class="anchor-link" id="props--scroll"></a><a href="#props--scroll" title="link to the prop on this page" class="prop-name">scroll</a> | <span class="prop-type">'body'<br>&#124;&nbsp;'paper'</span> | <span class="prop-default">'paper'</span> | Determine the container for scrolling the dialog. |
| <a class="anchor-link" id="props--TransitionComponent"></a><a href="#props--TransitionComponent" title="link to the prop on this page" class="prop-name">TransitionComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">Fade</span> | The component used for the transition. |
| <a class="anchor-link" id="props--transitionDuration"></a><a href="#props--transitionDuration" title="link to the prop on this page" class="prop-name">transitionDuration</a> | <span class="prop-type">number<br>&#124;&nbsp;{ enter?: number, exit?: number }</span> | <span class="prop-default">{ enter: duration.enteringScreen, exit: duration.leavingScreen }</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <a class="anchor-link" id="props--TransitionProps"></a><a href="#props--TransitionProps" title="link to the prop on this page" class="prop-name">TransitionProps</a> | <span class="prop-type">object</span> |  | Props applied to the `Transition` element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Modal](/api/modal/)).

## CSS

- Style sheet name: `MuiDialog`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiDialog-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--scrollPaper"></a><a href="#css--scrollPaper" class="prop-name">scrollPaper</a> | <span class="prop-name">.MuiDialog-scrollPaper</span> | Styles applied to the container element if `scroll="paper"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--scrollBody"></a><a href="#css--scrollBody" class="prop-name">scrollBody</a> | <span class="prop-name">.MuiDialog-scrollBody</span> | Styles applied to the container element if `scroll="body"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--container"></a><a href="#css--container" class="prop-name">container</a> | <span class="prop-name">.MuiDialog-container</span> | Styles applied to the container element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paper"></a><a href="#css--paper" class="prop-name">paper</a> | <span class="prop-name">.MuiDialog-paper</span> | Styles applied to the `Paper` component.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperScrollPaper"></a><a href="#css--paperScrollPaper" class="prop-name">paperScrollPaper</a> | <span class="prop-name">.MuiDialog-paperScrollPaper</span> | Styles applied to the `Paper` component if `scroll="paper"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperScrollBody"></a><a href="#css--paperScrollBody" class="prop-name">paperScrollBody</a> | <span class="prop-name">.MuiDialog-paperScrollBody</span> | Styles applied to the `Paper` component if `scroll="body"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperWidthFalse"></a><a href="#css--paperWidthFalse" class="prop-name">paperWidthFalse</a> | <span class="prop-name">.MuiDialog-paperWidthFalse</span> | Styles applied to the `Paper` component if `maxWidth=false`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperWidthXs"></a><a href="#css--paperWidthXs" class="prop-name">paperWidthXs</a> | <span class="prop-name">.MuiDialog-paperWidthXs</span> | Styles applied to the `Paper` component if `maxWidth="xs"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperWidthSm"></a><a href="#css--paperWidthSm" class="prop-name">paperWidthSm</a> | <span class="prop-name">.MuiDialog-paperWidthSm</span> | Styles applied to the `Paper` component if `maxWidth="sm"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperWidthMd"></a><a href="#css--paperWidthMd" class="prop-name">paperWidthMd</a> | <span class="prop-name">.MuiDialog-paperWidthMd</span> | Styles applied to the `Paper` component if `maxWidth="md"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperWidthLg"></a><a href="#css--paperWidthLg" class="prop-name">paperWidthLg</a> | <span class="prop-name">.MuiDialog-paperWidthLg</span> | Styles applied to the `Paper` component if `maxWidth="lg"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperWidthXl"></a><a href="#css--paperWidthXl" class="prop-name">paperWidthXl</a> | <span class="prop-name">.MuiDialog-paperWidthXl</span> | Styles applied to the `Paper` component if `maxWidth="xl"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperFullWidth"></a><a href="#css--paperFullWidth" class="prop-name">paperFullWidth</a> | <span class="prop-name">.MuiDialog-paperFullWidth</span> | Styles applied to the `Paper` component if `fullWidth={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--paperFullScreen"></a><a href="#css--paperFullScreen" class="prop-name">paperFullScreen</a> | <span class="prop-name">.MuiDialog-paperFullScreen</span> | Styles applied to the `Paper` component if `fullScreen={true}`.

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

