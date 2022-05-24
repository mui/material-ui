---
product: material-ui
title: Stacked snackbars React component
components: SnackbarsProvider
materialDesign: https://material.io/components/snackbars
waiAria: https://www.w3.org/TR/wai-aria-1.1/#alert
---

# Stacked snackbars

<p class="description">The <code>SnackbarsProvider</code> component and <code>useSnackbars</code> hook allow you to display multiple stacked snackbars.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

:::info
ℹ️ Note that Material Design doesn't advocate for this behavior, as seen in [their snackbar documentation](https://material.io/components/snackbars#usage).
However, given this is a common pattern seen in multiple webapps, Material UI allows deisgners and developers to break away from that guideline.
:::

## Usage

To display multiple snackbars, wrap your application with the `SnackbarsProvider` component.
That's what will enable you to use the `useSnackbars` hook.

If you're using `ThemeProvider`, wrap `SnackbarsProvider` below it, as follows:

```jsx
<ThemeProvider>
  <SnackbarsProvider>
    <YourApp />
  </SnackbarsProvider>
</ThemeProvider>
```

## Maximum snackbars

The `limit` prop can be passed to `SnackbarsProvider` to limit the maximum number of snackbars displayed at the same time.

{{"demo": "MaximumSnackbars.js", "defaultCodeOpen": false}}

## Basic stacked snackbars

The `message` prop is used to show the snackbar message.

The `action` prop can be used to show content on the right side of the snackbar.
It can simply be a React Node or a callback function with a key parameter returning a React Node.

Use the `close` method to dismiss a specific snackbar by providing the `key` from the `action` callback argument.

{{"demo": "BasicStackedSnackbars.js", "defaultCodeOpen": false}}

## Customization

Use the `content` prop to customize the individual snackbars.

{{"demo": "CustomizedSnackbars.js", "defaultCodeOpen": false}}

## Positioned snackbars

You can control the position of an individual snackbar by specifying the `anchorOrigin` prop.
For even greater convience, pass the desired `anchorOrigin` value to the `SnackbarsProvider` component to set the position of all snackbars used globally.

{{"demo": "PositionedSnackbars.js", "defaultCodeOpen": false}}

## Transition

Similarly to positioning, use the`TransitionComponent` prop in an individual snackbar if you want to control that specific instance transition effect or use it in the `SnackbarsProvider` component to change it globally.

{{"demo": "TransitionedSnackbars.js", "defaultCodeOpen": false}}

## Props priority

When the same props are supplied for both `show` method of `useSnackbars` and `SnackbarsProvider`, the ones added in the `show` method will have priority over those in `SnackbarsProvider`.

{{"demo": "PropsPriority.js"}}

In the above example, the `anchorOrigin`, `autoHideDuration` and `TransitionComponent` props in `show` method are applied taking preference over the `props` supplied on `SnackbarsProvider`.

## Global content and action props

To have global consistency of the types of `action` and `content` every instance of snackbar has across your application, use the `ref` prop in the `SnackbarsProvider` component to apply the desired values to the aforementioned props.

This will save you from a lot of inefficient repetition if you'd to in each instance individually using the `show` method.

### Global action prop

{{"demo": "GlobalActionSnackbars.js"}}

### Global content prop

{{"demo": "GlobalContentSnackbars.js"}}
