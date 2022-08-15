# Quick start

<p class="description">Get started with Joy, a simple and beautiful starting point for your design system, in 3 quick steps.</p>

## 1. Installation

Install Joy via either npm or yarn using the commands below in your directory of choice.

### npm

```sh
npm init react-app spark-joy
cd spark-joy
npm install @mui/joy @emotion/react @emotion/styled
npm start
```

### yarn

```sh
yarn create react-app spark-joy
cd spark-joy
yarn add @mui/joy @emotion/react @emotion/styled
yarn start
```

## 2. Set up the `CssVarsProvider` component

Go to your `App.js` file and replace it with the code snippet below. You should see the text `Hello from Joy` being rendered on your browser.

```jsx
import { CssVarsProvider } from '@mui/joy/styles';

function App() {
  return <CssVarsProvider>Hello from Joy</CssVarsProvider>;
}

export default App;
```

## 3. Render your first component

To render any Joy component, make sure you place them inside the `CssVarProvider` element. Let's start off with a button.

```diff
import { CssVarsProvider } from '@mui/joy/styles';
+ import Button from '@mui/joy/Button';

function App() {
  return (
    <CssVarsProvider>
+     <Button>Joy UI</Button>
    </CssVarsProvider>
  );
}

export default App;
```

Make sure that your development server is running, save your file and that's it! It's that fast. You're now ready to go on exploring Joy and build amazing UIs.

## Where to go from here?

- 👨‍💻👩‍💻 [See more tutorials](/joy-ui/getting-started/tutorial/) to learn how to use other Joy components
- 💎 Learn about Joy's main features.
- 📖 Learn about Joy's guiding principles and core concepts.
