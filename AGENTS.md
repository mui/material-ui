# AGENTS.md

This file provides guidance for AI agents working with code in this repository.

## Package Manager

**Only pnpm is supported** (yarn/npm will fail). Use the `-F` flag for workspace operations:

```bash
pnpm -F @mui/material add some-package    # Add dependency to a package
pnpm -F @mui/material build               # Build a specific package
```

Never use `cd` to navigate into package directories for commands.

## Common Commands

### Development

```bash
pnpm install                  # Install deps if necessary
pnpm docs:dev                 # Start docs dev server only
```

### Building

```bash
pnpm release:build            # Build all packages (except docs)
pnpm docs:build               # Build documentation site
```

### Testing

```bash
pnpm test:unit                # Run all unit tests (jsdom)
pnpm test:unit ComponentName  # Run tests matching pattern
pnpm test:unit -t "test name" # Grep for specific test name
pnpm test:browser             # Run tests in real browsers (Chrome, Firefox, WebKit)
pnpm test:e2e                 # End-to-end tests
pnpm test:regressions         # Visual regression tests
```

### Code Quality

```bash
pnpm prettier                 # Format staged changes
pnpm eslint                   # Lint with cache
pnpm typescript               # Type check all packages
```

### API Documentation

After changing component props or TypeScript declarations:

```bash
pnpm proptypes && pnpm docs:api
```

### Docs demos

Always author the TypeScript version of the demos. To generate the JavaScript variant, run:

```bash
pnpm docs:typescript:formatted
```

## Architecture

This is a monorepo managed by Lerna with Nx for caching. Key packages:

- `@mui/material` - Core Material UI components
- `@mui/system` - Styling system (sx prop, styled, theme)
- `@mui/lab` - Experimental components (new components go here first)
- `@mui/joy` - Joy UI design system (beta, development on hold)
- `@mui/icons-material` - Material Design icons
- `@mui/utils` - Internal utilities
- `@mui/styled-engine` - CSS-in-JS abstraction (Emotion by default)

Internal packages (not published): `@mui-internal/*`, `@mui/internal-*`

## Code Conventions

### TypeScript

- Use `interface` (not `type`) for component props
- Export `{ComponentName}Props` interface from component files
- Path aliases available: `@mui/material` → `./packages/mui-material/src`

### Errors

For user-facing errors, in our public packages, we use the following writing style

> What makes a good error message:
>
> 1. Say what happened
> 2. Say why it's a problem
> 3. Point toward how to solve the problem

For these errors, make use of the error minifier babel plugin which can be activated with the `/* minify-error */` comment.

Examples:

```tsx
throw /* minify-error */ new Error(
  'MUI: Expected valid input target. ' +
    'Did you use a custom `inputComponent` and forget to forward refs? ' +
    'See https://mui.com/r/input-component-ref-interface for more info.',
);
```

### Component Structure

```text
packages/mui-material/src/Button/
├── Button.tsx           # Component implementation
├── Button.d.ts          # TypeScript declarations (for JSDoc API docs)
├── Button.test.js       # Unit tests
├── buttonClasses.ts     # CSS classes
└── index.ts             # Public exports
```

### Testing

- Use `createRenderer()` from `@mui/internal-test-utils`
- Use Chai BDD-style assertions (`expect(x).to.equal(y)`)
- Custom matchers: `toErrorDev()`, `toWarnDev()` for console assertions

```js
import { createRenderer } from '@mui/internal-test-utils';

describe('Button', () => {
  const { render } = createRenderer();

  it('renders children', () => {
    const { getByRole } = render(<Button>Hello</Button>);
    expect(getByRole('button')).to.have.text('Hello');
  });
});
```

### Imports

Use one-level deep imports to avoid bundling entire packages:

```js
import Button from '@mui/material/Button'; // Good
import { Button } from '@mui/material'; // Avoid in packages
```

## Pre-PR Checklist

1. `pnpm prettier` - Format code
2. `pnpm eslint` - Pass linting
3. `pnpm typescript` - Pass type checking
4. `pnpm test:unit` - Pass unit tests
5. If API changed: `pnpm proptypes && pnpm docs:api`
6. If demos changed: `pnpm docs:typescript:formatted`

## PR Title Format

`[product-name][Component] Imperative description`

Examples:

- `[material-ui][Button] Add loading state`
- `[docs] Fix typo in Grid documentation`
