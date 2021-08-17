import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgGuage({ active, ...props }: RootSvgProps<{ active?: boolean }>) {
  const theme = useTheme();
  if (theme.palette.mode === 'dark') {
    return (
      <RootSvg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={27}
        viewBox="0 0 24 27"
        fill="none"
        {...props}
      >
        <rect
          width={24}
          height={24}
          rx={5}
          fill={theme.palette.svgBg[active ? 'active' : 'base']}
        />
        <g filter="url(#svg-guage1)">
          <circle
            cx={12}
            cy={12}
            r={7}
            fill={theme.palette.svgStroke[active ? 'active' : 'base']}
          />
          <circle
            cx={12}
            cy={12}
            r={6}
            stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
            strokeWidth={2}
          />
        </g>
        <path
          fill={theme.palette.svgStroke[active ? 'active' : 'base']}
          d="M11 16h2v4h-2zM14.134 15l1.732-1 1.673 2.897-1.733 1zM8 14l1.732 1L8 18l-1.5-1.5L8 14zM16 13v-2h3v2z"
        />
        <defs>
          <filter
            id="svg-guage1"
            x={1}
            y={5}
            width={22}
            height={22}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={4} />
            <feGaussianBlur stdDeviation={2} />
            <feColorMatrix values="0 0 0 0 0.04 0 0 0 0 0.0989474 0 0 0 0 0.16 0 0 0 0.5 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </RootSvg>
    );
  }
  return (
    <RootSvg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect width={24} height={24} rx={5} fill={theme.palette.svgBg[active ? 'active' : 'base']} />
      <circle cx={12} cy={12} r={6} stroke="#AAB4BE" strokeWidth={2} />
      <rect
        x={11}
        y={16}
        width={2}
        height={4}
        rx={1}
        fill={theme.palette.svgBg[active ? 'active' : 'base']}
      />
      <rect
        x={14.134}
        y={15}
        width={2}
        height={4}
        rx={1}
        transform="rotate(-30 14.134 15)"
        fill={theme.palette.svgBg[active ? 'active' : 'base']}
      />
      <rect
        x={8}
        y={14}
        width={2}
        height={4}
        rx={1}
        transform="rotate(30 8 14)"
        fill={theme.palette.svgBg[active ? 'active' : 'base']}
      />
      <rect
        x={16}
        y={13}
        width={2}
        height={4}
        rx={1}
        transform="rotate(-90 16 13)"
        fill={theme.palette.svgBg[active ? 'active' : 'base']}
      />
    </RootSvg>
  );
}

export default SvgGuage;
