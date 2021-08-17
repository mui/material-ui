import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgTag(props: RootSvgProps) {
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
          d="M12.43 7.453a3 3 0 012.086-1.457l4.208-.727a1 1 0 011.109.64l1.474 4.008a3 3 0 01-.217 2.536l-6.064 10.502a3 3 0 01-4.098 1.098l-3.464-2a3 3 0 01-1.098-4.099l6.063-10.501z"
          stroke="#80BFFF"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <circle cx={17.196} cy={9.196} r={1} transform="rotate(30 17.196 9.196)" fill="#80BFFF" />
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
        d="M12.43 7.453a3 3 0 012.086-1.457l4.208-.727a1 1 0 011.109.64l1.474 4.008a3 3 0 01-.217 2.536l-6.064 10.502a3 3 0 01-4.098 1.098l-3.464-2a3 3 0 01-1.098-4.099l6.063-10.501z"
        stroke="url(#prefix__paint0_linear)"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <circle
        cx={17.196}
        cy={9.196}
        r={1}
        transform="rotate(30 17.196 9.196)"
        fill="url(#svg-tag-linear1)"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={13.892}
          y1={26.919}
          x2={2.476}
          y2={8.962}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
        <linearGradient
          id="svg-tag-linear1"
          x1={18.196}
          y1={10.196}
          x2={16.196}
          y2={8.196}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
      </defs>
    </RootSvg>
  );
}

export default SvgTag;
