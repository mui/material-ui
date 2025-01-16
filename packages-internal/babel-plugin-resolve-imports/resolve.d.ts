declare module 'resolve/sync' {
  import type { Opts } from 'resolve';

  function resolve(id: string, options?: Opts): string;
  export = resolve;
}
