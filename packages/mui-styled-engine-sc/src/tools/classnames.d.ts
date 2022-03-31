export declare type CxArg =
  | undefined
  | null
  | string
  | boolean
  | {
      [className: string]: boolean | null | undefined;
    }
  | readonly CxArg[];
/** Copy pasted from
 * https://github.com/emotion-js/emotion/blob/23f43ab9f24d44219b0b007a00f4ac681fe8712e/packages/react/src/class-names.js#L17-L63
 * */
export declare const classnames: (args: CxArg[]) => string;
