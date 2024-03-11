import { styled as _styled } from '@pigment-css/react';
export const SliderRail = /*#__PURE__*/ _styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  classes: ['s4jxdij', 's4jxdij-1'],
});
function App() {
  return <SliderRail sx={'s6g18tg'} />;
}
function App2(props) {
  return (
    <SliderRail
      sx={
        props.variant === 'secondary'
          ? {
              className: 'sqa8j32',
              vars: {
                'sqa8j32-0': [props.isRed ? 'red' : 'blue', false],
              },
            }
          : 's1vuaneo'
      }
    />
  );
}
function App3(props) {
  return (
    <SliderRail
      sx={
        props.variant === 'secondary' && {
          className: 'sihzw1t',
          vars: {
            'sihzw1t-0': [props.isRed ? 'red' : 'blue', false],
          },
        }
      }
    />
  );
}
function App4(props) {
  return <SliderRail sx={'s1cb6hjd'} />;
}
