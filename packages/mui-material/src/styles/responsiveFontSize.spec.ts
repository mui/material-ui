import type { Theme } from '@mui/material/styles';
import { responsiveFontSizes, createTheme } from '@mui/material/styles';
import { expectType } from '@mui/types';

const theme = responsiveFontSizes(createTheme());
expectType<Theme, typeof theme>(theme);

// keeps the input type
const custom = responsiveFontSizes({ ...createTheme(), custom: 1 });
expectType<number, typeof custom.custom>(custom.custom);
