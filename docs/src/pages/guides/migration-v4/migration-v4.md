# Migration from v4 to v5

<p class="description">Yeah, v5 has been released!</p>

Looking for the v4 docs? [Find them here](https://material-ui.com/versions/).

> This document is a work in progress.
Have you upgraded your site and run into something that's not covered here?
[Add your changes on GitHub](https://github.com/mui-org/material-ui/blob/master/docs/src/pages/guides/migration-v3/migration-v3.md).

## Introduction

This is a reference for upgrading your site from Material-UI v4 to v5.
While there's a lot covered here, you probably won't need to do everything for your site.
We'll do our best to keep things easy to follow, and as sequential as possible so you can quickly get rocking on v5!

## Why you should migrate

This documentation page covers the *how* of migrating from v4 to v5.
The *why* is covered in the [release blog post on Medium](https://medium.com/material-ui/material-ui-v4-is-out-4b7587d1e701).

## Updating your dependencies

The very first thing you will need to do is to update your dependencies.

### Update Material-UI version

You need to update your `package.json` to use the latest version of Material-UI.

```json
"dependencies": {
  "@material-ui/core": "^5.0.0"
}
```

Or run

```sh
npm install @material-ui/core

or

yarn add @material-ui/core
```

## Handling breaking changes

### Divider

- [Divider] Use border instead of background color. It prevents inconsistent height on scaled screens. For people customizing the color of the border, the change requires changing the override CSS property:

  ```diff
  .MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### Typography

- [Typography] Replace `srOnly` prop support with a style util:

  ```diff
  -import Typography from '@material-ui/core/Typography';
  +import { visuallyHidden } from '@material-ui/system';
  +import styled from 'styled-component';

  +const Span = styled('span')(visuallyHidden);

  -<Typography variant="srOnly">Create a user</Typography>
  +<Span>Create a user</Span>
  ```
