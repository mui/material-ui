import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

{
  const theme = createMuiTheme({
    mixins: {
      toolbar: {
        background: '#fff',
        minHeight: 36,
        '@media (min-width:0px) and (orientation: landscape)': {
          minHeight: 24,
        },
        '@media (min-width:600px)': {
          minHeight: 48,
        },
      },
    },
  });

  const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
  }));
}
