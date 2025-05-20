// Importing from TypeScript files
import Button from './src/components/Button.js';
import { User, UserRole } from './src/types.js';

// TypeScript type imports
import type { User as UserType } from './src/types.js';

// Re-exporting types
export type { UserRole } from './src/types.js';

// Dynamic import of TS file
const loadButton = () => import('./src/components/Button.js');

console.log(Button, User, UserRole, loadButton);
