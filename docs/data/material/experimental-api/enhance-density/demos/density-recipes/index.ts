import { createDemo } from '@mui/internal-core-docs/utils/createDemo';
import ClientProvider from './client';

import DensityRecipesDemo from './DensityRecipesDemo';

export default createDemo(import.meta.url, DensityRecipesDemo, {
  ClientProvider,
});
