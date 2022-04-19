# Quick start

<p class="description">3 easy steps to get started with Joy UI, the React components for building your design system.</p>

## Manual installation

One quick option is to use [CRA (create react app)](https://create-react-app.dev/docs/getting-started) to help you set up React and the development server. 

### 1. Creating a project

We recommend using `npm` or `yarn`. Open the terminal and navigate to the directory that you want to create the project, then follow the commands below. 

#### npm

```sh
npm init react-app spark-joy
cd spark-joy
npm install @mui/joy @emotion/react @emotion/styled
npm start
```

#### Yarn

```sh
yarn create react-app spark-joy
cd spark-joy
yarn add @mui/joy @emotion/react @emotion/styled
yarn start
```

### 2. Setup the Provider

Open `src/App.js` and replace with this snippet.

```jsx
import { CssVarsProvider } from '@mui/joy/styles';

function App() {
  return (
    <CssVarsProvider>
    </CssVarsProvider>
  );
}

export default App;
```

### 3. Render a component

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
