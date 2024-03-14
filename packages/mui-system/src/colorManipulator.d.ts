/* eslint-disable @typescript-eslint/naming-convention */
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
export function private_safeColorChannel(color: string, warning?: string): string;
export function recomposeColor(color: ColorObject): string;
export function getContrastRatio(foreground: string, background: string): number;
export function getLuminance(color: string): number;
export function emphasize(color: string, coefficient?: number): string;
export function private_safeEmphasize(
  color: string,
  coefficient?: number,
  warning?: string,
): string;
export function alpha(color: string, value: number): string;
export function private_safeAlpha(color: string, value: number, warning?: string): string;
export function darken(color: string, coefficient: number): string;
export function private_safeDarken(color: string, coefficient: number, warning?: string): string;
export function lighten(color: string, coefficient: number): string;
export function private_safeLighten(color: string, coefficient: number, warning?: string): string;
export function blend(background: string, overlay: string, opacity: number, gamma?: number): string;
