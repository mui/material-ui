import { PropsFor, SimpleStyleFunction } from '../style';

declare const shadows: SimpleStyleFunction<'boxShadow'>;

export type ShadowsProps = PropsFor<typeof shadows>;

export default shadows;
