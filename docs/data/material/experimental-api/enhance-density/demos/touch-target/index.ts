import { createDemo } from '@mui/internal-core-docs/utils/createDemo';
import ClientProvider from './client';

import TouchTargetDemo from './TouchTargetDemo';

export default createDemo(import.meta.url, TouchTargetDemo, {
  ClientProvider,
});
