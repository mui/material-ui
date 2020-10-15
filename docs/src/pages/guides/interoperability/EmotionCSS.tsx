/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Slider from '@material-ui/lab/SliderStyled';
import Box from '@material-ui/core/Box';

export default function EmotionCSS() {
  return (
    <Box width={300}>
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
