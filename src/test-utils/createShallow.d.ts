import { shallow, EnzymeSelector } from 'enzyme';

export interface ShallowOptions {
  shallow: typeof shallow;
  dive: boolean;
  untilSelector: EnzymeSelector;
}

export default function createShallow(options?: Partial<ShallowOptions>): typeof shallow;
