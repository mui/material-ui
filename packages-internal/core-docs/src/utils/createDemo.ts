import {
  createDemoFactory,
  createDemoWithVariantsFactory,
} from '@mui/internal-docs-infra/abstractCreateDemo';
import { DemoContent, DemoContentLoading } from '../DemoContent';

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
  DemoContent,
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
  DemoContent,
  DemoContentLoading,
  controlled: true,
  projectDir,
  projectUrl,
});
