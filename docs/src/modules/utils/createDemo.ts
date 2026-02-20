import {
  createDemoFactory,
  createDemoWithVariantsFactory,
} from '@mui/internal-docs-infra/abstractCreateDemo';

// eslint-disable-next-line import/extensions
import DemoContent from '../components/DemoContent';

/**
 * Creates a demo component for displaying code examples with syntax highlighting.
 * @param url Depends on `import.meta.url` to determine the source file location.
 * @param component The component to be rendered in the demo.
 * @param meta Additional meta for the demo.
 */
export const createDemo = createDemoFactory({
  DemoContent,
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
});
