import { Theme, unstable_useThemeProps as useThemeProps } from '@material-ui/core/styles';
import { SliderProps } from '@material-ui/core/Slider';

{
  const props = useThemeProps<Theme, SliderProps, 'MuiSlider'>({ props: { color: 'primary' }, name: 'MuiSlider' });

  // additional props are valid
  props.isRtl;
  props.theme;

  // component's props are valid
  props.track;
  props.valueLabelDisplay;
}
