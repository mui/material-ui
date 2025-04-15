import { PropsFor, SimpleStyleFunction } from '../style';

export const width: SimpleStyleFunction<'width'>;
export const maxWidth: SimpleStyleFunction<'maxWidth'>;
export const minWidth: SimpleStyleFunction<'minWidth'>;
export const height: SimpleStyleFunction<'height'>;
export const maxHeight: SimpleStyleFunction<'maxHeight'>;
export const minHeight: SimpleStyleFunction<'minHeight'>;
export const sizeWidth: SimpleStyleFunction<'sizeWidth'>;
export const sizeHeight: SimpleStyleFunction<'sizeHeight'>;
export const boxSizing: SimpleStyleFunction<'boxSizing'>;

declare const sizing: SimpleStyleFunction<
  | 'width'
  | 'maxWidth'
  | 'minWidth'
  | 'height'
  | 'maxHeight'
  | 'minHeight'
  | 'sizeWidth'
  | 'sizeHeight'
  | 'boxSizing'
>;

export type SizingProps = PropsFor<typeof sizing>;

export default sizing;
