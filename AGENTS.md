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

These guidelines only apply for errors thrown from public packages.

Every error message must:

1. **Say what happened** - Describe the problem clearly
2. **Say why it's a problem** - Explain the consequence
3. **Point toward how to solve it** - Give actionable guidance

Format:

<!-- markdownlint-disable MD038 -->

- Prefix with `MUI: `
- Use string concatenation for readability
- Include a documentation link when applicable (`https://mui.com/r/...`)

#### Error Minifier

Use the `/* minify-error */` comment to activate the babel plugin:

```tsx
throw /* minify-error */ new Error(
  'MUI: Expected valid input target. ' +
    'Did you use a custom `inputComponent` and forget to forward refs? ' +
    'See https://mui.com/r/input-component-ref-interface for more info.',
);
```

The minifier works with both `Error` and `TypeError` constructors.

#### After Adding/Updating Errors

Run `pnpm extract-error-codes` to update `docs/public/static/error-codes.json`.

**Important:** If the update created a new error code, but the new and original message have the same number of arguments and semantics haven't changed, update the original error in `error-codes.json` instead of creating a new code.

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
- Prefer testing components with full interactions using `user.*` methods. Avoid `fireEvent` and `setProps` if possible.
- If tests require the browser because, for example, they require layout measurements, restrict it to the Chromium env by using `it.skipIf(isJsdom())` or `describe.skipIf(isJsdom())` (search other tests for example usage if unsure).

```js
import { createRenderer } from '@mui/internal-test-utils';

describe('Button', () => {
  const { render } = createRenderer();

  it('renders children', async () => {
    const handleClick = vi.fn();
    const { getByRole, user } = render(<Button onClick={handleClick}>Hello</Button>);

    const button = getByRole('button');
    expect(button).to.have.text('Hello');

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Imports

Use one-level deep imports to avoid bundling entire packages:

```js
import Button from '@mui/material/Button'; // Good
import { Button } from '@mui/material'; // Avoid in packages
```

## Agent Skills

Packaged guidance for common integration topics lives under `skills/`. Each skill is a self-contained directory:

| Skill                                                                  | Focus                                                       |
| :--------------------------------------------------------------------- | :---------------------------------------------------------- |
| [skills/material-ui-styling](./skills/material-ui-styling/AGENTS.md)   | `sx`, `styled()`, theme overrides, slots, global CSS        |
| [skills/material-ui-theming](./skills/material-ui-theming/AGENTS.md)   | `createTheme`, design tokens, `colorSchemes`, CSS variables |
| [skills/material-ui-nextjs](./skills/material-ui-nextjs/AGENTS.md)     | App/Pages Router, Emotion cache, `next/font`, `Link`, SSR   |
| [skills/material-ui-tailwind](./skills/material-ui-tailwind/AGENTS.md) | Tailwind v4 `@layer`, `enableCssLayer`, v3 interop          |

Read the relevant `AGENTS.md` when helping users with those topics.

## Pre-PR Checklist

1. `pnpm prettier` - Format code
2. `pnpm eslint` - Pass linting
3. `pnpm typescript` - Pass type checking
4. `pnpm test:unit` - Pass unit tests
5. If API changed: `pnpm proptypes && pnpm docs:api`
6. If demos changed: `pnpm docs:typescript:formatted`
7. If `.md` files changed: `pnpm vale <file1> <file2> ...` - Check prose style and grammar

## PR Title Format

`[component] Imperative description`

Examples:

- `[button] Add loading state`
- `[docs] Fix typo in Grid documentation`
