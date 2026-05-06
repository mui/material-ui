import { createDemoClientFactory } from '@mui/internal-docs-infra/abstractCreateDemoClient';
import { DemoController } from '../DemoContent';

/**
 * Creates a demo client provider for live editing with precomputed externals.
 * @param url Depends on `import.meta.url` to determine the source file location.
 * @param meta Additional meta and configuration for the demo client.
 */
export const createDemoClient = createDemoClientFactory({
  DemoController,
});
