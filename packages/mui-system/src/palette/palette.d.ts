import { palette } from '../Box';
import { PropsFor, SimpleStyleFunction } from '../style';

export const color: SimpleStyleFunction<'color'>;
export const bgcolor: SimpleStyleFunction<'bgcolor'>;
export type PaletteProps = PropsFor<typeof palette>;

export default palette;
