import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgButton({ active, ...props }: { active?: boolean } & React.SVGProps<SVGSVGElement>) {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect width={24} height={24} rx={5} fill={theme.palette.svgBg[active ? 'active' : 'base']} />
      <mask
        id="svg-date-picker-mask1"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <rect
          width={24}
          height={24}
          rx={5}
          fill={theme.palette.svgBg[active ? 'active' : 'base']}
        />
      </mask>
      <g mask="url(#svg-date-picker-mask1)">
        <g filter="url(#svg-date-picker-filter1)">
          <rect
            x={4}
            y={6}
            width={16}
            height={15}
            rx={2}
            fill={theme.palette.svgStroke[active ? 'active' : 'base']}
          />
          <rect
            x={5}
            y={7}
            width={14}
            height={13}
            rx={1}
            stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
            strokeWidth={2}
          />
        </g>
        <rect
          x={4}
          y={6}
          width={16}
          height={6}
          rx={2}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
        <rect
          x={6}
          y={4}
          width={3}
          height={4}
          rx={1.5}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
        <rect
          x={15}
          y={4}
          width={3}
          height={4}
          rx={1.5}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
      </g>
      {theme.palette.mode === 'dark' && (
        <defs>
          <filter
            id="svg-date-picker-filter1"
            x={0}
            y={6}
            width={24}
            height={23}
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
      )}
      {theme.palette.mode === 'light' && (
        <defs>
          <filter
            id="svg-date-picker-filter1"
            x={0}
            y={6}
            width={24}
            height={23}
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
            <feColorMatrix values="0 0 0 0 0.843137 0 0 0 0 0.862745 0 0 0 0 0.882353 0 0 0 1 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      )}
    </svg>
  );
}

export default SvgButton;
