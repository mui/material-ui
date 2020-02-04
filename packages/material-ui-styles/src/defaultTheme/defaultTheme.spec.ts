import { useTheme, makeStyles, styled } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

declare module '@material-ui/styles' {
  interface DefaultTheme {
    myProperty: string;
  }
}

{
  // $ExpectType string
  const value = useTheme().myProperty;
}

{
  makeStyles(theme => {
    // $ExpectType string
    const value = theme.myProperty;

    return {
      root: {
        width: 1,
      },
    };
  });
}

{
  styled(Grid)(({ theme }) => {
    // $ExpectType string
    const value = theme.myProperty;

    return {
      width: 1,
    };
  });
}
