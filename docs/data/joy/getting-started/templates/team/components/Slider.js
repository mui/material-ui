import SliderUnstyled, { sliderUnstyledClasses } from '@mui/base/SliderUnstyled';
import { styled } from '@mui/joy/styles';

const JoySlider = styled(SliderUnstyled)(
  ({ theme }) => `
  width: 100%;
  padding: 20px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    & .${sliderUnstyledClasses.thumb}, & .${sliderUnstyledClasses.track} {
      background-color: ${theme.vars.palette.primary.solidHoverBg};
    }
  }

  &.${sliderUnstyledClasses.disabled} { 
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }

  & .${sliderUnstyledClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    opacity: 0.38;
    background-color: rgba(${theme.vars.palette.primary.mainChannel} / 0.6);
  }

  & .${sliderUnstyledClasses.track} {
    display: block;
    position: absolute;
    height: 2px;
    border-radius: 2px;
    background-color: ${theme.vars.palette.primary.solidBg};
  }

  & .${sliderUnstyledClasses.thumb} {
    position: absolute;
    width: 12px;
    height: 12px;
    margin-left: -5px;
    margin-top: -5px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: ${theme.vars.palette.primary.solidBg};

    &.${sliderUnstyledClasses.focusVisible} {
      background-color: ${theme.vars.palette.primary.solidHoverBg};
    }

    &.${sliderUnstyledClasses.active} {
    }
  }

  & .${sliderUnstyledClasses.valueLabel} {
    white-space: nowrap;
    font-family: ${theme.vars.fontFamily.body};
    font-size: ${theme.vars.fontSize.sm};
    color: ${theme.vars.palette.text.secondary};
    display: flex;
    justify-content: center;
    position: relative;
    top: -2px;
    transform: translateY(-100%);
    text-align: center;
  }
  `,
);

export default JoySlider;
