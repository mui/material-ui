declare module 'react-docgen' {
  export type Handler = () => unknown;

  export const defaultHandlers: Handler[];

  export function parse(
    source: string,
    unknown: null,
    handlers: Handler[0],
    options: { filename: string }
  ): any;
}
