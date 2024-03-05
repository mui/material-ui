/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

export default function EmotionCSS() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider defaultValue={30} />
      <Slider
        defaultValue={30}
        css={css`
          color: #20b2aa;

          :hover {
            color: #2e8b57;
          }
        `}
      />
    </Box>
  );
}
