import { shallow as enzymeShallow, EnzymeSelector, MountRendererProps, ReactWrapper } from 'enzyme';
import { ReactElement } from 'react';
import until from './until';

export interface ShallowOptions {
  shallow: typeof enzymeShallow;
  context: object;
  dive: boolean;
  untilSelector: EnzymeSelector;
}

export type MuiShallow<P> = (
  node: ReactElement<P>,
  options?: MountRendererProps,
) => ReactWrapper<P, any>;

// Generate an enhanced shallow function.
export default function createShallow<P>(options1: Partial<ShallowOptions> = {}): MuiShallow<P> {
  const { shallow = enzymeShallow, dive = false, untilSelector = false, ...other1 } = options1;

  const shallowWithContext = function shallowWithContext<P>(
    node: ReactElement<P>,
    options2: MountRendererProps = {},
  ) {
    const options = {
      ...other1,
      ...options2,
      context: {
        ...other1.context,
        ...options2.context,
      },
    };

    const wrapper = shallow(node, options);

    if (dive) {
      return wrapper.dive();
    }

    if (untilSelector) {
      return until.call(wrapper, untilSelector, options);
    }

    return wrapper;
  };

  return shallowWithContext;
}
