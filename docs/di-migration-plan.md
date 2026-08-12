# Verdict

Material UI cannot migrate to the Base UI docs setup as a drop-in replacement.

Base UI uses docs-infra primarily for build-time source collection, highlighting, file navigation, and sandbox data. It does **not** currently exercise the complete live-editing flow required by Material UI. In Base UI:

- All 135 demos use `createDemoWithVariants(import.meta.url, ...)`.
- Each demo has an `index.ts` factory wrapper.
- MDX imports and renders the generated demo component directly.
- There are no per-demo `client.ts` files.
- The Base UI `Demo` component does not use `editable`, `setSource`, `reset`, or `error` from `useDemo`.
- Base UI has no JavaScript and TypeScript source toggle.
- Base UI has no equivalent of Material UI's generated `.tsx.preview` editing mode.
- Base UI does not support Material UI's iframe and isolated-theme marker behavior.

Docs-infra contains much of the underlying live-editing machinery, but Base UI has not integrated it.

## Scale of the Material UI compatibility surface

The existing Material UI structure includes approximately:

- 725 demo marker instances.
- 836 TypeScript demo files.
- 817 generated JavaScript counterparts.
- 399 preview files.
- 201 `bg` marker options.
- 101 `defaultCodeOpen` options.
- 39 `hideToolbar` options.
- 25 iframe demos.
- 5 `disableLiveEdit` demos.
- 3 isolated demos.

Requiring these demos to adopt Base UI's directory structure, `index.ts` wrappers, MDX imports, or per-demo client files would be a major repository migration. The compatibility work should therefore happen mostly in docs-infra.

## Pipeline comparison

|                      Area | Material UI                                              | Base UI with docs-infra                                 | Gap                 |
| ------------------------: | :------------------------------------------------------- | :------------------------------------------------------ | :------------------ |
|            Demo authoring | `DemoName.tsx` with generated `.js` and `.tsx.preview`   | Variant directories with an `index.ts` factory          | Major               |
|      Markdown integration | `{{"demo": "DemoName.js"}}` markers                      | Explicit MDX import and component render                | Major               |
|            Demo discovery | Markdown loader resolves referenced files                | Loader scans `createDemo` calls in `index.ts`           | Major               |
|   Multiple demos per page | Collected by one Markdown loader invocation              | Separate imported factory module per demo               | Major               |
| JavaScript and TypeScript | Sibling authored/generated source variants               | Optional TS-to-JS transform, not enabled by Base UI     | Partial             |
|             Short preview | Separate `.tsx.preview` source, editable independently   | Focus frames inside the full source                     | Major               |
|              Live editing | Enabled by default for the main file                     | Supported by docs-infra internals, not wired in Base UI | Major               |
|                    Editor | Prism-highlighted textarea overlay                       | Starry Night HAST rendered as `contenteditable`         | Major               |
|          Source expansion | Preview versus full-source modes                         | Collapsed focus frames versus expanded source           | Major               |
|      Language persistence | `codeVariant` cookie with hydration support              | `localStorage` transform preference                     | Major               |
|             Source hashes | `#BasicButtons.tsx`                                      | `#basic-buttons:Default:index.tsx` style                | Major               |
|            Relative files | Recursive modules and source tabs                        | Recursive `extraFiles`                                  | Mostly covered      |
|             Syntax errors | Error alert and last valid preview                       | Supported by `useDemoController`                        | Covered internally  |
|                     Reset | Source reset plus preview remount                        | Controlled-source reset                                 | Partial             |
|                 Sandboxes | Material-specific CRA/Vite payloads and package versions | Generic exports with consumer customization             | Partial             |
|                    Themes | Material docs theme, isolated themes, runtime theme      | Base UI page styling                                    | Repository-specific |
|                   Iframes | Portal, Emotion cache, RTL, theme CSS variables          | No Base UI equivalent                                   | Repository-specific |
|            Marker options | Existing JSON marker contract                            | Factory and component props                             | Major               |
|              Translations | Existing translated Markdown loader                      | MDX page model                                          | Major               |
|              Source links | Current GitHub and page-anchor formats                   | Directory-oriented GitHub links                         | Partial             |

## What docs-infra already provides

These pieces do not need to be rebuilt:

- Recursive dependency and relative-file collection.
- Syntax highlighting and precomputed HAST.
- File tabs and active-file copying.
- Source transforms, including optional TypeScript-to-JavaScript conversion.
- Controlled source state.
- A live demo controller.
- Off-main-thread transpilation.
- CSS and CSS Modules compilation for edited demos.
- Last-valid-render behavior after errors.
- Build-time, evaluation-time, and render-time error channels.
- Reset APIs.
- Variant and transform persistence.
- CodeSandbox and StackBlitz export primitives.
- Source URL and relative-file metadata.
- Lazy loading of the heavy editor and runner machinery.

The main problem is that these capabilities are exposed through a factory-oriented contract that does not match Material UI's file-oriented Markdown pipeline.

## Required docs-infra work

### 1. Add a file-backed demo loader API

Docs-infra needs an API that can process an arbitrary entry file without requiring an `index.ts` containing a `createDemo` call.

A suitable API would accept data similar to:

```ts
interface FileDemoInput {
  entryUrl: string;
  javascriptUrl?: string;
  typescriptUrl?: string;
  previewUrl?: string;
  options: Record<string, unknown>;
}
```

It should return:

- Precomputed `Code`.
- Compiled bundled components.
- Relative files.
- External dependencies for live execution.
- Source URLs.
- JavaScript and TypeScript variants.
- Preview metadata.

The current `loadPrecomputedCodeHighlighter` cannot simply be applied to Material UI's `.tsx` demos. It specifically parses a `createDemo` or `createDemoWithVariants` call and otherwise leaves the module unchanged.

### 2. Support multiple file-backed demos from one Markdown module

The Material UI Markdown loader resolves many demo markers in one page. Docs-infra needs either:

- A programmatic loader API that `@mui/internal-markdown` can call once per marker, or
- A virtual-module generator that creates one docs-infra demo module per marker.

This must not require committing an `index.ts` beside every demo.

### 3. Generate the live client scope automatically

Docs-infra's complete live-editing setup expects a `ClientProvider` generated from a `createDemoClient` call. Requiring a `client.ts` file for every Material UI demo would create hundreds of files.

Docs-infra should support synthesizing the client provider from the file-backed demo graph. It must hoist:

- Package imports.
- Namespace imports.
- Default and named imports.
- React and JSX runtime values.
- Nested relative-module dependencies.
- CSS dependencies where applicable.

This is the largest functional blocker for live editing.

### 4. Add a Material-compatible preview mode

Docs-infra focus frames are not equivalent to `.tsx.preview`.

Material UI preview mode:

- Displays a separately generated JSX fragment.
- Replaces that fragment inside the full source for execution.
- Resets the preview edit when the full source opens.
- Resets the full-source edit when returning to preview mode.
- Uses Expand and Collapse rather than Show and Hide.
- Has separate editor instances and undo histories.

Docs-infra currently edits the full source through collapsed focus frames. Expanding preserves the same edit. It needs either:

- An explicit alternate-source mode, or
- A headless source-controller API that lets Material UI retain its current preview/full-source state machine.

The second option is likely smaller and safer.

### 5. Expose raw selected-file source as a headless API

`useDemo` currently exposes the rendered selected file and `setSource`, but not a straightforward selected-file source string suitable for Material UI's textarea editor.

To preserve the existing editor and Prism rendering, docs-infra should expose at least:

```ts
selectedFileSource: string;
selectedFileLanguage: string;
selectedFileEditable: boolean;
```

Material UI could then keep `DemoEditor`, call `setSource`, and use docs-infra only for source state and live execution.

Without this API, migration requires replacing the editor DOM, keyboard model, and syntax-token structure. Several of the new end-to-end tests would fail.

### 6. Make preference persistence and hash formats configurable

Material UI requires:

- The `codeVariant` cookie.
- Server-visible JavaScript or TypeScript selection.
- Correct hydration with no source-language flash.
- `#BasicButtons.js` and `#BasicButtons.tsx`.
- Styling-prefixed anchors.
- Language changes that reset edits.

Docs-infra currently owns transform persistence through `localStorage` and uses colon-separated hashes. It needs configurable adapters such as:

```ts
interface CodePreferenceAdapter {
  initialValue?: string;
  get(): string | null;
  set(value: string | null): void;
}

interface CodeHashAdapter {
  parse(hash: string): Selection | null;
  format(selection: Selection): string;
}
```

Material UI could supply its cookie and legacy-hash behavior without forking docs-infra hooks.

### 7. Preserve sibling JavaScript semantics initially

Docs-infra can generate JavaScript from TypeScript, but its transform:

- Produces `.jsx` from `.tsx`.
- Removes types without running Material UI's complete formatter.
- Does not reproduce generated PropTypes.
- Does not guarantee text identical to the committed `.js` file.

For a low-risk migration, the file-backed loader should initially load the existing `.tsx` and `.js` siblings as separate source variants. Removing generated JavaScript can be a later migration.

### 8. Support the marker option contract as metadata

Docs-infra does not need to implement every Material-specific option, but it must preserve and pass them to Material UI's `Demo` content component:

- `hideToolbar`
- `defaultCodeOpen`
- `bg`
- `iframe`
- `isolated`
- `maxWidth`
- `height`
- `disableLiveEdit`
- `hideEditButton`
- `disableAd`
- `anchorId`
- `aiSuggestion`

It should also allow toolbar-hidden demos to skip source analysis and live-client generation where possible.

### 9. Allow product-specific source links and sandbox export behavior

Docs-infra has generic URL and export support, but Material UI needs control over:

- Exact GitHub file URLs.
- Page source-link hashes.
- Package versions.
- CRA versus Vite templates.
- Root entry files.
- Material theme setup.
- Relative-file paths.
- CodeSandbox and StackBlitz form payloads.

Most primitives already exist. The missing piece is a stable customization boundary that receives the complete, decoded file graph.

### 10. Add compatibility-level browser tests

Docs-infra unit tests cover many engine behaviors, including errors and last-good rendering. They do not prove the Material UI interaction contract.

The new 27-test Material UI suite should become the acceptance gate for the compatibility adapter, especially for:

- Preview/full-source transitions.
- Cookie hydration.
- Legacy hashes.
- Active-tab copy.
- Reset remounting.
- Decoded sandbox payloads.
- Iframes and isolated themes.

## Required Material UI work

These changes can remain localized and should not require touching every demo.

### 1. Add docs-infra and configure its loaders

Material UI needs:

- The docs-infra dependency.
- Webpack and Turbopack rules for generated or virtual demo modules.
- TypeScript-to-JavaScript transforms only if sibling `.js` files are no longer used.
- Any required client-provider loader configuration.

The repository's Node, TypeScript, React, and Next.js versions are already compatible with the current docs-infra requirements.

### 2. Add a Material demo adapter

A localized adapter should translate the current Markdown loader output into docs-infra's `Code` and `ContentProps` contracts.

The natural location is `packages-internal/core-docs`, behind the existing `Demo` API. Markdown pages and demo source files should not know that docs-infra is underneath.

### 3. Add a Material live-demo controller

Material UI needs a client controller based on `useDemoController`, plus the generated externals from the proposed file-backed loader.

This should be one shared controller implementation, not one hand-authored file per demo.

### 4. Retain Material-specific rendering wrappers

These remain Material UI responsibilities:

- `DemoSandbox`.
- `DemoInstanceThemeProvider`.
- Runtime theme injection.
- Iframe portal and Emotion cache.
- RTL support.
- Isolated theme props.
- Error-boundary presentation.
- Ads and AI suggestions.
- Material toolbar styling and translations.
- Analytics.

Docs-infra should provide data and state, not absorb product-specific UI.

### 5. Adapt the existing toolbar to `useDemo`

The existing toolbar can remain visually intact while using docs-infra actions for:

- Copy.
- Reset.
- Source expansion.
- File selection.
- JavaScript and TypeScript transform selection.
- StackBlitz.
- CodeSandbox.

Material UI must still increment a render key on reset so stateful bundled demos remount. Docs-infra's source reset alone does not guarantee that behavior.

### 6. Add syntax-highlight CSS compatibility

Docs-infra uses Starry Night token classes rather than Prism's `.token.*` classes.

Material UI must choose one of these approaches:

1. Keep the current Prism renderer through the proposed headless raw-source API.
2. Restyle Starry Night output to match the current appearance and relax implementation-specific Playwright selectors.

The first approach produces the smallest observable change.

## Recommended migration boundary

The migration should **not** copy Base UI's authoring model into Material UI.

The target should be:

```text
Existing Material Markdown and demo files
        |
        v
@mui/internal-markdown compatibility adapter
        |
        v
docs-infra file-backed source graph and live controller
        |
        v
Existing Material Demo, toolbar, sandbox, theme, and iframe UI
```

This avoids:

- Converting 725 markers to MDX imports.
- Moving more than 800 demos into variant directories.
- Adding hundreds of `index.ts` files.
- Adding hundreds of `client.ts` files.
- Changing translated Markdown handling.
- Changing marker options.
- Removing generated JavaScript immediately.
- Reimplementing Material-specific themes and iframes in docs-infra.

## Suggested order

1. Add the file-backed docs-infra API and automatic live-client generation.
2. Integrate one ordinary Material demo behind a feature flag.
3. Preserve the current `DemoEditor`, toolbar, themes, and marker options.
4. Make the 27 Playwright tests pass unchanged.
5. Add relative-module, iframe, and isolated-theme fixtures.
6. Roll out page by page without changing source files.
7. Only after parity, consider removing generated `.js` and `.tsx.preview` artifacts.

The critical missing work is therefore **a compatibility ingestion layer in docs-infra**, not another demo UI implementation in Material UI.
