import { Menu as BaseMenu } from '@base-ui/react/menu';

export type Menu2Handle<Payload = unknown> = BaseMenu.Handle<Payload>;

/**
 * Creates a handle that connects detached triggers to one menu.
 */
export const createHandle = BaseMenu.createHandle;
