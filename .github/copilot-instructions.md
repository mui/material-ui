# Material UI Copilot Instructions

## Project Overview

Material UI is a monorepo containing multiple packages (Material UI, Joy UI, System, Base) with ~80+ React components implementing Google's Material Design and custom design systems. Uses pnpm workspaces, Lerna for versioning, and Nx for build orchestration.

## Repository Structure

- **`packages/`** - Core packages: `mui-material` (main), `mui-system` (styling), `mui-joy` (experimental), `mui-base`, `mui-utils`
- **`docs/`** - Next.js documentation site with interactive component demos
- **`examples/`** - Template projects (Next.js, Vite, CRA, etc.)
- **`test/`** - Regression tests, e2e tests, bundle size tracking

## Key Build & Test Commands

```bash
pnpm build                 # Build all packages (excluding docs)
pnpm test:unit            # Run unit tests with Vitest
pnpm test:node            # Unit tests (node environment)
pnpm test:browser         # Unit tests (browser environment)
pnpm test:e2e             # End-to-end tests
pnpm test:regressions     # Visual regression tests
pnpm docs:dev             # Dev server for docs
pnpm eslint               # Lint workspace
pnpm prettier             # Format code
```

## Component Architecture Patterns

### File Structure Per Component

Each component follows this structure (e.g., `Button`):

```
Button/
├── Button.d.ts            # Type definitions
├── Button.spec.tsx        # Type tests (expectType assertions)
├── buttonClasses.ts       # Class definitions & utilities
├── index.ts               # Main export
```

### Required TypeScript Conventions

**Props Interface** - Use `interface` not `type`:

- Export `{ComponentName}Props` from component
- Export `{ComponentName}Classes` from `{component}Classes.ts`
- Document `sx` prop: `sx?: SxProps<Theme>`

**CSS Classes** - Prefixed with MUI namespace:

```ts
// buttonClasses.ts
export interface ButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied if variant="text". */
  text: string;
}

export function getButtonUtilityClass(slot: string) {
  return generateUtilityClass('MuiButton', slot);
}
```

**Utility Function** - Generate class names from state:

```ts
const useUtilityClasses = (ownerState: ButtonProps) => {
  const { variant, disabled, classes } = ownerState;
  return composeClasses(
    { root: ['root', variant, disabled && 'disabled'] },
    getButtonUtilityClass,
    classes,
  );
};
```

### Slot-Based Props System

Components use `slotProps` pattern for sub-component customization:

```tsx
<Button
  slotProps={{
    root: { className: 'custom' },
    startIcon: { sx: { color: 'red' } },
  }}
/>
```

Codemods in `mui-codemod/deprecations/` automate migration from old props to `slotProps`.

## Styling System

### Theming & Customization

- **`@mui/system`** provides `sx` prop and theme utilities
- **Theme object** - Created via `createTheme()`, includes palette, typography, spacing, breakpoints
- **CSS Layers** - Organized as: `@layer mui.global`, `@layer mui.components`, `@layer mui.theme`, `@layer mui.sx`
- **CSS Variables** - Modern themes use CSS variables (e.g., `var(--joy-palette-primary-500)`)

### Emotion/Styled-Components

Components use `@emotion/styled` by default (peer dependency). Supports swapping for `styled-components` via `@mui/material-pigment-css`.

## Testing Strategy

### Unit Tests (Vitest)

- **File naming**: `*.spec.tsx` for components, `*.test.ts` for utilities
- **Environment**: Auto-detected via `TEST_SCOPE` env var (node/browser)
- **Configuration**: `vitest.shared.mts` defines base setup
- Run tests: `pnpm test:unit --project="*:@mui/material"`

### Type Tests

- Use `expectType<Expected, Actual>()` from `@mui/types` in `.spec.tsx` files
- Validate TS props inference, polymorphic component `component` prop handling

### Regression/E2E Tests

- Visual regression tests in `test/regressions/`
- E2E tests in `test/e2e-website/` (Playwright)
- Screenshots compared via Argos

## API Documentation Generation

**Automated from JSDoc comments:**

- `/** @deprecated ... */` tags auto-populate API docs
- Class descriptions from JSDoc comments in `*Classes.ts`
- `slotProps` documentation extracted from interface definitions
- Build with: `pnpm docs:api:build`

## Versioning & Publishing

- **Independent versioning** (Lerna) - packages can have different versions
- **Private packages** - marked in `package.json` to skip publishing
- **Workspace dependencies** - use `workspace:^` for internal refs
- Release workflow in `scripts/releaseChangelog.mjs`, `scripts/releasePack.mts`

## Dependency Management

- **pnpm only** - enforced by `preinstall` script (not npm/yarn)
- **Dedupe** - run `pnpm deduplicate` to resolve conflicts
- **Peer dependencies** - React 17+, Emotion/styled-components optional

## Developer Patterns

### When Modifying Components

1. Update props interface in `Component.d.ts` or `ComponentProps` definition
2. Update classes in `*Classes.ts` with JSDoc comments (for API docs)
3. Update utility function to handle new state
4. Add/update `.spec.tsx` type tests
5. Run `pnpm test:unit` for that package

### When Updating Docs

- Component demos go in `docs/data/material/{component-name}/`
- Add TypeScript `.tsx` demos for code snippets
- Use codesandbox/stackblitz integrations for live playgrounds
- Rebuild: `pnpm docs:api && pnpm docs:build`

### Working with Codemods

- Codemods in `packages/mui-codemod/src/deprecations/` automate API migrations
- Each deprecation has PostCSS plugins for class name updates
- Example: `accordion-summary-classes/` codemods deprecated combined classes

## Git Workflow

- Target branch: `master`
- PR scope: keep changes focused (one feature/fix per PR)
- Commits analyzed for changelog generation
- GitHub branch protection requires passing CI checks

## Common File Patterns to Reference

- **Component example**: `packages/mui-material/src/Button/`
- **Theme setup**: `packages/mui-system/src/createTheme/`
- **API builder**: `packages/api-docs-builder/` (JSDoc → documentation)
- **System provider**: `packages/mui-private-theming/`
- **TypeScript types**: `packages/mui-types/`

## Important Notes

- Avoid breaking changes - Material UI v6+ prioritizes stability
- Components must support ref forwarding via `React.forwardRef()`
- Always use composition over inheritance for component extension
- Document all public APIs with JSDoc for auto-generated docs
- Run lint/prettier before pushing: `pnpm prettier && pnpm eslint`
