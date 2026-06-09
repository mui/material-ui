import * as React from 'react';
import {
  createDemoFactory,
  createDemoWithVariantsFactory,
} from '@mui/internal-docs-infra/abstractCreateDemo';
// Import directly from the files, NOT the `../DemoContent` barrel: the barrel
// eagerly re-exports the heavy `DemoContent`, and the package has no
// `sideEffects: false`, so the bundler can't drop that re-export — importing the
// barrel here would pull `DemoContent` into this module's graph and defeat the
// code-split. `DemoContentLazy` dynamic-imports `DemoContent` on the client;
// `DemoContentLoading` stays eager so the fallback can paint immediately while
// the content streams in.
import DemoContentLazy from '../DemoContent/DemoContentLazy';
import DemoContentLoading from '../DemoContent/DemoContentLoading';
// Already in this module's graph via `DemoContentLoading` → `DemoContainer` →
// `DemoComponentTheme`, so importing the page theme provider adds no weight.
import { DemoPageThemeProvider } from '../DemoThemeProviders';

// Populated by `withDeploymentConfig` so build-time `file://` URLs gathered
// from `import.meta.url` get rewritten into hosted Git URLs (e.g.
// `https://github.com/owner/repo/tree/<branch>/`). When either is missing,
// URLs are left untouched.
const projectDir = process.env.SOURCE_CODE_ROOT_DIR;
const projectUrl = process.env.SOURCE_CODE_ROOT_URL;

// Demos live under `pages/` (co-located with the markdown that embeds them), so
// each `index.ts` is ALSO a standalone Next.js route (e.g. `/…/demos/<name>`).
// Rendered as a page it has no docs `AppFrame`, so the branding theme that
// `DemoContainer`'s chrome reads (e.g. `palette.primaryDark`) is missing and the
// page crashes at prerender. `getLayout` wraps the standalone page in the same
// `DemoPageThemeProvider` that `AppFrame` applies. It only runs for page exports,
// so demos embedded in a markdown page (already branded by `AppFrame`) are
// unaffected.
type DemoPageComponent = { getLayout?: (page: React.ReactElement) => React.ReactNode };

function withDemoPageLayout<T extends React.ComponentType<any>>(Demo: T): T {
  (Demo as T & DemoPageComponent).getLayout = (page) =>
    React.createElement(DemoPageThemeProvider, null, page);
  return Demo;
}

const createDemoBase = createDemoFactory({
  DemoContent: DemoContentLazy,
  DemoContentLoading,
  controlled: true,
  projectDir,
  projectUrl,
});

const createDemoWithVariantsBase = createDemoWithVariantsFactory({
  DemoContent: DemoContentLazy,
  DemoContentLoading,
  controlled: true,
  projectDir,
  projectUrl,
});

/**
 * Creates a demo component for displaying code examples with syntax highlighting.
 * @param url Depends on `import.meta.url` to determine the source file location.
 * @param component The component to be rendered in the demo.
 * @param meta Additional meta for the demo.
 */
export const createDemo: typeof createDemoBase = (url, component, meta) =>
  withDemoPageLayout(createDemoBase(url, component, meta));

/**
 * Creates a demo component for displaying code examples with syntax highlighting.
 * A variant is a different implementation style of the same component.
 * @param url Depends on `import.meta.url` to determine the source file location.
 * @param variants The variants of the component to be rendered in the demo.
 * @param meta Additional meta for the demo.
 */
export const createDemoWithVariants: typeof createDemoWithVariantsBase = (url, variants, meta) =>
  withDemoPageLayout(createDemoWithVariantsBase(url, variants, meta));
