export type ColorFormat = 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'color';
export interface ColorObject {
  type: ColorFormat;
  values: [number, number, number] | [number, number, number, number];
  colorSpace?: 'srgb' | 'display-p3' | 'a98-rgb' | 'prophoto-rgb' | 'rec-2020';
}

export function hexToRgb(hex: string): string;
export function rgbToHex(color: string): string;
export function hslToRgb(color: string): string;
export function decomposeColor(color: string): ColorObject;
export function colorChannel(color: string): string;
export function safeColorChannel(color: string, warning?: string): string;
export function recomposeColor(color: ColorObject): string;
export function getContrastRatio(foreground: string, background: string): number;
export function getLuminance(color: string): number;
export function emphasize(color: string, coefficient?: number): string;
export function safeEmphasize(color: string, coefficient?: number, warning?: string): string;
export function alpha(color: string, value: number): string;
export function safeAlpha(color: string, value: number, warning?: string): string;
export function darken(color: string, coefficient: number): string;
export function safeDarken(color: string, coefficient: number, warning?: string): string;
export function lighten(color: string, coefficient: number): string;
export function safeLighten(color: string, coefficient: number, warning?: string): string;
