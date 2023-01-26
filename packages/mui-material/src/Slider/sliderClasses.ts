import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import { sliderUnstyledClasses } from '@mui/base/SliderUnstyled';

const sliderClasses = {
  ...sliderUnstyledClasses,
  ...generateUtilityClasses('MuiSlider', [
    'colorPrimary',
    'colorSecondary',
    'thumbColorPrimary',
    'thumbColorSecondary',
    'sizeSmall',
    'thumbSizeSmall',
  ]),
};

export default sliderClasses;
