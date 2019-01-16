/**
 * like ReactWrapper#getDOMNode() but returns a ReactWrapper
 *
 * @param {import('enzyme').ReactWrapper} reactWrapper
 * @returns {import('enzyme').ReactWrapper} the wrapper for the outermost DOM node
 */
export default function findOutermostIntrinsic(reactWrapper) {
  return reactWrapper.findWhere(n => n.exists() && typeof n.type() === 'string').first();
}
