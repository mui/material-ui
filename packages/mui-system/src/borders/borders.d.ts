import { PropsFor, SimpleStyleFunction } from '../style';

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

declare const borders: SimpleStyleFunction<
  | 'border'
  | 'borderTop'
  | 'borderRight'
  | 'borderBottom'
  | 'borderLeft'
  | 'borderColor'
  | 'borderRadius'
>;

export type BordersProps = PropsFor<typeof borders>;

export default borders;
