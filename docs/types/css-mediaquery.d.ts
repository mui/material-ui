declare module 'css-mediaquery' {
  type MediaValues = Record<
    | 'orientation'
    | 'scan'
    | 'width'
    | 'height'
    | 'device-width'
    | 'device-height'
    | 'resolution'
    | 'aspect-ratio'
    | 'device-aspect-ratio'
    | 'grid'
    | 'color'
    | 'color-index'
    | 'monochrome',
    unknown
  >;

  export function match(query: string, values: Partial<MediaValues>): boolean;
}
