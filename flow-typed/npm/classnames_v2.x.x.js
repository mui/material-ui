// flow-typed signature: f18a1d7eaf96fce01718f217f06c838e
// flow-typed version: 3c3f096590/classnames_v2.x.x/flow_>=v0.23.x

type $npm$classnames$Classes =
  string |
  {[className: string]: * } |
  Array<string> |
  false |
  void |
  null

declare module 'classnames' {
  declare function exports(
    ...classes: Array<$npm$classnames$Classes>
  ): string;
}
