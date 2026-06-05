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

// Populated by `withDeploymentConfig` so build-time `file://` URLs gathered
// from `import.meta.url` get rewritten into hosted Git URLs (e.g.
// `https://github.com/owner/repo/tree/<branch>/`). When either is missing,
// URLs are left untouched.
const projectDir = process.env.SOURCE_CODE_ROOT_DIR;
const projectUrl = process.env.SOURCE_CODE_ROOT_URL;

/**
 * Creates a demo component for displaying code examples with syntax highlighting.
 * @param url Depends on `import.meta.url` to determine the source file location.
 * @param component The component to be rendered in the demo.
 * @param meta Additional meta for the demo.
 */
export const createDemo = createDemoFactory({
  DemoContent: DemoContentLazy,
  DemoContentLoading,
  controlled: true,
  projectDir,
  projectUrl,
});

/**
 * Creates a demo component for displaying code examples with syntax highlighting.
 * A variant is a different implementation style of the same component.
 * @param url Depends on `import.meta.url` to determine the source file location.
 * @param variants The variants of the component to be rendered in the demo.
 * @param meta Additional meta for the demo.
 */
export const createDemoWithVariants = createDemoWithVariantsFactory({
  DemoContent: DemoContentLazy,
  DemoContentLoading,
  controlled: true,
  projectDir,
  projectUrl,
});
