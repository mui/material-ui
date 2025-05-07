// Importing from declaration files
import { User, UserRole } from './types';
import { Button, ButtonProps } from './types/components';

// Type imports
import type { User as UserType } from './types/models';
import type { ButtonProps as ButtonPropsType } from './types/components';

// Re-exporting from declaration files
export { User, UserRole } from './types';
export * from './types/components';

// Type exports
export type { UserType } from './types/models';
export type { ButtonPropsType } from './types/components';

export declare const createUser: () => User;
