import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';

const SliderCustomized = styled(Slider)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }
`;

export default function StyledComponents() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider defaultValue={30} />
      <SliderCustomized defaultValue={30} />
    </Box>
  );
}
