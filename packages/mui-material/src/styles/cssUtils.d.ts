import { CSSProperties } from './createTypography';

export function isUnitless(value: string): boolean;

export function getUnit(input: string): string;

export function toUnitless(value: string): number;

export function convertLength(baseFontSize: string): (length: string, toUnit: string) => string;

export interface AlignPropertyParams {
  size: number;
  grid: number;
}
export function alignProperty(params: AlignPropertyParams): number;

export interface FontGridParams {
  lineHeight: number;
  pixels: number;
  htmlFontSize: number;
}
export function fontGrid(params: FontGridParams): number;

export interface ResponsivePropertyParams {
  cssProperty: string;
  min: number;
  max: number;
  unit?: string;
  breakpoints?: number[];
  transform?: (value: number) => number;
}
export function responsiveProperty(params: ResponsivePropertyParams): CSSProperties;
