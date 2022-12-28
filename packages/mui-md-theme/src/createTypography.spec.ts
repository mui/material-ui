import { createTheme } from '@mui/md-theme';
import { expectType } from '@mui/types';

{
  // properties of the variants can be "unset"
  const theme = createTheme({
    typography: {
      allVariants: {
        fontStyle: undefined,
      },
    },
  });

  const maybeFontStyle = theme.typography.body1.fontStyle;
  expectType<
    | '-moz-initial'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revert-layer'
    | 'unset'
    | 'italic'
    | 'normal'
    | 'oblique'
    | (string & {})
    | undefined,
    typeof maybeFontStyle
  >(maybeFontStyle);
}
