import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

// ! This is very handcrafted svg for SSR. Don't make your logos this way 🤦🤦‍🤦‍
export default function Logo() {
  const theme = useTheme();
  return (
    <svg width="200px" height="200px" viewBox="0 0 40 40" version="1.1">
      <defs />
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect
          id="Rectangle"
          fill={theme.palette.primary.dark}
          transform="translate(22.000000, 20.000000) rotate(45.000000) translate(-22.000000, -20.000000) "
          x="12.8076118"
          y="9.39339828"
          width="18.3847763"
          height="21.2132034"
        />
        <rect
          id="Rectangle"
          fill={theme.palette.primary.dark}
          transform="translate(24.000000, 23.750000) rotate(45.000000) translate(-23.750000, -23.750000) "
          x="13.4969517"
          y="11.75"
          width="20.5060967"
          height="24"
        />
        <rect
          id="Rectangle"
          fill={theme.palette.primary.dark}
          transform="translate(13.066104, 11.066104) rotate(45.000000) translate(-13.066104, -11.066104) "
          x="9.43708512"
          y="7.53056961"
          width="7.25803678"
          height="7.07106781"
        />
        <polygon
          id="Triangle"
          fill={theme.palette.primary.dark}
          transform="translate(12.000000, 16.000000) rotate(90.000000) translate(-12.000000, -16.000000) "
          points="12 14 15 18 9 18"
        />
        <g id="baseline-event-24px" transform="translate(5.000000, 5.000000)">
          <path
            d="M17,12 L12,12 L12,17 L17,17 L17,12 Z M16,1 L16,3 L8,3 L8,1 L6,1 L6,3 L5,3 C3.89,3 3.01,3.9 3.01,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,5 C21,3.9 20.1,3 19,3 L18,3 L18,1 L16,1 Z M19,19 L5,19 L5,8 L19,8 L19,19 Z"
            id="Shape"
            fill="white"
            fillRule="nonzero"
          />
          <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
          <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
        </g>
      </g>
    </svg>
  );
}
