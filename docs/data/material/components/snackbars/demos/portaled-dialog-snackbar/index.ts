import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import PortaledDialogSnackbar from './PortaledDialogSnackbar';
import ClientProvider from './client';

export default createDemo(import.meta.url, PortaledDialogSnackbar, {
  ClientProvider,
});
