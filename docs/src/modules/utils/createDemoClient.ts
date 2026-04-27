import { createDemoClientFactory } from '@mui/internal-docs-infra/abstractCreateDemoClient';
import DemoController from '../components/DemoController';

/**
 * Creates a demo client provider for live editing with precomputed externals.
 * @param url Depends on `import.meta.url` to determine the source file location.
 * @param meta Additional meta and configuration for the demo client.
 */
// eslint-disable-next-line import/prefer-default-export
export const createDemoClient = createDemoClientFactory({
  DemoController,
});
