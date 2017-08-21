// flow-typed signature: 04e310e8c98cdb5de377193da621970b
// flow-typed version: 7fd0a6404e/classnames_v2.x.x/flow_>=v0.25.x

type $npm$classnames$Classes =
  | string
  | { [className: string]: * }
  | Array<string>
  | false
  | void
  | null;

declare module 'classnames' {
  declare function exports(...classes: Array<$npm$classnames$Classes>): string;
}

declare module 'classnames/bind' {
  declare module.exports: $Exports<'classnames'>;
}
