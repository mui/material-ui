import { mount } from 'enzyme';

export interface MountOptions {
  mount: typeof mount;
  strict: boolean;
}

/**
 * @deprecated
 * @param options
 */
export default function createMount(
  options?: Partial<MountOptions>
): typeof mount & {
  attachTo: HTMLElement;
  cleanUp(): void;
};
