import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgPerson(props: RootSvgProps) {
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
          d="M6.25 21.122a5.872 5.872 0 015.872-5.872h3.756a5.872 5.872 0 015.872 5.872c0 .9-.729 1.628-1.628 1.628H7.878a1.628 1.628 0 01-1.628-1.628z"
          stroke="#80BFFF"
          strokeWidth={2.5}
        />
        <circle cx={14} cy={8} r={2.9} stroke="#80BFFF" strokeWidth={2.2} />
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
        d="M6.1 21.122a6.022 6.022 0 016.022-6.022h3.756a6.022 6.022 0 016.022 6.022c0 .982-.796 1.778-1.778 1.778H7.878A1.778 1.778 0 016.1 21.122z"
        stroke="url(#svg-person-linear1)"
        strokeWidth={2.2}
      />
      <circle cx={14} cy={8} r={2.9} stroke="url(#svg-person-linear2)" strokeWidth={2.2} />
      <defs>
        <linearGradient
          id="svg-person-linear1"
          x1={23}
          y1={24}
          x2={14.509}
          y2={8.717}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
        <linearGradient
          id="svg-person-linear2"
          x1={18}
          y1={12}
          x2={10}
          y2={4}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
      </defs>
    </RootSvg>
  );
}

export default SvgPerson;
