import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // matches every folder inside the `packages` and `packages-internal` folders containing a config file
  '{packages,packages-internal}/*/vitest.config.ts',
]);
