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

## Component name

The `MuiDialog` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">aria-describedby</span> | <span class="prop-type">string</span> |  | The id(s) of the element(s) that describe the dialog. |
| <span class="prop-name">aria-labelledby</span> | <span class="prop-type">string</span> |  | The id(s) of the element(s) that label the dialog. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Dialog children, usually the included sub-components. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disableBackdropClick</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, clicking the backdrop will not fire the `onClose` callback. |
| <span class="prop-name">disableEscapeKeyDown</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, hitting escape will not fire the `onClose` callback. |
| <span class="prop-name">fullScreen</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the dialog will be full-screen |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the dialog stretches to `maxWidth`.<br>Notice that the dialog width grow is limited by the default margin. |
| <span class="prop-name">maxWidth</span> | <span class="prop-type">'lg'<br>&#124;&nbsp;'md'<br>&#124;&nbsp;'sm'<br>&#124;&nbsp;'xl'<br>&#124;&nbsp;'xs'<br>&#124;&nbsp;false</span> | <span class="prop-default">'sm'</span> | Determine the max-width of the dialog. The dialog width grows with the size of the screen. Set to `false` to disable `maxWidth`. |
| <span class="prop-name">onBackdropClick</span> | <span class="prop-type">func</span> |  | Callback fired when the backdrop is clicked. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object, reason: string) => void`<br>*event:* The event source of the callback.<br>*reason:* Can be: `"escapeKeyDown"`, `"backdropClick"`. |
| <span class="prop-name">onEnter</span> | <span class="prop-type">func</span> |  | Callback fired before the dialog enters. |
| <span class="prop-name">onEntered</span> | <span class="prop-type">func</span> |  | Callback fired when the dialog has entered. |
| <span class="prop-name">onEntering</span> | <span class="prop-type">func</span> |  | Callback fired when the dialog is entering. |
| <span class="prop-name">onEscapeKeyDown</span> | <span class="prop-type">func</span> |  | Callback fired when the escape key is pressed, `disableKeyboard` is false and the modal is in focus. |
| <span class="prop-name">onExit</span> | <span class="prop-type">func</span> |  | Callback fired before the dialog exits. |
| <span class="prop-name">onExited</span> | <span class="prop-type">func</span> |  | Callback fired when the dialog has exited. |
| <span class="prop-name">onExiting</span> | <span class="prop-type">func</span> |  | Callback fired when the dialog is exiting. |
| <span class="prop-name required">open<abbr title="required">*</abbr></span> | <span class="prop-type">bool</span> |  | If `true`, the Dialog is open. |
| <span class="prop-name">PaperComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Paper</span> | The component used to render the body of the dialog. |
| <span class="prop-name">PaperProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the [`Paper`](/api/paper/) element. |
| <span class="prop-name">scroll</span> | <span class="prop-type">'body'<br>&#124;&nbsp;'paper'</span> | <span class="prop-default">'paper'</span> | Determine the container for scrolling the dialog. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Fade</span> | The component used for the transition. [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |
| <span class="prop-name">transitionDuration</span> | <span class="prop-type">number<br>&#124;&nbsp;{ appear?: number, enter?: number, exit?: number }</span> | <span class="prop-default">{ enter: duration.enteringScreen, exit: duration.leavingScreen }</span> | The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Modal](/api/modal/)).

## CSS

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

