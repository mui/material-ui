import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // matches every folder and file inside the `packages` folder
  'packages/*',
  'packages-internal/*',
]);
