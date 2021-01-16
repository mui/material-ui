import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';

const SliderCustomized = styled(Slider)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }

  & .MuiSlider-thumb {
    border-radius: 1px;
  }
`;

export default function StyledComponentsDeep() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider defaultValue={30} />
      <SliderCustomized defaultValue={30} />
    </Box>
  );
}
