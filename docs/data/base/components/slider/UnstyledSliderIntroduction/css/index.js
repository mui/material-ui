import * as React from 'react';
import { useTheme, alpha } from '@mui/system';
import { Slider, sliderClasses } from '@mui/base/Slider';

export default function UnstyledSliderIntroduction() {
  return (
    <div style={{ width: 320 }}>
      <Slider
        slotProps={{
          root: { className: 'CustomSlider' },
          rail: { className: 'CustomSlider-rail' },
          track: { className: 'CustomSlider-track' },
          thumb: { className: 'CustomSlider-thumb' },
        }}
        defaultValue={50}
      />
      <Slider
        slotProps={{
          root: { className: 'CustomSlider' },
          rail: { className: 'CustomSlider-rail' },
          track: { className: 'CustomSlider-track' },
          thumb: { className: 'CustomSlider-thumb' },
        }}
        defaultValue={30}
        disabled
      />
      <Styles />
    </div>
  );
}

const cyan = {
  50: '#E9F8FC',
  100: '#BDEBF4',
  200: '#99D8E5',
  300: '#66BACC',
  400: '#1F94AD',
  500: '#0D5463',
  600: '#094855',
  700: '#063C47',
  800: '#043039',
  900: '#022127',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();
  return (
    <style>{`
    .CustomSlider {
      color: ${isDarkMode ? cyan[300] : cyan[500]};
      height: 4px;
      width: 100%;
      padding: 16px 0;
      display: inline-flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
    }

    .CustomSlider.${sliderClasses.disabled} { 
      pointer-events: none;
      cursor: default;
      color: ${isDarkMode ? grey[600] : grey[300]};
      opacity: 0.4;
      outline: none;
    }

    .CustomSlider-rail {
      display: block;
      position: absolute;
      width: 100%;
      height: 4px;
      border-radius: 6px;
      background-color: currentColor;
      opacity: 0.3;
    }

    .CustomSlider-track {
      display: block;
      position: absolute;
      height: 4px;
      border-radius: 6px;
      background-color: currentColor;
    }

    .CustomSlider-thumb {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 20px;
      height: 20px;
      margin-left: -6px;
      box-sizing: border-box;
      border-radius: 50%;
      outline: 0;
      background-color: ${isDarkMode ? cyan[300] : cyan[500]};
      transition-property: box-shadow, transform;
      transition-timing-function: ease;
      transition-duration: 120ms;
      transform-origin: center;
    }

    .CustomSlider-thumb:hover {
      box-shadow: 0 0 0 6px ${alpha(isDarkMode ? cyan[300] : cyan[200], 0.3)};
    }

    .CustomSlider-thumb.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 8px ${alpha(isDarkMode ? cyan[400] : cyan[200], 0.5)};
      outline: none;
    }

    .CustomSlider-thumb.${sliderClasses.active} {
      box-shadow: 0 0 0 8px ${alpha(isDarkMode ? cyan[400] : cyan[200], 0.5)};
      outline: none;
      transform: scale(1.2);
    }

    .CustomSlider-thumb.${sliderClasses.disabled} {
      background-color: ${isDarkMode ? grey[600] : grey[300]};
    }
    `}</style>
  );
}
