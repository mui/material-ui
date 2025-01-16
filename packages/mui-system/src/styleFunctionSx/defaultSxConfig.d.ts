import { StyleFunction } from '../Box';
import { TransformFunction } from '../style';

type SimpleStyleFunction<PropKey extends keyof any> = StyleFunction<Partial<Record<PropKey, any>>>;

export interface SxConfigRecord {
  cssProperty?: keyof React.CSSProperties | false;
  /**
   * dot access in `Theme`
   */
  themeKey?: string;
  transform?: TransformFunction;
  style?: SimpleStyleFunction<any>;
}

export type SxConfig = Record<string, SxConfigRecord>;

declare const defaultSxConfig: SxConfig;

export default defaultSxConfig;
