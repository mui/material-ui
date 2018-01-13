import { mount } from 'enzyme';

export interface MountOptions {
  mount: typeof mount;
}

export default function createMount(
  options?: Partial<MountOptions>,
): typeof mount & {
  attachTo: HTMLElement;
  cleanUp(): void;
};
