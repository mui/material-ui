// Importing from declaration files
import { User, UserRole } from './types/index.js';
import { Button, ButtonProps } from './types/components.js';

// Type imports
import type { User as UserType } from './types/models.js';
import type { ButtonProps as ButtonPropsType } from './types/components.js';

// Re-exporting from declaration files
export { User, UserRole } from './types/index.js';
export * from './types/components.js';

// Type exports
export type { UserType } from './types/models.js';
export type { ButtonPropsType } from './types/components.js';

export declare const createUser: () => User;
