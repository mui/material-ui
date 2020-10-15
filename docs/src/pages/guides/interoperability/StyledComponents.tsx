import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/SliderStyled';
import Box from '@material-ui/core/Box';

const SliderCustomized = styled(Slider)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }
`;

export default function StyledComponents() {
  return (
    <Box width={300}>
      <Slider defaultValue={30} />
      <SliderCustomized defaultValue={30} />
    </Box>
  );
}
