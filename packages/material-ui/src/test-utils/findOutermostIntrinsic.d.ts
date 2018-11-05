import { ReactWrapper } from 'enzyme';

/**
 * like ReactWrapper#getDOMNode() but returns a ReactWrapper
 *
 * @returns the wrapper for the outermost DOM node
 */
export default function findOutermostIntrinsic(reactWrapper: ReactWrapper): ReactWrapper;
