---
product: material-ui
title: React Snackbar component
components: Snackbar, SnackbarContent, SnackbarsProvider
githubLabel: 'component: snackbar'
materialDesign: https://m2.material.io/components/snackbars
waiAria: https://www.w3.org/TR/wai-aria-1.1/#alert
---

# Snackbar

<p class="description">Snackbars provide brief notifications. The component is also known as a toast.</p>

Snackbars inform users of a process that an app has performed or will perform. They appear temporarily, towards the bottom of the screen. They shouldn't interrupt the user experience, and they don't require user input to disappear.

Snackbars contain a single line of text directly related to the operation performed.
They may contain a text action, but no icons. You can use them to display notifications.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Simple snackbars

A basic snackbar that aims to reproduce Google Keep's snackbar behavior.

{{"demo": "SimpleSnackbar.js"}}

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedSnackbars.js"}}

## Positioned snackbars

In wide layouts, snackbars can be left-aligned or center-aligned if they are consistently placed on the same spot at the bottom of the screen, however there may be circumstances where the placement of the snackbar needs to be more flexible.
You can control the position of the snackbar by specifying the `anchorOrigin` prop.

{{"demo": "PositionedSnackbar.js"}}

## Message Length

Some snackbars with varying message length.

{{"demo": "LongTextSnackbar.js"}}

## Transitions

### Consecutive Snackbars

When multiple snackbar updates are necessary, they should appear one at a time.

{{"demo": "ConsecutiveSnackbars.js"}}

### Snackbars and floating action buttons (FABs)

Snackbars should appear above FABs (on mobile).

{{"demo": "FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 400}}

### Change transition

[Grow](/material-ui/transitions/#grow) is the default transition but you can use a different one.

{{"demo": "TransitionsSnackbar.js"}}

### Control Slide direction

You can change the direction of the [Slide](/material-ui/transitions/#slide) transition.

Example of making the slide transition to the left:

```jsx
import Slide from '@mui/material/Slide';

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

export default function MyComponent() {
  return <Snackbar TransitionComponent={TransitionLeft} />;
}
```

Other examples:

{{"demo": "DirectionSnackbar.js"}}

## Experimental API

The `Snackbar` component doesn't yet support displaying multiple stacked snackbars out of the box.
To solve this problem, you can use the `SnackbarsProvider` component and `useSnackbars` hook.
These utilities are available in the [`@mui/lab`](/material-ui/about-the-lab/) package.

:::info
Keep in mind that Material Design guidelines specify that "only one snackbar may be displayed at a time"—see [the Material Design snackbar documentation](https://material.io/components/snackbars#usage) for more information on usage.
But you don't necessarily need to adhere to Material Design to use Material UI components, so these utilities give you the freedom to follow your own design patterns.
:::

### Usage

To display multiple snackbars, wrap your application with the `SnackbarsProvider` component.
This lets you implement the `useSnackbars` hook.

If you're using `ThemeProvider`, then `SnackbarsProvider` should be nested inside, as shown here:

```jsx
<ThemeProvider>
  <SnackbarsProvider>
    <YourApp />
  </SnackbarsProvider>
</ThemeProvider>
```

### Maximum snackbars

You can add the `limit` prop to`SnackbarsProvider` to set the maximum number of snackbars that can be displayed simultaneously.

{{"demo": "MaximumSnackbars.js", "defaultCodeOpen": false}}

### Basic stacked snackbars

The `message` prop defines the snackbar's text.

You can add the `action` prop to display additional content on the right side of the snackbar (e.g. a call to action such as an **OK** or **Undo** button).
It can be a React Node, or a callback function with a key parameter that returns a React Node.

Use the `close` method to dismiss a specific snackbar by providing the `key` from the `action` callback argument.

{{"demo": "BasicStackedSnackbars.js", "defaultCodeOpen": false}}

### Customization

Use the `content` prop to customize the individual snackbars. You can build your own custom component and render it by passing it to the `content` prop.

The following demo shows how to render the `Alert` component in the snackbar by passing it to the `content` prop:

{{"demo": "CustomizedStackedSnackbars.js", "defaultCodeOpen": false}}

### Snackbar position

Add the `anchorOrigin` prop to control the position of an individual snackbar.
To set the position of all snackbars used globally, pass the desired `anchorOrigin` value to the `SnackbarsProvider` component.

The following demo shows how to control the positions of individual snackbars:

{{"demo": "PositionedSnackbars.js", "defaultCodeOpen": false}}

### Transition

You can use the`TransitionComponent` prop to control the transition effects on individual snackbars, or use it in the `SnackbarsProvider` component for global effects.

The following demo shows how to apply unique transition effects to each individual snackbar in an app:

{{"demo": "TransitionedStackedSnackbars.js", "defaultCodeOpen": false}}

### Props priority

Props supplied to the `show` method of an individual snackbar take priority over those same props supplied globally to `<SnackbarsProvider>`, as the following demo illustrates:

{{"demo": "PropsPriority.js"}}

### Global content and action props

You can add the `ref` prop to the `SnackbarsProvider` component to apply global values for the `action` and `content` props in all instances of snackbars across your entire application.

This lets you define default values rather than having to specify these props in every individual snackbar.

The following demos show how to implement global values for the `action` prop and `content` prop, respectively:

#### Global action prop

{{"demo": "GlobalActionSnackbars.js"}}

#### Global content prop

{{"demo": "GlobalContentSnackbars.js"}}

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-1.1/#alert)

By default, the snackbar won't auto-hide. However, if you decide to use the `autoHideDuration` prop, it's recommended to give the user [sufficient time](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits.html) to respond.

When open, **every** `Snackbar` will be dismissed if <kbd class="key">Escape</kbd> is pressed.
Unless you don't handle `onClose` with the `"escapeKeyDown"` reason.
If you want to limit this behavior to only dismiss the oldest currently open Snackbar call `event.preventDefault` in `onClose`.

```jsx
export default function MyComponent() {
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        onClose={(event, reason) => {
          // `reason === 'escapeKeyDown'` if `Escape` was pressed
          setOpen(false);
          // call `event.preventDefault` to only close one Snackbar at a time.
        }}
      />
      <Snackbar open={open} onClose={() => setOpen(false)} />
    </React.Fragment>
  );
}
```
