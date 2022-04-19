# Quick start

<p class="description">3 easy steps to get started with Joy UI, the React components for building your design system.</p>

## 1. Creating a project

We recommend using `npm` or `yarn`.

Open the terminal on your machine and navigate to the directory that you want to save the project, then follow the commands below.

### npm

```sh
npm init react-app spark-joy
cd spark-joy
npm install @mui/joy @emotion/react @emotion/styled
npm start
```

### Yarn

```sh
yarn create react-app spark-joy
cd spark-joy
yarn add @mui/joy @emotion/react @emotion/styled
yarn start
```

## 2. Setup the Provider

Open `src/App.js` and replace with this snippet. You should see the text `Hello from Joy` on your browser.

```jsx
import { CssVarsProvider } from '@mui/joy/styles';

function App() {
  return <CssVarsProvider>Hello from Joy</CssVarsProvider>;
}

export default App;
```

## 3. Render a component

All Joy components need to render under the `CssVarsProvider`. Let's render the first component with a button.

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

Save the file and see what it looks like on your browser! (make sure your development server is running).

## What's next

- 👨‍💻👩‍💻 Follow the tutorial to explore other components
- 💎 Check out what Joy can do on the features page
- 📖 Read the Joy's principles to understand what it is for.
