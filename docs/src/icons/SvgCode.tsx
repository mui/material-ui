import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgCode(props: RootSvgProps) {
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
          d="M23.423 9.064A1 1 0 0124 9.97v16.46a1 1 0 01-1.423.906l-18-8.4A1 1 0 014 18.03V1.57A1 1 0 015.423.664l18 8.4z"
          fill="#0059B3"
        />
        <path
          d="M11.5 8l-5.793 5.793a1 1 0 000 1.414L11.5 21M16.5 8l6.21 5.767a1 1 0 010 1.466L16.5 21"
          stroke="#80BFFF"
          strokeWidth={2.2}
          strokeLinecap="round"
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
        d="M23.423 9.064A1 1 0 0124 9.97v16.46a1 1 0 01-1.423.906l-18-8.4A1 1 0 014 18.03V1.57A1 1 0 015.423.664l18 8.4z"
        fill="#C2E0FF"
      />
      <path
        d="M11.5 8l-5.793 5.793a1 1 0 000 1.414L11.5 21"
        stroke="url(#svg-code1)"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <path
        d="M16.5 8l6.21 5.767a1 1 0 010 1.466L16.5 21"
        stroke="url(#svg-code2)"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="svg-code1"
          x1={11.5}
          y1={21}
          x2={1.1}
          y2={15.8}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
        <linearGradient
          id="svg-code2"
          x1={23.5}
          y1={21}
          x2={12.647}
          y2={15.156}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
      </defs>
    </RootSvg>
  );
}

export default SvgCode;
