# Quickstart

<p class="description">Get started with Base UI, a library of headless ("unstyled") React UI components and low-level hooks.</p>

## Installation

`@mui/base` is completely standalone – run one of the following commands to add Base UI to your React project:

#### npm

```sh
npm install @mui/base
```

#### yarn

```sh
yarn add @mui/base
```

#### pnpm

```sh
pnpm add @mui/base
```

#### Peer dependencies

<!-- #react-peer-version -->

[`react`](https://www.npmjs.com/package/react) >= 17.0.0 and [`react-dom`](https://www.npmjs.com/package/react-dom) >= 17.0.0 are peer dependencies.

## Tutorial

Let’s replicate a button from Github's UI as a quick tutorial. We'll use their [style guide](https://primer.style) as a reference.

{{"demo": "Tutorial.js", "defaultCodeOpen": false, "hideToolbar": true}}

### Components & Hooks

Base UI provides a `ButtonUnstyled` component and a `useButton` hook, both of which can be used to build a button, each with its own [benefits and trade-offs](/base/getting-started/usage/#components-vs-hooks).

{{"demo": "BaseButton.js"}}

Base UI comes with no built-in styles or styling solution. It can integrate with the styling method of your choice to make fully customizable components for your application or library. Read more about customization strategies [here](/base/getting-started/customization/).

Here are some styling examples:

### Styling with CSS

Pass a `className` prop and use it as a styling hook:

```
<style type="text/css">
  .btn {
    /* styles */
  }
</style>

<ButtonUnstyled className="btn">
  Create Repository
</ButtonUnstyled>
```

Base UI components like `ButtonUnstyled` come with a classes object (e.g. `buttonUnstyledClasses`) that provide class hooks for styling a particular state.

```css
// To style the disabled state:

.${buttonUnstyledClasses.disabled} { // ".MuiButton-disabled"
  cursor: not-allowed;
}
```

Here's a complete demo of using `ButtonUnstyled` and `useButton` with plain CSS:

{{"demo": "BaseButtonPlainCss.light.js", "defaultCodeOpen": false, "excludeByCurrentColorMode": true}}
{{"demo": "BaseButtonPlainCss.dark.js", "defaultCodeOpen": false, "excludeByCurrentColorMode": true}}

### Styling with Tailwind CSS

After installing Tailwind, simply pass Tailwind's utility classes to `className`.

```tsx
<ButtonUnstyled className="bg-green-600 rounded-md py-1 px-4...">
  Create Repository
</ButtonUnstyled>
```

Here's a complete demo of the same button styled with Tailwind instead:

{{"demo": "BaseButtonTailwind.light.js", "excludeByCurrentColorMode": true}}
{{"demo": "BaseButtonTailwind.dark.js", "excludeByCurrentColorMode": true}}

### Styling with MUI System

[MUI System](/system/getting-started/overview/) is a small set of CSS utilties that provide a styled-components-like API for building out designs that adhere to a theme.

Most of the demos and examples in the Base UI documentation are styled with MUI system. Read more about the demos [here](/base/getting-started/overview/).

#### `ButtonUnstyled` with MUI System

{{"demo": "BaseButtonMuiSystemComponent.js"}}

#### `useButton` with MUI System

{{"demo": "BaseButtonMuiSystemHook.js"}}
