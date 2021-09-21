import { useTheme, makeStyles, styled } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { expectType } from '@mui/types';

declare module '@mui/styles' {
  interface DefaultTheme {
    myProperty: string;
  }
}

function MyComponent() {
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
