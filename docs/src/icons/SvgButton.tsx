import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgButton({ active, ...props }: { active?: boolean } & React.SVGProps<SVGSVGElement>) {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={24}
      viewBox="0 0 28 24"
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
      <g filter="url(#svg-button)">
        <rect
          x={4}
          y={8}
          width={20}
          height={8}
          rx={1}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
      </g>
      <circle cx={7} cy={12} r={1} fill={theme.palette.svgStroke[active ? 'active' : 'base']} />
      <rect
        x={10}
        y={11}
        width={12}
        height={2}
        rx={1}
        fill={theme.palette.svgStroke[active ? 'active' : 'base']}
      />
      {theme.palette.mode === 'dark' ? (
        <defs>
          <filter
            id="svg-button"
            x={0}
            y={8}
            width={28}
            height={16}
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
      ) : (
        <defs>
          <filter
            id="svg-button"
            x={0}
            y={8}
            width={28}
            height={16}
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
