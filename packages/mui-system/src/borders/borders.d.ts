import { PropsFor, SimpleStyleFunction, borders } from '../Box';

export const border: SimpleStyleFunction<'border'>;
export const borderTop: SimpleStyleFunction<'borderTop'>;
export const borderRight: SimpleStyleFunction<'borderRight'>;
export const borderBottom: SimpleStyleFunction<'borderBottom'>;
export const borderLeft: SimpleStyleFunction<'borderLeft'>;
export const borderColor: SimpleStyleFunction<'borderColor'>;
export const borderTopColor: SimpleStyleFunction<'borderTopColor'>;
export const borderRightColor: SimpleStyleFunction<'borderRightColor'>;
export const borderBottomColor: SimpleStyleFunction<'borderBottomColor'>;
export const borderLeftColor: SimpleStyleFunction<'borderLeftColor'>;
export const borderRadius: SimpleStyleFunction<'borderRadius'>;
export type BordersProps = PropsFor<typeof borders>;
