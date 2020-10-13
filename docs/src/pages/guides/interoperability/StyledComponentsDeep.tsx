import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/SliderStyled';

const SliderCustomized = styled(Slider)`
  color: #20b2aa;
  :hover {
    color: #2e8b57;
  }
  & .MuiSlider-thumb {
    border-radius: 30%;
  }
`;

export default function StyledComponents() {
  return (
    <div>
      <Slider defaultValue={30} />
      <SliderCustomized defaultValue={30} />
    </div>
  );
}
