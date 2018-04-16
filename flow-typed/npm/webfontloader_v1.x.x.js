// flow-typed signature: 597f18897fff6626c749060115ba6252
// flow-typed version: b43dff3e0e/webfontloader_v1.x.x/flow_>=v0.15.x

declare module 'webfontloader' {
  declare type WebFontConfig = {
    loading?: () => mixed,
    active?: () => mixed,
    inactive?: () => mixed,

    fontloading?: (familyName: string, fvd: string) => mixed,
    fontactive?: (familyName: string, fvd: string) => mixed,
    fontinactive?: (familyName: string, fvd: string) => mixed,

    classes?: boolean,
    events?: boolean,

    timeouts?: number,

    custom?: {
      families: string[],
      urls: string[],
      testStrings: { [k: string]: string },
    },

    fontdeck?: {
      id: string,
    },

    monotype?: {
      projectId: string,
      version?: number,
    },

    google?: {
      families: string[],
      text?: string,
    },

    typekit?: {
      id: string,
    },
  }
  declare class WebFont {
    load(config: WebFontConfig): void;
  }

  declare var exports: WebFont;
}

