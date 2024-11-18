import { UseMediaQueryOptions } from '@mui/system/useMediaQuery';
import { Theme } from '../styles/createTheme';

export * from '@mui/system/useMediaQuery';

declare function useMediaQuery(
  queryInput: string | ((theme: Theme) => string),
  options?: UseMediaQueryOptions,
): boolean;

export default useMediaQuery;
