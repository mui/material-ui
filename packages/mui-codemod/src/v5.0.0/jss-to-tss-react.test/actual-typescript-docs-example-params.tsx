import clsx from 'clsx';
import {makeStyles, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles<
  'root' | 'small' | 'child', {color: 'primary' | 'secondary', padding: number}
>
({
  root: ({color, padding}) => ({
    padding: padding,
    '&:hover $child': {
      backgroundColor: theme.palette[color].main,
    }
  }),
  small: {},
  child: {
    border: '1px solid black',
    height: 50,
    '&$small': {
      height: 30
    }
  }
}), {name: 'App'});

function App({classes: classesProp}: {classes?: any}) {
  const classes = useStyles({color: 'primary', padding: 30, classes: classesProp});

  return (
    <div className={classes.root}>
      <div className={classes.child}>
        The Background take the primary theme color when the mouse hovers the parent.
      </div>
      <div className={clsx(classes.child, classes.small)}>
        The Background take the primary theme color when the mouse hovers the parent.
        I am smaller than the other child.
      </div>
    </div>
  );
}

export default App;
