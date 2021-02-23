import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

interface PriorityButtonProps {
  premium: string;
  priority: string;
}
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    width: '50%',
    fontSize: '14px',
    lineHeight: '20px',
    border: '0',
    borderRadius: '4px',
    padding: '8px 0',
    '&:hover': {
      backgroundColor: 'white',
      color: theme.palette.text.primary
    },
  },
  label: {
    textTransform: 'capitalize',
  },
}));
function PriorityButton(props: PriorityButtonProps) {
  const [isOn, setIsOn] = React.useState(1);
  const { premium, priority } = props;
  const classes = useStyles();
  return (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, .2)',
        mixBlendMode: 'normal',
        borderRadius: '4px',
        padding: '2px',
        maxWidth: '310px',
      }}
    >
      <MuiButton
        color="inherit"
        variant="contained"
        size="small"
        sx={
          isOn === 1
            ? { background: 'white', color: 'text.primary' }
            : {
                background: 'transparent',
                color: 'greyAA',
              }
        }
        onClick={() => setIsOn(1)}
        classes={{
          root: classes.root,
          label: classes.label,
        }}
      >
        {premium}
      </MuiButton>
      <MuiButton
        color="inherit"
        variant="contained"
        size="small"
        sx={
          isOn === 2
            ? { background: 'white', color: 'text.primary' }
            : {
                background: 'transparent',
                color: 'greyAA',
              }
        }
        onClick={() => setIsOn(2)}
        classes={{
          root: classes.root,
          label: classes.label,
        }}
      >
        {priority}
      </MuiButton>
    </Box>
  );
}

export default PriorityButton;
