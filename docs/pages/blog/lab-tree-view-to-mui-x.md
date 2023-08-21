---
title: The Tree View is moving to MUI X
description: Migrate to the new package to start building with our powerful Tree View, now part of MUI X. Previously released MIT components will stay MIT.
date: 2023-08-21T00:00:00.000Z
authors: ['flaviendelangle']
tags: ['MUI X', 'News']
card: true
---

After more than 4 years in the lab, the [Tree View](https://mui.com/x/react-tree-view/) components have found a new home as part of MUI X.
This means we'll be dedicating even more time and effort to these complex components, to better meet the needs of both you and your users.

## TL;DR

- The Tree View is one step closer to a stable release.
- **No surprise licenses changes**. We are staying true to [our promises](https://mui-org.notion.site/Stewardship-542a2226043d4f4a96dfb429d16cf5bd).
  What's MIT stays MIT.
  Therefore, all the existing features and future features of the Tree View will remain MIT and free to use.
- Follow the [migration steps](/x/migration/migration-tree-view-lab/)

## What is the Tree View?

The Tree View is a component to represent hierarchical data presented as nodes in a tree-like format.

The component allows to select one or multiple nodes.

<video preload="metadata" style="margin-bottom: 16px;" autoplay muted loop>
  <source src="/static/blog/lab-tree-view-to-mui-x/treeview.mov" type="video/mp4">
</video>

## What is MUI X?

[MUI X](/x/) is a collection of advanced components built for complex use cases.

As opposed to the MUI Core library, which leans on the open-source community for support, MUI X components require several full-time developers dedicated to engineering and ongoing maintenance.

MUI X components are available under two licenses:

- MUI X is MIT licensed, so it's free to use.
- MUI X Pro includes the most advanced features and is commercially licensed.

## Why did the Tree View move to MUI X?

When the Tree View component was ready to leave the lab, we had a choice to make: live in the MUI Core library or become a part of MUI X?

This component would greatly benefit from advanced features such as virtualization of drag and drop.

Given the complex nature of these features, we decided that it would benefit most from the dedicated attention that they would receive from the X team.

The Tree View components is now available in the `@mui/x-tree-view` package which has a [MIT license](https://unpkg.com/browse/@mui/x-tree-view/LICENSE).

## How do I migrate?

Follow the [migration steps](/x/migration/migration-tree-view-lab/) by updating the package name and change from a default export to a named export:

```diff
-import TreeView from '@mui/lab/TreeView';
+import { TreeView } from '@mui/x-tree-view/TreeView';

-import { TreeView, TreeItem } from '@mui/lab';
+import { TreeView, TreeItem } from '@mui/x-tree-view';
```

We have prepared a codemod to help you migrate your codebase from `@mui/lab` to `@mui/x-tree-view`:

```bash
npx @mui/codemod v5.0.0/tree-view-moved-to-x <path>
```

## Where is the Tree View documentation?

You can find the documentation for the Tree View component in the [MUI X docs](/x/react-tree-view/).

## What's next for the Tree View?

For now, `@mui/x-tree-view` is in alpha.
Our next goal is to work on the stability and API consistency of its components to prepare a stable release on the next few months.

Please feel free to try out the component and provide any feedback you may have.

We also have a dedicated channel in our [Discord Server](https://mui.com/r/discord/) for you to provide any feedback or concerns you have with Tree View.

Happy building!
