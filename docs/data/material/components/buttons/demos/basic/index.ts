import { createDemo } from 'docs/src/modules/utils/createDemo';
import ClientProvider from './client';

import BasicButtons from './BasicButtons';

export default createDemo(import.meta.url, BasicButtons, {
  ClientProvider,
});
