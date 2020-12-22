import { shallow as enzymeShallow } from 'enzyme';
import until from './until';

let warnedOnce = false;

// Generate an enhanced shallow function.
export default function createShallow(options1 = {}) {
  if (!warnedOnce) {
    warnedOnce = true;
    console.warn(
      [
        'Material-UI: the test utils are deprecated, they are no longer present in v5.',
        'The helpers were designed to work with enzyme.',
        'However, the tests of the core components were moved to react-testing-library.',
      ].join('\n'),
    );
  }
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
