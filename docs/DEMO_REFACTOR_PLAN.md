# Refactor Demo Component: Make Completely Product-Agnostic

## Overview

The `Demo.js` component and its downstream dependencies contain product-specific logic (checking `productId`, `isJoy`, etc.). We want to make the Demo component **completely product-agnostic** - no product IDs or product checks inside the component tree. Instead, all product-to-value translation happens in `_app.js` and the computed values are passed via context.

**Goal**: The Demo component should work identically whether used in Material UI docs, Joy UI docs, or MUI X docs - it just uses whatever configuration values are provided.

## Current State - Product-Specific Logic

| File | Line | What it does | Should become |
|------|------|--------------|---------------|
| `Demo.js:62-69` | `canonicalAs.startsWith('/joy-ui/')` | Detects product from URL | Context: `productDisplayName` |
| `Demo.js:103` | `title: \`..demo — ${name}\`` | Uses product name in title | Use `productDisplayName` from context |
| `Demo.js:520` | `isJoy={demoData.productId === 'joy-ui'}` | Passes boolean to DemoSandbox | Remove - DemoSandbox uses context |
| `DemoSandbox.js:67-74` | `isJoy ? extendTheme() : createTheme(...)` | Creates different theme | Context: `IframeWrapper` component |
| `DemoSandbox.js:87` | `{isJoy && <JoyIframeObserver .../>}` | Conditionally renders observer | Context: `IframeWrapper` component |
| `CreateReactApp.ts:46-61` | `if (demoData.productId === 'joy-ui')` | Different root index template | Context: `csb.getRootIndex()` |
| `MuiChat.ts:39-51` | `productToPackage[demoData.productId]` | Maps product to npm package | Context: `csb.primaryPackage` |
| `Dependencies.ts:155-162` | `if (!demo.productId && !dependencies['@mui/material'])` | Adds @mui/material fallback | Context: `csb.fallbackDependency` |
| `Dependencies.ts:67,90-94` | `muiDocConfig.csbIncludePeerDependencies` | Global config for peer deps | Context: `csb.includePeerDependencies` |
| `Dependencies.ts:118-120` | `muiDocConfig.csbGetVersions` | Global config for versions | Context: `csb.getVersions` |
| `Dependencies.ts:136-141` | `muiDocConfig.postProcessImport` | Global config for imports | Context: `csb.postProcessImport` |

---

## Target Context Interface

**New File**: `docs/src/modules/components/DemoContext.tsx`

```typescript
import * as React from 'react';

export interface SandboxConfig {
  /**
   * Generates the root index.js/tsx content for CodeSandbox/StackBlitz.
   * Receives codeVariant ('TS' | 'JS') for type assertion.
   */
  getRootIndex: (codeVariant: 'TS' | 'JS') => string;

  /**
   * Primary npm package for this product, used in sandbox generation.
   * e.g., "@mui/material", "@mui/joy", "@mui/x-data-grid"
   */
  primaryPackage: string;

  /**
   * Default dependency to add when generating sandbox (e.g., '@mui/material' for StyledEngineProvider)
   * Used when the root index template requires a specific package.
   */
  fallbackDependency?: { name: string; version: string };

  // === Replaces window.muiDocConfig === //

  /**
   * Hook to add extra peer dependencies to sandbox.
   * Replaces muiDocConfig.csbIncludePeerDependencies
   */
  includePeerDependencies?: (
    deps: Record<string, string>,
    options: { versions: Record<string, string> }
  ) => Record<string, string>;

  /**
   * Hook to override default package versions.
   * Replaces muiDocConfig.csbGetVersions
   */
  getVersions?: (
    versions: Record<string, string>,
    options: { muiCommitRef?: string }
  ) => Record<string, string>;

  /**
   * Hook to resolve custom imports to dependencies.
   * Replaces muiDocConfig.postProcessImport
   */
  postProcessImport?: (importName: string) => Record<string, string> | null;
}

export interface IframeWrapperProps {
  /**
   * The demo content (already cloned with `window` prop by FramedDemo).
   * The wrapper should just render {children} - no cloning needed.
   */
  children: React.ReactElement;
  /** The iframe's document, for setting attributes or observing color scheme */
  document: Document;
  /** If true, the demo is isolated and should not inject theme CSS variables */
  isolated?: boolean;
}

export interface DemoContextValue {
  /**
   * Display name shown in demo titles, e.g., "Material UI", "Joy UI", "MUI X"
   */
  productDisplayName: string;

  /**
   * Optional wrapper component for iframe demo content.
   * Responsible for:
   * - Creating and injecting CSS theme variables (via GlobalStyles)
   * - Any product-specific observers (e.g., JoyIframeObserver)
   *
   * If not provided, defaults to MaterialIframeWrapper (creates Material theme).
   * Pass `null` explicitly to disable iframe wrapping entirely.
   */
  IframeWrapper?: React.ComponentType<IframeWrapperProps> | null;

  /**
   * Configuration for CodeSandbox/StackBlitz sandbox generation.
   * Groups all sandbox-related config (replaces window.muiDocConfig).
   */
  csb: SandboxConfig;
}

export const DemoContext = React.createContext<DemoContextValue | null>(null);

export function useDemoContext(): DemoContextValue {
  const context = React.useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoContext must be used within DemoContext.Provider');
  }
  return context;
}
```

This groups all sandbox-related config under `csb` and replaces `window.muiDocConfig`.

---

## Implementation Plan

### Phase 1: Create DemoContext

**New File**: `docs/src/modules/components/DemoContext.tsx`

Create the context with the interface above. No product-specific logic in this file - just the types and context.

### Phase 2: Configure Context in _app.js

**File**: `docs/pages/_app.js`

All product-to-value translation happens here:

```javascript
import { DemoContext } from 'docs/src/modules/components/DemoContext';
import GlobalStyles from '@mui/material/GlobalStyles';
import { extendTheme, useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { createTheme } from '@mui/material/styles';

// Joy UI iframe wrapper (creates Joy theme + observer)
function JoyIframeWrapper({ children, document, isolated }) {
  const { mode, systemMode } = useJoyColorScheme();

  const iframeTheme = React.useMemo(() => {
    if (isolated) return null;
    return extendTheme();
  }, [isolated]);

  // Joy-specific: sync color scheme attribute
  React.useEffect(() => {
    if (!isolated) {
      document.documentElement.setAttribute('data-joy-color-scheme', systemMode || mode);
    }
  }, [document, mode, systemMode, isolated]);

  return (
    <React.Fragment>
      {iframeTheme && <GlobalStyles styles={iframeTheme.generateStyleSheets?.()} />}
      {children}  {/* Already cloned with window prop by FramedDemo */}
    </React.Fragment>
  );
}

// Material UI iframe wrapper (creates Material theme)
function MaterialIframeWrapper({ children, document, isolated }) {
  const iframeTheme = React.useMemo(() => {
    if (isolated) return null;
    return createTheme({
      colorSchemes: { light: true, dark: true },
      cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
    });
  }, [isolated]);

  return (
    <React.Fragment>
      {iframeTheme && <GlobalStyles styles={iframeTheme.generateStyleSheets?.()} />}
      {children}  {/* Already cloned with window prop by FramedDemo */}
    </React.Fragment>
  );
}

// In AppWrapper component:
const demoContextValue = React.useMemo(() => {
  if (productId === 'joy-ui') {
    return {
      productDisplayName: 'Joy UI',
      IframeWrapper: JoyIframeWrapper,  // Joy needs custom wrapper
      csb: {
        primaryPackage: '@mui/joy',
        getRootIndex: (codeVariant) => `...joy template...`,
      },
    };
  }

  // Default: Material UI (no IframeWrapper needed - uses default MaterialIframeWrapper)
  return {
    productDisplayName: 'Material UI',
    // IframeWrapper not specified = defaults to MaterialIframeWrapper
    csb: {
      primaryPackage: '@mui/material',
      fallbackDependency: { name: '@mui/material', version: 'latest' },
      getRootIndex: (codeVariant) => `...material template...`,
    },
  };
}, [productId]);

// Wrap in provider:
<DemoContext.Provider value={demoContextValue}>
  {children}
</DemoContext.Provider>
```

**Example for MUI X** (in their `_app.js`):
```javascript
const demoContextValue = {
  productDisplayName: 'MUI X',
  IframeWrapper: MaterialIframeWrapper, // Reuse Material wrapper, or omit if not needed
  csb: {
    primaryPackage: '@mui/x-data-grid',
    fallbackDependency: { name: '@mui/material', version: 'latest' },
    getRootIndex: (codeVariant) => `...material template...`,
    // MUI X specific hooks:
    getVersions: (versions, { muiCommitRef }) => ({
      ...versions,
      '@mui/x-data-grid': 'latest',
      '@mui/x-date-pickers': 'latest',
    }),
    includePeerDependencies: (deps, { versions }) => ({
      ...deps,
      '@mui/material': versions['@mui/material'],
    }),
  },
};
```

### Phase 3: Refactor Demo.js

**File**: `docs/src/modules/components/Demo.js`

Remove all product detection:

```javascript
// Before:
let productId;
let name = 'Material UI';
if (canonicalAs.startsWith('/joy-ui/')) {
  productId = 'joy-ui';
  name = 'Joy UI';
} else if (canonicalAs.startsWith('/x/')) {
  name = 'MUI X';
}

// After:
const { productDisplayName } = useDemoContext();
// Use productDisplayName directly - no conditionals

// Before:
<DemoSandbox isJoy={demoData.productId === 'joy-ui'} ...>

// After:
<DemoSandbox ...>  // No isJoy prop needed
```

### Phase 4: Refactor DemoSandbox.js

**File**: `docs/src/modules/components/DemoSandbox.js`

Remove `isJoy` prop, use `IframeWrapper` from context:

```javascript
// Before (FramedDemo):
const { children, document, isJoy, isolated } = props;
const iframeTheme = isJoy ? extendTheme() : createTheme({...});
return (
  <CacheProvider value={cache}>
    {iframeTheme && <GlobalStyles styles={iframeTheme.generateStyleSheets?.()} />}
    {React.cloneElement(children, { window: getWindow })}
    {isJoy && <JoyIframeObserver document={document} isolated={isolated} />}
  </CacheProvider>
);

// After (FramedDemo):
const { IframeWrapper } = useDemoContext();
const { children, document, isolated } = props;
const getWindow = React.useCallback(() => document.defaultView, [document]);

// Clone children with window prop FIRST (always done here)
const clonedChildren = React.cloneElement(children, { window: getWindow });

// Use custom wrapper, default MaterialIframeWrapper, or no wrapper (if null)
const Wrapper = IframeWrapper === undefined ? MaterialIframeWrapper : IframeWrapper;

return (
  <CacheProvider value={cache}>
    {Wrapper ? (
      <Wrapper document={document} isolated={isolated}>
        {clonedChildren}
      </Wrapper>
    ) : (
      clonedChildren
    )}
  </CacheProvider>
);
```

**Note**: `MaterialIframeWrapper` is defined in DemoSandbox.js as the default wrapper.

The `IframeWrapper` component (provided via context) handles:
- Theme creation and GlobalStyles injection
- Product-specific observers (like Joy's color scheme sync)
- Just renders `{children}` - no cloning needed (already done by FramedDemo)

### Phase 5: Refactor CreateReactApp.ts

**File**: `docs/src/modules/sandbox/CreateReactApp.ts`

The `getRootIndex` function should receive the template from context, not generate it:

```typescript
// Before:
export function getRootIndex(demoData: DemoData) {
  if (demoData.productId === 'joy-ui') {
    return `...joy template...`;
  }
  return `...material template...`;
}

// After:
// The function is called from components that have access to context
// Pass getRootIndex from context as a parameter:
export function getRootIndex(getRootIndexFn: (codeVariant: 'TS' | 'JS') => string, codeVariant: 'TS' | 'JS') {
  return getRootIndexFn(codeVariant);
}
```

### Phase 6: Refactor MuiChat.ts

**File**: `docs/src/modules/sandbox/MuiChat.ts`

Remove `productToPackage` mapping, receive `csb.primaryPackage` as parameter:

```typescript
// Before:
const productToPackage = { 'material-ui': '@mui/material', ... };
let primaryPackage = '@mui/material';
if (demoData.productId && productToPackage[demoData.productId]) {
  primaryPackage = productToPackage[demoData.productId];
}

// After:
export function createMuiChat(demoData: DemoData, csbConfig: SandboxConfig) {
  // Use csbConfig.primaryPackage directly
}
```

The calling component gets `csb` from `useDemoContext()` and passes it.

### Phase 7: Refactor Dependencies.ts (replaces muiDocConfig)

**File**: `docs/src/modules/sandbox/Dependencies.ts`

Remove all `window.muiDocConfig` usage, accept `csb` config as parameter:

```typescript
// Before:
export default function SandboxDependencies(demo: Demo, options?: {...}) {
  const muiDocConfig = (window as any).muiDocConfig;
  // ...
  if (muiDocConfig && muiDocConfig.csbIncludePeerDependencies) {
    newDeps = muiDocConfig.csbIncludePeerDependencies(newDeps, { versions });
  }
  // ...
}

// After:
import { SandboxConfig } from 'docs/src/modules/components/DemoContext';

export default function SandboxDependencies(
  demo: Demo,
  options?: { commitRef?: string; devDeps?: Record<string, string> },
  csbConfig?: SandboxConfig  // From context.csb
) {
  // Use csbConfig instead of window.muiDocConfig
  if (csbConfig?.includePeerDependencies) {
    newDeps = csbConfig.includePeerDependencies(newDeps, { versions });
  }
  if (csbConfig?.getVersions) {
    versions = csbConfig.getVersions(versions, { muiCommitRef: commitRef });
  }
  if (csbConfig?.postProcessImport) {
    const resolvedDep = csbConfig.postProcessImport(fullName);
    // ...
  }
  // Use csbConfig.fallbackDependency instead of hardcoded '@mui/material'
}
```

The calling components (DemoToolbar, etc.) get `csb` from `useDemoContext()` and pass it to `SandboxDependencies`.

---

## Files to Modify

| File | Change |
|------|--------|
| `docs/src/modules/components/Demo.js` | Use `useDemoContext()`, remove URL parsing and product checks |
| `docs/src/modules/components/DemoSandbox.js` | Remove `isJoy` prop, use context for theme and observer |
| `docs/pages/_app.js` | Create and provide `DemoContext` with product-specific values |
| `docs/src/modules/sandbox/CreateReactApp.ts` | Accept `getRootIndex` function as parameter |
| `docs/src/modules/sandbox/MuiChat.ts` | Accept `primaryPackage` as parameter |
| `docs/src/modules/sandbox/Dependencies.ts` | Remove `window.muiDocConfig`, accept config parameter (replaces global) |

## New Files

| File | Purpose |
|------|---------|
| `docs/src/modules/components/DemoContext.tsx` | Context definition, types, and `useDemoContext` hook |

---

## Key Principle

**No product identifiers inside Demo component tree**. The Demo component and all its children should:
- Never check `productId`
- Never check `isJoy` or similar flags
- Only use the **actual values** (strings, functions, components) from context

All translation from "which product is this" to "what values to use" happens in `_app.js`.

---

## Verification

1. **Visual check**: Run `pnpm docs:dev` and verify demos render correctly on:
   - `/material-ui/react-button/` (Material UI)
   - `/joy-ui/react-button/` (Joy UI)

2. **Sandbox generation**: Test "Open in CodeSandbox" and "Open in StackBlitz" buttons

3. **Type check**: Run `pnpm typescript` in docs workspace

4. **Build**: Run `pnpm docs:build` to ensure no build errors

5. **MUI X compatibility**: Verify the same pattern can be applied in MUI X `_app.js`
