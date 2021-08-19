import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgReplay(props: React.SVGProps<SVGSVGElement>) {
  const theme = useTheme();
  if (theme.palette.mode === 'dark') {
    return (
      <svg
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
          d="M4.577 9.064A1 1 0 004 9.97v16.46a1 1 0 001.423.906l18-8.4A1 1 0 0024 18.03V1.57a1 1 0 00-1.423-.906l-18 8.4z"
          fill="#0059B3"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.65 6.985a.3.3 0 000 .52l5.1 2.944a.3.3 0 00.45-.26V8.518a6.802 6.802 0 01-1 13.527 6.8 6.8 0 01-6.8-6.8 1.2 1.2 0 00-2.4 0 9.2 9.2 0 1010.2-9.146V4.3a.3.3 0 00-.45-.26l-5.1 2.945z"
          fill="#80BFFF"
        />
      </svg>
    );
  }
  return (
    <svg
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
        d="M4.577 9.064A1 1 0 004 9.97v16.46a1 1 0 001.423.906l18-8.4A1 1 0 0024 18.03V1.57a1 1 0 00-1.423-.906l-18 8.4z"
        fill="#C2E0FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.65 6.985a.3.3 0 000 .52l5.1 2.944a.3.3 0 00.45-.26V8.518a6.802 6.802 0 01-1 13.527 6.8 6.8 0 01-6.8-6.8 1.2 1.2 0 00-2.4 0 9.2 9.2 0 1010.2-9.146V4.3a.3.3 0 00-.45-.26l-5.1 2.945z"
        fill="url(#svg-replay-linear1)"
      />
      <defs>
        <linearGradient
          id="svg-replay-linear1"
          x1={23.4}
          y1={24.445}
          x2={3.068}
          y2={6.147}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default SvgReplay;
