# Material UI - React Router example in TypeScript

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #target-branch-reference -->

```bash
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2 material-ui-master/examples/material-ui-react-router-ts
cd material-ui-react-router-ts
```

Install it and run:

```bash
npm install
npm run dev
```

or:

<!-- #target-branch-reference -->

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/mui/material-ui/tree/master/examples/material-ui-react-router-ts)

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mui/material-ui/tree/master/examples/material-ui-react-router-ts)

## The idea behind the example

<!-- #host-reference -->

This example demonstrates how you can use Material UI with [React Router](https://reactrouter.com/) in [TypeScript](https://github.com/Microsoft/TypeScript).
It includes `@mui/material` and its peer dependencies, including [Emotion](https://emotion.sh/docs/introduction), the default style engine in Material UI.

## What's next?

<!-- #host-reference -->

You now have a working example project.
You can head back to the documentation and continue by browsing the [templates](https://mui.com/material-ui/getting-started/templates/) section.

## Emotion Package Patching Scripts

The `predev` script automatically runs before `npm run dev` to add `"type": "module"`
to @emotion packages to resolve ESM/CJS compatibility issues with Vite 6 in development.

The script does not run on production builds.

### ✅ Supported

- **npm** - Full support
- **pnpm** - Full support (works with symlinks)
- **yarn v1 (classic)** - Full support
- **yarn v2+ with nodeLinker: node-modules** - Full support

### ❌ Not Supported

- **yarn v2+ with PnP** - Cannot modify packages in PnP mode

### Usage

#### Automatic (Recommended)

The `predev` script automatically runs before `npm run dev`:

```bash
npm run dev    # Automatically patches then starts dev server
pnpm dev       # Also works with pnpm
yarn dev       # Also works with yarn
```

#### Manual

```bash
# Patch packages
npm run patch:emotion

# Unpatch packages (restore originals)
npm run unpatch:emotion
```

### How It Works

1. **Detects package manager** by checking for lock files
2. **Finds @emotion packages** in `node_modules/@emotion/*`
3. **Modifies package.json** files to add `"type": "module"`
4. **Provides feedback** on success/failure

### Notes

- Patches are lost when reinstalling packages
- The `predev` script ensures patches are reapplied automatically
- For Yarn PnP users: add `nodeLinker: node-modules` to `.yarnrc.yml`
