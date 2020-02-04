---
description: Here are the most significant improvements in March.
---

# March 2019 Update

Olivier Tassinari. April 5, 2019.

Here are the most significant improvements in March:

- We have removed the old styles modules 💅.
Be aware [of the difference](/customization/default-theme/#material-ui-core-styles-vs-material-ui-styles) between `@material-ui/core/styles` and `@material-ui/styles`.
- The community has helped us to add many TypeScript demo variants. In order to minimize the overhead of handling two variants per demo (JavaScript & TypeScript), the JavaScript variant is generated from the TypeScript variant. If you are using TypeScript, you can ignore the `.propTypes =` assignations.
- We have migrated a few demos from the `withStyles()` API to the `makeStyles()` API.
If you are wondering which you should use, we would encourage the use of `makeStyles()` where possible. `withStyles()` is interesting for overriding component styles or for handling legacy class logics.
- We have made the [Box API](/system/basics/) stable 🥳.
  ```diff
  -import { unstable_Box as Box } from '@material-ui/core/Box';
  +import Box from '@material-ui/core/Box';
  ```
- We have committed to [a new Roadmap](/discover-more/roadmap/) (prioritized) for the next 6 months.
- We have migrated 50% of the codebase from the Classes API to the Hooks API. Once we are done with this task we can remove the internal usage of higher-order components.
- We have introduced [a simplified server-side rendering API](/styles/advanced/#server-side-rendering), inspired by styled-components.

## Our roadmap intent for April

*(We'll do our best, no guarantee!)*

- We are almost done with [the v4.0.0-alpha breaking changes](https://github.com/mui-org/material-ui/issues/13663). You can already find [the upgrade path](/guides/migration-v3/) from v3 to v4 in the documentation. Next, we will release the first beta version (no more breaking changes).
The results of the Material-UI developer survey suggested that there are too many breaking changes.
Don't worry, it's almost over! We will focus on providing more components once we have released v4 stable.
- We will continue, and hopefully complete, the tasks we undertook:
  - TypeScript demo variants.
  - Migration from Classes to Hooks, removal of unnecessary internal components.
  - Removal of `findDOMNode()`, support of `StrictMode`, forward of references.
- ❓ Please upvote our [GitHub issues](https://github.com/mui-org/material-ui/issues) if you want something specific. The number of 👍 helps us to prioritize.
