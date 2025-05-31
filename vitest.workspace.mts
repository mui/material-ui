import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // matches every folder inside the `packages` and `packages-internal` folders containing a config file
  '{docs,packages{-internal,}/*}/vitest.config{.jsdom,.browser,}.mts',
]);
