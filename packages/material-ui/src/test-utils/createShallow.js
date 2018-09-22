import { shallow as enzymeShallow } from 'enzyme';
import until from './until';

// Generate an enhanced shallow function.
export default function createShallow(options1 = {}) {
  const { shallow = enzymeShallow, dive = false, untilSelector = false, ...other1 } = options1;

  const shallowWithContext = function shallowWithContext(node, options2 = {}) {
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
