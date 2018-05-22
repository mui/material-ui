import { PropTypes, StandardProps } from '..';

export interface BoxProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, BoxClassKey> {
    children: React.ReactNode;
    component?: React.ReactType<BoxProps>;
    cursorPointer?: boolean,
    hAlign?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    vAlign?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    inline?: boolean;
    margin?: number;
    padding?:number;
  }

export type BoxClassKey =
  | 'root'
  | 'displayInline'
  | 'cursorPointer'
  | 'hAlignStart'
  | 'hAlignCenter'
  | 'hAlignEnd'
  | 'hAlignSpaceBetween'
  | 'hAlignSpaceAround'
  | 'hAlignSpaceEvenly'
  | 'vAlignStart'
  | 'vAlignCenter'
  | 'vAlignEnd'
  | 'vAlignBaseline'
  | 'vAlignStretch';

declare const Box: React.ComponentType<BoxProps>;

export default Box;
