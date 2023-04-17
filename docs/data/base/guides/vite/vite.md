# Using Base UI with Vite

<p class="description">Learn how to set up Base UI in a React-Vite app with various styling solutions.</p>

:::info
Don't need a step-by-step guide? Clone one of these example templates on GitHub instead:

- [base-vite-sass](https://github.com/mui/material-ui/tree/master/examples/base-vite-sass)
- [base-vite-tailwind](https://github.com/mui/material-ui/tree/master/examples/base-vite-tailwind)
- [base-vite-mui-system](https://github.com/mui/material-ui/tree/master/examples/base-vite-mui-system)
  :::

## Getting Started

This guide will walk you through setting up Base UI in a Vite + React app and integrating with different styling solutions.

## Install Vite

Install Vite using `create-vite` and a React template (`react`, `react-ts`, `react-swc`, `react-swc-ts`) - the following commands will set up a minimal Vite app using the `react` template in a directory called `my-base-app`:

```sh
# npm
npm create vite@latest my-base-app -- --template react

# yarn
yarn create vite@latest my-base-app --template react

# pnpm
pnpm create vite@latest my-base-app --template react
```

Navigate to the new directory and start the app to make sure it runs:

```sh
cd my-base-app

# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm run dev
```

:::info
The rest of this guide will only show `yarn` commands, though it will work with other package managers
:::

## Install Base UI

Base UI is only one package! Install it with the package manager of your choice:

```sh
yarn add @mui/base
```

Base UI's Unstyled Button component is a drop-in replacement for the native `<button>` element.
Next replace the `<button>` in the default `App.jsx` with `ButtonUnstyled`:

**src/App.jsx**

```diff
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -1,4 +1,5 @@
 import { useState } from 'react'
+import ButtonUnstyled from '@mui/base/ButtonUnstyled';
 import reactLogo from './assets/react.svg'
 import viteLogo from '/vite.svg'
 import './App.css'
@@ -18,9 +19,9 @@ function App() {
       </div>
       <h1>Vite + React</h1>
       <div className="card">
-        <button onClick={() => setCount((count) => count + 1)}>
+        <ButtonUnstyled onClick={() => setCount((count) => count + 1)}>
           count is {count}
-        </button>
+        </ButtonUnstyled>
         <p>
           Edit <code>src/App.jsx</code> and save to test HMR
         </p>

```

## Install a styling solution

Base UI works with all styling solutions - plain CSS, SASS, LESS, CSS modules, Tailwind CSS, CSS-in-JS - you name it. Here are some examples:

### Plain CSS, CSS Modules

Plain (global) CSS and CSS modules work out of the box with Vite. The Unstyled Button renders a `button` element, which is targeted by the default styles that come with `create-vite`.

CSS files ending with `.module.css` are considered CSS modules files. Importing a CSS module file returns a module object with scoped classes that can be applied to base components.

The following snippet converts the button styles from global CSS to it's own scoped CSS module file:

Create a new file called `Button.module.css`:

**src/Button.module.css**

```diff
 new file mode 100644
 index 0000000..d9d4b73
--- /dev/null
+++ b/src/Button.module.css
@@ -0,0 +1,20 @@
+.myButton {
+  border-radius: 8px;
+  border: 1px solid transparent;
+  padding: 0.6em 1.2em;
+  font-size: 1em;
+  font-weight: 500;
+  font-family: inherit;
+  background-color: #1a1a1a;
+  cursor: pointer;
+  transition: border-color 0.25s;
+}
+
+.myButton:hover {
+  border-color: #646cff;
+}
+
+.myButton:focus,
+.myButton:focus-visible {
+  outline: 4px auto -webkit-focus-ring-color;
+}

```

**src/index.css**

Remove the button styles from global CSS:

```diff
--- a/src/index.css
+++ b/src/index.css
@@ -36,25 +36,6 @@ h1 {
   line-height: 1.1;
 }

-button {
-  border-radius: 8px;
-  border: 1px solid transparent;
-  padding: 0.6em 1.2em;
-  font-size: 1em;
-  font-weight: 500;
-  font-family: inherit;
-  background-color: #1a1a1a;
-  cursor: pointer;
-  transition: border-color 0.25s;
-}
-button:hover {
-  border-color: #646cff;
-}
-button:focus,
-button:focus-visible {
-  outline: 4px auto -webkit-focus-ring-color;
-}
-
 @media (prefers-color-scheme: light) {
   :root {
     color: #213547;

```

**src/App.jsx**

Import the module:

```diff
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -3,6 +3,7 @@ import ButtonUnstyled from '@mui/base/ButtonUnstyled';
 import reactLogo from './assets/react.svg'
 import viteLogo from '/vite.svg'
 import './App.css'
+import buttonStyles from './Button.module.css';

 function App() {
   const [count, setCount] = useState(0)
@@ -19,7 +20,7 @@ function App() {
       </div>
       <h1>Vite + React</h1>
       <div className="card">
-        <ButtonUnstyled onClick={() => setCount((count) => count + 1)}>
+        <ButtonUnstyled className={buttonStyles.myButton} onClick={() => setCount((count) => count + 1)}>
           count is {count}
         </ButtonUnstyled>
         <p>

```

### Tailwind CSS

Install Tailwind CSS and its dependencies:

```sh
yarn add -D tailwindcss postcss autoprefixer
```

Run the following the command to initialize Tailwind and generate the required config files (`tailwind.config.js` and `postcss.config.js`):

```sh
yarn tailwindcss init -p
```

Add the paths to your templates and source files:

**tailwind.config.js**

```js
@@ -1,6 +1,9 @@
 /** @type {import('tailwindcss').Config} */
 export default {
-  content: [],
+  content: [
+    './index.html',
+    './src/**/*.{js,ts,jsx,tsx}',
+  ],
   theme: {
     extend: {},
   },

```

Add Tailwind directives to the top of the global CSS file:

**src/index.css**

```diff
--- a/src/index.css
+++ b/src/index.css
@@ -1,3 +1,7 @@
+@tailwind base;
+@tailwind components;
+@tailwind utilities;
+
 :root {
   font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
   line-height: 1.5;

```

Now you can apply Tailwind classes to the `className` prop of any Base UI component. The following snippets will replace previous styling on the button with Tailwind CSS:

**src/App.jsx**

```jsx
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -3,7 +3,6 @@ import ButtonUnstyled from '@mui/base/ButtonUnstyled';
 import reactLogo from './assets/react.svg'
 import viteLogo from '/vite.svg'
 import './App.css'
-import buttonStyles from './Button.module.css';

 function App() {
   const [count, setCount] = useState(0)
@@ -20,7 +19,7 @@ function App() {
       </div>
       <h1>Vite + React</h1>
       <div className="card">
-        <ButtonUnstyled className={buttonStyles.myButton} onClick={() => setCount((count) => count + 1)}>
+        <ButtonUnstyled className="rounded-lg border border-solid border-transparent py-[0.6rem] px-[1.2rem] text-base font-medium font-inherit bg-[#1a1a1a] cursor-pointer hover:border-[#646cff] focus:outline-4 focus:outline-[-webkit-focus-ring-color] focus-visible:outline-[-webkit-focus-ring-color]" onClick={() => setCount((count) => count + 1)}>
           count is {count}
         </ButtonUnstyled>
         <p>

```

**src/Button.module.css**

This file is not needed anymore.

```diff
-.myButton {
-  border-radius: 8px;
-  border: 1px solid transparent;
-  padding: 0.6em 1.2em;
-  font-size: 1em;
-  font-weight: 500;
-  font-family: inherit;
-  background-color: #1a1a1a;
-  cursor: pointer;
-  transition: border-color 0.25s;
-}
-
-.myButton:hover {
-  border-color: #646cff;
-}
-
-.myButton:focus,
-.myButton:focus-visible {
-  outline: 4px auto -webkit-focus-ring-color;
-}
```

### MUI System

Install MUI System and its dependencies:

```sh
yarn add @mui/system @emotion/react @emotion/styled
```

MUI System allows you to tokenize specific CSS properties in a theme, and etc etc something something. The following steps will demonstrate how to define all the colors in a theme, and style the button using MUI System:

**src/main.jsx**

```diff
--- a/src/main.jsx
+++ b/src/main.jsx
@@ -1,10 +1,25 @@
 import React from 'react'
 import ReactDOM from 'react-dom/client'
+import { ThemeProvider, createTheme } from '@mui/system';
 import App from './App'
 import './index.css'

+const theme = createTheme({
+  palette: {
+    text: 'rgba(255, 255, 255, 0.87)',
+    button: {
+      background: '#1a1a1a',
+      hover: {
+        border: '#646cff'
+      }
+    }
+  },
+});
+
 ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
-    <App />
+    <ThemeProvider theme={theme}>
+      <App />
+    </ThemeProvider>
   </React.StrictMode>,
 )

```

**src/App.jsx**

```diff
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -1,9 +1,34 @@
 import { useState } from 'react'
-import ButtonUnstyled from '@mui/base/ButtonUnstyled';
+import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
+import { styled } from '@mui/system';
 import reactLogo from './assets/react.svg'
 import viteLogo from '/vite.svg'
 import './App.css'
+
+
+
+const StyledButton = styled(ButtonUnstyled)(
+  ({ theme }) => `
+    border-radius: 8px;
+    border: 1px solid transparent;
+    padding: 0.6em 1.2em;
+    font-size: 1em;
+    font-weight: 500;
+    font-family: inherit;
+    background-color: ${theme.palette.button.background};
+    cursor: pointer;
+    transition: border-color 0.25s;
+
+    &:hover {
+      border-color: ${theme.palette.button.hover.border};
+    };
+
+    &:focus,
+    &.${buttonUnstyledClasses.focusVisible} {
+      outline: 4px auto -webkit-focus-ring-color;
+    }
+  `
+)

 function App() {
   const [count, setCount] = useState(0)
@@ -20,9 +45,9 @@ function App() {
       </div>
       <h1>Vite + React</h1>
       <div className="card">
-        <ButtonUnstyled onClick={() => setCount((count) => count + 1)}>
+        <StyledButton onClick={() => setCount((count) => count + 1)}>
           count is {count}
-        </ButtonUnstyled>
+        </StyledButton>
         <p>
           Edit <code>src/App.jsx</code> and save to test HMR
         </p>

```
