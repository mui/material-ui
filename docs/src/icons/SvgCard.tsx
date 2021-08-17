import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgCard(props: RootSvgProps) {
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
          d="M4.577 9.064A1 1 0 004 9.97v16.46a1 1 0 001.423.906l18-8.4A1 1 0 0024 18.03V1.57a1 1 0 00-1.423-.906l-18 8.4z"
          fill="#0059B3"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 8h14a2 2 0 012 2H5a2 2 0 012-2zm-4 3v-1a4 4 0 014-4h14a4 4 0 014 4v8a4 4 0 01-4 4H7a4 4 0 01-4-4v-7zm20 1v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6h18z"
          fill="#80BFFF"
        />
        <rect x={7.5} y={15.5} width={5} height={1} rx={0.5} stroke="#80BFFF" />
        <rect x={15} y={15} width={2} height={2} rx={1} fill="#80BFFF" />
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
        d="M4.577 9.064A1 1 0 004 9.97v16.46a1 1 0 001.423.906l18-8.4A1 1 0 0024 18.03V1.57a1 1 0 00-1.423-.906l-18 8.4z"
        fill="#C2E0FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 8h14a2 2 0 012 2H5a2 2 0 012-2zm-4 3v-1a4 4 0 014-4h14a4 4 0 014 4v8a4 4 0 01-4 4H7a4 4 0 01-4-4v-7zm20 1v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6h18z"
        fill={`url(#svg-card-linear1-${props.id})`}
      />
      <rect
        x={7.5}
        y={15.5}
        width={5}
        height={1}
        rx={0.5}
        stroke={`url(#svg-card-linear2)-${props.id}`}
      />
      <rect x={15} y={15} width={2} height={2} rx={1} fill={`url(#svg-card-linear3-${props.id})`} />
      <defs>
        <linearGradient
          id={`svg-card-linear1-${props.id}`}
          x1={25}
          y1={22}
          x2={9.778}
          y2={1.07}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
        <linearGradient
          id={`svg-card-linear2-${props.id}`}
          x1={13}
          y1={17}
          x2={11.8}
          y2={13.4}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
        <linearGradient
          id={`svg-card-linear3-${props.id}`}
          x1={17}
          y1={17}
          x2={15}
          y2={15}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
      </defs>
    </RootSvg>
  );
}

export default SvgCard;
