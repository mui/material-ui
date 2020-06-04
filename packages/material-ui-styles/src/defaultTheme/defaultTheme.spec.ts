import { useTheme, makeStyles, styled } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { expectType } from '@material-ui/types';

declare module '@material-ui/styles' {
  interface DefaultTheme {
    myProperty: string;
  }
}

{
  const value = useTheme().myProperty;
  expectType<string, typeof value>(value);
}

{
  makeStyles((theme) => {
    const value = theme.myProperty;
    expectType<string, typeof value>(value);

    return {
      root: {
        width: 1,
      },
    };
  });
}

{
  styled(Grid)(({ theme }) => {
    const value = theme.myProperty;
    expectType<string, typeof value>(value);

    return {
      width: 1,
    };
  });
}
