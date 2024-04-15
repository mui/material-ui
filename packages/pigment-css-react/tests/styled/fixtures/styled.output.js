import { styled as _styled, styled as _styled2, styled as _styled3 } from '@pigment-css/react';
import _theme from '@pigment-css/react/theme';
import PropTypes from 'prop-types';
const Component = /*#__PURE__*/ _styled('div')({
  classes: ['c1aiqtje'],
});
export const SliderRail = /*#__PURE__*/ _styled2('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  classes: ['sj0zd45'],
});
const SliderRail2 = /*#__PURE__*/ _styled3('span')({
  classes: ['shdkmm7'],
});
export function App() {
  return (
    <Component>
      <SliderRail />
      <SliderRail2 />
    </Component>
  );
}
App.propTypes = {
  children: PropTypes.element,
};
App.muiName = 'App';
