import { createTheme } from '@material-ui/core/styles';
import { expectType } from '@material-ui/types';

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
  expectType<string | undefined, typeof maybeFontStyle>(maybeFontStyle);
}
