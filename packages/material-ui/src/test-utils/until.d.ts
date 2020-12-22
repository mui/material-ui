import { CommonWrapper } from 'enzyme';

/**
 * @deprecated
 * @param selector
 * @param options
 */
export default function until<P = any, S = any>(
  selector: string,
  options: { context: any }
): CommonWrapper<P, S>;
