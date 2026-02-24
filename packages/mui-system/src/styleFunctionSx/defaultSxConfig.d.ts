import { StyleFunction, TransformFunction } from '../style';

type SimpleStyleFunction<PropKey extends keyof any> = StyleFunction<Partial<Record<PropKey, any>>>;

export interface SxConfigRecord {
  cssProperty?: keyof React.CSSProperties | false | undefined;
  /**
   * dot access in `Theme`
   */
  themeKey?: string | undefined;
  transform?: TransformFunction | undefined;
  style?: SimpleStyleFunction<any> | undefined;
}

export type SxConfig = Record<string, SxConfigRecord>;

declare const defaultSxConfig: SxConfig;

export default defaultSxConfig;
