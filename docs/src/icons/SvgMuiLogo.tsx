import * as React from 'react';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

export default function SvgMuiLogo(props: RootSvgProps) {
  return (
    <RootSvg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={38}
      viewBox="0 0 40 38"
      fill="none"
      {...props}
    >
      <path
        fill="url(#a)"
        d="M6.667 24.88a1 1 0 0 1-1.496.868l-4.666-2.66A1 1 0 0 1 0 22.219V1.721A1 1 0 0 1 1.495.852L13.333 7.6 25.172.852a1 1 0 0 1 1.495.869v20.498a1 1 0 0 1-.505.869L20 26.6l6.667 3.8 6.666-3.8v-7.019a1 1 0 0 1 .505-.869l4.667-2.66a1 1 0 0 1 1.495.869v12.898a1 1 0 0 1-.505.869l-12.333 7.03a1 1 0 0 1-.99 0l-12.334-7.03a1 1 0 0 1-.505-.869v-6.438a1 1 0 0 1 .505-.869L20 19v-7.6l-6.171 3.518a1 1 0 0 1-.99 0L6.666 11.4v13.48Z"
      />
      <path
        fill="url(#b)"
        d="M33.333 9.763V4.351a.95.95 0 0 1 .48-.825L38.575.812A.952.952 0 0 1 40 1.637v5.412a.95.95 0 0 1-.48.825l-4.762 2.714a.952.952 0 0 1-1.425-.825Z"
      />
      <defs>
        <linearGradient id="a" x1="40" x2="2.05" y1="38" y2="-1.947" gradientUnits="userSpaceOnUse">
          <stop offset=".083" stop-color="#007FFF" />
          <stop offset=".953" stop-color="#39F" />
        </linearGradient>
        <linearGradient id="b" x1="40" x2="2.05" y1="38" y2="-1.947" gradientUnits="userSpaceOnUse">
          <stop offset=".083" stop-color="#007FFF" />
          <stop offset=".953" stop-color="#39F" />
        </linearGradient>
      </defs>
    </RootSvg>
  );
}
