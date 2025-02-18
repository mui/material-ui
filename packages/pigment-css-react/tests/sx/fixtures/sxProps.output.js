import { styled as _styled } from '@pigment-css/react';
export const SliderRail = /*#__PURE__*/ _styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  classes: ['sjfloo5', 'sjfloo5-1'],
});
function App() {
  return <SliderRail sx={'s1o8xp19'} />;
}
function App2(props) {
  return (
    <SliderRail
      sx={
        props.variant === 'secondary'
          ? {
              className: 's1xbsywq',
              vars: {
                's1xbsywq-0': [props.isRed ? 'red' : 'blue', false],
              },
            }
          : 's1wnk6s5'
      }
    />
  );
}
function App3(props) {
  return (
    <SliderRail
      sx={
        props.variant === 'secondary' && {
          className: 'stzaibv',
          vars: {
            'stzaibv-0': [props.isRed ? 'red' : 'blue', false],
          },
        }
      }
    />
  );
}
function App4(props) {
  return <SliderRail sx={'sazg8ol'} />;
}
