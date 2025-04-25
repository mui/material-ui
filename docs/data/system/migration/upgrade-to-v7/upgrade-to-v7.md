# Upgrade to v7

<p class="description">This guide explains how to upgrade from MUI System v6 to v7.</p>

## Breaking changes

Since v7 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from MUI System v6 to v7 are described below.

### Package layout

The package layout has been updated to use the Node.js exports field. This brings several changes:

Deep imports with more than one level are no longer working, at all (they were already considered private API). For example:

```diff
-import Box from '@mui/system/Box/Box';
+import Box from '@mui/system/Box';
```

This was never officially supported, but will now be restricted by bundlers and runtimes.

To use the modern bundle (which excludes legacy browser support for smaller bundle size), you'll need to configure your bundler to use the "mui-modern" exports condition:

```js
// webpack.config.js
{
  resolve: {
    conditionNames: ['mui-modern', '...'],
  }
}

// vite.config.js
{
  resolve: {
    conditions: ['mui-modern', 'module', 'browser', 'development|production']
  }
}
```
