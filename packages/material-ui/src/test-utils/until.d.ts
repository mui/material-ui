import { CommonWrapper } from 'enzyme';

export default function until<P = any, S = any>(
  selector: string,
  options: { context: any }
): CommonWrapper<P, S>;
