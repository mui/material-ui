declare module 'resolve/sync' {
  import { Opts } from 'resolve';

  function resolve(id: string, options?: Opts): string;
  export = resolve;
}
