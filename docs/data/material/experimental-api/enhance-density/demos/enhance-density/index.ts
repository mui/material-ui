import { createDemo } from '@mui/internal-core-docs/utils/createDemo';
import ClientProvider from './client';

import EnhanceDensityDemo from './EnhanceDensityDemo';

export default createDemo(import.meta.url, EnhanceDensityDemo, {
  ClientProvider,
});
