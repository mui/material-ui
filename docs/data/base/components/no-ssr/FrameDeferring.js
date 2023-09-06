import * as React from 'react';
import { NoSsr } from '@mui/base/NoSsr';
import { Box } from '@mui/system';

function LargeTree() {
  return Array.from(new Array(5000)).map((_, index) => <span key={index}>.</span>);
}

export default function FrameDeferring() {
  const [state, setState] = React.useState({
    open: false,
    defer: false,
  });

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
      <br />
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
      <br />
      <br />
      <Box sx={{ width: 300, display: 'flex', flexWrap: 'wrap' }}>
        {state.open ? (
          <React.Fragment>
            <div>Outside NoSsr</div>
            <NoSsr defer={state.defer}>
              .....Inside NoSsr
              <LargeTree />
            </NoSsr>
          </React.Fragment>
        ) : null}
      </Box>
    </div>
  );
}
