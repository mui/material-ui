import { Theme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';

export const styles = (theme: Theme) => ({
  root: {
    height: 64,
    [theme.breakpoints.up('sm')]: {
      height: 70,
    },
  },
});

export default withStyles(styles)(Toolbar);
