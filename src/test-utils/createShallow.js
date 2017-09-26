// @flow weak

import { shallow as enzymeShallow } from 'enzyme';
import until from './until';

// Generate an enhanced shallow function.
export default function createShallow(options: Object = {}) {
  const {
    shallow = enzymeShallow,
    context,
    dive = false,
    untilSelector = false,
    ...other
  } = options;

  const shallowWithContext = function shallowWithContext(
    node: React$Element<any>,
    options2: Object = {},
  ) {
    const { context: context2, ...other2 } = options2;

    const mergedOptions = {
      ...other,
      ...other2,
      context: {
        ...context,
        ...context2,
      },
    };

    const wrapper = shallow(node, mergedOptions);

    if (dive) {
      return wrapper.dive();
    }

    if (untilSelector) {
      return until.call(wrapper, untilSelector, mergedOptions);
    }

    return wrapper;
  };

  return shallowWithContext;
}
