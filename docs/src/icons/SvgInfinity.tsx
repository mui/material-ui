import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgInfinity(props: RootSvgProps) {
  const theme = useTheme();
  if (theme.palette.mode === 'dark') {
    return (
      <RootSvg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        viewBox="0 0 28 28"
        fill="none"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.577 18.936A1 1 0 014 18.03V1.57A1 1 0 015.423.664l18 8.4A1 1 0 0124 9.97v16.46a1 1 0 01-1.423.906l-18-8.4z"
          fill="#0059B3"
        />
        <path
          d="M22.22 9.24c-2-.6-4.06-.04-5.39 1.29L14 13.04l-1.52 1.34h.01L9.8 16.77c-.81.81-1.95 1.15-3.12.92a3.354 3.354 0 01-2.57-2.49A3.39 3.39 0 017.4 11c.91 0 1.76.35 2.44 1.03l.47.41c.38.34.95.34 1.33 0 .45-.4.45-1.1 0-1.5l-.42-.36A5.37 5.37 0 007.4 9C4.42 9 2 11.42 2 14.38s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01 1.51-1.36h-.01l2.69-2.39c.81-.81 1.95-1.15 3.12-.92 1.25.25 2.28 1.25 2.57 2.49a3.39 3.39 0 01-3.29 4.2c-.9 0-1.76-.35-2.44-1.03l-.48-.42a.995.995 0 00-1.33 0c-.45.4-.45 1.1 0 1.5l.42.37a5.386 5.386 0 003.82 1.57c3.27 0 5.86-2.9 5.33-6.25-.3-1.99-1.77-3.69-3.7-4.26z"
          fill="#80BFFF"
        />
      </RootSvg>
    );
  }
  return (
    <RootSvg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <rect width={28} height={28} rx={2} fill="#fff" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.577 18.936A1 1 0 014 18.03V1.57A1 1 0 015.423.664l18 8.4A1 1 0 0124 9.97v16.46a1 1 0 01-1.423.906l-18-8.4z"
        fill="#C2E0FF"
      />
      <path
        d="M22.22 9.24c-2-.6-4.06-.04-5.39 1.29L14 13.04l-1.52 1.34h.01L9.8 16.77c-.81.81-1.95 1.15-3.12.92a3.354 3.354 0 01-2.57-2.49A3.39 3.39 0 017.4 11c.91 0 1.76.35 2.44 1.03l.47.41c.38.34.95.34 1.33 0 .45-.4.45-1.1 0-1.5l-.42-.36A5.37 5.37 0 007.4 9C4.42 9 2 11.42 2 14.38s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01 1.51-1.36h-.01l2.69-2.39c.81-.81 1.95-1.15 3.12-.92 1.25.25 2.28 1.25 2.57 2.49a3.39 3.39 0 01-3.29 4.2c-.9 0-1.76-.35-2.44-1.03l-.48-.42a.995.995 0 00-1.33 0c-.45.4-.45 1.1 0 1.5l.42.37a5.386 5.386 0 003.82 1.57c3.27 0 5.86-2.9 5.33-6.25-.3-1.99-1.77-3.69-3.7-4.26z"
        fill="url(#svg-infinity-linear1)"
      />
      <defs>
        <linearGradient
          id="svg-infinity-linear1"
          x1={25.989}
          y1={19.76}
          x2={17.953}
          y2={1.844}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
      </defs>
    </RootSvg>
  );
}

export default SvgInfinity;
