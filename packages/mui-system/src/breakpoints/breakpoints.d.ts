import { CSSObject } from '@mui/styled-engine';
import { Breakpoints } from '../createBreakpoints/createBreakpoints';
import type { Breakpoint, Theme } from '../createTheme';
import { ResponsiveStyleValue } from '../styleFunctionSx';
import { StyleFunction } from '../Box';

export const EMPTY_BREAKPOINTS: Breakpoints;
export const DEFAULT_BREAKPOINTS: Breakpoints;

export interface ResolveBreakpointValuesOptions<T> {
  values: ResponsiveStyleValue<T>;
  breakpoints?: Breakpoints['values'];
  base?: Record<string, boolean>;
}
export function resolveBreakpointValues<T>(
  options: ResolveBreakpointValuesOptions<T>,
): Record<string, T>;

export function mergeBreakpointsInOrder(breakpoints: Breakpoints, styles: CSSObject[]): CSSObject;

export function buildBreakpoints(
  target: any,
  theme: Theme,
  propValue: any,
  styleFromPropValue: (
    target: any,
    key: string | undefined,
    value: any,
    breakpoint?: Breakpoint,
  ) => any,
): any;

export function handleBreakpoints<Props>(
  props: Props,
  propValue: any,
  styleFromPropValue: (value: any, breakpoint?: Breakpoint) => any,
): any;

type DefaultBreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * @returns An enhanced stylefunction that considers breakpoints
 */
export default function breakpoints<Props, Breakpoints extends string = DefaultBreakPoints>(
  styleFunction: StyleFunction<Props>,
): StyleFunction<Partial<Record<Breakpoints, Props>> & Props>;
