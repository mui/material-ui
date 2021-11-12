---
title: Introducing MUI X v5.0
description: We are excited to introduce MUI X v5.0.0!
date: 2021-11-12T00:00:00.000Z
authors:
  ['oliviertassinari', 'm4theushw', 'flaviendelangle', 'DanailH', 'alexfauquette']
card: true
---

We are excited to introduce [MUI X v5.0.0](https://github.com/mui-org/material-ui-x/releases/tag/v5.0.0)!

<!-- TODO: upload a MUI X v5 specific banner -->
<img src="/static/blog/mui-x-v5/card.png" alt="" style="width: 100%; margin-bottom: 16px;" />

This release features some major highlights:

- [High-level goals for v5](#high-level-goals-for-v5)
- [A new virtualization engine](#a-new-virtualization-engine)
- [Improved state management](#improved-state-management)
- [Reduced style specificity for easier customization](#reduced-style-specificity-for-easier-customization)
  - [Limitations](#limitations)
- [Features highlights](#features-highlights)
- [v4 migration](#v4-migration)
  - [Change of the package names](#change-of-the-package-names)
  - [Change of the styling solution](#change-of-the-styling-solution)
- [What's next?](#whats-next)
  - [A public roadmap](#a-public-roadmap)
- [Thank you](#thank-you)

## High-level goals for v5

## A new virtualization engine

The `DataGrid` and `DataGridPro` features a brand-new virtualization engine.
We decided to rewrite it completely to address the many issues raised by the community and to make easier to release new features that impact the rendering of rows and columns.
One of the many advantages over the previous version is that now we use the native scroll.
This means that scrolling the grid is like scrolling a webpage.
The jittering caused when the scroll is overridden is gone.
Another advatange is that scrolling horizontally will have the same performance as scrolling vertically.

To summarize, the new virtualization has the following features:

- Scrolling runs at 40 FPS, on average
- Same performance for horizontal and vertical scroll
- No more jumps when changing the rendered rows
- Better performance on mobile devices
- Calling `apiRef.current.scrollToIndexes` works no matter where the cell is
- Improved support for when virtualization is disabled.

## Improved state management

Several improvements were made to our state management to improve developer experience, performances and consistency in the execution order.

#### Improve the developer experience around the state

To improve developer experience for both the X-team and developers using the `apiRef` features, we are working on making the state structure and the tools to access it as easy to understand as possible.

- We removed the `state` structure from the public API. Access data in the state should always be done through `apiRef` methods (`apiRef.current.getSelectedRows`) or selectors (`selectedGridRowsSelector`).
- We renamed most selectors to have a consistent naming convention
- We restructured our state so that each feature has a single sub state and is the only one to update it (`state.filter` is only managed by our `useGridFilter` hooks which exposes methods for both internal and 3rd party code to interact with this state).

The work on that topic is far from over. We have several topics on progress or under discussion to improve the developing experience of people using the advanced features of the grid.
Here are a few that should be release in the following months:

- Strict typing of the event listeners and publishers
- Examples for the event listeners
- Documentation and examples for the selectors
- Ability to simplify export and restore some parts of the grid state

#### Synchronous state initialization

In the previous versions, the state was at first populated with default values, and then in a `useEffect`, we were applying the values given as props (`props.pageSize` for instance) or derived from the props (the sorted and filtered rows derived from the `props.rows`, `props.sortModel` and `props.filterModel`).
This was causing an additional re-render with useless data and the X-team had to stay careful to avoid flickering between those fake data and the real ones.
In v5, the state is initialized synchronously during the first render.

Note that for now the state updates coming from controlled props are still asynchronous. 
If you pass a `props.pageSize`, we will apply it to the state in a `useEffect` and therefore is you read the state just after the render (for instance in a `useLayoutEffect`), you will still see the old version.

## Reduced style specificity for easier customization

In previous versions most of the `DataGrid` and `DataGridPro` components had a CSS specificity of 2, meaning that style overrides and customizations were harder, requiring the developer to look at the DOM tree in order to pick the correct selector.
With MUI X v5.0.0 we have reduced the CSS specificity of most of the internal `DataGrid` and `DataGridPro` components to 1.
This will enable developers to more easily change the look and feel of the grid's components.

**Before**

```js
const useStyles = makeStyles(() => ({
  root: {
    '& .MuiDataGrid-toolbarContainer': {
      padding: 50,
    },
  },
}));

const MyCustomToolbar = () => {
  return <GridToolbarContainer>My custom toolbar</GridToolbarContainer>;
};

export default function App() {
  const classes = useStyles();

  return (
    <div style={{ height: 400, width: '100%' }} className={classes.root}>
      <DataGrid
        components={{
          Toolbar: MyCustomToolbar,
        }}
      />
    </div>
  );
}
```

**After**

```js
const useStyles = makeStyles(() => ({
  root: {
    padding: 50,
  },
}));

const MyCustomToolbar = () => {
  const classes = useStyles();

  return (
    <GridToolbarContainer className={classes.root}>
      My custom toolbar
    </GridToolbarContainer>
  );
};

export default function App() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        components={{
          Toolbar: MyCustomToolbar,
        }}
      />
    </div>
  );
}
```

#### Limitations

Although this was a clear improvement we still had to keep the style specificity of 2 for some parts of the `DataGrid` and `DataGridPro`, more specifically the `GridColumnHeaderItem`, `GridRow` and `GridCell` along with all components that are nested in them.
This is due to performance implications related to how Emotion injects styles into the page.
To keep the performance of our virtualization engine at its optimal we decided to keep the CSS specificity of 2 for the mentioned components.

## Features highlights

<!-- TODO: add subsections for the features we want to mentune, if any -->

## v4 migration

### Change of the package names

### Change of the styling solution

## What's next?

### A public roadmap

You can view our public roadmap on GitHub to learn about what features we're working on, what stage they're at, and when we expect to bring them to you:

- [MUI X](https://github.com/mui-org/material-ui-x/projects/1)

## Thank you
