import { shallow as enzymeShallow } from 'enzyme';
import until from './until';

/**
 * @typedef {object} ExtendedShallowOptions
 * @property {typeof import('enzyme').shallow} shallow;
 * @property {boolean} dive
 * @property {import('enzyme').EnzymeSelector} untilSelector
 *
 * @typedef {import('enzyme').ShallowRendererProps & ExtendedShallowOptions} ShallowOptions
 */

/**
 * Generate an enhanced shallow function.
 * @param {Partial<ShallowOptions>} [options1]
 * @returns {typeof import('enzyme').shallow}
 */
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
