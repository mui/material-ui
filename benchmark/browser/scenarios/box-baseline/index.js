import * as React from 'react';
import emotionStyled from '@emotion/styled';

const Box = emotionStyled('div')(({ css }) => css);

export default function BoxBaseline() {
  return (
    <React.Fragment>
      {new Array(1000).fill().map(() => (
        <Box
          css={{
            width: 200,
            height: 200,
            borderWidth: '3px',
            borderColor: 'white',
            '&:hover': { backgroundColor: '#c51162' },
            '@media (min-width:0px)': { backgroundColor: '#3f51b5', borderStyle: 'dashed' },
            '@media (min-width:600px)': {
              backgroundColor: 'rgba(0, 0, 0, 0.87)',
              borderStyle: 'solid',
            },
            '@media (min-width:960px)': { backgroundColor: '#fff', borderStyle: 'dotted' },
          }}
        >
          test case
        </Box>
      ))}
    </React.Fragment>
  );
}
