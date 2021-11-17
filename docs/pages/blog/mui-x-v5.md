---
title: Introducing MUI X v5.0
description: We are excited to introduce MUI X v5.0.0!
date: 2021-11-12T00:00:00.000Z
authors:
  ['oliviertassinari', 'm4theushw', 'flaviendelangle', 'DanailH', 'alexfauquette']
card: true
---

We are excited to introduce [MUI X v5.0.0](https://github.com/mui-org/material-ui-x/releases/tag/v5.0.0)!

<img src="/static/blog/mui-x-v5/card.png" alt="" style="width: 100%; margin-bottom: 16px;" />

This release features some major highlights:

- [High-level goals for v5](#high-level-goals-for-v5)
- [A new virtualization engine](#a-new-virtualization-engine)
- [Improved state management](#improved-state-management)
  - [Improve the developer experience around the state](#improve-the-developer-experience-around-the-state)
  - [Synchronous state initialization](#synchronous-state-initialization)
- [Reduced style specificity for easier customization](#reduced-style-specificity-for-easier-customization)
  - [Limitations](#limitations)
- [v4 migration](#v4-migration)
- [What's next?](#whats-next)
  - [Public roadmap](#public-roadmap)
- [Thank you](#thank-you)

## High-level goals for v5

## A new virtualization engine

`DataGrid` and `DataGridPro` now feature a brand-new virtualization engine!
We decided to rewrite it completely to address the many issues raised by the community and to make easier to release new features that impact the rendering of rows and columns.
An advantage over the previous version is that now we use the native scroll.
This means that scrolling the grid is like scrolling a webpage.
The jittering caused when the scroll is overridden is gone.

Talking about performance, one of the main problems we had was that scrolling horizontally was too laggy compared to vertical scrolling.
After investigation, it was found that, although the columns were virtualized, a lot of unnecessary renders were occurring.
This can be seen in the top part of the screenshot below, where it compares `v5.0.0-beta.4` (the last version before the new virtualization) with `v5.0.0`.
On each scroll event, it renders again and each frame takes a long time to be drawn (some are even lost).
To address these problems, we took the following actions:

- Avoid rendering the entire grid during scroll
- Pass the correct value to the `key` prop to ensure that React will reuse the existing DOM nodes
- Reduce the number of event listeners attached to each cell
- Increase the number of columns rendered in the overscan (the extra columns rendered to make scroll smoother)
- Delaying the rendering of new columns whenever it was possible

The result of these actions is on the bottom part of the comparison.
The number of frames that could be drawn in the same amount of time dramatically increased, compared to the previous virtualization.
In our [benchmark](https://github.com/mui-org/material-ui-x/pull/2673), the FPS (frames per second) went from 22 to 42, on average.
The time each frame takes to be rendered, indicated by the width of each block, was reduced.
The idea of delaying the re-rendering also can be seen in the large voids between the blocks.
Each void means that a re-render was not necessary since the required columns were already rendered by the overscan.

![Performance comparison between v5.0.0-beta.4 and v5.0.0](https://user-images.githubusercontent.com/42154031/141475697-11281f83-9a2f-4a2b-8001-f459cbdccbd8.png)

Some of the mentioned improvements were also applied to the rows, however, the gains were more subtle.
Besides the better performance, the new virtualization also brings the following fixes:

- Horizontal and vertical scroll share the same logic
- No more jumps when changing the rendered rows
- Calling `apiRef.current.scrollToIndexes` works no matter where the cell is
- Improved support for when virtualization is disabled
- Fix keyboard navigation with arrow keys.

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

```jsx
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

```jsx
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

## v4 migration

We strongly recommend you migrate MUI X to v5. In MUI X v5 we have not only added additional features but also spent time to do internal improvements and performance optimizations that we won't be included in v4. All new `DataGrid` and `DataGridPro` features will be only available on MUI X v5.
You can check [this page](https://mui.com/components/data-grid/migration-v4/) to learn more about migrating to v5.

## What's next?

More exciting things are coming! We have big plans for the rest of this quarter in terms of features we expect to release in both the `DataGrid` and `DataGridPro` components. Features such as **tree data**, **column pinning**, and **variable row height** are part of our roadmap.

### Public roadmap

You can view our public roadmap on GitHub to learn about what features we're working on, what stage they're at, and when we expect to bring them to you:

- [MUI X](https://github.com/mui-org/material-ui-x/projects/1)

## Thank you

Finally, one last thank you to everyone who's contributed to MUI X v5.
We are very excited about this release and we will continue to push forward and deliver the next generation of Enterprise React UI components!
It's just the beginning.
