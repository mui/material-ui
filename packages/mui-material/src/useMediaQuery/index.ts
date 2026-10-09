'use client';
// This factory runs at import time. The `@mui/material` barrel evaluates this
// module from Next.js React Server Components, where the named export is not a
// function unless this file is a Client Component.
// https://github.com/mui/material-ui/issues/46688
import { unstable_createUseMediaQuery } from '@mui/system/useMediaQuery';
import type { UseMediaQueryOptions } from '@mui/system/useMediaQuery';
import THEME_ID from '../styles/identifier';
import type { Theme } from '../styles/createTheme';

// `export *` is not allowed in a module with the 'use client' pragma.
export type { UseMediaQueryOptions };

// TODO v7: remove the generic. It's only used to prevent a breaking change in v6 from system's useMediaQuery in https://github.com/mui/material-ui/pull/44339.
const useMediaQuery = unstable_createUseMediaQuery({ themeId: THEME_ID }) as <T = Theme>(
  queryInput: string | ((theme: T) => string),
  options?: UseMediaQueryOptions,
) => boolean;

export default useMediaQuery;
