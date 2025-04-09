import { PropsFor, grid, SimpleStyleFunction } from '../Box';

export const gap: SimpleStyleFunction<'gap'>;
export const columnGap: SimpleStyleFunction<'columnGap'>;
export const rowGap: SimpleStyleFunction<'rowGap'>;
export const gridColumn: SimpleStyleFunction<'gridColumn'>;
export const gridRow: SimpleStyleFunction<'gridRow'>;
export const gridAutoFlow: SimpleStyleFunction<'gridAutoFlow'>;
export const gridAutoColumns: SimpleStyleFunction<'gridAutoColumns'>;
export const gridAutoRows: SimpleStyleFunction<'gridAutoRows'>;
export const gridTemplateColumns: SimpleStyleFunction<'gridTemplateColumns'>;
export const gridTemplateRows: SimpleStyleFunction<'gridTemplateRows'>;
export const gridTemplateAreas: SimpleStyleFunction<'gridTemplateAreas'>;
export const gridArea: SimpleStyleFunction<'gridArea'>;

export type CssGridProps = PropsFor<typeof grid>;

export default grid;
