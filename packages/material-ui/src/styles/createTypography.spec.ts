import { createMuiTheme } from '@material-ui/core/styles';

{
  // properties of the variants can be "unset"
  const theme = createMuiTheme({
    typography: {
      allVariants: {
        fontStyle: undefined,
      },
    },
  });

  // $ExpectType string | undefined
  const maybeFontStyle = theme.typography.body1.fontStyle;
}
