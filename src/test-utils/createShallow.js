// @flow weak

import { shallow as enzymeShallow } from 'enzyme';
import until from './until';

// Generate an enhanced shallow function.
export default function createShallow(options1: Object = {}) {
  const { shallow = enzymeShallow, dive = false, untilSelector = false, ...other1 } = options1;

  const shallowWithContext = function shallowWithContext(
    node: React$Element<any>,
    options2: Object = {},
  ) {
    const wrapper = shallow(node, {
      ...other1,
      ...options2,
      context: {
        ...other1.context,
        ...options2.context,
      },
    });

    if (dive) {
      return wrapper.dive();
    }

    if (untilSelector) {
      return until.call(wrapper, untilSelector);
    }

    return wrapper;
  };

  return shallowWithContext;
}
