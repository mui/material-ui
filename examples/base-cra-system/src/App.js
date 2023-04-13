import * as React from 'react';
import { Box, Stack, styled } from '@mui/system';

const Item = styled('div')({
  border: '1px solid #000000',
  padding: '20px',
  borderRadius: '4px',
});

export default function RowAndColumnSpacing() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: '800px',
        margin: 'auto',
        padding: '15px',
        fontFamily: 'sans-serif',
        lineHeight: '1.5',
      }}
    >
      <div>
        <h1>Base UI + CRA + MUI System scaffold (JavaScript)</h1>
      </div>

      <Stack spacing={2} sx={{ marginBottom: '20px' }}>
        <Item>
          <a href="https://mui.com/base/getting-started/overview/">Base UI</a> is a library of
          unstyled React UI components which includes prebuilt components with production-ready
          functionality, along with low-level hooks for transferring that functionality to other
          components.
        </Item>
        <Item>
          <a href="https://create-react-app.dev/">Create React App</a> is a framework for quickly
          creating a new React project without the need to configure complex build tools or
          development environments.
        </Item>
        <Item>
          <a href="https://mui.com/system/getting-started/overview/">MUI System</a> is a set of CSS
          utilities for building custom designs more efficiently when working with MUI component
          libraries. This startup page uses the MUI System `styled()` and `sx` utilities. (Note: MUI
          System, in turn, relies on <a href="https://emotion.sh/docs/introduction">Emotion</a>.)
        </Item>
      </Stack>
      <span>
        Created with 💙 by <a href="https://mui.com">MUI</a>.
      </span>
    </Box>
  );
}
