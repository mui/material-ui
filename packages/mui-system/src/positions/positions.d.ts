import { type PropsFor, type SimpleStyleFunction } from '../style';

declare const positions: SimpleStyleFunction<
  'zIndex' | 'position' | 'top' | 'right' | 'bottom' | 'left'
>;

export type PositionsProps = PropsFor<typeof positions>;

export default positions;
