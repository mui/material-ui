import { ReactWrapper } from 'enzyme';

/**
 * checks if a given react wrapper wraps an intrinsic element i.e. a DOM node
 * @param {import('enzyme').ReactWrapper} reactWrapper
 * @returns {boolean} true if the given reactWrapper wraps an intrinsic element
 */
export function wrapsIntrinsicElement(reactWrapper: ReactWrapper): boolean {
  return typeof reactWrapper.type() === 'string';
}

/**
 * like ReactWrapper#getDOMNode() but returns a ReactWrapper
 * @param {import('enzyme').ReactWrapper} reactWrapper
 * @returns {import('enzyme').ReactWrapper} the wrapper for the outermost DOM node
 */
export default function findOutermostIntrinsic(reactWrapper: ReactWrapper): ReactWrapper {
  return reactWrapper.findWhere((n) => n.exists() && wrapsIntrinsicElement(n)).first();
}
