import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgCalendar(props: RootSvgProps) {
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
        <rect x={9} y={15} width={4} height={4} rx={1} fill="#80BFFF" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 5a1 1 0 012 0v2h6V5a1 1 0 112 0v2a4 4 0 014 4v8a4 4 0 01-4 4H9a4 4 0 01-4-4v-8a4 4 0 014-4V5zm0 4h10a2 2 0 012 2H7a2 2 0 012-2zm12 4v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6h14z"
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
      <rect x={9} y={15} width={4} height={4} rx={1} fill="url(#svg-calendar-linear1)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 5a1 1 0 012 0v2h6V5a1 1 0 112 0v2a4 4 0 014 4v8a4 4 0 01-4 4H9a4 4 0 01-4-4v-8a4 4 0 014-4V5zm0 4h10a2 2 0 012 2H7a2 2 0 012-2zm12 4v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6h14z"
        fill={`url(#svg-calendar-${props.id || ''})`}
      />
      <defs>
        <linearGradient
          id="svg-calendar-linear1"
          x1={13}
          y1={19}
          x2={9}
          y2={15}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
        <linearGradient
          id={`svg-calendar-${props.id || ''}`}
          x1={23}
          y1={23}
          x2={4.028}
          y2={5.026}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
      </defs>
    </RootSvg>
  );
}

export default SvgCalendar;
