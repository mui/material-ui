// Importing from TypeScript files
import Button from './src/components/Button';
import { User, UserRole } from './src/types';

// TypeScript type imports
import type { User as UserType } from './src/types';

// Re-exporting types
export type { UserRole } from './src/types';

// Dynamic import of TS file
const loadButton = () => import('./src/components/Button');

console.log(Button, User, UserRole, loadButton);
