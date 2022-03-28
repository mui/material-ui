# Learning Resources

<p class="description">New to Material UI? Get up to speed quickly with our curated list of learning resources.</p>

## Your first component

The following code snippet contains everything you need to start building an app with Material UI, beginning with the `<Button>` component:

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

In the interactive demo below, try changing the code and see how it affects the output. (Hint: change `variant` to `"outlined"` and `color` to `"secondary"`. For more options, see the [`Button` component page](components/buttons/).)

{{"demo": "../usage/Usage.js", "hideToolbar": true, "bg": true}}

## Example projects

Visit the [example projects](/getting-started/example-projects/) page to see how we recommend implementing Material UI with various React libraries and frameworks like Next.js, Gatsby, Create React App, and more.

## Templates

Check out our [selection of basic templates](/getting-started/templates/) to get started building your next app more quickly.

## Recommended resources

Beyond our official documentation, there are countless members of our community who create fantastic tutorials and guides for working with Material UI.

The following is a curated list of some of the best third-party resources we've found—both free and paid—for learning how to build beautiful apps with our components.

> **Note:** as of the second quarter of 2022, the paid resources available all refer to outdated versions of Material UI (before v5) so unless you're using an older version, you will be more successful with the free resources.

### Free

- [**Material UI v5 Crash Course**](https://www.youtube.com/watch?v=o1chMISeTC0) video by Laith Harb: everything you need to know to start building with the latest version of Material UI.

- [**React + Material UI - From Zero to Hero**](https://www.youtube.com/playlist?list=PLDxCaNaYIuUlG5ZqoQzFE27CUOoQvOqnQ) video series by The Atypical Developer: build along with this in-depth series, from basic installation through advanced component implementation.

- [**Next.js 11 Setup with Material UI v5**](https://www.youtube.com/watch?v=IFaFFmPYyMI) by Leo Roese: learn how to integrate Material UI into your Next.js app, using Emotion as the style engine.

- [**Create a Responsive Navigation Bar with Material UI v5**](https://www.youtube.com/watch?v=lUkxSnJ7aDw) by Nikhil Thadani: detailed walkthrough using Material UI with Create React App.

- [**The Clever Dev**](https://www.youtube.com/channel/UCb6AZy0_D1y661PMZck3jOw) and [**The Smart Devpreneur**](https://smartdevpreneur.com/category/javascript/material-ui/) by Jon M: dozens of high-quality videos and articles digging deep into the nuts and bolts of Material UI.

### Paid

- [**Implement High Fidelity Designs with Material-UI and ReactJS**](https://www.udemy.com/course/implement-high-fidelity-designs-with-material-ui-and-reactjs/) course by Zachary Reese: Bridge the gap between design & development. Break down detailed designs and bring them to life with Material UI (v4) and React.

- [**Material UI with React**](https://bonsaiilabs.com/courseDetail/material-ui-with-react/) course by bonsaiilabs: Learn the fundamentals of Google Material Design and how to develop an end-to-end flight search and booking application using Material UI and React.

- [**React Material UI Cookbook**](https://www.amazon.com/gp/product/1789615224/) by Adam Boduch: Build modern-day applications by implementing Material Design principles in React, using Material UI.

- [**Builder Book**](https://builderbook.org/) by Kelly and Timur: Learn how to build a full-stack JavaScript and SaaS web application from scratch, using a modern JavaScript stack and Material UI (v4).
