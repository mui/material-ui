import { shallow, EnzymeSelector, ShallowRendererProps } from 'enzyme';

export interface ShallowOptions extends ShallowRendererProps {
  shallow: typeof shallow;
  dive: boolean;
  untilSelector: EnzymeSelector;
}

/**
 * @deprecated
 * @param options
 */
export default function createShallow(options?: Partial<ShallowOptions>): typeof shallow;
