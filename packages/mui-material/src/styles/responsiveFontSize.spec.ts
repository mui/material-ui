import type { Theme } from '@mui/material/styles';
import { responsiveFontSizes, createTheme } from '@mui/material/styles';
import { expectType } from '@mui/types';

const theme = responsiveFontSizes(createTheme());
expectType<Theme, typeof theme>(theme);
