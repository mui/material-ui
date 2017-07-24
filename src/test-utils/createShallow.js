// @flow weak

import type { Element } from 'react';
import { shallow as enzymeShallow } from 'enzyme';
import until from './until';

// Generate an enhanced shallow function.
export default function createShallow(options: Object = {}) {
  const { shallow = enzymeShallow, otherContext, dive = false, untilSelector = false } = options;

  const shallowWithContext = function shallowWithContext(node: Element<*>, options2: Object = {}) {
    const { context: context2, ...other } = options2;

    const wrapper = shallow(node, {
      context: {
        ...otherContext,
        ...context2,
      },
      ...other,
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
