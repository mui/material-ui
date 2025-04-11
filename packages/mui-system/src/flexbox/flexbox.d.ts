import { PropsFor, SimpleStyleFunction } from '../style';

export const flexBasis: SimpleStyleFunction<'flexBasis'>;
export const flexDirection: SimpleStyleFunction<'flexDirection'>;
export const flexWrap: SimpleStyleFunction<'flexWrap'>;
export const justifyContent: SimpleStyleFunction<'justifyContent'>;
export const alignItems: SimpleStyleFunction<'alignItems'>;
export const alignContent: SimpleStyleFunction<'alignContent'>;
export const order: SimpleStyleFunction<'order'>;
export const flex: SimpleStyleFunction<'flex'>;
export const flexGrow: SimpleStyleFunction<'flexGrow'>;
export const flexShrink: SimpleStyleFunction<'flexShrink'>;
export const alignSelf: SimpleStyleFunction<'alignSelf'>;
export const justifyItems: SimpleStyleFunction<'justifyItems'>;
export const justifySelf: SimpleStyleFunction<'justifySelf'>;

declare const flexbox: SimpleStyleFunction<
  | 'flexBasis'
  | 'flexDirection'
  | 'flexWrap'
  | 'justifyContent'
  | 'alignItems'
  | 'alignContent'
  | 'order'
  | 'flex'
  | 'flexGrow'
  | 'flexShrink'
  | 'alignSelf'
  | 'justifyItems'
  | 'justifySelf'
>;

export type FlexboxProps = PropsFor<typeof flexbox>;

export default flexbox;
