// flow-typed signature: b391d71d029170a91ea550188224f180
// flow-typed version: 2b8923a76c/classnames_v2.x.x/flow_>=v0.25.x

type $npm$classnames$Classes =
  | string
  | { [className: string]: * }
  | false
  | void
  | null;

declare module "classnames" {
  declare function exports(
    ...classes: Array<$npm$classnames$Classes | Array<$npm$classnames$Classes>>
  ): string;
}

declare module "classnames/bind" {
  declare module.exports: $Exports<"classnames">;
}

declare module "classnames/dedupe" {
  declare module.exports: $Exports<"classnames">;
}
