import { sx as _sx8, styled as _styled } from '@pigment-css/react';
import { ForwardSx as _ForwardSx4 } from '@pigment-css/react/private-runtime';
import { sx as _sx6 } from '@pigment-css/react';
import { ForwardSx as _ForwardSx3 } from '@pigment-css/react/private-runtime';
import { sx as _sx4 } from '@pigment-css/react';
import { ForwardSx as _ForwardSx2 } from '@pigment-css/react/private-runtime';
import { sx as _sx2 } from '@pigment-css/react';
import { ForwardSx as _ForwardSx } from '@pigment-css/react/private-runtime';
export const SliderRail = /*#__PURE__*/ _styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  classes: ['sjfloo5', 'sjfloo5-1'],
});
function App() {
  return <_ForwardSx sxComponent={SliderRail} sx={'_1o8xp19'} />;
}
function App2(props) {
  return (
    <_ForwardSx2
      sxComponent={SliderRail}
      sx={
        props.variant === 'secondary'
          ? {
              className: '_1xbsywq',
              vars: {
                '_1xbsywq-0': [props.isRed ? 'red' : 'blue', false],
              },
            }
          : '_1wnk6s5'
      }
    />
  );
}
function App3(props) {
  return (
    <_ForwardSx3
      sxComponent={SliderRail}
      sx={
        props.variant === 'secondary' && {
          className: '_tzaibv',
          vars: {
            '_tzaibv-0': [props.isRed ? 'red' : 'blue', false],
          },
        }
      }
    />
  );
}
function App4(props) {
  return <_ForwardSx4 sxComponent={SliderRail} sx={'_azg8ol'} />;
}
