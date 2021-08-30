import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgPalette(props: React.SVGProps<SVGSVGElement>) {
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
          d="M23.423 9.064A1 1 0 0124 9.97v16.46a1 1 0 01-1.423.906l-18-8.4A1 1 0 014 18.03V1.57A1 1 0 015.423.664l18 8.4z"
          fill="#0059B3"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.096 4.575a3 3 0 00-4.242 0L14 7.43v-.797A2.632 2.632 0 0011.368 4H6.632A2.632 2.632 0 004 6.632V19a5 5 0 005 5h13a3 3 0 003-3v-4a3 3 0 00-3-3h-.43l2.355-2.354a3 3 0 000-4.242l-2.829-2.829zM14 18.743v-8.486l4.268-4.267a1 1 0 011.414 0l2.828 2.828a1 1 0 010 1.414L14 18.742zM12 19a3 3 0 11-6 0V6.632c0-.35.283-.632.632-.632h4.736c.35 0 .632.283.632.632V19zm7.57-3l-6 6H22a1 1 0 001-1v-4a1 1 0 00-1-1h-2.43zM9 20a1 1 0 100-2 1 1 0 000 2z"
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
        d="M23.423 9.064A1 1 0 0124 9.97v16.46a1 1 0 01-1.423.906l-18-8.4A1 1 0 014 18.03V1.57A1 1 0 015.423.664l18 8.4z"
        fill="#C2E0FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.096 4.575a3 3 0 00-4.242 0L14 7.43v-.797A2.632 2.632 0 0011.368 4H6.632A2.632 2.632 0 004 6.632V19a5 5 0 005 5h13a3 3 0 003-3v-4a3 3 0 00-3-3h-.43l2.355-2.354a3 3 0 000-4.242l-2.829-2.829zM14 18.743v-8.486l4.268-4.267a1 1 0 011.414 0l2.828 2.828a1 1 0 010 1.414L14 18.742zM12 19a3 3 0 01-6 0V6.632c0-.35.283-.632.632-.632h4.736c.35 0 .632.283.632.632V19zm7.57-3l-6 6H22a1 1 0 001-1v-4a1 1 0 00-1-1h-2.43zM9 20a1 1 0 100-2 1 1 0 000 2z"
        fill="url(#svg-palette-linear1)"
      />
      <defs>
        <linearGradient
          id="svg-palette-linear1"
          x1={25}
          y1={24}
          x2={4.708}
          y2={3.012}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default SvgPalette;
