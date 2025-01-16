import type { Theme } from '../createTheme';

export default function useTheme<T = Theme>(defaultTheme?: T): T;
