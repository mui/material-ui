import type { CxArg } from './tools/classnames';

export type { CxArg };
export declare type Cx = (...classNames: CxArg[]) => string;

export declare function useCx(): {
  cx: Cx;
};
