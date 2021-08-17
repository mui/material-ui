import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgSelect({ active, ...props }: { active?: boolean } & React.SVGProps<SVGSVGElement>) {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={26}
      viewBox="0 0 28 26"
      fill="none"
      {...props}
    >
      <rect
        x={2}
        width={24}
        height={24}
        rx={5}
        fill={theme.palette.svgBg[active ? 'active' : 'base']}
      />
      <g filter="url(#svg-select-mask1)">
        <rect
          x={4}
          y={6}
          width={20}
          height={12}
          rx={4}
          fill={theme.palette.svgStroke[active ? 'active' : 'base']}
        />
        <rect
          x={5}
          y={7}
          width={18}
          height={10}
          rx={3}
          stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
          strokeWidth={2}
        />
      </g>
      <path
        d="M18.26 13.55a.3.3 0 01-.52 0l-1.212-2.1a.3.3 0 01.26-.45h2.424a.3.3 0 01.26.45l-1.212 2.1z"
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
      {theme.palette.mode === 'dark' && (
        <defs>
          <filter
            id="svg-select-mask1"
            x={0}
            y={6}
            width={28}
            height={20}
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
            id="svg-select-mask1"
            x={0}
            y={6}
            width={28}
            height={20}
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

export default SvgSelect;
