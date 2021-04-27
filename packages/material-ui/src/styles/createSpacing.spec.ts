import { createTheme } from '@material-ui/core/styles';

{
  let theme;
  theme = createTheme({
    spacing: 8,
  });
  theme = createTheme({
    spacing: (factor: number) => `${0.8 * factor}rem`,
  });
}
