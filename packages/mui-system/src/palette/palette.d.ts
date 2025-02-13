import { PropsFor, SimpleStyleFunction, palette } from '../Box';

export const color: SimpleStyleFunction<'color'>;
export const bgcolor: SimpleStyleFunction<'bgcolor'>;
export type PaletteProps = PropsFor<typeof palette>;
