import { createDemo } from '@mui/internal-core-docs/utils/createDemo';
import ClientProvider from './client';

import AllComponentsDemo from './AllComponentsDemo';

export default createDemo(import.meta.url, AllComponentsDemo, {
  ClientProvider,
});
