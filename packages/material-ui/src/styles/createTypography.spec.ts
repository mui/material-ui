import { styled, createTheme } from '@material-ui/core/styles';
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
  expectType<
    | '-moz-initial'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'italic'
    | 'normal'
    | 'oblique'
    | (string & {})
    | undefined,
    typeof maybeFontStyle
  >(maybeFontStyle);
}

{
  const StyledComponents = styled('span')(({ theme }) => ({
    ...theme.typography.body1,
  }));
}
