import { CommonWrapper } from 'enzyme';

export default function until<P = any, S = any>(
  selector: string,
  options: { context: object },
): CommonWrapper<P, S>;
