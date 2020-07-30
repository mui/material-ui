import { createMuiTheme } from '@material-ui/core/styles';
import { expectType } from '@material-ui/types';
import { PropertyValue } from '@material-ui/styles';

{
  // properties of the variants can be "unset"
  const theme = createMuiTheme({
    typography: {
      allVariants: {
        fontStyle: undefined,
      },
    },
  });

  const maybeFontStyle = theme.typography.body1.fontStyle;
  expectType<string | undefined, PropertyValue<typeof maybeFontStyle>>(maybeFontStyle);
}
