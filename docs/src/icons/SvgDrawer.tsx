import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgDrawer({ active, ...props }: { active?: boolean } & React.SVGProps<SVGSVGElement>) {
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
        id="svg-drawer-mask1"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <rect
          x={0.5}
          y={0.5}
          width={23}
          height={23}
          rx={4.5}
          fill={theme.palette.svgBg[active ? 'active' : 'base']}
          stroke={theme.palette.svgBg[active ? 'active' : 'base']}
        />
      </mask>
      <g mask="url(#svg-drawer-mask1)">
        <g filter="url(#svg-drawer-mask2)">
          <rect
            x={10}
            y={-6}
            width={17}
            height={34}
            rx={1}
            fill={theme.palette.svgStroke[active ? 'active' : 'base']}
          />
        </g>
        <rect
          x={12}
          y={3}
          width={8}
          height={2}
          rx={1}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
        <rect
          x={17}
          y={9}
          width={8}
          height={2}
          rx={1}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
        <rect
          x={19}
          y={13}
          width={8}
          height={2}
          rx={1}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
        <rect
          x={17}
          y={17}
          width={8}
          height={2}
          rx={1}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
      </g>
      <rect
        x={0.5}
        y={0.5}
        width={23}
        height={23}
        rx={4.5}
        stroke={theme.palette.svgBg[active ? 'active' : 'base']}
      />
      {theme.palette.mode === 'dark' && (
        <defs>
          <filter
            id="svg-drawer-mask2"
            x={6}
            y={-6}
            width={25}
            height={42}
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
            id="svg-drawer-mask2"
            x={6}
            y={-6}
            width={25}
            height={42}
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

export default SvgDrawer;
