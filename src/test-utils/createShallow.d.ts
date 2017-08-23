import { shallow } from 'enzyme';

export interface ShallowOptions {
  shallow: typeof shallow;
  otherContext: Object;
  dive: boolean;
  untilSelector: boolean;
}

export default function createShallow(
  options?: Partial<ShallowOptions>
): typeof shallow;
