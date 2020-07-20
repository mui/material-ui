/**
 * checks if a given react wrapper wraps an intrinsic element i.e. a DOM node
 *
 * @param {import('enzyme').ReactWrapper} reactWrapper
 * @returns {boolean} true if the given reactWrapper wraps an intrinsic element
 */
export function wrapsIntrinsicElement(reactWrapper) {
  return typeof reactWrapper.type() === 'string';
}

let warnedOnce = false;

/**
 * like ReactWrapper#getDOMNode() but returns a ReactWrapper
 *
 * @param {import('enzyme').ReactWrapper} reactWrapper
 * @returns {import('enzyme').ReactWrapper} the wrapper for the outermost DOM node
 */
export default function findOutermostIntrinsic(reactWrapper) {
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

  return reactWrapper.findWhere((n) => n.exists() && wrapsIntrinsicElement(n)).first();
}
