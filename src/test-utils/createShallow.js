// @flow weak

import { shallow as enzymeShallow } from 'enzyme';
import type { Element } from 'react';
import until from './until';

// Generate an enhanced shallow function.
export default function createShallow(options1: Object = {}) {
  const { shallow = enzymeShallow, dive = false, untilSelector = false, ...other1 } = options1;

  const shallowWithContext = function shallowWithContext(
    node: Element<any>,
    options2: Object = {},
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
