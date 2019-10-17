import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';

const useStyles = makeStyles({
  container: {
    maxWidth: 300,
    wordBreak: 'break-all',
  },
});

function LargeTree() {
  return Array.from(new Array(3000)).map((_, index) => <span key={index}>.</span>);
}

function FrameDeferring() {
  const classes = useStyles();
  const [state, setState] = React.useState({ open: false, defer: false });

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          setState({
            open: !state.open,
            defer: false,
          })
        }
      >
        {'Render NoSsr defer="false"'}
      </button>
      <button
        type="button"
        onClick={() =>
          setState({
            open: !state.open,
            defer: true,
          })
        }
      >
        {'Render NoSsr defer="true"'}
      </button>
      {state.open ? (
        <div className={classes.container}>
          <span>Outside NoSsr</span>
          <NoSsr defer={state.defer}>
            ....Inside NoSsr
            <LargeTree />
          </NoSsr>
        </div>
      ) : null}
    </div>
  );
}

export default FrameDeferring;
