# Migration Plan: `ApiPage.tsx` + `AppLayoutDocs` → `@mui/docs` (`packages/mui-docs`)

## Overview

This plan covers migrating **two major component trees** to `@mui/docs`:

1. **The `ApiPage/` subtree** (16 files) — API documentation rendering components
2. **The `AppLayoutDocs` subtree** (25+ files) — docs page layout shell with navigation, TOC, header, footer, etc.

The `AppLayoutDocs` tree is significantly larger and deeper. It is the layout wrapper used by `ApiPage`, `MarkdownDocs`, and `MarkdownDocsV2`, and is also consumed by `mui-x`.

---

## Git Commit Strategy

**Every step must be committed as an atomic, self-contained git commit.** The codebase must build and pass type-checking after each individual commit. This means:

1. **After completing each numbered step** (e.g., 1.1, 1.2, 6.3, etc.), run validation (`pnpm typescript` at minimum) and then `git add -A && git commit` with a descriptive message.
2. **Commit message format:** `[docs-infra] Migrate <component> to @mui/docs (<Phase>.<Step>)`
   - Examples:
     - `[docs-infra] Migrate ApiWarningAlert to @mui/docs (1.1)`
     - `[docs-infra] Extract TableOfContentsParams type to @mui/docs (0.4)`
     - `[docs-infra] Migrate AppFrame to @mui/docs (10.1)`
     - `[docs-infra] Update API page consumers to use @mui/docs/ApiPage (14.1)`
3. **Each commit must be independently valid:** The old import path must still work (via re-export shim) OR all consumers must be updated in the same commit. The preferred pattern for each file migration is:
   - Copy the file to `packages/mui-docs/src/`.
   - Update its internal imports to use relative paths within the new location.
   - Update the **old file** in `docs/src/` to become a **re-export shim** that re-exports from `@mui/docs` (e.g., `export { default } from '@mui/docs/ApiPage'`). This keeps all existing consumers working without changing them yet.
   - Commit.
4. **Phase 14 (Update Consumers)** can batch multiple consumer updates into a single commit per sub-step (e.g., all ~279 API page files in one commit for 14.1).
5. **Phase 15 (Delete Old Files)** should only delete re-export shims after ALL consumers have been updated. This can be one commit that removes all shims at once, or grouped logically.
6. **Phase 16 (Validation)** is a final sanity check — no commit needed unless fixes are required.

This approach ensures `git bisect` works correctly and any commit can be reverted independently.

---

## Part A: Full Dependency Graph

### A.1 — `ApiPage/` Subtree (16 files)

```
ApiPage.tsx
├── AppLayoutDocs ← (Part B)
├── sections/PropertiesSection.tsx
│   ├── sections/ToggleDisplayOption.tsx          [LEAF]
│   ├── list/PropertiesList.tsx
│   │   ├── list/ExpandableApiItem.tsx            [LEAF]
│   │   ├── ApiWarningAlert.tsx                   [LEAF]
│   │   └── definitions/properties.ts             [LEAF — uses TableOfContentsParams type]
│   ├── table/PropertiesTable.tsx
│   │   ├── table/StyledTableContainer.tsx        [LEAF]
│   │   ├── ApiWarningAlert.tsx                   [LEAF]
│   │   └── definitions/properties.ts
│   └── definitions/properties.ts
├── sections/ClassesSection.tsx
│   ├── sections/ToggleDisplayOption.tsx
│   ├── list/ClassesList.tsx
│   │   ├── list/ExpandableApiItem.tsx
│   │   ├── ApiWarningAlert.tsx
│   │   └── definitions/classes.ts                [LEAF — uses TableOfContentsParams type]
│   ├── table/ClassesTable.tsx
│   │   ├── table/StyledTableContainer.tsx
│   │   ├── ApiWarningAlert.tsx
│   │   └── definitions/classes.ts
│   └── definitions/classes.ts
├── sections/SlotsSection.tsx
│   ├── sections/ToggleDisplayOption.tsx
│   ├── list/SlotsList.tsx
│   │   ├── list/ExpandableApiItem.tsx
│   │   └── definitions/slots.ts                  [LEAF — uses TableOfContentsParams type]
│   ├── table/SlotsTable.tsx
│   │   ├── table/StyledTableContainer.tsx
│   │   └── definitions/slots.ts
│   └── definitions/slots.ts
├── definitions/properties.ts
├── definitions/classes.ts
└── definitions/slots.ts
```

### A.2 — `AppLayoutDocs` Subtree (25 unique files)

```
AppLayoutDocs.js  +  AppLayoutDocs.d.ts
├── Head.tsx
│   └── docs/config.ts                            [LEAF — config constants]
├── AppFrame.tsx
│   ├── SvgHamburgerMenu.tsx
│   │   └── RootSvg.tsx                           [LEAF]
│   ├── AppNavDrawer.tsx
│   │   ├── LogoWithCopyMenu.tsx
│   │   │   └── RootSvg.tsx
│   │   ├── AppNavDrawerItem.tsx                   [LEAF]
│   │   └── MuiProductSelector.tsx
│   │       ├── docs/src/route.ts                  [LEAF — config constants]
│   │       ├── SvgMuiLogomark.tsx
│   │       │   └── RootSvg.tsx
│   │       └── SvgBaseUiLogo.tsx
│   │           └── RootSvg.tsx
│   ├── AppSettingsDrawer.js  +  .d.ts             [LEAF]
│   ├── Notifications.tsx                          [LEAF]
│   ├── LogoWithCopyMenu.tsx (shared with AppNavDrawer)
│   ├── AppFrameBanner.tsx
│   │   └── featureToggle.ts                       [LEAF — config constants]
│   ├── theming.tsx                                [LEAF — @mui/* only]
│   └── SearchButton.tsx                           [LEAF]
├── AppContainer.js                                [LEAF]
├── AppTableOfContents.js
│   ├── TableOfContentsBanner.tsx                  [LEAF]
│   ├── featureToggle.ts
│   └── DiamondSponsors.js
│       └── SponsorCard.tsx                        [LEAF]
├── AppLayoutDocsFooter.js
│   ├── SvgMuiLogotype.tsx
│   │   └── RootSvg.tsx
│   └── EditPage.js                                [LEAF]
├── BackToTop.tsx                                  [LEAF]
└── convertProductIdToName (from AppSearch.js)     [Extract — standalone function]
```

**Unique files in AppLayoutDocs tree:**

| # | File | Location | Leaf? |
|---|---|---|---|
| 1 | `RootSvg.tsx` | `docs/src/icons/` | ✅ |
| 2 | `config.ts` | `docs/` | ✅ |
| 3 | `featureToggle.ts` | `docs/src/` | ✅ |
| 4 | `route.ts` | `docs/src/` | ✅ |
| 5 | `AppContainer.js` | `docs/src/modules/components/` | ✅ |
| 6 | `BackToTop.tsx` | `docs/src/modules/components/` | ✅ |
| 7 | `SearchButton.tsx` | `docs/src/modules/components/` | ✅ |
| 8 | `AppSettingsDrawer.js+.d.ts` | `docs/src/modules/components/` | ✅ |
| 9 | `Notifications.tsx` | `docs/src/modules/components/` | ✅ |
| 10 | `AppNavDrawerItem.tsx` | `docs/src/modules/components/` | ✅ |
| 11 | `EditPage.js` | `docs/src/modules/components/` | ✅ |
| 12 | `TableOfContentsBanner.tsx` | `docs/src/components/banner/` | ✅ |
| 13 | `SponsorCard.tsx` | `docs/src/components/home/` | ✅ |
| 14 | `theming.tsx` | `docs/src/` | ✅ |
| 15 | `SvgHamburgerMenu.tsx` | `docs/src/icons/` | depends on RootSvg |
| 16 | `SvgMuiLogotype.tsx` | `docs/src/icons/` | depends on RootSvg |
| 17 | `SvgMuiLogomark.tsx` | `docs/src/icons/` | depends on RootSvg |
| 18 | `SvgBaseUiLogo.tsx` | `docs/src/icons/` | depends on RootSvg |
| 19 | `LogoWithCopyMenu.tsx` | `docs/src/components/action/` | depends on RootSvg type |
| 20 | `AppFrameBanner.tsx` | `docs/src/components/banner/` | depends on featureToggle |
| 21 | `DiamondSponsors.js` | `docs/src/modules/components/` | depends on SponsorCard |
| 22 | `MuiProductSelector.tsx` | `docs/src/modules/components/` | depends on route, Svg icons |
| 23 | `AppNavDrawer.tsx` | `docs/src/modules/components/` | depends on LogoWithCopyMenu, AppNavDrawerItem, MuiProductSelector |
| 24 | `Head.tsx` | `docs/src/modules/components/` | depends on config |
| 25 | `AppFrame.tsx` | `docs/src/modules/components/` | depends on many L2 components |
| 26 | `AppTableOfContents.js` | `docs/src/modules/components/` | depends on L2 components |
| 27 | `AppLayoutDocsFooter.js` | `docs/src/modules/components/` | depends on SvgMuiLogotype, EditPage |
| 28 | `AppLayoutDocs.js+.d.ts` | `docs/src/modules/components/` | THE TARGET — depends on all above + `convertProductIdToName` |

---

## Part B: New Dependencies for `@mui/docs`

Add to `packages/mui-docs/package.json`:

| Package | Required by |
|---|---|
| `@mui-internal/api-docs-builder` | definitions/*.ts, sections/*Section.tsx |
| `es-toolkit` | definitions/properties.ts, definitions/classes.ts, sections/ClassesSection.tsx, sections/PropertiesSection.tsx, AppTableOfContents.js |
| `next` (peerDependency) | Head.tsx (`next/head`), AppFrame.tsx, AppLayoutDocs.js (`next/router`) |

(`@mui/material`, `@mui/icons-material`, `@mui/utils`, `clsx`, `prop-types` are already present.)

---

## Part C: Key Architectural Decisions

### C.1 — Circular type dependency (`TableOfContentsParams`)

The `definitions/*.ts` files import `TableOfContentsParams` from `ApiPage.tsx`, which in turn imports from the definitions — a circular reference.

**Resolution:** Extract `TableOfContentsParams` and `LayoutStorageKeys` types into `packages/mui-docs/src/ApiPage/types.ts`.

### C.2 — `convertProductIdToName` extraction

`AppLayoutDocs.js` imports this single function from the massive `AppSearch.js` (700+ lines of Algolia search UI). Only the 10-line helper function and its lookup map need migrating, not the whole search component.

**Resolution:** Extract `convertProductIdToName` + `productNameProductId` map into a standalone utility (e.g. `packages/mui-docs/src/AppLayoutDocs/convertProductIdToName.ts`). Leave `AppSearch.js` in `docs/` and update it to re-export from the new location.

### C.3 — Site-specific config files (`config.ts`, `featureToggle.ts`, `route.ts`)

These contain site-specific constants (language lists, feature flags, route URLs). They differ between `material-ui` and `mui-x`.

**Resolution:** Accept these as **props or context** rather than hard-coding imports:
- `config.ts` (`LANGUAGES_SSR`) → Pass as a prop to `Head` (or inject via a `DocsConfig` context/provider already used by `@mui/docs`).
- `featureToggle.ts` → Pass feature flags as props to `AppTableOfContents` and `AppFrameBanner`.
- `route.ts` → Pass routes as props to `MuiProductSelector`.

Alternatively, these could become configurable defaults in a `DocsProvider` context that `@mui/docs` already exposes.

### C.4 — SVG icons (`RootSvg`, `SvgHamburgerMenu`, `SvgMuiLogotype`, `SvgMuiLogomark`, `SvgBaseUiLogo`)

These are small branded SVG icons tightly coupled to the MUI docs layout.

**Resolution:** Migrate them as internal (non-exported) icons within the `AppLayoutDocs` module in `@mui/docs`. They are small and self-contained.

### C.5 — `theming.tsx` (`DemoPageThemeProvider`)

Used by `AppFrame.tsx` to provide Joy UI theme overrides. It only depends on `@mui/*` packages.

**Resolution:** Migrate to `packages/mui-docs/src/AppLayoutDocs/DemoPageThemeProvider.tsx` (or make it a configurable prop/slot on `AppFrame`).

### C.6 — `AppSearch.js` lazy import in `AppFrame`

`AppFrame.tsx` does `React.lazy(() => import('docs/src/modules/components/AppSearch'))`. The full `AppSearch` component (700+ lines with Algolia integration) should **NOT** be migrated.

**Resolution:** Make `AppFrame` accept a `SearchComponent` prop/slot. Provide `SearchButton` as the default Suspense fallback. The docs site passes its `AppSearch` via this prop.

---

## Part D: Migration Steps (Ordered by Dependency)

> **Reminder:** After each numbered step, validate with `pnpm typescript` and commit:
> `git add -A && git commit -m "[docs-infra] <description> (<step>)"`
> Each commit must leave the codebase in a buildable state. Use re-export shims at old paths to keep existing consumers working until Phase 14.

### Phase 0: Preparation

| Step | Action | Commit message |
|---|---|---|
| 0.1 | Create directory structure under `packages/mui-docs/src/ApiPage/` and `packages/mui-docs/src/AppLayoutDocs/`. | `[docs-infra] Create ApiPage and AppLayoutDocs directory structure (0.1)` |
| 0.2 | Add `@mui-internal/api-docs-builder` and `es-toolkit` to `packages/mui-docs/package.json` dependencies. | `[docs-infra] Add api-docs-builder and es-toolkit deps to @mui/docs (0.2)` |
| 0.3 | Add `next` as a `peerDependency` of `@mui/docs` (it already likely is — verify). | `[docs-infra] Add next as peerDependency of @mui/docs (0.3)` |
| 0.4 | Extract `TableOfContentsParams` and `LayoutStorageKeys` types into `packages/mui-docs/src/ApiPage/types.ts`. Update the old `ApiPage.tsx` and definition files to import from the new types file (via `@mui/docs/ApiPage` re-export or path alias). | `[docs-infra] Extract TableOfContentsParams and LayoutStorageKeys types (0.4)` |
| 0.5 | Extract `convertProductIdToName` into `packages/mui-docs/src/AppLayoutDocs/convertProductIdToName.ts`. Update `AppLayoutDocs.js` and `AppSearch.js` to import from the new location. | `[docs-infra] Extract convertProductIdToName to @mui/docs (0.5)` |

---

### Phase 1: ApiPage Leaf Components (no cross-deps within `docs/`)

Migrate these 4 files — they have zero internal `docs/` imports.

**Per-file migration pattern (applies to all phases):**
1. Copy file to target in `packages/mui-docs/src/`.
2. Update internal imports to relative paths.
3. Replace old file with a re-export shim (e.g., `export { default } from '@mui/docs/ApiPage/...'`).
4. Run `pnpm typescript` to verify.
5. `git add -A && git commit`.

| Step | File | Target |
|---|---|---|
| 1.1 | `ApiWarningAlert.tsx` | `src/ApiPage/ApiWarningAlert.tsx` |
| 1.2 | `table/StyledTableContainer.tsx` | `src/ApiPage/table/StyledTableContainer.tsx` |
| 1.3 | `list/ExpandableApiItem.tsx` | `src/ApiPage/list/ExpandableApiItem.tsx` |
| 1.4 | `sections/ToggleDisplayOption.tsx` | `src/ApiPage/sections/ToggleDisplayOption.tsx` |

---

### Phase 2: ApiPage Definition Files

Depend only on the `types.ts` extracted in Phase 0:

| Step | File | Target |
|---|---|---|
| 2.1 | `definitions/properties.ts` | `src/ApiPage/definitions/properties.ts` — update `TableOfContentsParams` import to `../types` |
| 2.2 | `definitions/classes.ts` | `src/ApiPage/definitions/classes.ts` |
| 2.3 | `definitions/slots.ts` | `src/ApiPage/definitions/slots.ts` |

---

### Phase 3: ApiPage Table Components (depend on Phase 1 + 2)

| Step | File | Target |
|---|---|---|
| 3.1 | `table/PropertiesTable.tsx` | `src/ApiPage/table/PropertiesTable.tsx` |
| 3.2 | `table/ClassesTable.tsx` | `src/ApiPage/table/ClassesTable.tsx` |
| 3.3 | `table/SlotsTable.tsx` | `src/ApiPage/table/SlotsTable.tsx` |

---

### Phase 4: ApiPage List Components (depend on Phase 1 + 2)

| Step | File | Target |
|---|---|---|
| 4.1 | `list/PropertiesList.tsx` | `src/ApiPage/list/PropertiesList.tsx` |
| 4.2 | `list/ClassesList.tsx` | `src/ApiPage/list/ClassesList.tsx` |
| 4.3 | `list/SlotsList.tsx` | `src/ApiPage/list/SlotsList.tsx` |

---

### Phase 5: ApiPage Section Components (depend on Phase 3 + 4)

| Step | File | Target |
|---|---|---|
| 5.1 | `sections/PropertiesSection.tsx` | `src/ApiPage/sections/PropertiesSection.tsx` |
| 5.2 | `sections/ClassesSection.tsx` | `src/ApiPage/sections/ClassesSection.tsx` |
| 5.3 | `sections/SlotsSection.tsx` | `src/ApiPage/sections/SlotsSection.tsx` |

---

### Phase 6: AppLayoutDocs — Leaf Components

Icons and simple utilities with no `docs/` transitive deps:

| Step | File | Target |
|---|---|---|
| 6.1 | `icons/RootSvg.tsx` | `src/AppLayoutDocs/icons/RootSvg.tsx` |
| 6.2 | `AppContainer.js` | `src/AppLayoutDocs/AppContainer.tsx` (convert to TS) |
| 6.3 | `BackToTop.tsx` | `src/AppLayoutDocs/BackToTop.tsx` |
| 6.4 | `SearchButton.tsx` | `src/AppLayoutDocs/SearchButton.tsx` |
| 6.5 | `AppSettingsDrawer.js+.d.ts` | `src/AppLayoutDocs/AppSettingsDrawer.tsx` (convert to TS) |
| 6.6 | `Notifications.tsx` | `src/AppLayoutDocs/Notifications.tsx` |
| 6.7 | `AppNavDrawerItem.tsx` | `src/AppLayoutDocs/AppNavDrawerItem.tsx` |
| 6.8 | `EditPage.js` | `src/AppLayoutDocs/EditPage.tsx` (convert to TS) |
| 6.9 | `components/banner/TableOfContentsBanner.tsx` | `src/AppLayoutDocs/TableOfContentsBanner.tsx` |
| 6.10 | `components/home/SponsorCard.tsx` | `src/AppLayoutDocs/SponsorCard.tsx` |

---

### Phase 7: AppLayoutDocs — Level 2 Components (depend on Phase 6)

| Step | File | Target | Notes |
|---|---|---|---|
| 7.1 | `icons/SvgHamburgerMenu.tsx` | `src/AppLayoutDocs/icons/SvgHamburgerMenu.tsx` | depends on RootSvg |
| 7.2 | `icons/SvgMuiLogotype.tsx` | `src/AppLayoutDocs/icons/SvgMuiLogotype.tsx` | depends on RootSvg |
| 7.3 | `icons/SvgMuiLogomark.tsx` | `src/AppLayoutDocs/icons/SvgMuiLogomark.tsx` | depends on RootSvg |
| 7.4 | `icons/SvgBaseUiLogo.tsx` | `src/AppLayoutDocs/icons/SvgBaseUiLogo.tsx` | depends on RootSvg |
| 7.5 | `components/action/LogoWithCopyMenu.tsx` | `src/AppLayoutDocs/LogoWithCopyMenu.tsx` | depends on RootSvg type |
| 7.6 | `DiamondSponsors.js` | `src/AppLayoutDocs/DiamondSponsors.tsx` | depends on SponsorCard |

---

### Phase 8: AppLayoutDocs — Site-Config-Dependent Components

These files import site-specific config. Refactor to accept config via **props** (or via `DocsProvider` context):

| Step | File | Target | Config dependency → resolution |
|---|---|---|---|
| 8.1 | `components/banner/AppFrameBanner.tsx` | `src/AppLayoutDocs/AppFrameBanner.tsx` | `featureToggle` → accept `enableBanner` prop |
| 8.2 | `MuiProductSelector.tsx` | `src/AppLayoutDocs/MuiProductSelector.tsx` | `route.ts` → accept `routes` prop; SVG icons from 7.3/7.4 |
| 8.3 | `AppTableOfContents.js` | `src/AppLayoutDocs/AppTableOfContents.tsx` | `featureToggle` → accept `showJobAd` prop; deps on DiamondSponsors + TableOfContentsBanner |
| 8.4 | `Head.tsx` | `src/AppLayoutDocs/Head.tsx` | `LANGUAGES_SSR` from `docs/config.ts` → accept `languagesSSR` prop or use DocsProvider |
| 8.5 | `theming.tsx` | `src/AppLayoutDocs/DemoPageThemeProvider.tsx` | Already leaf for `@mui/*` |

---

### Phase 9: AppLayoutDocs — Level 3 Components

| Step | File | Target | Depends on |
|---|---|---|---|
| 9.1 | `AppNavDrawer.tsx` | `src/AppLayoutDocs/AppNavDrawer.tsx` | LogoWithCopyMenu, AppNavDrawerItem, MuiProductSelector |
| 9.2 | `AppLayoutDocsFooter.js` | `src/AppLayoutDocs/AppLayoutDocsFooter.tsx` | SvgMuiLogotype, EditPage |

---

### Phase 10: AppLayoutDocs — Level 4 (AppFrame)

| Step | File | Target | Depends on |
|---|---|---|---|
| 10.1 | `AppFrame.tsx` | `src/AppLayoutDocs/AppFrame.tsx` | SvgHamburgerMenu, AppNavDrawer, AppSettingsDrawer, Notifications, LogoWithCopyMenu, AppFrameBanner, DemoPageThemeProvider, SearchButton, AppSearch (lazy) |

**Note on `AppSearch`:** `AppFrame` does `React.lazy(() => import('docs/src/modules/components/AppSearch'))`. The full `AppSearch` component (700+ lines with Algolia integration) should **NOT** be migrated. Instead:
- Make the search component a **slot/prop** on `AppFrame` (e.g., `SearchComponent`).
- Provide `SearchButton` as the default fallback (already used as the Suspense fallback).
- The docs site passes its `AppSearch` via this prop.

---

### Phase 11: AppLayoutDocs Itself

| Step | File | Target |
|---|---|---|
| 11.1 | `AppLayoutDocs.js + .d.ts` | `src/AppLayoutDocs/AppLayoutDocs.tsx` (convert to TS) |

Changes needed:
- `convertProductIdToName` — import from the extracted utility (Phase 0.5).
- All internal imports → relative paths within `@mui/docs`.
- Accept `AppSearch` component via prop/slot or context for the lazy-loaded search.

---

### Phase 12: ApiPage Itself

| Step | File | Target |
|---|---|---|
| 12.1 | `ApiPage.tsx` | `src/ApiPage/ApiPage.tsx` |

Changes needed:
- Import `AppLayoutDocs` from `../AppLayoutDocs/AppLayoutDocs` (now within the same package).
- All `ApiPage/` sub-imports → relative paths.
- All `@mui/docs/*` imports → relative paths (same package).

---

### Phase 13: Create Public Entry Points

| Step | File | Exports |
|---|---|---|
| 13.1 | `src/ApiPage/index.ts` | `ApiPage` (default), `getTranslatedHeader`, `TableOfContentsParams`, `LayoutStorageKeys`, `ApiDisplayOptions`, `DEFAULT_API_LAYOUT_STORAGE_KEYS`, `useApiPageOption`, `PropertyDefinition`, `getPropsApiDefinitions`, `getHookApiDefinitions`, `getPropertiesToc`, `ClassDefinition`, `getClassApiDefinitions`, `getClassesToc`, `SlotDefinition`, `getSlotsApiDefinitions`, `getSlotsToc`, `PropertiesSection`, `ClassesSection`, `SlotsSection` |
| 13.2 | `src/AppLayoutDocs/index.ts` | `AppLayoutDocs` (default), `AppLayoutDocsProps`, `AppFrame`, `AppContainer`, `Head`, `BackToTop`, `EditPage`, `AppTableOfContents`, `AppLayoutDocsFooter`, `convertProductIdToName` |

---

### Phase 14: Update All Consumers in `docs/`

Each sub-step here is one commit. Batching multiple file changes into a single commit is fine since these are purely import-path updates.

| Step | Consumer | Change | Commit message |
|---|---|---|---|
| 14.1 | `docs/pages/material-ui/api/*.js` (~279 files) | `import ApiPage from 'docs/src/modules/components/ApiPage'` → `import ApiPage from '@mui/docs/ApiPage'` | `[docs-infra] Update API page consumers to @mui/docs/ApiPage (14.1)` |
| 14.2 | `ComponentsApiContent.tsx` | Update all `docs/src/modules/components/ApiPage/...` imports to `@mui/docs/ApiPage` | `[docs-infra] Update ComponentsApiContent imports (14.2)` |
| 14.3 | `HooksApiContent.tsx` | Same | `[docs-infra] Update HooksApiContent imports (14.3)` |
| 14.4 | `MarkdownDocsV2.js` | Update `getTranslatedHeader`, `getPropsToC`, `getClassesToc`, `AppLayoutDocs` imports | `[docs-infra] Update MarkdownDocsV2 imports (14.4)` |
| 14.5 | `MarkdownDocs.js` | Update `AppLayoutDocs` import | `[docs-infra] Update MarkdownDocs imports (14.5)` |
| 14.6 | `AppSearch.js` | Update: re-export `convertProductIdToName` from `@mui/docs/AppLayoutDocs` for backward compat, or update the import in `AppSearch.js` | `[docs-infra] Update AppSearch convertProductIdToName import (14.6)` |
| 14.7 | Any remaining files importing from the old paths | Update to `@mui/docs` | `[docs-infra] Update remaining old import paths (14.7)` |

---

### Phase 15: Delete Old Files

Only delete re-export shims **after all consumers have been updated** in Phase 14. This can be done as a single commit or grouped logically (e.g., one commit for ApiPage shims, one for AppLayoutDocs shims).

Remove the following from `docs/src/`:
- `modules/components/ApiPage.tsx`
- `modules/components/ApiPage/` (entire directory)
- `modules/components/AppLayoutDocs.js`
- `modules/components/AppLayoutDocs.d.ts`
- `modules/components/AppLayoutDocsFooter.js`
- `modules/components/AppFrame.tsx`
- `modules/components/AppContainer.js`
- `modules/components/AppTableOfContents.js`
- `modules/components/BackToTop.tsx`
- `modules/components/Head.tsx`
- `modules/components/EditPage.js`
- `modules/components/AppSettingsDrawer.js + .d.ts`
- `modules/components/Notifications.tsx`
- `modules/components/SearchButton.tsx`
- `modules/components/AppNavDrawer.tsx`
- `modules/components/AppNavDrawerItem.tsx`
- `modules/components/MuiProductSelector.tsx`
- `modules/components/DiamondSponsors.js`
- `icons/RootSvg.tsx`, `SvgHamburgerMenu.tsx`, `SvgMuiLogotype.tsx`, `SvgMuiLogomark.tsx`, `SvgBaseUiLogo.tsx`
- `components/action/LogoWithCopyMenu.tsx`
- `components/banner/AppFrameBanner.tsx`, `TableOfContentsBanner.tsx`
- `components/home/SponsorCard.tsx`
- `theming.tsx`

**Keep in `docs/`:** `config.ts`, `featureToggle.ts`, `route.ts`, `AppSearch.js` (Algolia-specific).

Commit: `[docs-infra] Remove old re-export shims for migrated files (15.1)`

---

### Phase 16: Validation

| Step | Command | What it verifies |
|---|---|---|
| 16.1 | `pnpm typescript` | Type-checking passes across all packages |
| 16.2 | `pnpm eslint` | No lint errors |
| 16.3 | `pnpm test:unit ApiPage` | Existing ApiPage tests pass |
| 16.4 | `pnpm test:unit AppLayoutDocs` | Existing AppLayoutDocs tests pass (if any) |
| 16.5 | `pnpm docs:build` | Documentation site builds successfully |
| 16.6 | `pnpm docs:dev` | Manually verify API pages render correctly |
| 16.7 | `pnpm prettier` | Code formatting |

---

## Part E: Target File Structure

```
packages/mui-docs/src/
├── ApiPage/
│   ├── index.ts
│   ├── types.ts                          # TableOfContentsParams, LayoutStorageKeys
│   ├── ApiPage.tsx
│   ├── ApiWarningAlert.tsx
│   ├── definitions/
│   │   ├── properties.ts
│   │   ├── classes.ts
│   │   └── slots.ts
│   ├── list/
│   │   ├── ExpandableApiItem.tsx
│   │   ├── PropertiesList.tsx
│   │   ├── ClassesList.tsx
│   │   └── SlotsList.tsx
│   ├── sections/
│   │   ├── ToggleDisplayOption.tsx
│   │   ├── PropertiesSection.tsx
│   │   ├── ClassesSection.tsx
│   │   └── SlotsSection.tsx
│   └── table/
│       ├── StyledTableContainer.tsx
│       ├── PropertiesTable.tsx
│       ├── ClassesTable.tsx
│       └── SlotsTable.tsx
│
├── AppLayoutDocs/
│   ├── index.ts
│   ├── AppLayoutDocs.tsx
│   ├── AppFrame.tsx
│   ├── AppContainer.tsx
│   ├── AppTableOfContents.tsx
│   ├── AppLayoutDocsFooter.tsx
│   ├── AppNavDrawer.tsx
│   ├── AppNavDrawerItem.tsx
│   ├── AppSettingsDrawer.tsx
│   ├── AppFrameBanner.tsx
│   ├── BackToTop.tsx
│   ├── DemoPageThemeProvider.tsx
│   ├── DiamondSponsors.tsx
│   ├── EditPage.tsx
│   ├── Head.tsx
│   ├── LogoWithCopyMenu.tsx
│   ├── MuiProductSelector.tsx
│   ├── Notifications.tsx
│   ├── SearchButton.tsx
│   ├── SponsorCard.tsx
│   ├── TableOfContentsBanner.tsx
│   ├── convertProductIdToName.ts
│   └── icons/
│       ├── RootSvg.tsx
│       ├── SvgBaseUiLogo.tsx
│       ├── SvgHamburgerMenu.tsx
│       ├── SvgMuiLogomark.tsx
│       └── SvgMuiLogotype.tsx
│
├── ... (existing modules: Ad/, branding/, i18n/, etc.)
```

---

## Part F: Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **MUI X repos import from `docs/src/modules/components/`** | MUI X docs will break until they update imports | Coordinate with MUI X team; optionally keep re-export shims in `docs/` temporarily |
| **`next/head` and `next/router` coupling** | Makes `@mui/docs` depend on Next.js | Add `next` as a `peerDependency` (likely already is); this is acceptable since `@mui/docs` is a docs-infrastructure package |
| **`AppSearch.js` is NOT migrated but `AppFrame` lazy-imports it** | Need a seam for the search component | Make `AppFrame` accept a `SearchComponent` prop/slot; docs site passes `AppSearch`, other consumers pass their own |
| **Site-specific config (`config.ts`, `featureToggle.ts`, `route.ts`)** | Hard-coded imports would break portability | Refactor to accept via props or `DocsProvider` context |
| **Large number of consumer file updates (~279 API pages)** | Risk of merge conflicts | Use codemod/find-replace script; do this step atomically in one commit |
| **JS→TS conversions** (AppLayoutDocs, AppContainer, etc.) | Potential type issues | Keep behavior identical; add types incrementally |

---

## Part G: Summary Stats

| Category | Count |
|---|---|
| ApiPage subtree files to migrate | 16 |
| AppLayoutDocs subtree files to migrate | 28 (incl. icons, config extractions) |
| **Total files to migrate** | **44** |
| Consumer files to update (API pages) | ~279 |
| Other consumer files to update | ~5 (MarkdownDocs, MarkdownDocsV2, ComponentsApiContent, HooksApiContent, AppSearch) |
| Migration phases | 16 |

---

## Part H: Progress Tracker

Use this checklist to track completion across sessions. Mark steps with `[x]` as they are done.

**Each checked step = one git commit.** The commit column shows the expected message. After completing a step:
1. Run `pnpm typescript` to verify the build.
2. `git add -A && git commit -m "<message>"`
3. Check the box below.

### Phase 0: Preparation
- [x] 0.1 Create directory structure — `git commit -m "[docs-infra] Create ApiPage and AppLayoutDocs directory structure (0.1)"`
- [x] 0.2 Add deps — `git commit -m "[docs-infra] Add api-docs-builder and es-toolkit deps to @mui/docs (0.2)"`
- [x] 0.3 Verify/add `next` peerDep — already present (`"next": "^13.5.1 || ^14 || ^15.0.0 || ^16.0.0"`), no commit needed
- [x] 0.4 Extract types — `git commit -m "[docs-infra] Extract TableOfContentsParams and LayoutStorageKeys types (0.4)"`
- [ ] 0.5 Extract `convertProductIdToName` — `git commit -m "[docs-infra] Extract convertProductIdToName to @mui/docs (0.5)"`

### Phase 1: ApiPage Leaves
- [ ] 1.1 `ApiWarningAlert.tsx` — `git commit -m "[docs-infra] Migrate ApiWarningAlert to @mui/docs (1.1)"`
- [ ] 1.2 `table/StyledTableContainer.tsx` — `git commit -m "[docs-infra] Migrate StyledTableContainer to @mui/docs (1.2)"`
- [ ] 1.3 `list/ExpandableApiItem.tsx` — `git commit -m "[docs-infra] Migrate ExpandableApiItem to @mui/docs (1.3)"`
- [ ] 1.4 `sections/ToggleDisplayOption.tsx` — `git commit -m "[docs-infra] Migrate ToggleDisplayOption to @mui/docs (1.4)"`

### Phase 2: ApiPage Definitions
- [ ] 2.1 `definitions/properties.ts` — `git commit -m "[docs-infra] Migrate properties definitions to @mui/docs (2.1)"`
- [ ] 2.2 `definitions/classes.ts` — `git commit -m "[docs-infra] Migrate classes definitions to @mui/docs (2.2)"`
- [ ] 2.3 `definitions/slots.ts` — `git commit -m "[docs-infra] Migrate slots definitions to @mui/docs (2.3)"`

### Phase 3: ApiPage Tables
- [ ] 3.1 `table/PropertiesTable.tsx` — `git commit -m "[docs-infra] Migrate PropertiesTable to @mui/docs (3.1)"`
- [ ] 3.2 `table/ClassesTable.tsx` — `git commit -m "[docs-infra] Migrate ClassesTable to @mui/docs (3.2)"`
- [ ] 3.3 `table/SlotsTable.tsx` — `git commit -m "[docs-infra] Migrate SlotsTable to @mui/docs (3.3)"`

### Phase 4: ApiPage Lists
- [ ] 4.1 `list/PropertiesList.tsx` — `git commit -m "[docs-infra] Migrate PropertiesList to @mui/docs (4.1)"`
- [ ] 4.2 `list/ClassesList.tsx` — `git commit -m "[docs-infra] Migrate ClassesList to @mui/docs (4.2)"`
- [ ] 4.3 `list/SlotsList.tsx` — `git commit -m "[docs-infra] Migrate SlotsList to @mui/docs (4.3)"`

### Phase 5: ApiPage Sections
- [ ] 5.1 `sections/PropertiesSection.tsx` — `git commit -m "[docs-infra] Migrate PropertiesSection to @mui/docs (5.1)"`
- [ ] 5.2 `sections/ClassesSection.tsx` — `git commit -m "[docs-infra] Migrate ClassesSection to @mui/docs (5.2)"`
- [ ] 5.3 `sections/SlotsSection.tsx` — `git commit -m "[docs-infra] Migrate SlotsSection to @mui/docs (5.3)"`

### Phase 6: AppLayoutDocs Leaves
- [ ] 6.1 `icons/RootSvg.tsx` — `git commit -m "[docs-infra] Migrate RootSvg to @mui/docs (6.1)"`
- [ ] 6.2 `AppContainer.js` → `.tsx` — `git commit -m "[docs-infra] Migrate AppContainer to @mui/docs (6.2)"`
- [ ] 6.3 `BackToTop.tsx` — `git commit -m "[docs-infra] Migrate BackToTop to @mui/docs (6.3)"`
- [ ] 6.4 `SearchButton.tsx` — `git commit -m "[docs-infra] Migrate SearchButton to @mui/docs (6.4)"`
- [ ] 6.5 `AppSettingsDrawer.js` → `.tsx` — `git commit -m "[docs-infra] Migrate AppSettingsDrawer to @mui/docs (6.5)"`
- [ ] 6.6 `Notifications.tsx` — `git commit -m "[docs-infra] Migrate Notifications to @mui/docs (6.6)"`
- [ ] 6.7 `AppNavDrawerItem.tsx` — `git commit -m "[docs-infra] Migrate AppNavDrawerItem to @mui/docs (6.7)"`
- [ ] 6.8 `EditPage.js` → `.tsx` — `git commit -m "[docs-infra] Migrate EditPage to @mui/docs (6.8)"`
- [ ] 6.9 `TableOfContentsBanner.tsx` — `git commit -m "[docs-infra] Migrate TableOfContentsBanner to @mui/docs (6.9)"`
- [ ] 6.10 `SponsorCard.tsx` — `git commit -m "[docs-infra] Migrate SponsorCard to @mui/docs (6.10)"`

### Phase 7: AppLayoutDocs Level 2
- [ ] 7.1 `SvgHamburgerMenu.tsx` — `git commit -m "[docs-infra] Migrate SvgHamburgerMenu to @mui/docs (7.1)"`
- [ ] 7.2 `SvgMuiLogotype.tsx` — `git commit -m "[docs-infra] Migrate SvgMuiLogotype to @mui/docs (7.2)"`
- [ ] 7.3 `SvgMuiLogomark.tsx` — `git commit -m "[docs-infra] Migrate SvgMuiLogomark to @mui/docs (7.3)"`
- [ ] 7.4 `SvgBaseUiLogo.tsx` — `git commit -m "[docs-infra] Migrate SvgBaseUiLogo to @mui/docs (7.4)"`
- [ ] 7.5 `LogoWithCopyMenu.tsx` — `git commit -m "[docs-infra] Migrate LogoWithCopyMenu to @mui/docs (7.5)"`
- [ ] 7.6 `DiamondSponsors.js` → `.tsx` — `git commit -m "[docs-infra] Migrate DiamondSponsors to @mui/docs (7.6)"`

### Phase 8: AppLayoutDocs Config-Dependent
- [ ] 8.1 `AppFrameBanner.tsx` (decouple `featureToggle`) — `git commit -m "[docs-infra] Migrate AppFrameBanner to @mui/docs (8.1)"`
- [ ] 8.2 `MuiProductSelector.tsx` (decouple `route.ts`) — `git commit -m "[docs-infra] Migrate MuiProductSelector to @mui/docs (8.2)"`
- [ ] 8.3 `AppTableOfContents.js` → `.tsx` (decouple `featureToggle`) — `git commit -m "[docs-infra] Migrate AppTableOfContents to @mui/docs (8.3)"`
- [ ] 8.4 `Head.tsx` (decouple `docs/config.ts`) — `git commit -m "[docs-infra] Migrate Head to @mui/docs (8.4)"`
- [ ] 8.5 `theming.tsx` → `DemoPageThemeProvider.tsx` — `git commit -m "[docs-infra] Migrate DemoPageThemeProvider to @mui/docs (8.5)"`

### Phase 9: AppLayoutDocs Level 3
- [ ] 9.1 `AppNavDrawer.tsx` — `git commit -m "[docs-infra] Migrate AppNavDrawer to @mui/docs (9.1)"`
- [ ] 9.2 `AppLayoutDocsFooter.js` → `.tsx` — `git commit -m "[docs-infra] Migrate AppLayoutDocsFooter to @mui/docs (9.2)"`

### Phase 10: AppLayoutDocs Level 4
- [ ] 10.1 `AppFrame.tsx` (add `SearchComponent` slot) — `git commit -m "[docs-infra] Migrate AppFrame to @mui/docs (10.1)"`

### Phase 11: AppLayoutDocs Itself
- [ ] 11.1 `AppLayoutDocs.js` → `.tsx` — `git commit -m "[docs-infra] Migrate AppLayoutDocs to @mui/docs (11.1)"`

### Phase 12: ApiPage Itself
- [ ] 12.1 `ApiPage.tsx` — `git commit -m "[docs-infra] Migrate ApiPage to @mui/docs (12.1)"`

### Phase 13: Public Entry Points
- [ ] 13.1 `src/ApiPage/index.ts` — `git commit -m "[docs-infra] Add ApiPage public entry point (13.1)"`
- [ ] 13.2 `src/AppLayoutDocs/index.ts` — `git commit -m "[docs-infra] Add AppLayoutDocs public entry point (13.2)"`

### Phase 14: Update Consumers
- [ ] 14.1 `docs/pages/material-ui/api/*.js` (~279 files) — `git commit -m "[docs-infra] Update API page consumers to @mui/docs/ApiPage (14.1)"`
- [ ] 14.2 `ComponentsApiContent.tsx` — `git commit -m "[docs-infra] Update ComponentsApiContent imports (14.2)"`
- [ ] 14.3 `HooksApiContent.tsx` — `git commit -m "[docs-infra] Update HooksApiContent imports (14.3)"`
- [ ] 14.4 `MarkdownDocsV2.js` — `git commit -m "[docs-infra] Update MarkdownDocsV2 imports (14.4)"`
- [ ] 14.5 `MarkdownDocs.js` — `git commit -m "[docs-infra] Update MarkdownDocs imports (14.5)"`
- [ ] 14.6 `AppSearch.js` — `git commit -m "[docs-infra] Update AppSearch convertProductIdToName import (14.6)"`
- [ ] 14.7 Any remaining files — `git commit -m "[docs-infra] Update remaining old import paths (14.7)"`

### Phase 15: Delete Old Files
- [ ] 15.1 Remove all re-export shims from `docs/src/` — `git commit -m "[docs-infra] Remove old re-export shims for migrated files (15.1)"`

### Phase 16: Validation (no commits unless fixes needed)
- [ ] 16.1 `pnpm typescript`
- [ ] 16.2 `pnpm eslint`
- [ ] 16.3 `pnpm test:unit ApiPage`
- [ ] 16.4 `pnpm test:unit AppLayoutDocs`
- [ ] 16.5 `pnpm docs:build`
- [ ] 16.6 `pnpm docs:dev` (manual verification)
- [ ] 16.7 `pnpm prettier`
