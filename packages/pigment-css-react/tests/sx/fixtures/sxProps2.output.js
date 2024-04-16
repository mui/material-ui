import { sx as _sx6, styled as _styled } from '@pigment-css/react';
import { ForwardSx as _ForwardSx3 } from '@pigment-css/react/private-runtime';
import { sx as _sx4 } from '@pigment-css/react';
import { ForwardSx as _ForwardSx2 } from '@pigment-css/react/private-runtime';
import { sx as _sx2 } from '@pigment-css/react';
import { ForwardSx as _ForwardSx } from '@pigment-css/react/private-runtime';
const SliderRail = /*#__PURE__*/ _styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  classes: ['sdbmcs3', 'sdbmcs3-1'],
});
const A = {
  SliderRail,
};
function App(props) {
  return <_ForwardSx sxComponent={SliderRail} sx={'_i7ulc4'} />;
}
function App2() {
  return <_ForwardSx2 sxComponent={SliderRail} sx={'_liig2s'} component="li" {...props} />;
}
function App3(props) {
  return (
    <_ForwardSx3
      sxComponent={A.SliderRail}
      sx={{
        className: '_o956n',
        vars: {
          '_o956n-0': [props.isRed ? 'h1-fontSize' : 'h2-fontSize', false],
        },
      }}
    />
  );
}
